import { Recipe } from "@/types";

export interface StructuredChefResponse {
  message: string;
  recipes: Recipe[];
  suggestedFollowUps: string[];
}

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

  for (let i = 1; i <= 10; i++) {
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

const SYSTEM_PROMPT = `Bạn là Bếp Trưởng Điều Hành của MAVY Seafood.
Nhiệm vụ: Khi khách hàng cung cấp danh sách nguyên liệu, hãy thiết kế công thức nấu ăn ngon, hợp lý và tối ưu việc giữ độ tươi ngọt tự nhiên của hải sản.

Quy tắc chuyên môn:
1. Phân loại và kết hợp nguyên liệu theo logic ẩm thực thực tế (nguyên liệu chính, rau củ ăn kèm, sốt bơ tỏi gia vị).
2. Hướng dẫn nhiệt độ và thời gian nấu chính xác (tránh nấu quá lửa làm khô bở thịt).
3. Văn phong điềm đạm, chuyên nghiệp, không dùng từ ngữ quảng cáo cường điệu.

Trả về kết quả ở định dạng JSON duy nhất theo schema sau:
{
  "message": "Lời chào nhã nhặn và phân tích ngắn về cách kết hợp nguyên liệu",
  "recipes": [
    {
      "id": "slug-ten-mon",
      "title": "Tên món ăn cụ thể",
      "category": "cua" | "muc" | "tom" | "combo",
      "prepTime": "15 phút",
      "cookTime": "15 phút",
      "difficulty": "Dễ" | "Trung bình" | "Nâng cao",
      "servings": "2 - 4 người",
      "description": "Mô tả hương vị và kết cấu món ăn",
      "flavorProfile": "Đặc trưng hương vị chính",
      "ingredients": [
        { "name": "Tên nguyên liệu", "amount": "Định lượng ước tính", "isMain": true }
      ],
      "steps": [
        "Sơ chế: Cách làm sạch và khử tanh...",
        "Chế biến: Xử lý nhiệt và thời gian nấu...",
        "Hoàn thiện: Nêm nếm và bày đĩa..."
      ],
      "chefTips": "Mẹo kỹ thuật giữ độ mọng nước và độ giòn"
    }
  ],
  "suggestedFollowUps": [
    "Câu hỏi gợi ý liên quan 1",
    "Câu hỏi gợi ý liên quan 2"
  ]
}`;

export async function generateChefRecipe(userIngredients: string): Promise<StructuredChefResponse> {
  const keys = getAvailableKeys();

  if (keys.length === 0) {
    return generateFallbackRecipe(userIngredients);
  }

  for (let i = 0; i < keys.length; i++) {
    const { key, provider } = keys[i];

    try {
      if (provider === "gemini") {
        const result = await callGeminiAPI(key, userIngredients);
        if (result) return result;
      } else {
        const result = await callOpenAIAPI(key, userIngredients);
        if (result) return result;
      }
    } catch (err: any) {
      console.warn(`[LLM Key #${i + 1} Failed]:`, err?.message || err);
    }
  }

  return generateFallbackRecipe(userIngredients);
}

async function callGeminiAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
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
                { text: `Danh sách nguyên liệu của khách: "${ingredients}". Hãy tạo công thức món ngon phù hợp dạng JSON.` },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.6,
          },
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return JSON.parse(rawText) as StructuredChefResponse;
      }
    } catch {
      // thử model tiếp theo
    }
  }

  return null;
}

async function callOpenAIAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
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
          { role: "user", content: `Danh sách nguyên liệu: "${ingredients}". Tạo công thức JSON.` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (rawContent) {
      return JSON.parse(rawContent) as StructuredChefResponse;
    }
  } catch {
    return null;
  }
  return null;
}

function generateFallbackRecipe(ingredients: string): StructuredChefResponse {
  const cleanInput = ingredients.slice(0, 40);

  return {
    message: `Bếp Trưởng MAVY gợi ý công thức chế biến tối ưu từ nguyên liệu "${cleanInput}":`,
    recipes: [
      {
        id: `recipe-${Date.now()}`,
        title: `Món Ngon Áp Chảo Bơ Tỏi Từ ${cleanInput}`,
        category: "combo",
        prepTime: "15 phút",
        cookTime: "15 phút",
        difficulty: "Dễ",
        servings: "2 - 3 người",
        description: "Phương pháp áp chảo bơ tỏi lửa lớn giúp hải sản và các nguyên liệu giữ trọn độ mọng nước tự nhiên.",
        flavorProfile: "Thơm dịu bơ tỏi, vị ngọt thanh tự nhiên và tiêu xay thơm nồng.",
        ingredients: [
          { name: cleanInput, amount: "Lượng sẵn có", isMain: true },
          { name: "Bơ lạt & Tỏi băm", amount: "30g bơ + 1 củ tỏi", isMain: false },
          { name: "Gia vị (muối biển, tiêu xay, chanh tươi)", amount: "Vừa khẩu vị", isMain: false },
        ],
        steps: [
          "Sơ chế: Rửa sạch các nguyên liệu, dùng khăn sạch thấm thật khô ráo bề mặt để khi nấu không bị bắn dầu và giữ được độ giòn.",
          "Chế biến: Làm nóng chảo với chút dầu ăn, phi thơm tỏi băm đến khi ngả vàng óng rồi cho nguyên liệu vào đảo đều ở lửa lớn.",
          "Hoàn thiện: Thêm bơ lạt vào đảo nhanh tay trong 1-2 phút cuối, nêm chút muối tiêu và vắt vài giọt nước cốt chanh trước khi tắt bếp.",
        ],
        chefTips: "Kiểm soát nhiệt độ lớn và không nấu quá lâu để thịt giữ được độ ngọt mọng nước tự nhiên.",
      },
    ],
    suggestedFollowUps: [
      "Mẹo khử mùi tanh hải sản hiệu quả?",
      "Cách làm sốt chấm muối ớt chanh ngon?",
    ],
  };
}
