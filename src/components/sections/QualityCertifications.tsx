"use client";

import { useState, useEffect } from "react";
import { BRAND_INFO } from "@/data/brandInfo";
import {
  IoCheckmarkOutline,
  IoCloseOutline,
  IoStar,
  IoCheckmarkCircleOutline,
  IoChatboxEllipsesOutline,
  IoSend,
  IoPersonOutline,
  IoLocationOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import AnimeCounter from "@/components/ui/AnimeCounter";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackItem {
  id?: string;
  name: string;
  role: string;
  product: string;
  rating: number;
  date: string;
  comment: string;
  isUserSubmitted?: boolean;
}

const INITIAL_TESTIMONIALS: FeedbackItem[] = [
  {
    name: "Chef Hoàng Hải",
    role: "Bếp Trưởng Điều Hành - Khách sạn 5 sao",
    product: "Cua Gạch & Tôm Sú Đông Lạnh",
    rating: 5,
    date: "3 ngày trước",
    comment:
      "Cua Cà Mau và Tôm Sú của MAVY đạt chuẩn gạch son và độ chắc thịt hiếm có. Cấp đông IQF giúp thịt tôm giữ nguyên độ giòn ngọt mọng nước mà không bị bở nát.",
  },
  {
    name: "Chị Minh Thư",
    role: "Quận 7, TP. Hồ Chí Minh",
    product: "Cua Gạch & Mực Trứng Đông Lạnh",
    rating: 5,
    date: "Hôm qua",
    comment:
      "Mực trứng đông lạnh và tôm sú đông lạnh giao tới đóng gói bao bì hút chân không chỉn chu, tươi rói. Cua gạch thì siêu nhiều gạch, dây trói nhẹ tênh đúng như cam kết. Rất an tâm cho bữa ăn gia đình!",
  },
  {
    name: "Anh Tuấn Vũ",
    role: "Cầu Giấy, Hà Nội",
    product: "Combo Lẩu Hải Sản 3 Món",
    rating: 5,
    date: "5 ngày trước",
    comment:
      "Thùng xốp đóng đá gel chuyển ra Hà Nội vẫn còn nguyên độ đông lạnh chuẩn. Nấu lẩu hải sản ngọt nước tự nhiên, khác hẳn hải sản mua ở chợ dân sinh.",
  },
];

export default function QualityCertifications() {
  const comparisonData = [
    {
      criteria: "Trọng lượng dây trói cua",
      mavy: "Dây vải siêu mỏng (< 20g/con), không thấm nước",
      traditional: "Dây ngâm bùn, vải dày nặng 200g - 350g/con",
    },
    {
      criteria: "Bảo quản & Kiểm định",
      mavy: "Cấp đông tiêu chuẩn ≤ -18°C ngay tại bến, không ngâm hóa chất",
      traditional: "Ướp đá cây, có nguy cơ ngâm hàn the/urê giữ màu",
    },
    {
      criteria: "Chất lượng thịt sau nấu",
      mavy: "Chắc nịch, mọng nước, giữ 99% độ giòn ngọt nguyên bản",
      traditional: "Dễ bị bở nát, hao 25% - 40% trọng lượng do ngậm nước",
    },
    {
      criteria: "Chính sách bảo hành",
      mavy: "Bao ăn 1 đổi 1 tận nơi nếu cua ốp nước hoặc tôm không tươi",
      traditional: "Không hỗ trợ đổi trả sau khi rời quầy",
    },
  ];

  // Feedback State with LocalStorage persistence
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(INITIAL_TESTIMONIALS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    product: "Cua Gạch Năm Căn",
    rating: 5,
    comment: "",
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mavy_user_feedbacks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeedbackList([...parsed, ...INITIAL_TESTIMONIALS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.location.trim() || "Khách hàng xác thực",
      product: formData.product,
      rating: formData.rating,
      date: "Vừa xong",
      comment: formData.comment.trim(),
      isUserSubmitted: true,
    };

    const updatedList = [newFeedback, ...feedbackList];
    setFeedbackList(updatedList);

    try {
      const saved = localStorage.getItem("mavy_user_feedbacks");
      const currentSaved: FeedbackItem[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem("mavy_user_feedbacks", JSON.stringify([newFeedback, ...currentSaved]));
    } catch {
      // ignore
    }

    setSubmittedSuccess(true);
    setFormData({
      name: "",
      location: "",
      product: "Cua Gạch Năm Căn",
      rating: 5,
      comment: "",
    });

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 3500);
  };

  return (
    <section id="standards" className="py-20 bg-navy-900 border-t border-navy-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3.5 py-1 rounded-full bg-navy-800 border border-navy-700 text-coral text-xs font-semibold uppercase tracking-wider">
            Tiêu Chuẩn & Đo Lường Thực Tế
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight pb-2">
            <span className="block leading-tight">Minh Bạch Chất Lượng</span>
            <span className="block text-coral leading-tight mt-2.5 sm:mt-3.5">
              Từ Biển Sạch Đến Bàn Ăn
            </span>
          </h2>
          <p className="text-sm sm:text-base text-ink-light/80 leading-relaxed font-normal">
            Chúng tôi xóa bỏ hoàn toàn các vấn nạn cố hữu của chợ truyền thống: gian lận dây trói, ướp hóa chất bảo quản và từ chối bảo hành.
          </p>
        </div>

        {/* Social Proof Real-Time Metrics Overview Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <AnimeCounter targetValue={128450} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Đơn Hàng Đã Bán</div>
            <p className="text-[11px] text-ink-light/60">Giao hỏa tốc 2H toàn quốc</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <AnimeCounter targetValue={15820} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Đánh Giá & Feedback</div>
            <p className="text-[11px] text-ink-light/60">Hình ảnh & video thực tế từ khách</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <span>99.4%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Khách Hàng Hài Lòng</div>
            <p className="text-[11px] text-ink-light/60">Tỷ lệ tái đặt hàng trên 85%</p>
          </div>

          <div className="glass-dark-card rounded-2xl p-5 sm:p-6 text-center space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral">
              <span>&lt; 2 Phút</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Tốc Độ Phản Hồi</div>
            <p className="text-[11px] text-ink-light/60">Tư vấn Zalo & Bảo hành 1 đổi 1</p>
          </div>
        </div>

        {/* Comparison Table: MAVY vs Chợ Truyền Thống */}
        <div className="glass-dark-card rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 bg-white/[0.04] border-b border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">Bảng Đối Chiếu Tiêu Chuẩn Minh Bạch</h3>
              <p className="text-xs text-ink-light/70">So sánh trực tiếp giữa quy chuẩn MAVY Seafood và hải sản trôi nổi</p>
            </div>
            <span className="text-xs text-coral font-semibold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              Cam kết bằng văn bản
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            <div className="grid grid-cols-12 p-4 text-xs font-bold text-ink-light/60 uppercase tracking-wider bg-white/[0.02]">
              <div className="col-span-4 sm:col-span-3">Tiêu Chí</div>
              <div className="col-span-4 sm:col-span-5 text-coral font-bold">Quy Chuẩn MAVY Seafood</div>
              <div className="col-span-4 sm:col-span-4 text-rose-400/80">Hải Sản Chợ Truyền Thống</div>
            </div>

            {comparisonData.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm items-center hover:bg-white/[0.03] transition-colors">
                <div className="col-span-4 sm:col-span-3 font-semibold text-white pr-2">
                  {item.criteria}
                </div>
                <div className="col-span-4 sm:col-span-5 text-ink-light flex items-start gap-2 pr-2">
                  <IoCheckmarkOutline className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span className="font-medium text-white">{item.mavy}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-ink-light/60 flex items-start gap-2">
                  <IoCloseOutline className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quality Certifications Badges */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Hệ Thống Chứng Nhận & Kiểm Định Quốc Tế
            </h3>
            <p className="text-xs sm:text-sm text-ink-light/70">
              Mỗi lô hàng đều có mã truy xuất nguồn gốc và giấy kiểm định an toàn vệ sinh thực phẩm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_INFO.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="glass-dark-card glass-dark-card-hover p-6 rounded-2xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] text-coral flex items-center justify-center font-mono font-bold text-xs border border-white/10">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-coral font-mono">{cert.code}</p>
                  <p className="text-xs text-ink-light/70 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-[11px] text-ink-light/60">
                  Kiểm định định kỳ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Testimonials Grid with Verified Proof & User Feedback Box */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 text-sm">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <span className="text-white font-bold text-xs ml-1.5">4.9 / 5.0 (15.820+ Đánh Giá)</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Phản Hồi & Đánh Giá Từ Khách Hàng
              </h3>
              <p className="text-xs text-ink-light/70">
                Ý kiến thực tế từ những khách hàng đã trải nghiệm hải sản tự nhiên MAVY.
              </p>
            </div>

            {/* Write Feedback Action Trigger */}
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-2.5 rounded-xl bg-coral text-navy-950 font-bold text-xs hover:bg-coral-hover transition-colors shadow flex items-center gap-2 cursor-pointer shrink-0"
            >
              <IoChatboxEllipsesOutline className="w-4 h-4" />
              <span>{isFormOpen ? "Thu Gọn Form" : "Viết Đánh Giá Của Bạn"}</span>
            </button>
          </div>

          {/* Interactive User Feedback Submission Form */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="glass-dark-card rounded-3xl p-6 sm:p-8 border border-coral/30 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>Gửi Phản Hồi Về Trải Nghiệm Mua Hàng</span>
                      </h4>
                      <p className="text-xs text-ink-light/60 mt-0.5">
                        Đánh giá của bạn sẽ hiển thị công khai để chia sẻ cùng cộng đồng ẩm thực.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="p-1 rounded-lg text-ink-light/60 hover:text-white transition-colors"
                      aria-label="Đóng form"
                    >
                      <IoCloseOutline className="w-5 h-5" />
                    </button>
                  </div>

                  {submittedSuccess ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 rounded-2xl bg-white/[0.04] border border-coral/40 text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-coral/20 text-coral flex items-center justify-center mx-auto">
                        <IoCheckmarkCircleOutline className="w-7 h-7" />
                      </div>
                      <h5 className="text-base font-bold text-white">Cảm ơn bạn đã gửi đánh giá!</h5>
                      <p className="text-xs text-ink-light/80 max-w-md mx-auto">
                        Phản hồi của bạn đã được ghi nhận và hiển thị ngay trên bảng tin đánh giá. MAVY luôn lắng nghe để nâng cao chất lượng mỗi ngày!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitFeedback} className="space-y-5">
                      {/* Rating Selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ink-light/90 block">
                          Chấm điểm chất lượng:
                        </label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="text-2xl transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                              aria-label={`${star} sao`}
                            >
                              <IoStar
                                className={`${
                                  (hoverRating !== null ? star <= hoverRating : star <= formData.rating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-white/20"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-coral ml-2">
                            {formData.rating === 5
                              ? "5/5 - Xuất Sắc"
                              : formData.rating === 4
                              ? "4/5 - Rất Hài Lòng"
                              : formData.rating === 3
                              ? "3/5 - Bình Thường"
                              : `${formData.rating}/5`}
                          </span>
                        </div>
                      </div>

                      {/* Inputs Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-ink-light/80 flex items-center gap-1">
                            <IoPersonOutline className="w-3.5 h-3.5 text-coral" />
                            <span>Tên của bạn *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="VD: Chị Hồng Anh"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-ink-light/30 focus:outline-none focus:border-coral transition-colors"
                          />
                        </div>

                        {/* Location/Role Input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-ink-light/80 flex items-center gap-1">
                            <IoLocationOutline className="w-3.5 h-3.5 text-coral" />
                            <span>Khu vực / Quận</span>
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="VD: TP. Thủ Đức, TP.HCM"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-ink-light/30 focus:outline-none focus:border-coral transition-colors"
                          />
                        </div>

                        {/* Product Selector */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-ink-light/80 flex items-center gap-1">
                            <IoPricetagOutline className="w-3.5 h-3.5 text-coral" />
                            <span>Sản phẩm đã dùng</span>
                          </label>
                          <select
                            value={formData.product}
                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:border-coral transition-colors cursor-pointer"
                          >
                            <option value="Cua Gạch Năm Căn">Cua Gạch Năm Căn</option>
                            <option value="Tôm Sú Đông Lạnh IQF">Tôm Sú Đông Lạnh IQF</option>
                            <option value="Mực Trứng Đông Lạnh">Mực Trứng Đông Lạnh</option>
                            <option value="Combo Hải Sản Gia Đình">Combo Hải Sản Gia Đình</option>
                          </select>
                        </div>
                      </div>

                      {/* Comment Area */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-ink-light/80 block">
                          Nội dung đánh giá & cảm nhận thực tế *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.comment}
                          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                          placeholder="Chia sẻ cảm nhận của bạn về độ tươi ngọt, độ chắc thịt, quy cách đóng gói và tốc độ giao hàng..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-ink-light/30 focus:outline-none focus:border-coral transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white/[0.04] text-xs font-semibold text-ink-light hover:bg-white/10 transition-colors"
                        >
                          Hủy bỏ
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-coral text-navy-950 font-bold text-xs hover:bg-coral-hover transition-colors shadow flex items-center gap-2 cursor-pointer"
                        >
                          <IoSend className="w-3.5 h-3.5" />
                          <span>Gửi Đánh Giá Ngay</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Testimonials List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbackList.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`glass-dark-card glass-dark-card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md relative ${
                  item.isUserSubmitted ? "border-coral/40 bg-white/[0.06]" : ""
                }`}
              >
                <div className="space-y-3">
                  {/* Rating Stars & Verified Buyer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {[...Array(item.rating)].map((_, i) => (
                        <IoStar key={i} />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-coral font-medium">
                      <IoCheckmarkCircleOutline className="w-3.5 h-3.5" />
                      <span>{item.isUserSubmitted ? "Đánh giá mới" : "Đã mua hàng"}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-light/90 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] text-ink-light/50 flex justify-between">
                    <span>Đã mua: <strong className="text-ink-light/80">{item.product}</strong></span>
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 text-white flex items-center justify-center font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{item.name}</h5>
                      <p className="text-[11px] text-coral">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
