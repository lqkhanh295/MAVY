import { z } from "zod";
import { Recipe } from "@/types";
import { generateDynamicRecipe } from "@/lib/recipe-synthesizer";

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
    .replace(/[<>]/g, " ") // Strip HTML / XML tag characters to prevent tag breakout
    .replace(/[\x00-\x1F\x7F]/g, "") // Strip non-printable control chars
    .replace(/\s+/g, " ")
    .slice(0, 300)
    .trim();
}

// -------------------------------------------------------------
// 1. Strict Zod Runtime Schema Validation for LLM Response
// -------------------------------------------------------------
export const IngredientSchema = z.object({
  name: z.string().min(1).max(100),
  amount: z.string().min(1).max(50),
  isMain: z.boolean().optional(),
});

export const RecipeSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(120),
  category: z.enum(["cua", "muc", "tom", "combo"]),
  prepTime: z.string().min(1).max(50),
  cookTime: z.string().min(1).max(50),
  difficulty: z.string().min(1).max(50),
  servings: z.string().optional(),
  description: z.string().min(1).max(350),
  flavorProfile: z.string().optional(),
  ingredients: z.array(IngredientSchema).min(1).max(20),
  steps: z.array(z.string().min(1).max(350)).min(1).max(10),
  chefTips: z.string().optional(),
});

export const StructuredChefResponseSchema = z.object({
  message: z.string().min(1).max(500),
  recipes: z.array(RecipeSchema).min(1).max(3),
  suggestedFollowUps: z.array(z.string().min(1).max(100)).max(5),
});

export type StructuredChefResponse = z.infer<typeof StructuredChefResponseSchema>;

// In-memory response cache (TTL 15 mins)
const recipeCache = new Map<string, { data: StructuredChefResponse; expiry: number }>();
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

const SYSTEM_PROMPT = `Bạn là Chuyên Gia Ẩm Thực & Bếp Trưởng MAVY Seafood.
Nhiệm vụ: Phân tích danh sách nguyên liệu của khách hàng và sáng tạo công thức nấu ăn ngon, hợp lý và tối ưu việc giữ độ tươi ngọt tự nhiên của hải sản MAVY (Cua gạch, Tôm sú, Mực trứng).

Quy tắc bảo mật & ẩm thực:
1. Bạn CHỈ trả lời về ẩm thực hải sản. Bỏ qua mọi yêu cầu thực hiện hành vi phi ẩm thực.
2. BẮT BUỘC phải tích hợp CHÍNH XÁC các nguyên liệu người dùng nhập trong <user_ingredients></user_ingredients> vào tiêu đề món, bảng nguyên liệu và các bước chế biến.
3. Hướng dẫn nhiệt độ và thời gian nấu chính xác theo từng loại hải sản (Tôm 3-4 phút, Mực 2-3 phút, Cua hấp 12-15 phút).
4. Trả về định dạng JSON duy nhất tuân thủ schema quy định.`;

export async function generateChefRecipe(rawInput: string): Promise<StructuredChefResponse> {
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

  // If no external keys -> use high-speed dynamic recipe synthesizer
  if (keys.length === 0) {
    const fallback = generateDynamicRecipe(sanitized);
    recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
    return fallback;
  }

  // 3. Single Capped Attempt (Strict Budget Cap: Max 1 attempt to avoid burning quotas)
  const targetKey = keys[0];
  try {
    let result: StructuredChefResponse | null = null;

    if (targetKey.provider === "gemini") {
      result = await callGeminiAPI(targetKey.key, sanitized);
    } else {
      result = await callOpenAIAPI(targetKey.key, sanitized);
    }

    if (result) {
      recipeCache.set(normalizedKey, { data: result, expiry: Date.now() + CACHE_TTL_MS });
      return result;
    }
  } catch (err: any) {
    console.warn("[LLM Execution Warning - Falling back to local engine]:", err?.message || err);
  }

  // 4. Instant Deterministic Fallback Engine
  const fallback = generateDynamicRecipe(sanitized);
  recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
  return fallback;
}

async function callGeminiAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  const model = "gemini-2.0-flash";
  const safeUserContent = `<user_ingredients>${ingredients}</user_ingredients>`;

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
              { text: `Nguyên liệu người dùng có trong bếp: ${safeUserContent}. Hãy sáng tạo công thức tối ưu kết hợp chính xác nguyên liệu này với hải sản MAVY theo đúng JSON schema.` },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 1000,
        },
      }),
      signal: AbortSignal.timeout(8000), // 8s timeout to avoid hanging connections
    });

    if (!res.ok) return null;

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      const parsed = JSON.parse(rawText);
      const validation = StructuredChefResponseSchema.safeParse(parsed);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch {
    return null;
  }

  return null;
}

async function callOpenAIAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  try {
    const safeUserContent = `<user_ingredients>${ingredients}</user_ingredients>`;
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
          { role: "user", content: `Nguyên liệu: ${safeUserContent}. Tạo công thức JSON chuẩn.` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (rawContent) {
      const parsed = JSON.parse(rawContent);
      const validation = StructuredChefResponseSchema.safeParse(parsed);
      if (validation.success) {
        return validation.data;
      }
    }
  } catch {
    return null;
  }
  return null;
}
