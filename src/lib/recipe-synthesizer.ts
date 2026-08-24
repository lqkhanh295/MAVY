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

  // 0. Xử lý các câu hỏi đặc biệt theo ngữ cảnh (Lẩu, Nước chấm, Canh chua, Cháo...)
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
* **Rau & Nấm ăn kèm**: Nấm kim châm, cải thảo, rau muống cọng, hoa chuối, bún tươi/mì.

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

  // Nếu người dùng chỉ nhập tên hải sản mà không nhập nguyên liệu phụ
  if (userIngredients.length === 0) {
    userIngredients.push("hành tỏi phi thơm");
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

  // 4. Định lượng chính xác từng gam CHỈ CHO CÁC NGUYÊN LIỆU NGƯỜI DÙNG NHẬP
  const formattedIngredients = userIngredients.map((item, idx) => {
    const itemLower = item.toLowerCase();
    let gram = "150g";
    let note = "sơ chế sạch, cắt miếng vừa ăn";

    if (itemLower.includes("dứa") || itemLower.includes("khóm") || itemLower.includes("thơm")) {
      gram = "200g (khoảng 1/2 quả)";
      note = "gọt sạch mắt, bỏ cùi cứng, thái lát rẻ quạt 0.5cm";
    } else if (itemLower.includes("cà chua") || itemLower.includes("ca chua")) {
      gram = "200g (2 quả vừa)";
      note = "1 quả băm nhuyễn tạo sốt, 1 quả bổ múi cau";
    } else if (itemLower.includes("dưa leo") || itemLower.includes("dưa chuột")) {
      gram = "150g (1 quả)";
      note = "rửa sạch, bỏ ruột, thái lát xéo 0.5cm giữ độ giòn";
    } else if (itemLower.includes("rau răm")) {
      gram = "25g (1 mớ nhỏ)";
      note = "nhặt lá tươi, rửa sạch, cắt khúc 1.5cm";
    } else if (itemLower.includes("thì là") || itemLower.includes("hành hoa") || itemLower.includes("hành lá")) {
      gram = "30g (1 bó)";
      note = "rửa sạch, cắt khúc 3cm";
    } else if (itemLower.includes("sả") || itemLower.includes("gừng")) {
      gram = "25g";
      note = "đập dập, thái lát mỏng băm nhỏ";
    } else if (itemLower.includes("me") || itemLower.includes("sốt me")) {
      gram = "40g cốt me đặc";
      note = "ngâm 30ml nước ấm lọc lấy nước cốt";
    } else if (itemLower.includes("phô mai")) {
      gram = "120g phô mai sợi";
      note = "phủ đều lên bề mặt";
    } else {
      gram = `${120 + (idx % 3) * 30}g`;
      note = "rửa sạch, sơ chế cắt khúc vừa ăn";
    }

    return `* **${item.charAt(0).toUpperCase() + item.slice(1)}**: \`${gram}\` — *${note}*`;
  });

  const ingredientsSummary = userIngredients.join(" và ");
  const dishTitle = `Món ${seafoodName.split("(")[0].trim()} Xào Sốt Chuẩn Vị Cùng ${ingredientsSummary}`;

  // 5. Tạo các bước nấu CHỈ DỰA TRÊN NGUYÊN LIỆU ĐÃ NHẬP
  const markdownContent = `Chào bạn! Tôi là **Bếp Trưởng Điều Hành MAVY Seafood**. Dựa trên **đúng chính xác** các nguyên liệu bạn đang có: **${ingredientsSummary}**, tôi xin hướng dẫn bạn thực hiện **${dishTitle}** mà không cần phải mua thêm bất kỳ nguyên liệu phức tạp nào khác nhé:

---

### 📋 1. Bảng Định Lượng Chi Tiết Từng Gam (Khẩu phần 2 - 4 người)

#### A. Nguyên Liệu Chính (Đúng theo yêu cầu của bạn):
* **Hải sản chính**: ${seafoodName} — \`${seafoodAmount}\`
${formattedIngredients.join("\n")}

#### B. Gia Vị Trong Gian Bếp (Định lượng từng gram):
* **Tỏi & hành tím băm**: \`20g\` (3 tép tỏi + 2 củ hành)
* **Muối**: \`4g\` (1/2 thìa cà phê)
* **Hạt nêm**: \`6g\` (1 thìa cà phê)
* **Đường**: \`8g\` (1 thìa cà phê)
* **Nước mắm**: \`15ml\` (1 muỗng canh)
* **Tiêu**: \`2g\` (1/3 thìa cà phê)
* **Dầu ăn (hoặc bơ)**: \`25ml\` (1.5 muỗng canh)

---

### 🍳 2. Quy Trình Chế Biến Chi Tiết

1. **Sơ chế nguyên liệu**:
   * Rửa sạch hải sản với chút nước gừng đập dập hoặc rượu trắng khử tanh, dùng khăn sạch **thấm thật khô ráo** (giúp khi xào nhiệt lớn không bị ra nước làm mất vị ngọt).
   * Sơ chế sạch **${ingredientsSummary}** theo đúng hướng dẫn ở bảng định lượng trên.

2. **Phi thơm hương vị nền & tạo sốt**:
   * Làm nóng chảo với **25ml dầu ăn/bơ**, phi thơm **20g hành tỏi băm** trên lửa vừa cho dậy mùi thơm.
   * Cho một nửa phần **${userIngredients[0]}** vào xào trước cùng **15ml nước mắm, 8g đường, 6g hạt nêm, 4g muối** trong 1.5 phút để chiết xuất trọn vẹn nước ngọt tự nhiên từ ${userIngredients[0]} tạo thành lớp sốt óng ả.

3. **Xào nhiệt lớn kết hợp hải sản**:
   * Tăng lửa lên mức **cao nhất**, trút **${seafoodName.split("(")[0].trim()}** cùng toàn bộ phần **${ingredientsSummary}** còn lại vào chảo.
   * Đảo nhanh tay liên tục trong **3 - 4 phút**. Lửa lớn giúp hải sản vừa chín tới, giòn ngọt mọng nước, đồng thời ${ingredientsSummary} thấm đẫm sốt mà vẫn giữ nguyên màu sắc tươi đẹp.

4. **Hoàn thiện & Thưởng thức**:
   * Rắc **2g tiêu sọ xay** lên bề mặt, đảo nhẹ 10 giây rồi tắt bếp ngay lập tức.
   * Trình bày ra đĩa, rưới phần nước sốt sóng sánh lên trên và thưởng thức ngay khi còn nóng hổi cùng cơm trắng!

---

💡 **Bí Quyết Vàng Từ Bếp Trưởng MAVY**:
* Khi xào hải sản cùng **${ingredientsSummary}**, hãy luôn nhớ nguyên tắc: **Lửa phải thật lớn và thời gian xào chỉ từ 3 - 4 phút**. Việc này giúp thịt hải sản giòn ngọt tự nhiên mà ${ingredientsSummary} không bị nát hay ra quá nhiều nước!`;

  const followUps = [
    `Bí quyết xào ${userIngredients[0]} với hải sản giòn ngọt không ra nước?`,
    "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C?",
    "Pha nước chấm hải sản Cà Mau chuẩn vị nhà hàng?",
  ];

  return {
    message: markdownContent,
    suggestedFollowUps: followUps,
  };
}
