import { Recipe } from "@/types";

export const FEATURED_RECIPES: Recipe[] = [
  {
    id: "cua-sot-trung-muoi",
    title: "Cua Cà Mau Sốt Trứng Muối Hoàng Kim",
    category: "cua",
    prepTime: "20 phút",
    cookTime: "25 phút",
    difficulty: "Trung bình",
    servings: "2 - 3 người",
    flavorProfile: "Béo ngậy, mặn mà đậm đà, thơm lừng bơ tỏi",
    description:
      "Món ăn đỉnh cao kết hợp vị ngọt chắc của cua Cà Mau cùng sốt trứng muối bùi bùi, ánh vàng hoàng kim óng ả cực kỳ hấp dẫn.",
    ingredients: [
      { name: "Cua Cà Mau MAVY", amount: "2 con (~800g)", isMain: true },
      { name: "Lòng đỏ trứng muối", amount: "5 quả", isMain: true },
      { name: "Bơ lạt", amount: "40g" },
      { name: "Tỏi băm & ớt băm", amount: "2 thìa canh" },
      { name: "Sữa tươi không đường", amount: "50ml" },
      { name: "Gia vị (hạt nêm, đường, tiêu)", amount: "Vừa đủ" },
    ],
    steps: [
      "Sơ chế cua sạch sẽ, tách mai, bẻ đôi thân cua và đập nhẹ càng để ngấm sốt.",
      "Lòng đỏ trứng muối hấp chín, tán nhuyễn mịn cùng 50ml sữa tươi.",
      "Chiên sơ cua với lửa lớn trong 3 phút để thịt săn và giữ độ ngọt.",
      "Phi thơm tỏi bơ, trút sốt trứng muối vào đảo đều đến khi sủi bọt kem mịn.",
      "Cho cua vào đảo đều tay ở lửa nhỏ trong 5 phút để sốt áo đều khắp thân cua. Rắc tiêu và thưởng thức nóng kèm bánh mì!",
    ],
    chefTips:
      "Đập nứt nhẹ vỏ càng cua trước khi xào giúp sốt trứng muối thẩm thấu sâu vào từng thớ thịt cua, làm vị ngọt bùi tăng gấp bội.",
  },
  {
    id: "tom-su-sot-bo-toi",
    title: "Tôm Sú Biển Nướng Sốt Bơ Tỏi Thảo Mộc",
    category: "tom",
    prepTime: "15 phút",
    cookTime: "15 phút",
    difficulty: "Dễ",
    servings: "3 - 4 người",
    flavorProfile: "Thơm nồng bơ tỏi, giòn sần sật, ngọt đậm vị biển",
    description:
      "Tôm sú size VIP tươi rói được chẻ lưng thấm đẫm sốt bơ tỏi vàng óng, quyện cùng lá mùi tây thơm nồng cho bữa tiệc gia đình thêm ấm cúng.",
    ingredients: [
      { name: "Tôm Sú Biển MAVY", amount: "500g (10-12 con)", isMain: true },
      { name: "Bơ lạt chất lượng cao", amount: "50g", isMain: true },
      { name: "Tỏi tươi băm nhuyễn", amount: "3 củ" },
      { name: "Ngò tây (Parsley) hoặc hành lá", amount: "1 nắm nhỏ" },
      { name: "Nước cốt chanh", amount: "1 thìa cà phê" },
      { name: "Tiêu sọ đập dập & muối hồng", amount: "Vừa đủ" },
    ],
    steps: [
      "Tôm sú rửa sạch, cắt bớt râu, dùng kéo rạch dọc sống lưng lấy chỉ đen và mở nhẹ cánh tôm.",
      "Đun chảy bơ ở lửa nhỏ, phi thơm tỏi băm đến khi ngả vàng óng (không để cháy).",
      "Xếp tôm vào chảo hoặc khay nướng (180°C trong 10 phút), rưới đều sốt bơ tỏi lên lưng tôm.",
      "Áp chảo mỗi mặt 3-4 phút đến khi tôm chuyển màu đỏ cam tươi roi rói.",
      "Vắt vài giọt chanh, rắc ngò tây thái nhỏ và tiêu sọ, dùng ngay khi còn nóng hổi.",
    ],
    chefTips:
      "Không nấu tôm quá lâu trên lửa để giữ trọn độ mọng nước và độ giòn đặc trưng của tôm sú biển thiên nhiên.",
  },
  {
    id: "muc-hap-gung-sa",
    title: "Mực Một Nắng Hấp Gừng Sả Lá Chanh",
    category: "muc",
    prepTime: "10 phút",
    cookTime: "12 phút",
    difficulty: "Dễ",
    servings: "2 - 3 người",
    flavorProfile: "Thanh mát, thơm dịu gừng sả, ngọt thanh nguyên bản",
    description:
      "Phương pháp hấp giữ trọn 100% vị ngọt đậm của mực một nắng MAVY, kết hợp hương thơm ấm nồng của sả gừng giúp giải ngấy tuyệt vời.",
    ingredients: [
      { name: "Mực Một Nắng MAVY", amount: "500g (2 con dày mình)", isMain: true },
      { name: "Gừng tươi thái sợi", amount: "1 củ to", isMain: true },
      { name: "Sả cây đập dập cắt khúc", amount: "4 cây", isMain: true },
      { name: "Lá chanh tươi & ớt hiểm", amount: "5 lá" },
      { name: "Rượu trắng", amount: "1 thìa canh (khử tanh)" },
      { name: "Nước mắm gừng ớt chấm kèm", amount: "1 chén" },
    ],
    steps: [
      "Mực rã đông tự nhiên, khía vảy rồng đều mặt thân để mực chín đều và đẹp mắt.",
      "Lót một lớp sả đập dập và gừng thái sợi dưới đáy đĩa hấp.",
      "Đặt mực lên trên, rải thêm gừng, ớt lát và lá chanh vò nhẹ lên bề mặt.",
      "Đun nước sôi bùng rồi cho đĩa mực vào xửng hấp cách thủy trong 8 - 10 phút.",
      "Tắt bếp, gắp mực ra đĩa, cắt khoanh vừa ăn và chấm cùng nước mắm gừng ớt chua cay đậm đà.",
    ],
    chefTips:
      "Chỉ hấp mực đúng 8-10 phút khi nước đã sôi sùng sục. Hấp quá lâu sẽ làm mực mất đi độ giòn ngọt mọng nước tự nhiên.",
  },
  {
    id: "lau-hai-san-mavy",
    title: "Lẩu Hải Sản Đại Dương Tomyum Chua Cay",
    category: "combo",
    prepTime: "25 phút",
    cookTime: "30 phút",
    difficulty: "Trung bình",
    servings: "4 - 6 người",
    flavorProfile: "Chua cay bùng nổ, ngọt thanh từ nước hầm hải sản",
    description:
      "Nồi lẩu hải sản tụ hội đầy đủ bộ 3 Cua Cà Mau - Tôm Sú - Mực MAVY trong làn nước dùng Tomyum Thái chua cay kích thích vị giác.",
    ingredients: [
      { name: "Cua Cà Mau MAVY", amount: "1 con (~400g)", isMain: true },
      { name: "Tôm Sú MAVY", amount: "300g", isMain: true },
      { name: "Mực MAVY", amount: "300g", isMain: true },
      { name: "Nước dừa tươi & xương ống hầm", amount: "1.5 lít" },
      { name: "Gói gia vị sốt Tomyum hoặc sả ớt lá chanh riềng", amount: "1 gói" },
      { name: "Rau muống, nấm kim châm, bắp ngọt", amount: "Ăn kèm" },
    ],
    steps: [
      "Sơ chế cua cắt làm 4, tôm sú tỉa râu, mực khía hoa cắt miếng vừa ăn.",
      "Phi thơm sả riềng ớt băm, xào cà chua thơm rồi đổ nước dừa tươi và nước hầm xương vào đun sôi.",
      "Nêm sốt Tomyum, nước cốt chanh, nước mắm ngon và lá chanh tạo vị chua cay thanh nhẹ.",
      "Khi nước lẩu sôi bùng, thả mai cua và cua vào nấu trước 5 phút để nước dùng ngọt sâu.",
      "Nhúng tôm sú, mực và rau nấm ăn kèm bún tươi hoặc mì gói. Thưởng thức nóng hổi cùng gia đình!",
    ],
    chefTips:
      "Dùng nước dừa tươi thay cho nước lọc khi nấu nước dùng lẩu sẽ làm nổi bật vị ngọt thanh thanh của cua và tôm sú MAVY.",
  },
];
