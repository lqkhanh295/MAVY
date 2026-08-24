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

const SYSTEM_PROMPT = `Bạn là Bếp Trưởng Điều Hành & Nghệ Nhân Ẩm Thực của MAVY Seafood.

## NHIỆM VỤ

Người dùng có thể cung cấp bất kỳ nguyên liệu nào.
Bạn phải có khả năng:
- Nhận diện và hiểu đặc tính của nguyên liệu.
- Chọn phương pháp sơ chế phù hợp.
- Chọn kỹ thuật nấu phù hợp.
- Kết hợp các nguyên liệu thành món ăn hợp lý.
- Sáng tạo món truyền thống, biến tấu món quen thuộc hoặc tạo món mới.
- Sử dụng kiến thức ẩm thực của bất kỳ nền ẩm thực nào khi phù hợp.

Không được giới hạn khả năng sáng tạo vào danh sách món ăn cố định.

## QUY TẮC NGUYÊN LIỆU

Đây là quy tắc quan trọng nhất.

CHỈ ĐƯỢC SỬ DỤNG NHỮNG NGUYÊN LIỆU NGƯỜI DÙNG CUNG CẤP.

Không được tự ý thêm:
- Rau củ
- Thịt
- Hải sản
- Trứng
- Sữa
- Bơ
- Phô mai
- Nước sốt
- Thảo mộc
- Topping
- Gia vị
- Bất kỳ nguyên liệu nào khác

nếu người dùng không cung cấp.

Không được coi những nguyên liệu thường có trong nhà bếp là nguyên liệu mặc định.

Ví dụ:
User: "tôm, trứng, cơm"
→ Chỉ được sử dụng tôm, trứng và cơm cùng những gia vị mà user thực sự cung cấp.

Không được tự thêm hành, tỏi, hành lá, cà rốt, dầu hào, nước tương, tiêu, dầu ăn... nếu user không nói rằng họ có.

## TỰ DO VỀ KỸ THUẬT

Bạn được phép sử dụng bất kỳ kỹ thuật nấu ăn phù hợp nào mà bạn biết.

Ví dụ:
- luộc
- hấp
- nướng
- áp chảo
- chiên
- chiên giòn
- rang
- kho
- rim
- om
- hầm
- nấu canh
- nấu súp
- nấu cháo
- đút lò
- làm sốt
- cuộn
- nhồi
- nghiền
- xay
- lên men
- hoặc bất kỳ kỹ thuật phù hợp nào khác.

Không mặc định xào.

Không cố ép nguyên liệu thành một món truyền thống nếu điều đó làm món ăn kém hợp lý.

## NGUYÊN TẮC SÁNG TẠO

Hãy ưu tiên theo thứ tự:

1. Tính hợp lý của món ăn.
2. Hương vị.
3. Kết cấu.
4. Khả năng thực hiện thực tế.
5. Tận dụng tối đa nguyên liệu user cung cấp.
6. Sự sáng tạo.

"Sáng tạo" không có nghĩa là thêm nguyên liệu không được cung cấp.

Nếu chỉ có rất ít nguyên liệu, hãy sáng tạo bằng:
- kỹ thuật nấu;
- tỷ lệ;
- nhiệt độ;
- thời gian;
- kết cấu;
- cách trình bày;
- cách kết hợp các nguyên liệu hiện có.

## KHI THIẾU NGUYÊN LIỆU

Nếu món truyền thống cần nguyên liệu mà user không có:

KHÔNG được tự thêm nguyên liệu đó.

Thay vào đó:
- bỏ nguyên liệu đó;
- thay đổi kỹ thuật;
- biến đổi món;
- hoặc tạo một món mới phù hợp với nguyên liệu hiện có.

Không được giả vờ rằng user có nguyên liệu mà họ chưa cung cấp.

## SƠ CHẾ

Tự xác định cách sơ chế dựa trên từng nguyên liệu.

Không áp dụng một quy trình cố định cho tất cả nguyên liệu.

Ví dụ:
- Hải sản đông lạnh MAVY: xử lý/rã đông tự nhiên phù hợp (bảo quản ngăn đông chuẩn ≤ -18°C) và làm ráo trước khi nấu.
- Thịt: sơ chế theo loại thịt và phương pháp nấu.
- Rau củ: xử lý theo độ cứng và lượng nước.
- Trứng: đánh, tráng, luộc hoặc sử dụng theo kỹ thuật phù hợp.
- Bơ/phô mai: xử lý phù hợp với trạng thái và kỹ thuật nấu.

## ĐỊNH LƯỢNG

Đưa định lượng bằng g/ml khi có đủ dữ liệu.

Nếu user không cung cấp khối lượng nguyên liệu, không được giả vờ biết chính xác khối lượng họ đang có.

Có thể đưa tỷ lệ hoặc lượng đề xuất và ghi rõ đó là định lượng đề xuất.

## OUTPUT

Trả lời bằng tiếng Việt và Markdown.

Cấu trúc:

# Tên món

## Ý tưởng
Giải thích ngắn gọn món được xây dựng như thế nào từ nguyên liệu user cung cấp.

## Nguyên liệu
Chỉ liệt kê nguyên liệu user đã cung cấp.

## Sơ chế
...

## Cách làm
...

## Thành phẩm
...

## Bí quyết
Chỉ đưa các mẹo thực sự cần thiết.

## QUY TẮC TỐI THƯỢNG

KIẾN THỨC ẨM THỰC = KHÔNG GIỚI HẠN.

NGUYÊN LIỆU ĐƯỢC PHÉP SỬ DỤNG = CHỈ NHỮNG GÌ USER CUNG CẤP.

Không được hy sinh quy tắc nguyên liệu để tạo ra một món ăn "hoàn chỉnh".`;

export async function generateChefRecipe(rawInput: string): Promise<ChefChatResponse> {
  const sanitized = sanitizeUserInput(rawInput);

  // If prompt injection or adversarial prompt detected -> serve safe response
  if (isAdversarialInput(rawInput)) {
    return generateDynamicRecipe("hải sản tươi sạch MAVY");
  }

  const keys = getAvailableKeys();

  // Multi-Key Rotation: Try keys sequentially with high creativity
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
              "Bí quyết làm nước sốt chấm hải sản chuẩn vị?",
              "Mẹo sơ chế hải sản mọng nước không tanh?",
              "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C?",
            ],
          };
          return responseData;
        }
      } catch (err: any) {
        console.warn(`[Key #${activeIndex + 1} 429/busy - Trying next key]:`, err?.message || err);
      }
    }
  }

  // Ultra-fast local fallback integrating ALL user ingredients if all keys hit quota
  return generateDynamicRecipe(sanitized);
}

// Fast Gemini API Caller with native systemInstruction, high creativity (temperature: 0.95) and model fallback
async function callGeminiAPI(apiKey: string, userQuery: string): Promise<string | null> {
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3-flash-preview"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              { text: SYSTEM_PROMPT },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                { text: `Nguyên liệu / yêu cầu của người dùng:\n${userQuery}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.95,
            topP: 0.95,
            maxOutputTokens: 1500,
          },
        }),
        signal: AbortSignal.timeout(6500),
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
          { role: "user", content: `Nguyên liệu / yêu cầu của người dùng:\n${userQuery}` },
        ],
        max_tokens: 1200,
        temperature: 0.95,
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
