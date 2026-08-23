import { Recipe } from "@/types";

export interface StructuredChefResponse {
  message: string;
  recipes: Recipe[];
  suggestedFollowUps: string[];
}

export function generateDynamicRecipe(rawInput: string): StructuredChefResponse {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // 1. Detect Seafood Type
  let seafoodName = "Hải sản tươi sạch MAVY (Tôm sú & Mực trứng)";
  let category: Recipe["category"] = "combo";
  let baseAmount = "500g";

  if (lower.includes("cua")) {
    seafoodName = "Cua gạch Năm Căn MAVY";
    category = "cua";
    baseAmount = "700g (1 - 2 con chắc thịt)";
  } else if (lower.includes("tôm") || lower.includes("tom")) {
    seafoodName = "Tôm sú biển MAVY (Chuẩn IQF -40°C)";
    category = "tom";
    baseAmount = "500g (khoảng 10 - 12 con size VIP)";
  } else if (lower.includes("mực") || lower.includes("muc")) {
    seafoodName = "Mực trứng đông lạnh MAVY";
    category = "muc";
    baseAmount = "500g (khoảng 12 - 14 con ôm trứng)";
  }

  // 2. Identify Key User Ingredients and Flavor Style
  const items: { name: string; amount: string; isMain?: boolean }[] = [
    { name: seafoodName, amount: baseAmount, isMain: true },
  ];

  let recipeTitle = "";
  let flavorDesc = "";
  let recipeDesc = "";
  let steps: string[] = [];
  let chefTip = "";
  let followUps: string[] = [];

  // Parse specific culinary patterns
  if (lower.includes("cà chua") || lower.includes("ca chua")) {
    recipeTitle =
      category === "tom"
        ? "Tôm Sú MAVY Sốt Cà Chua Thì Là Chua Ngọt"
        : category === "muc"
        ? "Mực Trứng MAVY Xào Cà Chua Cần Tây Thơm Giòn"
        : category === "cua"
        ? "Cua Gạch MAVY Sốt Cà Chua Rượu Vang Đậm Vị"
        : "Hải Sản MAVY Sốt Cà Chua Thì Là Chua Thanh Chuẩn Vị";

    flavorDesc = "Chua thanh dịu nhẹ, thơm nồng thì là, giữ trọn vị ngọt tự nhiên của thịt hải sản";
    recipeDesc = `Món ăn khéo léo sử dụng cà chua tươi để tạo vị chua ngọt tự nhiên, giúp khử sạch vị tanh và tôn lên độ ngọt bùi mọng nước của ${seafoodName}.`;

    items.push(
      { name: "Cà chua chín mọng", amount: "250g (3 - 4 quả)" },
      { name: "Hành khô & tỏi băm nhuyễn", amount: "20g (3 củ nhỏ)" },
      { name: "Thì là & hành hoa tươi", amount: "30g (1 bó nhỏ)" },
      { name: "Muối biển tinh khiết", amount: "4g (khoảng 1/2 thìa cà phê)" },
      { name: "Hạt nêm / bột canh cao cấp", amount: "6g (khoảng 1 thìa cà phê)" },
      { name: "Đường cát trắng (hoặc đường phèn)", amount: "8g (1 thìa cà phê cân bằng vị chua)" },
      { name: "Nước mắm nhĩ 40 độ đạm", amount: "15ml (1 muỗng canh)" },
      { name: "Tiêu sọ Phú Quốc xay nhuyễn", amount: "2g (1/3 thìa cà phê)" },
      { name: "Dầu ăn thực vật", amount: "20ml (1.5 muỗng canh)" }
    );

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName} với nước muối loãng hoặc chút gừng đập dập, để thật ráo nước. Cà chua rửa sạch: 150g băm nhuyễn nấu sốt nền, 100g bổ múi cau.`,
      "Nấu sốt cà chua: Đun nóng 20ml dầu ăn, phi thơm 20g hành tỏi băm, trút 150g cà chua băm vào xào nhừ trên lửa vừa. Nêm 15ml nước mắm, 6g hạt nêm, 4g muối và 8g đường để tạo màu đỏ sánh mịn tự nhiên.",
      `Chế biến hải sản: Tăng lửa lớn, cho ${seafoodName} vào đảo nhanh tay trong 3 - 4 phút để thịt săn giòn và thấm đều sốt. Cho tiếp 100g cà chua múi cau vào đảo thêm 1 phút.`,
      "Hoàn thiện: Rắc 30g thì là, hành hoa và 2g tiêu sọ xay lên trên, tắt bếp ngay. Bày ra đĩa sâu lòng và thưởng thức nóng cùng cơm trắng hoặc bánh mì.",
    ];

    chefTip = "Khi nấu sốt cà chua với hải sản, nên xào sốt cà chua nhừ sánh trước rồi mới cho hải sản vào nấu trên lửa lớn. Cách này giúp hải sản không bị ra nước làm loãng sốt và giữ trọn độ mọng nước tự nhiên.";
    followUps = [
      "Cách chọn cà chua tươi nhiều bột làm sốt hải sản",
      "Mẹo giữ mực trứng nguyên vẹn không bị vỡ bọc trứng khi xào cà chua",
      "Nhiệt độ bảo quản ngăn đông chuẩn ≤ -18°C giữ trọn dưỡng chất hải sản",
    ];
  } else if (lower.includes("me") || lower.includes("sốt me") || lower.includes("sot me")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Rang Sốt Me Chua Ngọt Hoàng Kim`;
    flavorDesc = "Chua ngọt đậm đà, sốt óng ánh sánh mịn, dậy mùi bơ tỏi và đậu phộng rang";
    recipeDesc = `Hải sản được xào trên lửa lớn hòa quyện cùng cốt me chua thanh, đường phèn và tỏi phi thơm nức mũi.`;

    items.push(
      { name: "Cốt me chua đặc nguyên chất", amount: "45g (3 muỗng canh)" },
      { name: "Đường thốt nốt (hoặc đường phèn)", amount: "35g (2 muỗng canh đầy)" },
      { name: "Nước mắm nhĩ thượng hạng", amount: "20ml (1.5 muỗng canh)" },
      { name: "Tỏi tép băm nhuyễn", amount: "25g (5 tép tỏi)" },
      { name: "Ớt hiểm băm nhỏ", amount: "5g (1 quả)" },
      { name: "Muối biển tinh", amount: "2g (1/4 thìa cà phê)" },
      { name: "Hạt nêm", amount: "4g (1/2 thìa cà phê)" },
      { name: "Đậu phộng rang giã dập", amount: "30g" },
      { name: "Rau răm tươi cắt nhỏ", amount: "15g" },
      { name: "Bơ lạt hoặc dầu ăn", amount: "15g" }
    );

    steps = [
      `Sơ chế: ${seafoodName} làm sạch, thấm khô bề mặt. Pha chén nước sốt gồm 45g cốt me, 35g đường, 20ml nước mắm, 2g muối, 4g hạt nêm và 5g ớt băm cùng 30ml nước ấm, khuấy tan đều.`,
      "Nấu sốt me: Làm nóng 15g bơ/dầu ăn, phi thơm 25g tỏi băm vàng giòn, đổ hỗn hợp sốt me vào đun sôi lăn tăn trên lửa nhỏ 2-3 phút đến khi sốt bắt đầu sánh kẹo lại.",
      `Đảo sốt: Cho ${seafoodName} vào chảo sốt me, bật lửa lớn đảo đều tay trong 3 - 5 phút cho sốt áo đều một lớp bóng mượt quanh từng thớ thịt.`,
      "Trình bày: Gắp ra đĩa, rưới phần sốt me sánh đậm lên trên, rắc 30g đậu phộng rang và 15g rau răm ăn kèm.",
    ];

    chefTip = "Đường thốt nốt hoặc đường phèn giúp nước sốt me có màu cánh gián óng ả và hậu vị ngọt thanh êm dịu hơn hẳn đường trắng thông thường.";
    followUps = ["Bí quyết pha tỷ lệ sốt me bất bại cho hải sản", "Cách làm cua rang me không bị tanh"];
  } else if (lower.includes("phô mai") || lower.includes("pho mai") || lower.includes("cheese")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Đút Lò Phô Mai Bơ Tỏi Kéo Sợi`;
    flavorDesc = "Béo ngậy đậm đà, thơm lừng bơ tỏi, phô mai vàng óng kéo sợi hấp dẫn";
    recipeDesc = `Sự kết hợp hoàn hảo giữa vị ngọt giòn của hải sản MAVY cùng lớp phô mai Mozzarella tan chảy béo ngậy.`;

    items.push(
      { name: "Phô mai Mozzarella bào sợi", amount: "150g" },
      { name: "Bơ lạt Anchor / President", amount: "30g" },
      { name: "Tỏi tép băm nhuyễn", amount: "15g (3 tép)" },
      { name: "Sốt Mayonnaise", amount: "30g (2 muỗng canh)" },
      { name: "Sữa tươi không đường", amount: "20ml (2 muỗng canh)" },
      { name: "Muối tinh khiết", amount: "2g (1/4 thìa cà phê)" },
      { name: "Tiêu đen xay", amount: "2g (1/3 thìa cà phê)" },
      { name: "Lá mùi tây (parsley) khô", amount: "2g" }
    );

    steps = [
      `Sơ chế: ${seafoodName} sơ chế sạch sẽ, xẻ lưng (nếu là tôm) hoặc tách mai (nếu là cua), thấm khô hoàn toàn rồi xếp ngay ngắn lên khay nướng có lót giấy bạc.`,
      "Trộn sốt phô mai: Làm tan chảy 30g bơ lạt, trộn đều với 15g tỏi băm, 30g mayonnaise, 20ml sữa tươi, 2g muối và 2g tiêu đen.",
      "Nướng đút lò: Quét đều lớp sốt bơ tỏi lên bề mặt hải sản, phủ kín 150g phô mai Mozzarella lên trên. Nướng ở 200°C trong nồi chiên không dầu hoặc lò nướng khoảng 7 - 9 phút đến khi phô mai xém vàng.",
      "Thưởng thức: Rắc 2g lá parsley lên bề mặt và dùng ngay khi phô mai còn nóng hổi kéo sợi.",
    ];

    chefTip = "Không nướng phô mai quá lâu ở nhiệt độ thấp vì sẽ làm thịt hải sản bị khô quắt và mất nước. Nên nướng nhiệt cao 200°C trong thời gian ngắn.";
    followUps = ["Nồi chiên không dầu nướng tôm phô mai bao nhiêu phút", "Phô mai nào nướng hải sản ngon nhất"];
  } else if (lower.includes("trứng muối") || lower.includes("trung muoi")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Sốt Trứng Muối Hoàng Kim`;
    flavorDesc = "Bùi béo mằn mặn, sốt sánh vàng mịn màng, thơm ngậy bơ tỏi";
    recipeDesc = `Lớp sốt trứng muối màu vàng hoàng kim áo đều từng con hải sản tạo nên hương vị sang trọng chuẩn nhà hàng 5 sao.`;

    items.push(
      { name: "Lòng đỏ trứng muối hấp chín", amount: "60g (4 quả nghiền mịn)" },
      { name: "Bơ lạt béo ngậy", amount: "35g" },
      { name: "Sữa đặc có đường", amount: "15g (1 muỗng canh)" },
      { name: "Tỏi tép băm nhuyễn", amount: "20g (4 tép)" },
      { name: "Ớt sừng cắt lát", amount: "5g (1/2 quả)" },
      { name: "Hạt nêm cao cấp", amount: "4g (1/2 thìa cà phê)" },
      { name: "Tiêu sọ xay", amount: "2g (1/3 thìa cà phê)" }
    );

    steps = [
      `Sơ chế: ${seafoodName} làm sạch, thấm khô ráo. 60g lòng đỏ trứng muối hấp chín với chút rượu trắng khử tanh trong 8 phút, sau đó dùng nĩa tán nhuyễn mịn.`,
      "Nấu sốt hoàng kim: Đun chảy 35g bơ lạt, phi thơm 20g tỏi băm, cho 60g trứng muối tán nhuyễn vào đảo đều trên lửa nhỏ cùng 15g sữa đặc, 4g hạt nêm và 2g tiêu đến khi sủi bọt mịn vàng óng.",
      `Lắc sốt: Cho ${seafoodName} vào chảo sốt trứng muối, đảo nhanh tay trong 3 phút trên lửa vừa để sốt trứng muối áo một lớp vàng đều mịn màng.`,
      "Bày đĩa: Dọn ra đĩa cùng bánh mì nóng giòn để chấm trọn vẹn phần sốt trứng muối thơm béo.",
    ];

    chefTip = "Hấp trứng muối cùng vài giọt dầu mè hoặc rượu Mai Quế Lộ sẽ giúp lòng đỏ lên màu cam đỏ rực rỡ và dậy mùi thơm đặc trưng.";
    followUps = ["Cách làm sốt trứng muối mịn không bị vón cục", "Bảo quản sốt trứng muối bao lâu"];
  } else if (lower.includes("sa tế") || lower.includes("sa te") || lower.includes("ớt") || lower.includes("ot")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Xào Sa Tế Cay Nồng Sả Ớt`;
    flavorDesc = "Cay nồng kích thích vị giác, thơm sả ớt tươi, đậm đà ấm bụng";
    recipeDesc = `Món ăn bùng nổ hương vị với sa tế tôm cay nồng kết hợp sả đập dập, cực kỳ phù hợp cho những ngày mưa hoặc tụ họp gia đình.`;

    items.push(
      { name: "Sa tế tôm thượng hạng", amount: "30g (2 muỗng canh)" },
      { name: "Sả tươi băm nhuyễn & đập dập", amount: "30g (2 nhánh lớn)" },
      { name: "Tỏi tép & hành tím băm", amount: "20g (3 tép tỏi + 2 củ hành)" },
      { name: "Hành tây cắt múi cau", amount: "80g (1/2 củ)" },
      { name: "Ớt chuông hoặc ớt sừng", amount: "50g" },
      { name: "Nước mắm nhĩ ngon", amount: "15ml (1 muỗng canh)" },
      { name: "Đường cát trắng", amount: "8g (1 thìa cà phê)" },
      { name: "Hạt nêm", amount: "5g (1 thìa cà phê)" },
      { name: "Tiêu sọ xay", amount: "2g (1/3 thìa cà phê)" },
      { name: "Dầu ăn", amount: "15ml (1 muỗng canh)" }
    );

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName}, để ráo. Ướp sơ với 15g sa tế, 15ml nước mắm, 5g hạt nêm và 2g tiêu trong 5 phút.`,
      "Phi sả ớt: Làm nóng 15ml dầu ăn, phi thơm 30g sả băm, 20g hành tỏi và 15g sa tế còn lại đến khi dậy mùi thơm cay nồng đặc trưng.",
      `Xào nhiệt lớn: Trút ${seafoodName} cùng 80g hành tây và 50g ớt vào chảo, nêm thêm 8g đường, đảo trên lửa lớn trong 3 - 4 phút cho hải sản chín săn giòn và thấm đẫm sa tế.`,
      "Hoàn thiện: Tắt bếp, rắc hành lá cắt khúc và tiêu sọ, thưởng thức nóng cùng cơm trắng.",
    ];

    chefTip = "Xào sa tế bắt buộc phải dùng lửa lớn và đảo thật nhanh tay để giữ được độ giòn ngọt mọng nước bên trong của hải sản.";
    followUps = ["Cách tự làm sa tế hải sản tại nhà", "Mẹo giảm cay khi xào sa tế"];
  } else {
    // Dynamic extraction for custom user inputs with exact gram estimations
    const rawTokens = input
      .split(/[,+;&\n]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const userAddedItems = rawTokens
      .filter((t) => !t.toLowerCase().includes("hải sản") && !t.toLowerCase().includes("mavy"))
      .map((t, idx) => {
        const capitalized = t.charAt(0).toUpperCase() + t.slice(1);
        let gramWeight = "100g";
        const tLower = t.toLowerCase();
        if (tLower.includes("muối") || tLower.includes("tiêu") || tLower.includes("ớt") || tLower.includes("gừng") || tLower.includes("tỏi") || tLower.includes("hành")) {
          gramWeight = "15g (khoảng 1 - 2 thìa nhỏ)";
        } else if (tLower.includes("rau") || tLower.includes("ngò") || tLower.includes("húng") || tLower.includes("thì là")) {
          gramWeight = "30g (1 bó nhỏ)";
        } else if (tLower.includes("nấm") || tLower.includes("bắp") || tLower.includes("đậu") || tLower.includes("ớt chuông")) {
          gramWeight = "120g (thái vừa ăn)";
        } else if (tLower.includes("bơ") || tLower.includes("dầu") || tLower.includes("mắm") || tLower.includes("đường")) {
          gramWeight = "25g (khoảng 2 muỗng canh)";
        } else {
          gramWeight = idx === 0 ? "150g" : "100g";
        }

        return {
          name: capitalized,
          amount: gramWeight,
        };
      });

    if (userAddedItems.length > 0) {
      items.push(...userAddedItems);
    }

    // Always append detailed spice measurements with exact grams
    items.push(
      { name: "Bơ lạt hoặc dầu ô liu", amount: "25g (1.5 muỗng canh)" },
      { name: "Tỏi tép & sả tươi băm", amount: "20g (3 tép tỏi + 1 cây sả)" },
      { name: "Muối biển tinh khiết", amount: "4g (1/2 thìa cà phê)" },
      { name: "Hạt nêm cao cấp", amount: "6g (1 thìa cà phê)" },
      { name: "Đường phèn / đường cát", amount: "6g (1 thìa cà phê)" },
      { name: "Tiêu sọ Phú Quốc xay", amount: "2g (1/3 thìa cà phê)" },
      { name: "Nước mắm nhĩ 40 độ đạm", amount: "15ml (1 muỗng canh)" }
    );

    const ingredientHighlight = userAddedItems.map((i) => i.name).join(" & ") || "Gia Vị Thảo Mộc";
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Chế Biến Cùng ${ingredientHighlight}`;
    flavorDesc = `Hài hòa cân bằng, dậy mùi thơm của ${ingredientHighlight}, giữ trọn độ mọng nước tự nhiên`;
    recipeDesc = `Công thức được tối ưu hóa riêng để kết hợp ${seafoodName} với ${ingredientHighlight}, nêm chuẩn tỷ lệ gia vị từng gam để tôn vinh vị ngọt biển tự nhiên.`;

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName} với chút nước gừng khử tanh, dùng khăn thấm khô hoàn toàn. Sơ chế sạch sẽ các nguyên liệu (${ingredientHighlight}) và cắt tỉa vừa ăn.`,
      `Chế biến nền: Làm nóng chảo với 25g bơ/dầu ô liu, phi thơm 20g tỏi sả băm, sau đó cho các nguyên liệu (${ingredientHighlight}) vào xào thơm trên lửa vừa trong 1.5 - 2 phút.`,
      `Xử lý nhiệt độ vàng: Tăng nhiệt độ lên mức cao nhất, cho ${seafoodName} vào đảo nhanh tay trong 3 - 4 phút. Nêm 4g muối, 6g hạt nêm, 6g đường và 15ml nước mắm đảo đều đến khi hải sản vừa chín tới, thịt săn chắc và mọng nước.`,
      "Hoàn thiện: Rắc 2g tiêu sọ xay và rau thơm lên bề mặt, tắt bếp ngay. Dùng ngay khi còn nóng hổi.",
    ];

    chefTip = "Nguyên tắc vàng của hải sản: Luôn xào/nấu trên lửa lớn trong thời gian vừa đủ (3 - 4 phút). Không nấu quá lâu để tránh làm mất đi độ giòn ngọt mọng nước tự nhiên.";
    followUps = [
      "Cách bảo quản hải sản IQF đúng chuẩn nhiệt độ ≤ -18°C trong ngăn đông",
      "Nhiệt độ cấp đông IQF -40°C giúp khóa chặt tế bào thịt như thế nào",
      "Các loại nước chấm hải sản pha theo gram chuẩn nhà hàng",
    ];
  }

  const slugId = recipeTitle
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    message: `Bếp Trưởng MAVY đã nghiên cứu và thiết kế công thức chi tiết theo từng gam chuẩn xác dựa trên nguyên liệu "${input}" trong gian bếp của bạn:`,
    recipes: [
      {
        id: slugId,
        title: recipeTitle,
        category,
        prepTime: "10 - 15 phút",
        cookTime: "10 - 15 phút",
        difficulty: "Dễ",
        servings: "2 - 4 người",
        description: recipeDesc,
        flavorProfile: flavorDesc,
        ingredients: items,
        steps,
        chefTips: chefTip,
      },
    ],
    suggestedFollowUps: followUps,
  };
}
