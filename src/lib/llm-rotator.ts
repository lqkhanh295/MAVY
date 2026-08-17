import { z } from "zod";
import { Recipe } from "@/types";
import { generateDynamicRecipe } from "@/lib/recipe-synthesizer";

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

// In-memory response cache (TTL 10 mins)
const recipeCache = new Map<string, { data: StructuredChefResponse; expiry: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

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

Quy tắc ẩm thực cốt lõi:
1. BẮT BUỘC phải tích hợp CHÍNH XÁC các nguyên liệu người dùng nhập trong <user_ingredients></user_ingredients> vào tiêu đề món, bảng nguyên liệu và các bước chế biến.
2. Hướng dẫn nhiệt độ và thời gian nấu chính xác theo từng loại hải sản (Tôm 3-4 phút, Mực 2-3 phút, Cua hấp 12-15 phút).
3. Văn phong súc tích, tinh tế, chuẩn bếp trưởng chuyên nghiệp.

Trả về kết quả ở định dạng JSON duy nhất theo schema sau:
{
  "message": "Phân tích ngắn gọn về sự kết hợp giữa hải sản và các nguyên liệu khách đã nhập",
  "recipes": [
    {
      "id": "slug-ten-mon",
      "title": "Tên món ăn chi tiết (có chứa nguyên liệu người dùng)",
      "category": "cua" | "muc" | "tom" | "combo",
      "prepTime": "15 phút",
      "cookTime": "15 phút",
      "difficulty": "Dễ" | "Trung bình" | "Nâng cao",
      "servings": "2 - 4 người",
      "description": "Mô tả hương vị và điểm đặc sắc khi kết hợp nguyên liệu",
      "flavorProfile": "Đặc trưng hương vị chính",
      "ingredients": [
        { "name": "Tên nguyên liệu", "amount": "Định lượng ước tính", "isMain": true }
      ],
      "steps": [
        "Sơ chế: Cách làm sạch hải sản và sơ chế nguyên liệu người dùng...",
        "Chế biến: Xử lý nhiệt, phi thơm gia vị, nấu sốt và canh thời gian vàng...",
        "Hoàn thiện: Trình bày và thưởng thức nóng..."
      ],
      "chefTips": "Mẹo chuyên sâu giữ độ mọng nước của hải sản khi nấu cùng nguyên liệu này"
    }
  ],
  "suggestedFollowUps": [
    "Câu hỏi gợi ý liên quan 1",
    "Câu hỏi gợi ý liên quan 2"
  ]
}`;

export async function generateChefRecipe(userIngredients: string): Promise<StructuredChefResponse> {
  const normalizedKey = userIngredients.toLowerCase().trim();

  // Check Cache
  const cached = recipeCache.get(normalizedKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  const keys = getAvailableKeys();

  if (keys.length === 0) {
    const fallback = generateDynamicRecipe(userIngredients);
    recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
    return fallback;
  }

  // Attempt maximum 2 keys per request
  const maxAttempts = Math.min(keys.length, 2);

  for (let i = 0; i < maxAttempts; i++) {
    const { key, provider } = keys[i];

    try {
      if (provider === "gemini") {
        const result = await callGeminiAPI(key, userIngredients);
        if (result) {
          recipeCache.set(normalizedKey, { data: result, expiry: Date.now() + CACHE_TTL_MS });
          return result;
        }
      } else {
        const result = await callOpenAIAPI(key, userIngredients);
        if (result) {
          recipeCache.set(normalizedKey, { data: result, expiry: Date.now() + CACHE_TTL_MS });
          return result;
        }
      }
    } catch (err: any) {
      console.warn(`[LLM Key Attempt #${i + 1} Failed]:`, err?.message || err);
    }
  }

  const fallback = generateDynamicRecipe(userIngredients);
  recipeCache.set(normalizedKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
  return fallback;
}

async function callGeminiAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
  const safeUserContent = `<user_ingredients>${ingredients.slice(0, 300)}</user_ingredients>`;

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
                { text: `Nguyên liệu người dùng có trong bếp: ${safeUserContent}. Hãy sáng tạo công thức tối ưu kết hợp chính xác nguyên liệu này với hải sản MAVY theo đúng JSON schema.` },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
          },
        }),
      });

      if (!res.ok) continue;

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
      // thử model tiếp theo
    }
  }

  return null;
}

async function callOpenAIAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  try {
    const safeUserContent = `<user_ingredients>${ingredients.slice(0, 300)}</user_ingredients>`;
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
      }),
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
