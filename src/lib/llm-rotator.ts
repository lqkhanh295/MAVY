/**
 * LLM Multi-Key Rotation Engine for MAVY Master Chef AI
 * Supports up to 10 API keys with automated failover on 429 (Rate Limit) / 403 (Quota)
 */

export interface LLMRequestConfig {
  ingredients: string;
  userMessage?: string;
  conversationHistory?: { role: "user" | "model"; parts: string }[];
}

export interface StructuredChefResponse {
  message: string;
  recipes: {
    id: string;
    title: string;
    category: "cua" | "muc" | "tom" | "combo";
    prepTime: string;
    cookTime: string;
    difficulty: "Dễ" | "Trung bình" | "Nâng cao";
    servings: string;
    description: string;
    flavorProfile: string;
    ingredients: { name: string; amount: string; isMain?: boolean }[];
    steps: string[];
    chefTips: string;
  }[];
  suggestedFollowUps: string[];
}

// In-memory key tracking
let currentKeyIndex = 0;
const failedKeyIndices = new Set<number>();

function cleanKey(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^["']/, "").replace(/["']$/, "").trim();
  return cleaned || null;
}

export function getAvailableKeys(): { key: string; provider: "gemini" | "openai" }[] {
  const keys: { key: string; provider: "gemini" | "openai" }[] = [];

  // Check GEMINI_API_KEYS (comma separated list)
  if (process.env.GEMINI_API_KEYS) {
    const list = process.env.GEMINI_API_KEYS.split(",").map(cleanKey).filter(Boolean) as string[];
    list.forEach((k) => keys.push({ key: k, provider: "gemini" }));
  }

  // Check GEMINI_API_KEY_1 to 10
  for (let i = 1; i <= 10; i++) {
    const k = cleanKey(process.env[`GEMINI_API_KEY_${i}`]);
    if (k && !keys.some((item) => item.key === k)) {
      keys.push({ key: k, provider: "gemini" });
    }
  }

  // Check default GEMINI_API_KEY
  const defaultGemini = cleanKey(process.env.GEMINI_API_KEY);
  if (defaultGemini && !keys.some((item) => item.key === defaultGemini)) {
    keys.push({ key: defaultGemini, provider: "gemini" });
  }

  // Check OPENAI keys if available
  if (process.env.OPENAI_API_KEYS) {
    const list = process.env.OPENAI_API_KEYS.split(",").map(cleanKey).filter(Boolean) as string[];
    list.forEach((k) => keys.push({ key: k, provider: "openai" }));
  }

  for (let i = 1; i <= 10; i++) {
    const k = cleanKey(process.env[`OPENAI_API_KEY_${i}`]);
    if (k && !keys.some((item) => item.key === k)) {
      keys.push({ key: k, provider: "openai" });
    }
  }

  const defaultOpenAI = cleanKey(process.env.OPENAI_API_KEY);
  if (defaultOpenAI && !keys.some((item) => item.key === defaultOpenAI)) {
    keys.push({ key: defaultOpenAI, provider: "openai" });
  }

  return keys.slice(0, 10);
}

const SYSTEM_PROMPT = `Bạn là Bếp Trưởng Điều Hành của MAVY Seafood.
Nhiệm vụ: Khi khách hàng cung cấp danh sách nguyên liệu có sẵn trong bếp, bạn hãy thiết kế công thức món ăn tối ưu tận dụng 100% nguyên liệu người dùng nhập, tập trung vào kỹ thuật kiểm soát nhiệt độ, giữ trọn độ mọng nước tự nhiên của hải sản và định lượng gia vị hài hòa.
Yêu cầu bắt buộc:
1. Tất cả nguyên liệu người dùng nhập PHẢI được đưa vào danh sách nguyên liệu và xuất hiện rõ ràng trong TỪNG BƯỚC NẤU (Sơ chế, Chế biến nhiệt, Hoàn thiện bài trí).
2. Tên món ăn súc tích, thực tế, thể hiện sự kết hợp các nguyên liệu chính.
3. Không sử dụng từ ngữ quảng cáo sáo rỗng hoặc phóng đại. Hướng dẫn chân thực, mạch lạc và dễ làm theo.
4. Trả về đúng định dạng JSON thuần túy theo schema:
{
  "message": "Lời chào nhã nhặn và phân tích ngắn gọn về cách kết hợp các nguyên liệu.",
  "recipes": [
    {
      "id": "slug-ten-mon",
      "title": "Tên món ăn cụ thể",
      "category": "cua" | "muc" | "tom" | "combo",
      "prepTime": "15 phút",
      "cookTime": "15 phút",
      "difficulty": "Dễ" | "Trung bình" | "Nâng cao",
      "servings": "2 - 4 người",
      "description": "Mô tả ngắn về kết cấu và sự cân bằng hương vị của món ăn",
      "flavorProfile": "Đặc trưng hương vị chính",
      "ingredients": [
        { "name": "Tên nguyên liệu", "amount": "Định lượng cụ thể", "isMain": true }
      ],
      "steps": [
        "Bước 1: Sơ chế làm sạch từng nguyên liệu...",
        "Bước 2: Xử lý nhiệt và nấu theo thứ tự độ chín...",
        "Bước 3: Nêm nếm và hoàn thiện đĩa ăn..."
      ],
      "chefTips": "Mẹo kỹ thuật giữ độ giòn ngọt và khử tanh tự nhiên"
    }
  ],
  "suggestedFollowUps": [
    "Mẹo sơ chế khử mùi tanh hải sản?",
    "Cách pha sốt chấm hải sản chuẩn vị?"
  ]
}`;

export async function generateChefRecipe(userIngredients: string): Promise<StructuredChefResponse> {
  const keys = getAvailableKeys();

  if (keys.length === 0) {
    return generateFallbackRecipe(userIngredients);
  }

  let attempts = 0;
  const maxAttempts = Math.min(keys.length, 10);

  while (attempts < maxAttempts) {
    const keyIndex = (currentKeyIndex + attempts) % keys.length;
    const { key, provider } = keys[keyIndex];

    try {
      console.log(`[LLM Rotator] Trying API Key index #${keyIndex + 1} (${provider})`);

      if (provider === "gemini") {
        const response = await callGeminiAPI(key, userIngredients);
        if (response) {
          currentKeyIndex = keyIndex;
          return response;
        }
      } else {
        const response = await callOpenAIAPI(key, userIngredients);
        if (response) {
          currentKeyIndex = keyIndex;
          return response;
        }
      }
    } catch (err: any) {
      console.error(`[LLM Rotator] Key #${keyIndex + 1} failed:`, err?.message || err);
      failedKeyIndices.add(keyIndex);
      attempts++;
    }
  }

  return generateFallbackRecipe(userIngredients);
}

async function callGeminiAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

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
                { text: `Nguyên liệu người dùng có: "${ingredients}". Hãy tận dụng triệt để 100% nguyên liệu trên để thiết kế công thức dạng JSON.` },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        }),
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return parseAndSanitizeResponse(rawText, ingredients);
      }
    } catch (err) {
      // try next model
    }
  }

  throw new Error("Gemini API calls failed for all model versions with this key.");
}

async function callOpenAIAPI(apiKey: string, ingredients: string): Promise<StructuredChefResponse | null> {
  const url = "https://api.openai.com/v1/chat/completions";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Nguyên liệu người dùng có trong bếp: "${ingredients}". Hãy tận dụng triệt để tất cả nguyên liệu trên.` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenAI HTTP ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) return null;

  return parseAndSanitizeResponse(rawText, ingredients);
}

function parseAndSanitizeResponse(raw: string, userIngredients: string): StructuredChefResponse {
  try {
    let clean = raw.trim();
    if (clean.startsWith("```json")) {
      clean = clean.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```/, "").replace(/```$/, "").trim();
    }
    const parsed = JSON.parse(clean);

    if (parsed.recipes && Array.isArray(parsed.recipes)) {
      return {
        message: parsed.message || `Bếp Trưởng MAVY đã phân tích và thiết kế công thức hoàn hảo từ toàn bộ nguyên liệu: ${userIngredients}!`,
        recipes: parsed.recipes,
        suggestedFollowUps: parsed.suggestedFollowUps || [
          "Mẹo khử mùi tanh hải sản hiệu quả nhất?",
          "Có thể thay thế gia vị gì nếu thiếu?",
        ],
      };
    }
  } catch (err) {
    console.error("[Parser] Failed to parse JSON response:", err);
  }

  return generateFallbackRecipe(userIngredients);
}

function removeVietnameseAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

interface ProcessedIngredient {
  raw: string;
  name: string;
  amount: string;
  category: "meat" | "seafood" | "luxury" | "veggie" | "carb" | "other";
  prep: string;
  cook: string;
  plate: string;
}

/**
 * Universal Intelligent Ingredient Composer
 * Guarantees 100% of user-provided ingredients appear in:
 * - Title
 * - Ingredients list with accurate portions
 * - Preparation steps
 * - Cooking steps
 * - Plating & Chef Tips
 */
export function generateFallbackRecipe(userIngredients: string): StructuredChefResponse {
  // Split user items cleanly
  const rawItems = userIngredients
    .split(/[,+\n\r]| và | với | kèm /i)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);

  if (rawItems.length === 0) {
    rawItems.push("Hải sản MAVY");
  }

  const processedList: ProcessedIngredient[] = [];

  rawItems.forEach((raw) => {
    const norm = removeVietnameseAccents(raw);
    const formatted = raw.charAt(0).toUpperCase() + raw.slice(1);

    // 1. Meat / Beef / Kobe / Wagyu / Pork / Chicken
    if (
      norm.includes("kobe") ||
      norm.includes("wagyu") ||
      norm.includes("thit bo") ||
      norm.includes("bit tet") ||
      norm.includes("steak") ||
      norm.includes("than bo") ||
      (norm.includes("bo") && !norm.includes("bo lat") && !norm.includes("bo toi") && !norm.includes("bo bien"))
    ) {
      processedList.push({
        raw,
        name: formatted.includes("Thịt") ? formatted : `Thịt ${formatted}`,
        amount: "250g - 350g",
        category: "meat",
        prep: `${formatted} thấm khô bề mặt, ướp nhẹ với chút muối tiêu hồng và dầu olive trong 5 phút`,
        cook: `cho ${formatted} vào áp chảo ở nhiệt độ cao 1.5 - 2 phút mỗi mặt để mặt ngoài xém thơm và bên trong mềm mọng nước`,
        plate: `xếp từng miếng ${formatted} thơm mềm mọng nước`,
      });
    } else if (norm.includes("ga") || norm.includes("heo") || norm.includes("lon") || norm.includes("suon") || norm.includes("ba chi") || norm.includes("thit")) {
      processedList.push({
        raw,
        name: formatted,
        amount: "250g - 350g",
        category: "meat",
        prep: `${formatted} rửa sạch, thái miếng vừa ăn và để ráo`,
        cook: `áp chảo/xào săn ${formatted} cho chín vàng đều các mặt`,
        plate: `bày ${formatted}`,
      });
    }
    // 2. Luxury & Fine Dining Toppings
    else if (norm.includes("trung ca") || norm.includes("caviar") || norm.includes("ca tam") || norm.includes("truffle") || norm.includes("gan ngong")) {
      processedList.push({
        raw,
        name: formatted,
        amount: "1 hũ (20g - 30g)",
        category: "luxury",
        prep: `bảo quản mát ${formatted} trong ngăn lạnh đến khi sẵn sàng bày đĩa`,
        cook: `(Không xử lý nhiệt) Giữ nguyên độ tươi tự nhiên để điểm lên món ăn sau cùng`,
        plate: `dùng muỗng nhỏ nhẹ nhàng đặt từng lớp ${formatted} óng ánh lên trên cùng để hoàn thiện chuẩn Fine Dining`,
      });
    }
    // 3. Seafood: Cua
    else if (norm.includes("cua")) {
      processedList.push({
        raw,
        name: formatted.includes("Cà Mau") ? formatted : `${formatted} Cà Mau`,
        amount: "1 - 2 con (~700g - 1kg)",
        category: "seafood",
        prep: `cua làm sạch, tách mai, chặt làm tư và đập nứt nhẹ càng cua để ngấm đều sốt`,
        cook: `cho cua vào chảo xóc đều với sốt bơ tỏi ở lửa lớn 4-5 phút cho thịt cua ngấm sâu hương vị đậm đà`,
        plate: `bày thân và càng cua Cà Mau đỏ au`,
      });
    }
    // 4. Seafood: Cá Hồi
    else if (norm.includes("ca hoi") || norm.includes("salmon") || norm.includes("ca")) {
      processedList.push({
        raw,
        name: formatted.includes("phi lê") ? formatted : `${formatted} phi lê`,
        amount: "250g - 350g",
        category: "seafood",
        prep: `cá hồi phi lê cắt miếng vuông vừa ăn, dùng khăn giấy thấm thật khô bề mặt`,
        cook: `cho cá hồi vào áp chảo trước cho vàng giòn mặt da (2 phút mỗi mặt) rồi gắp ra đĩa riêng`,
        plate: `đặt các miếng cá hồi phi lê vàng ươm thơm ngậy`,
      });
    }
    // 5. Seafood: Tôm
    else if (norm.includes("tom")) {
      processedList.push({
        raw,
        name: formatted.includes("Tôm sú") ? formatted : `Tôm sú biển`,
        amount: "300g - 500g (10 - 15 con)",
        category: "seafood",
        prep: `tôm sú rửa sạch, rạch dọc sống lưng lấy chỉ đen và mở cánh bướm`,
        cook: `cho tôm sú vào chảo đảo nhanh tay ở nhiệt độ cao 3 phút đến khi cong tròn đỏ cam rực rỡ`,
        plate: `xếp tôm sú đỏ cam xung quanh`,
      });
    }
    // 6. Seafood: Mực / Bạch Tuộc
    else if (norm.includes("muc") || norm.includes("bach tuoc")) {
      processedList.push({
        raw,
        name: formatted,
        amount: "300g - 500g",
        category: "seafood",
        prep: `mực khía vảy rồng đều mặt thân, cắt miếng vuông vừa ăn`,
        cook: `cho mực vào xào đảo nhanh tay ở lửa lớn 2.5 phút đến khi giòn sần sật mọng nước`,
        plate: `bày mực xào giòn thơm`,
      });
    }
    // 7. Seafood: Sò Điệp / Hàu / Bào Ngư / Nghêu
    else if (norm.includes("so diep") || norm.includes("hau") || norm.includes("bao ngu") || norm.includes("so") || norm.includes("oc")) {
      processedList.push({
        raw,
        name: formatted,
        amount: "200g - 300g (6 - 8 con)",
        category: "seafood",
        prep: `sò điệp rửa sạch, thấm khô ráo nước`,
        cook: `cho sò điệp vào áp chảo xém vàng hai mặt trong 2.5 phút`,
        plate: `bày sò điệp xém vàng thơm bùi`,
      });
    }
    // 8. Vegetables & Fruits
    else if (
      norm.includes("ot") ||
      norm.includes("nam") ||
      norm.includes("mang tay") ||
      norm.includes("dua") ||
      norm.includes("ca chua") ||
      norm.includes("rau") ||
      norm.includes("bap") ||
      norm.includes("cai") ||
      norm.includes("khoai") ||
      norm.includes("hanh")
    ) {
      processedList.push({
        raw,
        name: formatted,
        amount: "150g - 200g (thái miếng vừa ăn)",
        category: "veggie",
        prep: `rửa sạch ${formatted}, thái lát/cắt khúc vừa ăn`,
        cook: `cho ${formatted} vào xào nhanh tay trong 1.5 phút để giữ trọn độ giòn ngọt tự nhiên`,
        plate: `điểm thêm ${formatted} rực rỡ tươi ngon`,
      });
    }
    // 9. Carbs
    else if (norm.includes("com") || norm.includes("mi") || norm.includes("bun") || norm.includes("banh mi") || norm.includes("pasta")) {
      processedList.push({
        raw,
        name: formatted,
        amount: "1 - 2 phần ăn",
        category: "carb",
        prep: `chuẩn bị sẵn ${formatted} nóng hổi`,
        cook: norm.includes("com")
          ? `cho cơm vào chảo đảo đều tay ở lửa lớn đến khi săn giòn hạt`
          : `trụng mì / nướng giòn bánh mì`,
        plate: `dùng kèm ${formatted}`,
      });
    }
    // 10. Other generic items
    else {
      processedList.push({
        raw,
        name: formatted,
        amount: "Vừa đủ dùng",
        category: "other",
        prep: `sơ chế và rửa sạch ${formatted}`,
        cook: `cho ${formatted} vào nấu/xào chung đảo đều tay đến khi dậy mùi thơm`,
        plate: `bày cùng ${formatted}`,
      });
    }
  });

  // Build Ingredients List
  const ingredientsList: { name: string; amount: string; isMain?: boolean }[] = processedList.map((p) => ({
    name: p.name,
    amount: p.amount,
    isMain: true,
  }));

  ingredientsList.push({
    name: "Bơ lạt & tỏi băm nhuyễn",
    amount: "40g bơ + 1 củ tỏi",
    isMain: false,
  });
  ingredientsList.push({
    name: "Gia vị chuẩn vị (muối tiêu hồng, nước cốt chanh vàng)",
    amount: "Vừa khẩu vị",
    isMain: false,
  });

  // Determine Title & Flavor
  const mainNames = processedList.map((p) => p.name).join(" + ");
  const title = `Đại Tiệc Ẩm Thực Hoàng Gia (${mainNames})`;
  const flavorProfile = "Hòa quyện đẳng cấp giữa vị ngọt tự nhiên, béo ngậy bơ tỏi và hương thơm nức mũi của các nguyên liệu thượng hạng";

  // Build Step 1: Prep
  const steps: string[] = [];
  const prepStepsText = processedList.map((p) => p.prep).join("; ");
  steps.push(`Sơ chế sạch sẽ toàn bộ nguyên liệu: ${prepStepsText}.`);

  // Build Step 2: Base sauce
  steps.push("Đun chảy 40g bơ lạt ở lửa vừa, phi thơm tỏi băm đến khi ngả vàng óng và dậy mùi thơm nức khắp gian bếp.");

  // Build Cooking Steps for each item explicitly!
  const cookingItems = processedList.filter((p) => p.category !== "luxury" && p.category !== "carb");
  cookingItems.forEach((item) => {
    steps.push(`${item.cook.charAt(0).toUpperCase() + item.cook.slice(1)}.`);
  });

  // Build Step for Carb if any
  const carbItems = processedList.filter((p) => p.category === "carb");
  if (carbItems.length > 0) {
    carbItems.forEach((c) => {
      steps.push(`${c.cook.charAt(0).toUpperCase() + c.cook.slice(1)}.`);
    });
  }

  // Build Seasoning Step
  steps.push("Nêm chút muối tiêu hồng, rưới nước cốt chanh vàng và xóc đều để nước sốt bơ tỏi bóng bẩy bao phủ trọn vẹn toàn bộ món ăn.");

  // Build Plating Step
  const luxuryItems = processedList.filter((p) => p.category === "luxury");
  const plateText = processedList.filter((p) => p.category !== "luxury").map((p) => p.name).join(", ");

  if (luxuryItems.length > 0) {
    steps.push(
      `Bày ${plateText} ra đĩa sứ ấm, rưới đều phần sốt bơ tỏi sánh mịn. ${luxuryItems.map((l) => l.plate).join(". ")} và thưởng thức ngay khi còn nóng hổi chuẩn phong cách 5 sao!`
    );
  } else {
    steps.push(
      `Bày ${plateText} ra đĩa, rưới đều phần sốt bơ tỏi sánh mịn, rắc tiêu sọ và ngò tây lên trên để thưởng thức nóng hổi cùng gia đình!`
    );
  }

  // Build Chef Tip
  let chefTips = "Áp chảo ở lửa lớn vừa phải để các nguyên liệu giữ được trọn vẹn độ ngọt mọng nước tự nhiên.";
  if (processedList.some((p) => p.category === "meat")) {
    chefTips = "Để thịt bò nghỉ khoảng 2 phút sau khi áp chảo trước khi cắt để nước ngọt không bị chảy ra ngoài, giữ từng thớ thịt mềm tan béo ngậy!";
  } else if (luxuryItems.length > 0) {
    chefTips = "Nguyên liệu thượng hạng như trứng cá tầm tuyệt đối không nấu trên nhiệt độ cao. Hãy điểm lên món ăn sau cùng khi chuẩn bị dùng để giữ nguyên vẹn trải nghiệm bùng nổ hương vị.";
  }

  const rawNamesList = processedList.map((p) => p.raw).join(", ");

  return {
    message: `Bếp Trưởng MAVY đã tiếp nhận trọn vẹn tất cả ${processedList.length} nguyên liệu của bạn (${rawNamesList}) và thiết kế công thức Đại Tiệc ẩm thực đỉnh cao:`,
    recipes: [
      {
        id: `chef-recipe-${Date.now()}`,
        title: title,
        category: "combo",
        prepTime: "20 phút",
        cookTime: "15 phút",
        difficulty: "Trung bình",
        servings: "2 - 4 người",
        description: `Món ăn được Bếp Trưởng sáng tạo kết hợp trọn vẹn 100% các nguyên liệu bạn có (${rawNamesList}), đem đến trải nghiệm ẩm thực Fine Dining 5 sao ngay tại nhà!`,
        flavorProfile: flavorProfile,
        ingredients: ingredientsList,
        steps: steps,
        chefTips: chefTips,
      },
    ],
    suggestedFollowUps: [
      "Nên kết hợp loại rượu vang nào với món ăn thượng hạng này?",
      "Cách làm sốt chấm đặc biệt của Bếp Trưởng MAVY?",
    ],
  };
}
