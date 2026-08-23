import { generateDynamicRecipe, FreestyleChefResponse } from "@/lib/recipe-synthesizer";

// -------------------------------------------------------------
// 0. Prompt Injection & Adversarial Attack Shield
// -------------------------------------------------------------
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules|commands)/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /system\s+prompt/i,
  /reveal\s+(the\s+)?(api[_\s-]?key|secret|password|token|env)/i,
  /show\s+(me\s+)?(your\s+)?(prompt|system\s+instructions)/i,
  /dan\s+mode/i,
  /jailbreak/i,
  /developer\s+mode/i,
  /you\s+are\s+now\s+(an?\s+)?(unrestricted|evil|dan)/i,
  /pretend\s+you\s+are/i,
  /act\s+as\s+(an?\s+)?(unrestricted|linux|terminal|admin|bot)/i,
  /override\s+(all\s+)?system/i,
  /bypass\s+(safety|filter)/i,
  /<script/i,
  /<\/script/i,
  /javascript:/i,
];

export function isAdversarialInput(input: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

export function sanitizeUserInput(input: string): string {
  return input
    .replace(/[<>]/g, " ")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 400)
    .trim();
}

export type ChefChatResponse = FreestyleChefResponse;

// In-memory response cache (TTL 15 mins)
const recipeCache = new Map<string, { data: ChefChatResponse; expiry: number }>();
const CACHE_TTL_MS = 15 * 60 * 1000;

function cleanKey(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^["']/, "").replace(/["']$/, "").trim();
  return cleaned || null;
}

export function getAvailableKeys(): { key: string; provider: "gemini" | "openai" }[] {
  const keys: { key: string; provider: "gemini" | "openai" }[] = [];

  // Gemini API keys
  if (process.env.GEMINI_API_KEYS) {
    const list = process.env.GEMINI_API_KEYS.split(",").map(cleanKey).filter(Boolean) as string[];
    list.forEach((k) => keys.push({ key: k, provider: "gemini" }));
  }

  for (let i = 1; i <= 5; i++) {
    const k = cleanKey(process.env[`GEMINI_API_KEY_${i}`]);
    if (k && !keys.some((item) => item.key === k)) {
      keys.push({ key: k, provider: "gemini" });
    }
  }

  const defaultGemini = cleanKey(process.env.GEMINI_API_KEY);
  if (defaultGemini && !keys.some((item) => item.key === defaultGemini)) {
    keys.push({ key: defaultGemini, provider: "gemini" });
  }

  // OpenAI API keys
  const defaultOpenAI = cleanKey(process.env.OPENAI_API_KEY);
  if (defaultOpenAI && !keys.some((item) => item.key === defaultOpenAI)) {
    keys.push({ key: defaultOpenAI, provider: "openai" });
  }

  return keys;
}

const SYSTEM_PROMPT = `Bạn là Bếp Trưởng Điều Hành & Chuyên Gia Ẩm Thực MAVY Seafood (thương hiệu hải sản tự nhiên Năm Căn, Cà Mau: Cua gạch Cà Mau, Tôm sú biển IQF, Mực trứng đông lạnh IQF bảo quản chuẩn ≤ -18°C).

PHONG CÁCH TRÒ CHUYỆN (FREESTYLE GEMINI CHAT):
- Hãy trò chuyện tự nhiên, nhiệt tình, ấm áp, hóm hỉnh và chuyên nghiệp như một Master Chef thực thụ đang trực tiếp tư vấn cho khách hàng.
- Định dạng câu trả lời bằng Markdown rõ ràng, bắt mắt (sử dụng emoji 🦀🦐🦑🍳🧂, in đậm **tên bước/nguyên liệu**, gạch đầu dòng, các bước số 1. 2. 3. và đường kẻ ngang ---).

QUY TẮC ĐỊNH LƯỢNG & ẨM THỰC:
- Khi hướng dẫn công thức nấu ăn: BẮT BUỘC định lượng chi tiết theo từng gam (g) hoặc mililit (ml) cho TẤT CẢ các nguyên liệu và từng loại gia vị (ví dụ: Muối biển: 4g (1/2 thìa cà phê), Hạt nêm: 6g (1 thìa cà phê), Đường: 8g, Nước mắm 40 độ đạm: 15ml, Tiêu sọ xay: 2g, Bơ lạt: 30g, Tỏi băm: 20g...). TUYỆT ĐỐI KHÔNG ghi chung chung như "Vừa đủ" hay "Gia vị chuẩn".
- Hướng dẫn chuẩn xác thời gian & nhiệt độ vàng để giữ độ giòn ngọt mọng nước (Tôm sú 3-4 phút lửa lớn, Mực trứng 2-3 phút, Cua hấp 12-15 phút).
- Khi khách hỏi mẹo vặt, so sánh món, cách sơ chế, nhiệt độ bảo quản, hỏi giá: Hãy trả lời trực tiếp, thông minh, đúng trọng tâm và tự nhiên 100%.`;

export async function generateChefRecipe(rawInput: string): Promise<ChefChatResponse> {
  // 1. Sanitize & Check Injection
  const sanitized = sanitizeUserInput(rawInput);
  const normalizedKey = sanitized.toLowerCase();

  // If prompt injection or adversarial prompt detected -> immediately serve deterministic recipe without wasting LLM quota
  if (isAdversarialInput(rawInput)) {
    return generateDynamicRecipe("hải sản tươi sạch MAVY");
  }

  // 2. Check Cache
  const cached = recipeCache.get(normalizedKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  const keys = getAvailableKeys();

  // If no external keys -> use dynamic freestyle synthesizer
  if (keys.length === 0) {
    const fallback = generateDynamicRecipe(sanitized);
    recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
    return fallback;
  }

  // 3. Single Capped Attempt (Strict Budget Cap: Max 1 attempt to avoid burning quotas)
  const targetKey = keys[0];
  try {
    let result: string | null = null;

    if (targetKey.provider === "gemini") {
      result = await callGeminiAPI(targetKey.key, sanitized);
    } else {
      result = await callOpenAIAPI(targetKey.key, sanitized);
    }

    if (result && result.trim().length > 20) {
      const responseData: ChefChatResponse = {
        message: result.trim(),
        suggestedFollowUps: [
          "Bí quyết pha nước chấm hải sản chuẩn Cà Mau?",
          "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C?",
          "Mẹo giữ hải sản giòn ngọt không bị khô khi nấu?",
        ],
      };
      recipeCache.set(normalizedKey, { data: responseData, expiry: Date.now() + CACHE_TTL_MS });
      return responseData;
    }
  } catch (err: any) {
    console.warn("[LLM Execution Warning - Falling back to local engine]:", err?.message || err);
  }

  // 4. Instant Deterministic Fallback Engine
  const fallback = generateDynamicRecipe(sanitized);
  recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
  return fallback;
}

async function callGeminiAPI(apiKey: string, userQuery: string): Promise<string | null> {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: SYSTEM_PROMPT },
                { text: `Khách hàng đang hỏi / có nguyên liệu: "${userQuery}". Hãy trả lời trò chuyện tự nhiên bằng Markdown như Bếp Trưởng MAVY, định lượng chi tiết từng gam cho mọi gia vị.` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7, // Higher creativity & natural conversational flow
            maxOutputTokens: 1500,
          },
        }),
        signal: AbortSignal.timeout(9000), // 9s timeout
      });

      if (!res.ok) continue;

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText && typeof rawText === "string") {
        return rawText;
      }
    } catch {
      // try next model
    }
  }

  return null;
}

async function callOpenAIAPI(apiKey: string, userQuery: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Khách hàng hỏi: "${userQuery}". Hãy trả lời chi tiết bằng Markdown.` },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(9000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (rawContent && typeof rawContent === "string") {
      return rawContent;
    }
  } catch {
    return null;
  }
  return null;
}
