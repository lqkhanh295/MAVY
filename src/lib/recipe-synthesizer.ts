export interface FreestyleChefResponse {
  message: string;
  suggestedFollowUps: string[];
}

// Danh sách các từ khóa nhận diện hải sản chính
const SEAFOOD_REGEX = /(?:^|\s+)(cua\s+gạch|cua\s+gach|cua|tôm\s+sú|tom\s+su|tôm|tom|mực\s+trứng|muc\s+trung|mực|muc|hải\s+sản|hai\s+san)(?:\s+|$)/i;

// Từ dừng hành động / câu lệnh
const STOP_WORDS_REGEX = /^(làm|nấu|chế biến|hướng dẫn|chỉ|cách|đi|nhé|nha|ạ|ơi|cho|tôi|tui|mình|muốn|ăn|món|hôm nay)$/i;

export function generateDynamicRecipe(rawInput: string): FreestyleChefResponse {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 0. Xử lý các câu hỏi Lẩu
  if (lower.includes("lẩu") || lower.includes("lau")) {
    return {
      message: `Chào bạn! Tôi là **Bếp Trưởng Điều Hành MAVY Seafood**. Để thưởng thức trọn vẹn hải sản tươi ngon, món **Lẩu Hải Sản Chua Cay MAVY Chuẩn Vị Nhà Hàng** là sự lựa chọn số 1 cho gia đình bạn:

---

### 📋 1. Chuẩn Bị Nguyên Liệu (Khẩu phần 4 người)

* **Hải sản chính MAVY**: 
  * Tôm sú biển MAVY: \`400g\`
  * Mực trứng MAVY: \`300g\`
  * Cua gạch Năm Căn (tùy chọn): \`1 - 2 con\`
* **Nguyên liệu nấu nước dùng chua thanh**:
  * Xương ống heo/gà hầm lấy nước dùng: \`1.5 lít\`
  * Dứa (thơm): \`1/2 quả (150g)\` cắt lát
  * Cà chua chín: \`2 quả (150g)\` bổ múi cau
  * Sả cây đập dập: \`4 cây\` & Riềng thái lát: \`20g\`
  * Nước cốt tắc (quất) hoặc cốt me: \`30ml\`
  * Sa tế tôm thượng hạng: \`2 muỗng canh (30g)\`
* **Gia vị nêm nước lẩu**: \`15g đường phèn, 10g hạt nêm, 20ml nước mắm, 4g muối\`.
* **Rau & Nấm ăn kèm**: Nấm kim châm, cải thảo, rau muống cọng, bún tươi/mì.

---

### 🍳 2. Các Bước Nấu Nước Lẩu Chuẩn Vị Bếp Trưởng

1. **Nấu nước dùng thanh ngọt**: Hầm xương lấy 1.5 lít nước dùng trong vắt.
2. **Phi thơm hương vị nền**: Phi thơm 20g tỏi, sả đập dập, riềng và sa tế với 20ml dầu ăn. Cho cà chua, dứa vào xào thơm trong 2 phút.
3. **Hoàn thiện nước lẩu**: Đổ nước hầm xương vào đun sôi, nêm 15g đường phèn, 20ml nước mắm, 10g hạt nêm và 30ml nước cốt tắc để tạo vị chua cay mặn ngọt hài hòa.
4. **Thưởng thức**: Đặt nồi lẩu giữa bàn, khi nước sôi bùng thả tôm sú, mực trứng vào nhúng **3 - 4 phút** là chín giòn ngọt lịm!

💡 **Mẹo Bếp Trưởng**: Không nhúng hải sản quá lâu trong nồi lẩu để tránh thịt bị teo và mất đi vị ngọt biển tự nhiên!`,
      suggestedFollowUps: [
        "Cách pha nước chấm muối ớt xanh chấm lẩu hải sản?",
        "Bảo quản hải sản đông lạnh trong tủ lạnh chuẩn ≤ -18°C?",
      ],
    };
  }

  // 1. Tách từ khóa chuẩn tiếng Việt
  const tokens = input
    .split(/[,+;\n]|\s+(?:và|va|với|voi|and|with)\s+/iu)
    .map((s) => s.trim().replace(/^[-*•\s]+/, ""))
    .filter((s) => s.length > 0 && !STOP_WORDS_REGEX.test(s));

  // 2. Tách riêng Hải Sản Chính và Các Nguyên Liệu Phụ của người dùng
  let detectedSeafoodType = "combo";
  const userIngredients: string[] = [];

  tokens.forEach((token) => {
    const tLower = token.toLowerCase().trim();
    let isSeafood = false;

    if (tLower.includes("cua")) {
      detectedSeafoodType = "cua";
      isSeafood = true;
    } else if (tLower.includes("tôm") || tLower.includes("tom")) {
      detectedSeafoodType = "tom";
      isSeafood = true;
    } else if (tLower.includes("mực") || tLower.includes("muc")) {
      detectedSeafoodType = "muc";
      isSeafood = true;
    }

    if (!isSeafood && tLower.length > 0 && !SEAFOOD_REGEX.test(token) && !STOP_WORDS_REGEX.test(token)) {
      userIngredients.push(token.trim());
    }
  });

  if (userIngredients.length === 0) {
    userIngredients.push("hành tỏi & ớt tiêu");
  }

  // 3. Chuẩn hóa hải sản MAVY
  let seafoodName = "Hải sản tươi sạch MAVY (Tôm sú & Mực trứng Năm Căn, Cà Mau)";
  let seafoodAmount = "500g";

  if (detectedSeafoodType === "cua") {
    seafoodName = "Cua gạch Năm Căn MAVY (100% cua sống tự nhiên, gạch son béo bùi)";
    seafoodAmount = "700g (1 - 2 con chắc thịt)";
  } else if (detectedSeafoodType === "tom") {
    seafoodName = "Tôm sú biển MAVY (Cấp đông tiêu chuẩn ≤ -18°C, bảo quản ≤ -18°C)";
    seafoodAmount = "500g (10 - 12 con size VIP)";
  } else if (detectedSeafoodType === "muc") {
    seafoodName = "Mực trứng đông lạnh MAVY (Cấp đông rời tiêu chuẩn ≤ -18°C, ôm trọn túi trứng)";
    seafoodAmount = "500g (12 - 14 con)";
  }

  const seafoodShort = seafoodName.split("(")[0].trim();
  const ingredientsSummary = userIngredients.join(" và ");

  // 4. Nhận diện phong cách nấu nướng ĐA DẠNG (Không chỉ có món xào)
  const isEgg = lower.includes("trứng") || lower.includes("trung");
  const isButter = lower.includes("bơ") || lower.includes("bo") || lower.includes("phô mai");
  const isSteam = lower.includes("hấp") || lower.includes("gừng") || lower.includes("sả");
  const isGrill = lower.includes("nướng") || lower.includes("muối ớt") || lower.includes("sa tế");
  const isTamarind = lower.includes("me") || lower.includes("sốt me");

  // Định lượng nguyên liệu phụ
  const formattedIngredients = userIngredients.map((item, idx) => {
    const itemLower = item.toLowerCase();
    let gram = "150g";
    let note = "sơ chế sạch";

    if (itemLower.includes("trứng") || itemLower.includes("trung")) {
      gram = "2 - 3 quả (khoảng 120g)";
      note = "đập ra bát lớn, dùng đũa đánh tan đều cùng 1 thìa nước mắm và tiêu";
    } else if (itemLower.includes("bơ") || itemLower.includes("bo")) {
      gram = "40g";
      note = "đun chảy trên lửa nhỏ để phi thơm cùng tỏi băm";
    } else if (itemLower.includes("phô mai")) {
      gram = "100g";
      note = "bào sợi mỏng, phủ đều lên bề mặt món ăn";
    } else if (itemLower.includes("dứa") || itemLower.includes("khóm") || itemLower.includes("thơm")) {
      gram = "200g (khoảng 1/2 quả)";
      note = "gọt sạch mắt, thái lát rẻ quạt 0.5cm";
    } else if (itemLower.includes("cà chua") || itemLower.includes("ca chua")) {
      gram = "200g (2 quả vừa)";
      note = "1 quả băm nhuyễn tạo sốt, 1 quả bổ múi cau";
    } else if (itemLower.includes("sả") || itemLower.includes("gừng")) {
      gram = "30g (3 cây sả + 1 củ gừng nhỏ)";
      note = "sả đập dập cắt khúc, gừng thái lát mỏng";
    } else if (itemLower.includes("me") || itemLower.includes("sốt me")) {
      gram = "40g cốt me đặc";
      note = "hòa với 40ml nước ấm lọc bỏ hạt lấy nước cốt me";
    } else {
      gram = `${100 + (idx % 3) * 30}g`;
      note = "rửa sạch, cắt miếng vừa ăn";
    }

    return `* **${item.charAt(0).toUpperCase() + item.slice(1)}**: \`${gram}\` — *${note}*`;
  });

  let dishTitle = "";
  let cookingStepsMarkdown = "";
  let chefTip = "";

  if (isEgg) {
    dishTitle = `Chả Trứng Đúc ${seafoodShort} Thơm Lừng Béo Ngậy`;
    cookingStepsMarkdown = `
1. **Sơ chế nguyên liệu**:
   * Hải sản rửa sạch khử tanh với chút gừng đập dập, để thật ráo nước, sau đó cắt khúc nhỏ vừa ăn.
   * Đập 2 - 3 quả trứng gà ra bát lớn, nêm vào **10ml nước mắm, 4g hạt nêm, 2g tiêu xay**, dùng đũa đánh tan đều.

2. **Xào săn hải sản**:
   * Đặt chảo lên bếp, cho **15ml dầu ăn**, phi thơm **15g tỏi & hành băm**.
   * Trút phần ${seafoodShort} vào đảo nhanh trên lửa lớn trong **2 phút** cho thịt săn lại và dậy mùi thơm.

3. **Đúc trứng béo ngậy**:
   * Đổ đều phần trứng gà đã đánh tan vào chảo phủ kín mặt hải sản.
   * Hạ lửa nhỏ liu riu, đậy nắp chảo trong **3 - 4 phút** cho trứng chín phồng vàng ươm và ôm trọn từng miếng hải sản.

4. **Hoàn thiện & Thưởng thức**:
   * Rắc thêm tiêu xay lên bề mặt, trượt chả trứng ra đĩa phẳng.
   * Dùng nóng cùng cơm trắng và chấm kèm chút nước mắm ớt cay nồng!`;
    chefTip = "Đậy nắp trên lửa nhỏ giúp trứng chín nở phồng xốp mà không bị cháy xém đáy chảo, giữ trọn vị ngọt mọng nước của hải sản!";
  } else if (isButter) {
    dishTitle = `${seafoodShort} Sốt Bơ Tỏi Béo Ngậy Chuẩn Vị Nhà Hàng`;
    cookingStepsMarkdown = `
1. **Sơ chế nguyên liệu**:
   * Hải sản rã đông tự nhiên, rửa sạch, dùng khăn sạch thấm thật khô ráo.
   * Khía nhẹ vài đường trên thân hải sản để thấm đẫm sốt bơ tỏi.

2. **Làm sốt bơ tỏi óng ánh**:
   * Làm nóng chảo trên lửa nhỏ, cho **40g bơ** vào đun tan chảy.
   * Cho **25g tỏi băm** vào phi trên lửa vừa đến khi tỏi chuyển sang màu vàng giòn và tỏa hương thơm nức mũi.
   * Nêm vào **15ml nước mắm, 8g đường, 4g hạt nêm, 2g tiêu** khuấy tan tạo thành hỗn hợp sốt sền sệt.

3. **Áo sốt hải sản**:
   * Tăng lửa vừa, trút toàn bộ **${seafoodShort}** vào chảo đảo đều tay trong **3 - 4 phút** để từng con thấm đẫm lớp sốt bơ tỏi bóng bẩy.

4. **Hoàn thiện**:
   * Trút ra đĩa, rưới đều phần sốt bơ tỏi còn lại trong chảo lên trên. Chấm kèm bánh mì nóng giòn hoặc ăn với cơm trắng là 'hết nước chấm'!`;
    chefTip = "Phi tỏi trên lửa vừa cho vàng giòn rồi mới trút hải sản vào, tránh để lửa quá lớn làm bơ bị khét mất mùi thơm!";
  } else if (isSteam) {
    dishTitle = `${seafoodShort} Hấp Gừng Sả Giữ Trọn Vị Ngọt Nguyên Bản`;
    cookingStepsMarkdown = `
1. **Sơ chế nguyên liệu**:
   * Hải sản rửa sạch, để ráo. Sả đập dập cắt khúc 5cm, gừng gọt vỏ thái sợi mỏng.
   * Ướp hải sản với **5ml nước mắm, 2g tiêu xay** trong 5 phút.

2. **Chuẩn bị xửng hấp**:
   * Lót một lớp sả đập dập và gừng thái sợi dưới đáy đĩa sâu lòng.
   * Xếp đều **${seafoodShort}** lên trên, rải tiếp phần gừng sả còn lại lên mặt.

3. **Hấp cách thủy giữ trọn dinh dưỡng**:
   * Đặt đĩa hải sản vào xửng hấp khi nước trong nồi đã sôi bùng.
   * Đậy kín nắp, hấp trên lửa lớn trong đúng **5 - 6 phút** là hải sản vừa chín tới, giòn ngọt mọng nước.

4. **Thưởng thức**:
   * Nhấc đĩa ra dùng ngay khi còn bốc khói nghi ngút. Chấm cùng **Muối ớt xanh** hoặc **Nước mắm gừng chua ngọt**!`;
    chefTip = "Hấp đúng từ 5 - 6 phút trên lửa lớn giúp hải sản giữ được 99% vị ngọt mọng nước tự nhiên, không bị teo thịt!";
  } else if (isGrill) {
    dishTitle = `${seafoodShort} Nướng Muối Ớt Sa Tế Cay Nồng Đậm Vị`;
    cookingStepsMarkdown = `
1. **Sơ chế & Ướp sốt**:
   * Hải sản rửa sạch, thấm khô.
   * Trộn sốt ướp: **15ml dầu ăn, 10g muối ớt, 15g sa tế, 8g đường, 10g tỏi băm**. Thoa đều lên thân hải sản ướp trong 10 phút.

2. **Nướng chín vàng giòn**:
   * Nướng trên bếp than hồng hoặc nồi chiên không dầu (180°C) trong **6 - 8 phút** (trở mặt ở phút thứ 4 và quét thêm một lớp sốt ướp).

3. **Hoàn thiện & Thưởng thức**:
   * Bày ra đĩa, thưởng thức cùng rau răm, dưa leo và chấm muối tiêu chanh cay nồng!`;
    chefTip = "Quét một lớp mỏng dầu ăn lên vỉ nướng trước khi đặt hải sản giúp vỏ ngoài giòn thơm và không bị dính vỉ!";
  } else if (isTamarind) {
    dishTitle = `${seafoodShort} Rim Sốt Me Chua Ngọt Đậm Đà Đưa Cơm`;
    cookingStepsMarkdown = `
1. **Sơ chế & Pha sốt me**:
   * Hải sản rửa sạch, thấm khô ráo.
   * Pha nước sốt: **40ml nước cốt me, 20ml nước mắm, 15g đường, 4g ớt băm, 4g hạt nêm** khuấy tan đều.

2. **Rim sốt me chua ngọt**:
   * Phi thơm **20g hành tỏi băm** với **20ml dầu ăn**, trút hải sản vào đảo săn trong 2 phút.
   * Đổ phần nước sốt me vào, hạ lửa vừa đun liu riu trong **3 phút** cho nước sốt kẹo lại, bám đều một lớp bóng bẩy quanh từng con hải sản.

3. **Hoàn thiện**:
   * Múc ra đĩa, rắc chút tiêu xay và thưởng thức cùng cơm nóng!`;
    chefTip = "Rim lửa vừa đến khi sốt me sệt lại sánh mịn sẽ giúp vị chua ngọt ngấm sâu vào từng thớ thịt hải sản!";
  } else {
    dishTitle = `${seafoodShort} Chế Biến Cùng ${ingredientsSummary}`;
    cookingStepsMarkdown = `
1. **Sơ chế nguyên liệu**:
   * Rửa sạch hải sản với chút nước gừng khử tanh, dùng khăn sạch thấm thật khô ráo.
   * Sơ chế sạch ${ingredientsSummary} theo đúng hướng dẫn ở bảng định lượng.

2. **Tạo hương vị nền & kết hợp**:
   * Làm nóng chảo với **20ml dầu ăn**, phi thơm **20g tỏi & hành băm**.
   * Cho nguyên liệu ${userIngredients[0]} vào xào trước cùng **15ml nước mắm, 8g đường, 6g hạt nêm, 4g muối** trong 1.5 phút để chiết xuất vị ngọt tự nhiên.

3. **Nấu lửa lớn kết hợp hải sản**:
   * Tăng lửa lên mức cao, trút **${seafoodShort}** vào đảo nhanh tay liên tục trong **3 - 4 phút** cho thịt hải sản vừa chín tới, giòn ngọt mọng nước.

4. **Hoàn thiện**:
   * Rắc **2g tiêu xay** lên bề mặt, đảo nhẹ rồi tắt bếp, trình bày ra đĩa và thưởng thức ngay khi còn nóng hổi!`;
    chefTip = "Thời gian nấu chỉ từ 3 - 4 phút trên lửa lớn giúp giữ trọn độ giòn ngọt mọng nước của hải sản tự nhiên!";
  }

  const markdownContent = `Chào bạn! Tôi là **Bếp Trưởng Điều Hành MAVY Seafood**. Dựa trên các nguyên liệu bạn đang có: **${ingredientsSummary}**, tôi xin gợi ý công thức **${dishTitle}** độc đáo, thơm ngon và dễ làm nhất nhé:

---

### 📋 1. Bảng Định Lượng Chi Tiết (Khẩu phần 2 - 4 người)

#### A. Nguyên Liệu Chính:
* **Hải sản chính**: ${seafoodName} — \`${seafoodAmount}\`
${formattedIngredients.join("\n")}

#### B. Gia Vị Trong Gian Bếp:
* **Tỏi & hành tím băm**: \`20g\` (3 tép tỏi + 2 củ hành)
* **Muối**: \`4g\` (1/2 thìa cà phê)
* **Hạt nêm**: \`6g\` (1 thìa cà phê)
* **Đường**: \`8g\` (1 thìa cà phê)
* **Nước mắm**: \`15ml\` (1 muỗng canh)
* **Tiêu**: \`2g\` (1/3 thìa cà phê)
* **Dầu ăn (hoặc bơ)**: \`25ml\` (1.5 muỗng canh)

---

### 🍳 2. Quy Trình Chế Biến Chi Tiết
${cookingStepsMarkdown}

---

💡 **Bí Quyết Vàng Từ Bếp Trưởng MAVY**:
* ${chefTip}`;

  return {
    message: markdownContent,
    suggestedFollowUps: [
      `Bí quyết chế biến ${seafoodShort} giòn ngọt mọng nước?`,
      "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C?",
      "Cách pha nước chấm hải sản Cà Mau chuẩn vị?",
    ],
  };
}
