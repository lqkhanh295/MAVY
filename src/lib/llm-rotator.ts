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

// In-memory response cache (TTL 30s for quick caching but fresh responses)
const recipeCache = new Map<string, { data: ChefChatResponse; expiry: number }>();
const CACHE_TTL_MS = 30 * 1000;

function cleanKey(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^["']/, "").replace(/["']$/, "").trim();
  return cleaned || null;
}

// Global round-robin pointer for smooth load balancing across 10 keys
let currentKeyIndex = 0;

export function getAvailableKeys(): { key: string; provider: "gemini" | "openai" }[] {
  const keys: { key: string; provider: "gemini" | "openai" }[] = [];
  const seenKeys = new Set<string>();

  // Gemini API keys from comma-separated list
  if (process.env.GEMINI_API_KEYS) {
    const list = process.env.GEMINI_API_KEYS.split(",").map(cleanKey).filter(Boolean) as string[];
    list.forEach((k) => {
      if (!seenKeys.has(k)) {
        seenKeys.add(k);
        keys.push({ key: k, provider: "gemini" });
      }
    });
  }

  // Gemini API keys from individual env vars
  for (let i = 1; i <= 20; i++) {
    const k = cleanKey(process.env[`GEMINI_API_KEY_${i}`]);
    if (k && !seenKeys.has(k)) {
      seenKeys.add(k);
      keys.push({ key: k, provider: "gemini" });
    }
  }

  const defaultGemini = cleanKey(process.env.GEMINI_API_KEY);
  if (defaultGemini && !seenKeys.has(defaultGemini)) {
    seenKeys.add(defaultGemini);
    keys.push({ key: defaultGemini, provider: "gemini" });
  }

  // OpenAI API keys
  const defaultOpenAI = cleanKey(process.env.OPENAI_API_KEY);
  if (defaultOpenAI && !seenKeys.has(defaultOpenAI)) {
    seenKeys.add(defaultOpenAI);
    keys.push({ key: defaultOpenAI, provider: "openai" });
  }

  return keys;
}

const SYSTEM_PROMPT = `Bạn là Bếp Trưởng Điều Hành & Chuyên Gia Ẩm Thực của MAVY Seafood (hải sản tự nhiên Năm Căn, Cà Mau: Cua gạch, Tôm sú, Mực trứng bảo quản ≤ -18°C).

QUY TẮC CỐT LÕI VỀ TÍNH ĐA DẠNG ẨM THỰC:
1. TUYỆT ĐỐI KHÔNG ĐƯỢC CHỈ LÀM MÓN XÀO. Hãy sáng tạo kỹ thuật chế biến phù hợp nhất với nguyên liệu:
   - Có trứng gà/vịt -> làm Chả trứng đúc hải sản, Trứng cuộn hải sản, hoặc Mực/Tôm lăn trứng chiên xù giòn rụm.
   - Có bơ/tỏi/phô mai -> làm Hải sản sốt bơ tỏi, Nướng bơ tỏi, hoặc Đút lò phô mai.
   - Có gừng/sả/lá chanh/hành hoa -> làm Hấp gừng sả, Hấp bia, hoặc Hấp nước dừa giữ trọn vị ngọt tự nhiên.
   - Có me/ớt/đường/tiêu -> làm Rim sốt me chua ngọt, Nướng muối ớt cay nồng, hoặc Kho tiêu đậm đà.
   - Có dứa/cà chua/dọc mùng -> làm Canh chua hải sản, Lẩu chua cay, hoặc Nấu riêu.
   - Chỉ làm món xào khi nguyên liệu là các loại rau củ xào chuyên dụng (ớt chuông, cần tây, bông cải...).
2. SƠ CHẾ THỰC TẾ & CHUẨN XÁC:
   - Trứng gà/vịt: Đập ra bát dùng đũa đánh tan (tuyệt đối KHÔNG hướng dẫn cắt khúc trứng).
   - Bơ/phô mai: Đun chảy hoặc bào sợi.
   - Hải sản: Rã đông tự nhiên, rửa sạch khử tanh, thấm khô.
3. CHỈ DÙNG ĐÚNG NGUYÊN LIỆU NGƯỜI DÙNG NHẬP + Hải sản MAVY + Gia vị cơ bản trong bếp (không tự ý thêm rau củ lạ).
4. TÊN GIA VỊ GỌI ĐƠN GIẢN: "Nước mắm: 15ml", "Tiêu: 2g", "Muối: 4g", "Hạt nêm: 6g", "Đường: 8g", "Dầu ăn: 20ml", "Tỏi & hành băm: 20g"...
5. Định lượng chi tiết từng gam (g/ml) cho khẩu phần 2 - 4 người.`;

export async function generateChefRecipe(rawInput: string): Promise<ChefChatResponse> {
  const sanitized = sanitizeUserInput(rawInput);
  const normalizedKey = sanitized.toLowerCase();

  // If prompt injection or adversarial prompt detected -> serve safe response
  if (isAdversarialInput(rawInput)) {
    return generateDynamicRecipe("hải sản tươi sạch MAVY");
  }

  // 1. Check Cache (Instant response for identical questions)
  const cached = recipeCache.get(normalizedKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  const keys = getAvailableKeys();

  // 2. Multi-Key Rotation: Try keys sequentially until finding an active one
  if (keys.length > 0) {
    const totalKeys = keys.length;
    const startIndex = currentKeyIndex % totalKeys;
    currentKeyIndex = (currentKeyIndex + 1) % totalKeys;

    for (let attempt = 0; attempt < totalKeys; attempt++) {
      const activeIndex = (startIndex + attempt) % totalKeys;
      const { key, provider } = keys[activeIndex];

      try {
        let result: string | null = null;
        if (provider === "gemini") {
          result = await callGeminiAPI(key, sanitized);
        } else {
          result = await callOpenAIAPI(key, sanitized);
        }

        if (result && result.trim().length > 20) {
          const responseData: ChefChatResponse = {
            message: result.trim(),
            suggestedFollowUps: [
              "Hỏi thêm về cách nêm nếm gia vị chuẩn",
              "Bí quyết xào hải sản lửa lớn không ra nước",
              "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C",
            ],
          };
          recipeCache.set(normalizedKey, { data: responseData, expiry: Date.now() + CACHE_TTL_MS });
          return responseData;
        }
      } catch (err: any) {
        console.warn(`[Key #${activeIndex + 1} 429/busy - Trying next key]:`, err?.message || err);
      }
    }
  }

  // 3. Ultra-fast local fallback integrating ALL user ingredients if all keys hit quota
  const fallback = generateDynamicRecipe(sanitized);
  recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
  return fallback;
}

// Fast Gemini API Caller with 4.5s timeout and model fallback
async function callGeminiAPI(apiKey: string, userQuery: string): Promise<string | null> {
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3-flash-preview"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `${SYSTEM_PROMPT}\n\nNgười dùng yêu cầu / hỏi: "${userQuery}". Hãy trả lời trực tiếp, thông minh, đúng trọng tâm và tự nhiên bằng Markdown.` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
        signal: AbortSignal.timeout(4500),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText && typeof rawText === "string" && rawText.trim().length > 10) {
        return rawText.trim();
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
          { role: "user", content: `Khách hàng có các nguyên liệu: "${userQuery}". Hãy sáng tạo món ăn kết hợp đầy đủ tất cả nguyên liệu này.` },
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(4000),
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
