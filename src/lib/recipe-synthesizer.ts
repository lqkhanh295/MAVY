export interface FreestyleChefResponse {
  message: string;
  suggestedFollowUps: string[];
}

export function generateDynamicRecipe(rawInput: string): FreestyleChefResponse {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 1. Tách và chuẩn hóa toàn bộ các nguyên liệu người dùng nhập
  // Hỗ trợ phân tách bằng dấu phẩy, dấu cộng, 'và', xuống dòng, chấm phẩy
  const rawItems = input
    .split(/[,+;\n]|(?:\bvà\b)|(?:\bva\b)/i)
    .map((s) => s.trim().replace(/^[-*•\s]+/, ""))
    .filter((s) => s.length > 1 && !/^(hải sản|tom|tôm|muc|mực|cua|mavy|bảo quản)$/i.test(s));

  const userItems = rawItems.length > 0 ? rawItems : [input];

  // 2. Xác định loại hải sản MAVY tối ưu
  let seafoodName = "Hải sản tươi sạch MAVY (Tôm sú & Mực trứng Năm Căn, Cà Mau)";
  let seafoodAmount = "500g";

  if (lower.includes("cua")) {
    seafoodName = "Cua gạch Năm Căn MAVY (100% cua sống tự nhiên, gạch son béo bùi)";
    seafoodAmount = "700g (1 - 2 con chắc thịt)";
  } else if (lower.includes("tôm") || lower.includes("tom")) {
    seafoodName = "Tôm sú biển MAVY (Cấp đông siêu tốc IQF -40°C, bảo quản ≤ -18°C)";
    seafoodAmount = "500g (10 - 12 con size VIP)";
  } else if (lower.includes("mực") || lower.includes("muc")) {
    seafoodName = "Mực trứng đông lạnh MAVY (Cấp đông rời IQF -40°C, ôm trọn túi trứng)";
    seafoodAmount = "500g (12 - 14 con)";
  }

  // 3. Tự động tính toán định lượng từng gam cho TỪNG nguyên liệu người dùng nhập
  const userIngredientsList = userItems.map((item, idx) => {
    const itemLower = item.toLowerCase();
    let gram = "150g";
    let note = "sơ chế cắt miếng vừa ăn";

    if (itemLower.includes("dứa") || itemLower.includes("khóm") || itemLower.includes("thơm")) {
      gram = "180g (khoảng 1/2 quả)";
      note = "gọt mắt, bỏ cùi cứng, thái lát rẻ quạt 0.5cm";
    } else if (itemLower.includes("cà chua") || itemLower.includes("ca chua")) {
      gram = "200g (2 - 3 quả vừa)";
      note = "1 quả băm nhuyễn tạo sốt, phần còn lại bổ múi cau";
    } else if (itemLower.includes("dưa leo") || itemLower.includes("dưa chuột")) {
      gram = "150g (1 - 2 quả)";
      note = "rửa sạch, bỏ ruột mềm, thái lát xéo 0.5cm giữ độ giòn";
    } else if (itemLower.includes("rau răm")) {
      gram = "25g (1 mớ nhỏ)";
      note = "nhặt lá tươi, rửa sạch, cắt khúc 1.5cm";
    } else if (itemLower.includes("thì là") || itemLower.includes("hành hoa")) {
      gram = "30g (1 bó)";
      note = "rửa sạch, cắt khúc 3cm";
    } else if (itemLower.includes("sả") || itemLower.includes("gừng")) {
      gram = "25g";
      note = "đập dập, thái lát mỏng/băm nhỏ";
    } else if (itemLower.includes("me") || itemLower.includes("sốt me")) {
      gram = "40g cốt me đặc";
      note = "ngâm với 30ml nước ấm lọc lấy nước cốt";
    } else if (itemLower.includes("phô mai")) {
      gram = "120g phô mai sợi";
      note = "phủ đều lên bề mặt";
    } else {
      gram = `${100 + (idx % 3) * 30}g`;
      note = "rửa sạch, cắt khúc vừa miệng";
    }

    return `* **${item.charAt(0).toUpperCase() + item.slice(1)}**: \`${gram}\` — *${note}*`;
  });

  const dishTitle = `Hải Sản MAVY Xào Sốt Thập Cẩm Tươi Mát Cùng ${userItems.join(", ")}`;

  const markdownContent = `Chào bạn! Tôi là **Bếp Trưởng Điều Hành MAVY Seafood**. Với đầy đủ các nguyên liệu bạn đang có: **${userItems.join(", ")}**, tôi xin thiết kế một công thức độc quyền **${dishTitle}** giúp kết hợp hoàn hảo tất cả các nguyên liệu này cùng **${seafoodName}** để giữ trọn vị ngọt tự nhiên, giòn dai và thanh mát nhất nhé:

---

### 📋 1. Bảng Định Lượng Chi Tiết Từng Gam (Khẩu phần 2 - 4 người)

#### A. Hải Sản Chính & Toàn Bộ Nguyên Liệu Của Bạn:
* **Hải sản chính**: ${seafoodName} — \`${seafoodAmount}\`
${userIngredientsList.join("\n")}

#### B. Gia Vị Nêm Nếm Chuẩn Nhà Hàng (Định lượng từng gram):
* **Tỏi tép & hành tím băm nhuyễn**: \`20g\` (3 tép tỏi + 2 củ hành tím)
* **Muối biển tinh khiết**: \`4g\` (khoảng 1/2 thìa cà phê)
* **Hạt nêm cao cấp**: \`6g\` (1 thìa cà phê)
* **Đường phèn / đường cát**: \`8g\` (1 thìa cà phê để cân bằng vị chua ngọt)
* **Nước mắm nhĩ 40 độ đạm**: \`15ml\` (1 muỗng canh)
* **Tiêu sọ Phú Quốc xay thơm**: \`2g\` (1/3 thìa cà phê)
* **Dầu ăn thực vật hoặc bơ lạt**: \`25ml / 25g\` (1.5 muỗng canh)

---

### 🍳 2. Quy Trình Chế Biến Chi Tiết Từng Bước

1. **Sơ chế chuẩn bếp trưởng**:
   * Hải sản rửa nhanh với nước gừng hoặc rượu trắng khử tanh, dùng khăn sạch **thấm thật khô ráo** (giúp khi xào nhiệt lớn không bị ra nước làm mềm rau củ).
   * Sơ chế toàn bộ các nguyên liệu: **${userItems.join(", ")}** theo đúng hướng dẫn ở bảng định lượng trên.

2. **Khởi tạo nền sốt chua ngọt tự nhiên**:
   * Làm nóng chảo với **25ml dầu ăn/bơ**, phi thơm **20g hành tỏi băm** trên lửa vừa cho vàng giòn.
   * Cho phần cà chua băm (hoặc dứa/nguyên liệu tạo sốt) vào đảo đều với **15ml nước mắm, 8g đường, 6g hạt nêm, 4g muối** trong 1.5 phút để tạo thành lớp sốt sệt óng ánh.

3. **Xử lý nhiệt lớn kết hợp toàn bộ nguyên liệu**:
   * Tăng lửa lên mức **cao nhất**, trút **${seafoodName}** cùng toàn bộ các nguyên liệu rau củ (**${userItems.filter((i) => !/rau răm|hành lá|ngò/i.test(i)).join(", ")}**) vào chảo.
   * Đảo nhanh tay liên tục trong **3 - 4 phút**. Lửa lớn sẽ khóa chặt nước ngọt bên trong thịt hải sản, đồng thời giữ cho rau củ giữ nguyên độ giòn ngọt, màu sắc tươi tắn mà không bị ỉu.

4. **Hoàn thiện với rau thơm & tiêu**:
   * Cho phần rau thơm (**${userItems.filter((i) => /rau răm|hành lá|ngò/i.test(i)).join(", ") || "rau thơm, rau răm"}**) và rắc **2g tiêu sọ xay** lên trên. Đảo nhẹ 15 giây rồi tắt bếp ngay lập tức.
   * Múc ra đĩa sâu lòng, rưới đều phần nước sốt sóng sánh lên trên và thưởng thức nóng cùng cơm trắng hoặc bánh mì!

---

💡 **Bí Quyết Vàng Từ Bếp Trưởng MAVY**:
* Không xào rau củ quá lâu trước khi cho hải sản. Hải sản tươi sạch MAVY chín rất nhanh (chỉ 3-4 phút), xào chung trên lửa lớn sẽ giúp nước ngọt từ hải sản hòa quyện với vị chua ngọt của dứa, cà chua và độ thanh mát của dưa leo, rau răm tạo nên một tổng thể bùng nổ hương vị!`;

  const followUps = [
    `Bí quyết xào ${userItems.slice(0, 2).join(" & ")} giòn ngọt không ra nước?`,
    "Nhiệt độ bảo quản hải sản đông lạnh chuẩn ≤ -18°C trong tủ lạnh?",
    "Pha nước chấm muối ớt xanh Cà Mau chấm hải sản xào?",
  ];

  return {
    message: markdownContent,
    suggestedFollowUps: followUps,
  };
}
