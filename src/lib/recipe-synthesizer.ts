export interface FreestyleChefResponse {
  message: string;
  suggestedFollowUps: string[];
}

// Danh sách các từ khóa nhận diện hải sản chính
const SEAFOOD_REGEX = /(?:^|\s+)(cua\s+gạch|cua\s+gach|cua|tôm\s+sú|tom\s+su|tôm|tom|mực\s+trứng|muc\s+trung|mực|muc|hải\s+sản|hai\s+san)(?:\s+|$)/i;

export function generateDynamicRecipe(rawInput: string): FreestyleChefResponse {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 1. Tách từ khóa chuẩn tiếng Việt (hỗ trợ dấu phẩy, dấu cộng, 'và', 'va', 'với', 'voi', xuống dòng)
  const tokens = input
    .split(/[,+;\n]|\s+(?:và|va|với|voi|and|with)\s+/iu)
    .map((s) => s.trim().replace(/^[-*•\s]+/, ""))
    .filter((s) => s.length > 0);

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

    if (!isSeafood && tLower.length > 0 && !SEAFOOD_REGEX.test(token)) {
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

  // 4. Định lượng chính xác từng gam CHỈ CHO CÁC NGUYÊN LIỆU NGƯỜI DÙNG NHẬP (Không thêm bất kỳ nguyên liệu ngoài)
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

#### B. Gia Vị Cơ Bản Trong Gian Bếp (Định lượng chuẩn từng gram):
* **Tỏi tép & hành tím băm**: \`20g\` (3 tép tỏi + 2 củ hành tím)
* **Muối biển tinh khiết**: \`4g\` (khoảng 1/2 thìa cà phê)
* **Hạt nêm cao cấp**: \`6g\` (1 thìa cà phê)
* **Đường cát / đường phèn**: \`8g\` (1 thìa cà phê để cân bằng vị)
* **Nước mắm nhĩ 40 độ đạm**: \`15ml\` (1 muỗng canh)
* **Tiêu sọ Phú Quốc xay**: \`2g\` (1/3 thìa cà phê)
* **Dầu ăn thực vật hoặc bơ lạt**: \`25ml / 25g\` (1.5 muỗng canh)

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
