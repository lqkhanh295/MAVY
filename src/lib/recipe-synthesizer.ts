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
    baseAmount = "1 - 2 con (khoảng 700g)";
  } else if (lower.includes("tôm") || lower.includes("tom")) {
    seafoodName = "Tôm sú biển MAVY (Chuẩn IQF -40°C)";
    category = "tom";
    baseAmount = "500g (khoảng 10-12 con)";
  } else if (lower.includes("mực") || lower.includes("muc")) {
    seafoodName = "Mực trứng đông lạnh MAVY";
    category = "muc";
    baseAmount = "500g (khoảng 12-14 con)";
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
    recipeTitle = category === "tom"
      ? "Tôm Sú MAVY Sốt Cà Chua Thì Là Chua Ngọt"
      : category === "muc"
      ? "Mực Trứng MAVY Xào Cà Chua Cần Tây Thơm Giòn"
      : category === "cua"
      ? "Cua Gạch MAVY Sốt Cà Chua Rượu Vang Đậm Vị"
      : "Hải Sản MAVY Sốt Cà Chua Thì Là Chua Thanh Chuẩn Vị";

    flavorDesc = "Chua thanh dịu nhẹ, thơm nồng thì là, giữ trọn vị ngọt tự nhiên của thịt hải sản";
    recipeDesc = `Món ăn khéo léo sử dụng cà chua tươi để tạo vị chua ngọt tự nhiên, giúp khử sạch vị tanh và tôn lên độ ngọt bùi mọng nước của ${seafoodName}.`;

    items.push(
      { name: "Cà chua chín mọng", amount: "3 - 4 quả (khoảng 250g)" },
      { name: "Hành khô & tỏi băm nhuyễn", amount: "2 củ" },
      { name: "Thì là & hành hoa cắt khúc", amount: "1 nắm nhỏ" },
      { name: "Gia vị (muối, hạt nêm, tiêu sọ, chút đường cân bằng vị)", amount: "Vừa đủ" }
    );

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName} với nước muối loãng hoặc chút gừng đập dập, để thật ráo nước. Cà chua rửa sạch: 2 quả băm nhuyễn để nấu sốt nền, 1-2 quả bổ múi cau.`,
      "Nấu sốt cà chua: Phi thơm hành tỏi băm với 1 muỗng dầu ăn, trút phần cà chua băm vào xào nhừ trên lửa vừa. Nêm 1 thìa nước mắm ngon, 1/2 thìa hạt nêm và 1 thìa đường nhỏ để tạo màu đỏ sánh mịn tự nhiên.",
      `Chế biến hải sản: Tăng lửa lớn, cho ${seafoodName} vào đảo nhanh tay trong 3 - 4 phút để thịt săn giòn và thấm đều sốt. Cho tiếp phần cà chua bổ múi cau vào đảo thêm 1 phút.`,
      "Hoàn thiện: Rắc thì là, hành hoa và tiêu sọ đập dập lên trên, tắt bếp ngay. Bày ra đĩa sâu lòng và thưởng thức nóng cùng cơm trắng hoặc bánh mì.",
    ];

    chefTip = "Khi nấu sốt cà chua với hải sản, nên xào sốt cà chua nhừ sánh trước rồi mới cho hải sản vào nấu trên lửa lớn. Cách này giúp hải sản không bị ra nước làm loãng sốt và giữ trọn độ mọng nước tự nhiên.";
    followUps = [
      "Cách chọn cà chua tươi nhiều bột làm sốt hải sản",
      "Mẹo giữ mực trứng nguyên vẹn không bị vỡ bọc trứng khi xào cà chua",
      "Thời gian xào tôm sú sốt cà chua bao nhiêu phút là chuẩn",
    ];
  } else if (lower.includes("me") || lower.includes("sốt me") || lower.includes("sot me")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Rang Sốt Me Chua Ngọt Hoàng Kim`;
    flavorDesc = "Chua ngọt đậm đà, sốt óng ánh sánh mịn, dậy mùi bơ tỏi và đậu phộng rang";
    recipeDesc = `Hải sản được xào trên lửa lớn hòa quyện cùng cốt me chua thanh, đường phèn và tỏi phi thơm nức mũi.`;

    items.push(
      { name: "Cốt me chua đặc (hoặc me tươi dầm nước ấm)", amount: "4 - 5 muỗng canh" },
      { name: "Đường thốt nốt / đường cát", amount: "2.5 muỗng canh" },
      { name: "Tỏi phi giòn & ớt hiểm băm", amount: "2 củ tỏi + 1 trái ớt" },
      { name: "Đậu phộng rang giã dập & rau răm", amount: "30g" }
    );

    steps = [
      `Sơ chế: ${seafoodName} làm sạch, thấm khô bề mặt. Pha chén nước sốt gồm cốt me, đường, nước mắm ngon và chút ớt băm, khuấy tan đều.`,
      "Nấu sốt me: Phi tỏi băm thơm vàng, đổ hỗn hợp sốt me vào đun sôi lăn tăn trên lửa nhỏ đến khi sốt bắt đầu sánh kẹo lại.",
      `Đảo sốt: Cho ${seafoodName} vào chảo sốt me, bật lửa lớn đảo đều tay trong 3 - 5 phút cho sốt áo đều một lớp bóng mượt quanh từng thớ thịt.`,
      "Trình bày: Gắp ra đĩa, rưới phần sốt me sánh đậm lên trên, rắc đậu phộng rang và rau răm ăn kèm.",
    ];

    chefTip = "Đường thốt nốt hoặc đường phèn giúp nước sốt me có màu cánh gián óng ả và hậu vị ngọt thanh êm dịu hơn hẳn đường trắng thông thường.";
    followUps = ["Bí quyết pha tỷ lệ sốt me bất bại cho hải sản", "Cách làm cua rang me không bị tanh"];
  } else if (lower.includes("phô mai") || lower.includes("pho mai") || lower.includes("cheese")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Đút Lò Phô Mai Bơ Tỏi Kéo Sợi`;
    flavorDesc = "Béo ngậy đậm đà, thơm lừng bơ tỏi, phô mai vàng óng kéo sợi hấp dẫn";
    recipeDesc = `Sự kết hợp hoàn hảo giữa vị ngọt giòn của hải sản MAVY cùng lớp phô mai Mozzarella tan chảy béo ngậy.`;

    items.push(
      { name: "Phô mai Mozzarella hoặc Cheddar", amount: "150g (bào sợi)" },
      { name: "Bơ lạt Anchor / President", amount: "30g" },
      { name: "Tỏi băm & lá mùi tây (parsley) khô", amount: "1 muỗng canh" },
      { name: "Sốt Mayonnaise & sữa tươi không đường", amount: "2 muỗng canh" }
    );

    steps = [
      `Sơ chế: ${seafoodName} sơ chế sạch sẽ, xẻ lưng (nếu là tôm) hoặc tách mai (nếu là cua), xếp ngay ngắn lên khay nướng có lót giấy bạc.`,
      "Trộn sốt phô mai: Làm tan chảy bơ lạt, trộn đều với tỏi băm, mayonnaise, chút sữa tươi và tiêu đen.",
      "Nướng đút lò: Quét đều lớp sốt bơ tỏi lên bề mặt hải sản, phủ kín phô mai Mozzarella lên trên. Nướng ở 200°C trong nồi chiên không dầu hoặc lò nướng khoảng 7-9 phút đến khi phô mai xém vàng.",
      "Thưởng thức: Rắc lá parsley lên bề mặt và dùng ngay khi phô mai còn nóng hổi kéo sợi.",
    ];

    chefTip = "Không nướng phô mai quá lâu ở nhiệt độ thấp vì sẽ làm thịt hải sản bị khô quắt và mất nước. Nên nướng nhiệt cao 200°C trong thời gian ngắn.";
    followUps = ["Nồi chiên không dầu nướng tôm phô mai bao nhiêu phút", "Phô mai nào nướng hải sản ngon nhất"];
  } else if (lower.includes("trứng muối") || lower.includes("trung muoi")) {
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Sốt Trứng Muối Hoàng Kim`;
    flavorDesc = "Bùi béo mằn mặn, sốt sánh vàng mịn màng, thơm ngậy bơ tỏi";
    recipeDesc = `Lớp sốt trứng muối màu vàng hoàng kim áo đều từng con hải sản tạo nên hương vị sang trọng chuẩn nhà hàng 5 sao.`;

    items.push(
      { name: "Lòng đỏ trứng muối", amount: "4 - 5 quả (hấp chín, nghiền mịn)" },
      { name: "Bơ lạt", amount: "30g" },
      { name: "Sữa đặc hoặc whipping cream", amount: "1 muỗng canh" },
      { name: "Tỏi băm & ớt sừng cắt lát", amount: "1 củ tỏi" }
    );

    steps = [
      `Sơ chế: ${seafoodName} làm sạch, thấm khô ráo. Lòng đỏ trứng muối hấp chín với chút rượu trắng khử tanh, sau đó tán nhuyễn mịn.`,
      "Nấu sốt hoàng kim: Đun chảy bơ lạt, phi thơm tỏi băm, cho trứng muối tán nhuyễn vào đảo đều trên lửa nhỏ cùng 1 thìa sữa đặc đến khi sủi bọt mịn.",
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
      { name: "Sa tế tôm thượng hạng", amount: "2 - 3 muỗng canh" },
      { name: "Sả tươi băm nhuyễn & đập dập", amount: "3 nhánh" },
      { name: "Hành tây & ớt chuông", amount: "1 củ nhỏ (cắt múi cau)" },
      { name: "Nước mắm nhĩ, đường, tiêu sọ", amount: "Vừa đủ" }
    );

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName}, để ráo. Ướp sơ với 1 muỗng sa tế và chút nước mắm trong 5 phút.`,
      "Phi sả ớt: Làm nóng chảo, phi thơm sả băm, tỏi và ớt đến khi dậy mùi thơm cay nồng đặc trưng.",
      `Xào nhiệt lớn: Trút ${seafoodName} cùng hành tây vào chảo, đảo trên lửa lớn trong 3-4 phút cho hải sản chín săn giòn và thấm đẫm sa tế.`,
      "Hoàn thiện: Tắt bếp, rắc hành lá cắt khúc và tiêu sọ, thưởng thức nóng cùng cơm trắng.",
    ];

    chefTip = "Xào sa tế bắt buộc phải dùng lửa lớn và đảo thật nhanh tay để giữ được độ giòn ngọt mọng nước bên trong của hải sản.";
    followUps = ["Cách tự làm sa tế hải sản tại nhà", "Mẹo giảm cay khi xào sa tế"];
  } else {
    // Dynamic extraction for custom user inputs
    const rawTokens = input
      .split(/[,+;&\n]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const userAddedItems = rawTokens
      .filter((t) => !t.toLowerCase().includes("hải sản") && !t.toLowerCase().includes("mavy"))
      .map((t) => ({
        name: t.charAt(0).toUpperCase() + t.slice(1),
        amount: "Vừa đủ theo khẩu vị gia đình",
      }));

    if (userAddedItems.length > 0) {
      items.push(...userAddedItems);
    } else {
      items.push(
        { name: "Bơ lạt hoặc dầu ô liu", amount: "30g" },
        { name: "Tỏi tép & sả tươi băm nhuyễn", amount: "2 củ" },
        { name: "Gia vị chuẩn (muối biển, tiêu sọ, chanh)", amount: "Vừa đủ" }
      );
    }

    const ingredientHighlight = userAddedItems.map((i) => i.name).join(" & ") || "Gia Vị Thảo Mộc";
    recipeTitle = `${seafoodName.split(" ")[0]} MAVY Chế Biến Cùng ${ingredientHighlight}`;
    flavorDesc = `Hài hòa cân bằng, dậy mùi thơm của ${ingredientHighlight}, giữ trọn độ mọng nước tự nhiên`;
    recipeDesc = `Công thức được tối ưu hóa riêng để kết hợp ${seafoodName} với ${ingredientHighlight}, tôn vinh vị ngọt biển tự nhiên.`;

    steps = [
      `Sơ chế: Rửa sạch ${seafoodName} với chút nước gừng khử tanh, dùng khăn thấm khô hoàn toàn. Sơ chế sạch sẽ các nguyên liệu (${ingredientHighlight}) và cắt tỉa vừa ăn.`,
      `Chế biến nền: Làm nóng chảo với chút bơ hoặc dầu ăn, phi thơm tỏi hành, sau đó cho các nguyên liệu (${ingredientHighlight}) vào xào thơm trên lửa vừa.`,
      `Xử lý nhiệt độ vàng: Tăng nhiệt độ lên mức cao nhất, cho ${seafoodName} vào đảo nhanh tay trong 3-4 phút đến khi hải sản vừa chín tới, thịt săn chắc và mọng nước.`,
      "Hoàn thiện: Nêm nếm lại vừa ăn, rắc tiêu xay và rau thơm lên bề mặt. Dùng ngay khi còn nóng hổi.",
    ];

    chefTip = "Nguyên tắc vàng của hải sản: Luôn xào/nấu trên lửa lớn trong thời gian vừa đủ. Không nấu quá lâu để tránh làm mất đi độ giòn ngọt mọng nước tự nhiên.";
    followUps = [
      "Cách bảo quản hải sản IQF đúng cách trong ngăn đông",
      "Nhiệt độ cấp đông IQF -40°C giúp giữ dưỡng chất như thế nào",
      "Các loại nước chấm hải sản ngon nhất",
    ];
  }

  const slugId = recipeTitle
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    message: `Bếp Trưởng MAVY đã nghiên cứu và thiết kế công thức thực tế dựa trên chính xác nguyên liệu "${input}" mà bạn đang có trong gian bếp:`,
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
