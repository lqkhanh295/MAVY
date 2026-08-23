export interface FreestyleChefResponse {
  message: string;
  suggestedFollowUps: string[];
}

export function generateDynamicRecipe(rawInput: string): FreestyleChefResponse {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 1. Detect Seafood Type
  let seafoodName = "Hải sản tươi sạch MAVY (Tôm sú & Mực trứng Năm Căn, Cà Mau)";
  let seafoodBase = "500g";

  if (lower.includes("cua")) {
    seafoodName = "Cua gạch Năm Căn MAVY (100% cua sống tự nhiên, gạch son béo bùi)";
    seafoodBase = "700g (1 - 2 con chắc thịt)";
  } else if (lower.includes("tôm") || lower.includes("tom")) {
    seafoodName = "Tôm sú biển MAVY (Cấp đông siêu tốc IQF -40°C, bảo quản ≤ -18°C)";
    seafoodBase = "500g (khoảng 10 - 12 con size VIP)";
  } else if (lower.includes("mực") || lower.includes("muc")) {
    seafoodName = "Mực trứng đông lạnh MAVY (Cấp đông rời IQF -40°C, ôm trọn túi trứng)";
    seafoodBase = "500g (khoảng 12 - 14 con)";
  }

  let markdownContent = "";
  let followUps: string[] = [];

  if (lower.includes("cà chua") || lower.includes("ca chua")) {
    markdownContent = `Chào bạn! Với nguyên liệu **cà chua tươi** kết hợp cùng **${seafoodName}**, tôi xin gợi ý công thức **Sốt Cà Chua Thì Là Chua Thanh Chuẩn Vị Nhà Hàng** để giữ trọn vị ngọt mọng nước tự nhiên của hải sản nhé:

---

### 📋 1. Định Lượng Nguyên Liệu & Gia Vị Chuẩn (Khẩu phần 2 - 4 người)

* **Hải sản chính**: ${seafoodName} — \`${seafoodBase}\`
* **Cà chua chín mọng**: \`250g\` (khoảng 3 - 4 quả)
* **Hành khô & tỏi tép băm nhuyễn**: \`20g\` (3 củ hành + 3 tép tỏi)
* **Thì là & hành hoa tươi**: \`30g\` (1 bó nhỏ, cắt khúc 3cm)
* **Muối biển tinh khiết**: \`4g\` (khoảng 1/2 thìa cà phê)
* **Hạt nêm cao cấp**: \`6g\` (1 thìa cà phê)
* **Đường phèn / đường cát**: \`8g\` (1 thìa cà phê để cân bằng độ chua thanh của cà chua)
* **Nước mắm nhĩ 40 độ đạm**: \`15ml\` (1 muỗng canh)
* **Tiêu sọ Phú Quốc xay**: \`2g\` (1/3 thìa cà phê)
* **Dầu ăn thực vật**: \`20ml\` (1.5 muỗng canh)

---

### 🍳 2. Các Bước Chế Biến Chi Tiết

1. **Sơ chế chuẩn bếp trưởng**:
   * Rửa sạch hải sản với chút nước gừng đập dập để khử tanh, sau đó dùng khăn sạch thấm thật khô ráo (giúp khi xào hải sản không bị ra nước làm loãng sốt).
   * Lấy **150g cà chua** băm nhuyễn để nấu sốt nền sánh mịn, **100g còn lại** bổ múi cau.

2. **Nấu sốt cà chua sánh đỏ tự nhiên**:
   * Làm nóng **20ml dầu ăn**, phi thơm **20g hành tỏi băm** trên lửa vừa.
   * Trút **150g cà chua băm** vào xào nhừ. Nêm **15ml nước mắm**, **6g hạt nêm**, **4g muối** và **8g đường**, đun sôi liu riu 2 phút cho sốt sánh kẹo lại.

3. **Xử lý nhiệt độ vàng (Bí quyết giữ độ giòn ngọt)**:
   * Tăng lửa lớn hết cỡ, trút hải sản vào chảo sốt, đảo nhanh tay liên tục trong **3 - 4 phút**. Thịt hải sản sẽ săn giòn, chín tới và hút đẫm sốt cà chua.
   * Cho tiếp **100g cà chua múi cau** vào đảo thêm 1 phút.

4. **Hoàn thiện & Thưởng thức**:
   * Rắc **30g thì là, hành hoa** và **2g tiêu sọ xay** lên trên rồi tắt bếp ngay.
   * Thưởng thức nóng hổi cùng cơm trắng hoặc bánh mì giòn tan!

---

💡 **Mẹo Bếp Trưởng MAVY**: Không bao giờ cho hải sản vào xào cùng lúc với cà chua sống vì cà chua lâu nhừ sẽ khiến hải sản bị nấu quá lâu, teo tóp và mất đi độ mọng nước ngọt lành. Hãy xào sốt trước rồi mới trút hải sản vào đảo nhiệt lớn nhé!`;

    followUps = [
      "Cách làm sốt cà chua mịn không bị chua gắt?",
      "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C giữ trọn dưỡng chất?",
      "Pha nước chấm hải sản Cà Mau chuẩn vị nhà hàng?",
    ];
  } else if (lower.includes("me") || lower.includes("sốt me") || lower.includes("sot me")) {
    markdownContent = `Chào bạn! Món **Hải Sản MAVY Rang Sốt Me Chua Ngọt Hoàng Kim** là một trong những món "bắt cơm" và kích thích vị giác nhất. Dưới đây là công thức cân chỉnh gia vị chi tiết theo từng gam cho bạn:

---

### 📋 1. Định Lượng Nguyên Liệu & Gia Vị (2 - 4 người)

* **Hải sản MAVY**: ${seafoodName} — \`${seafoodBase}\`
* **Cốt me chua đặc nguyên chất**: \`45g\` (3 muỗng canh)
* **Đường thốt nốt (hoặc đường phèn)**: \`35g\` (2 muỗng canh đầy)
* **Nước mắm nhĩ 40 độ đạm**: \`20ml\` (1.5 muỗng canh)
* **Tỏi tép băm nhuyễn**: \`25g\` (5 tép tỏi)
* **Ớt hiểm băm nhỏ**: \`5g\` (1 quả)
* **Muối biển tinh**: \`2g\` (1/4 thìa cà phê)
* **Hạt nêm**: \`4g\` (1/2 thìa cà phê)
* **Đậu phộng rang vàng giã dập**: \`30g\`
* **Rau răm tươi cắt nhỏ**: \`15g\`
* **Bơ lạt hoặc dầu ăn**: \`15g\`

---

### 🍳 2. Hướng Dẫn Chế Biến

1. **Pha nước sốt me hoàng kim**: Hòa tan 45g cốt me, 35g đường thốt nốt, 20ml nước mắm, 2g muối, 4g hạt nêm, 5g ớt băm cùng 30ml nước ấm thành hỗn hợp sốt chua ngọt sánh nhẹ.
2. **Nấu sốt me**: Phi thơm 25g tỏi băm với 15g bơ lạt đến khi vàng giòn. Đổ nước sốt me vào đun sôi lăn tăn 2 phút cho sốt sánh bóng.
3. **Đảo sốt nhiệt cao**: Cho hải sản vào đảo đều tay trên lửa lớn trong **3 - 4 phút** cho sốt me phủ một lớp màng cánh gián óng ả quanh từng con hải sản.
4. **Trình bày**: Cho ra đĩa, rưới phần sốt sánh lên trên, rắc 30g đậu phộng rang và 15g rau răm.

💡 **Mẹo Bếp Trưởng**: Dùng đường thốt nốt hoặc đường phèn sẽ giúp sốt me lên màu cánh gián tự nhiên bóng bẩy và có hậu vị ngọt thanh sâu hơn hẳn đường cát trắng!`;

    followUps = [
      "Bí quyết pha sốt me sệt bóng không cần bột năng?",
      "Cua gạch Năm Căn rang me có cần đập dập vỏ trước không?",
    ];
  } else if (lower.includes("phô mai") || lower.includes("pho mai") || lower.includes("cheese")) {
    markdownContent = `Chào bạn! Sự kết hợp giữa vị ngọt biển giòn dai của **${seafoodName}** cùng lớp **Phô Mai Đút Lò Kéo Sợi** béo ngậy chuẩn Âu là một trải nghiệm ẩm thực thượng hạng:

---

### 📋 1. Định Lượng Gia Vị Chuẩn

* **Hải sản MAVY**: ${seafoodName} — \`${seafoodBase}\`
* **Phô mai Mozzarella bào sợi**: \`150g\`
* **Bơ lạt cao cấp (Anchor / President)**: \`30g\`
* **Tỏi tép băm nhuyễn**: \`15g\` (3 tép)
* **Sốt Mayonnaise**: \`30g\` (2 muỗng canh)
* **Sữa tươi không đường**: \`20ml\` (2 muỗng canh)
* **Muối tinh**: \`2g\` (1/4 thìa cà phê)
* **Tiêu đen xay**: \`2g\` (1/3 thìa cà phê)
* **Lá mùi tây (parsley) khô**: \`2g\`

---

### 🍳 2. Các Bước Thực Hiện

1. **Sơ chế**: Hải sản xẻ lưng (nếu là tôm) hoặc tách mai (nếu là cua), thấm khô hoàn toàn rồi xếp ngay ngắn lên khay nướng có lót giấy bạc.
2. **Làm sốt bơ tỏi**: Làm tan chảy 30g bơ lạt, trộn đều với 15g tỏi băm, 30g mayonnaise, 20ml sữa tươi, 2g muối và 2g tiêu đen.
3. **Nướng đút lò nhiệt cao**: Quét đều lớp sốt bơ tỏi lên thịt hải sản, phủ kín 150g phô mai Mozzarella lên trên. Nướng ở **200°C** trong nồi chiên không dầu hoặc lò nướng khoảng **7 - 9 phút** đến khi phô mai xém vàng nhẹ.
4. **Thưởng thức**: Rắc 2g lá parsley lên trên và dùng ngay khi còn nóng hổi kéo sợi!

💡 **Mẹo Bếp Trưởng**: Nướng nhiệt độ cao 200°C trong thời gian ngắn (dưới 10 phút) để phô mai chảy đều mà thịt hải sản bên trong vẫn mọng nước, không bị khô quắt.`;

    followUps = [
      "Nồi chiên không dầu nướng hải sản bao nhiêu phút?",
      "Loại phô mai nào đút lò hải sản béo ngậy nhất?",
    ];
  } else {
    // Dynamic Freestyle Output for any user ingredients or questions
    markdownContent = `Chào bạn! Tôi là **Bếp Trưởng Điều Hành MAVY**. Nhận được yêu cầu *"**${input}**"*, tôi xin tư vấn chi tiết giải pháp chế biến kết hợp hoàn hảo cùng **${seafoodName}** nhé:

---

### 📋 1. Định Lượng Gia Vị Chuẩn Xác Theo Từng Gam (2 - 4 người)

* **Hải sản chính**: ${seafoodName} — \`${seafoodBase}\`
* **Nguyên liệu theo yêu cầu của bạn**: \`${input}\` — \`150g\` (sơ chế cắt tỉa vừa ăn)
* **Bơ lạt hoặc dầu ô liu cao cấp**: \`25g\` (1.5 muỗng canh)
* **Tỏi tép & sả tươi băm nhuyễn**: \`20g\` (3 tép tỏi + 1 cây sả)
* **Muối biển tinh khiết**: \`4g\` (1/2 thìa cà phê)
* **Hạt nêm cao cấp**: \`6g\` (1 thìa cà phê)
* **Đường phèn / đường cát**: \`6g\` (1 thìa cà phê)
* **Tiêu sọ Phú Quốc xay thơm**: \`2g\` (1/3 thìa cà phê)
* **Nước mắm nhĩ 40 độ đạm**: \`15ml\` (1 muỗng canh)

---

### 🍳 2. Quy Trình Chế Biến Chuẩn 5 Sao

1. **Khử tanh & Sơ chế**: Rửa sạch hải sản với chút gừng đập dập hoặc rượu trắng nhẹ, dùng khăn thấm khô hoàn toàn. Cắt tỉa các nguyên liệu phụ vừa ăn.
2. **Khởi tạo hương vị nền**: Làm nóng chảo với **25g bơ/dầu ô liu**, phi thơm **20g tỏi sả băm**, cho phần nguyên liệu phụ vào xào chín tới trên lửa vừa trong **1.5 phút**.
3. **Kỹ thuật xào nhiệt lớn 3 phút**: Tăng lửa lớn nhất, trút hải sản vào đảo nhanh tay. Nêm **4g muối**, **6g hạt nêm**, **6g đường** và **15ml nước mắm**. Đảo đều tay liên tục trong **3 - 4 phút** cho thịt hải sản vừa chín tới, giòn ngọt và mọng nước.
4. **Hoàn thiện**: Rắc **2g tiêu sọ xay** và rau thơm tươi lên trên, tắt bếp và thưởng thức ngay khi còn nóng hổi!

---

💡 **Bí Quyết Vàng Từ Bếp Trưởng MAVY**:
* Toàn bộ hải sản đông lạnh MAVY được cấp đông siêu tốc **IQF -40°C** và bảo quản ở **≤ -18°C**, giúp khóa trọn màng tế bào. Khi rã đông, bạn chỉ cần ngâm túi hút chân không trong nước mát 10 phút là có thể chế biến ngay, thịt giữ nguyên 99% độ giòn ngọt nguyên bản!`;

    followUps = [
      "Cách bảo quản hải sản trong ngăn đông tủ lạnh chuẩn ≤ -18°C?",
      "Cách phân biệt cua gạch Năm Căn xịn và cua ốp nước?",
      "Nhiệt độ cấp đông IQF -40°C giữ độ tươi giòn như thế nào?",
    ];
  }

  return {
    message: markdownContent,
    suggestedFollowUps: followUps,
  };
}
