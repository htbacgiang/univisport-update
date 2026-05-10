"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactForm({ source }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    service: "dong-phuc-univi",
    source: source || "",
  });
  const [resolvedSource, setResolvedSource] = useState(source || "");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0987654321)";
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (formData.message.length > 500)
      newErrors.message = "Tin nhắn không được vượt quá 500 ký tự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto-detect trang nguồn nếu không được truyền qua prop
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (source) {
      setResolvedSource(source);
    } else {
      // Dùng pathname thay vì title+URL để gọn trong admin (VD: /san-pham/ao-gym)
      setResolvedSource(window.location.pathname || window.location.href);
    }
  }, [source]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;
    if (rightSection) observer.observe(rightSection);
    if (leftSection && window.innerWidth >= 768) observer.observe(leftSection);
    return () => {
      if (rightSection) observer.unobserve(rightSection);
      if (leftSection) observer.unobserve(leftSection);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: resolvedSource }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");
        setFormData({ name: "", phone: "", email: "", message: "", service: "dong-phuc-univi", source: source || "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        throw new Error(result.message || "Không thể gửi yêu cầu");
      }
    } catch {
      setStatus("Lỗi: Vui lòng thử lại hoặc liên hệ qua hotline.");
    }
  };

  const inputBase =
    "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#105d97]/40 focus:border-[#105d97]";

  return (
    <div className="relative">
      <div className="max-w-8xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — info panel */}
            <div
              ref={leftSectionRef}
              className="hidden md:flex flex-col justify-center gap-5 px-8 py-10 bg-gradient-to-br from-[#105d97] to-[#0d4a7a] text-white"
            >
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-200 mb-2">
                  Tư vấn miễn phí
                </span>
                <h2 className="text-2xl font-extrabold leading-snug">
                  Nâng tầm phong cách với Đồng phục Univi
                </h2>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Trang phục thể thao chất lượng cao cho gym, yoga, chạy bộ và golf. Công nghệ UNI DRY thoáng khí, chất liệu an toàn — thoải mái và hiệu suất tối ưu.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Thiết kế riêng theo yêu cầu",
                  "Báo giá nhanh trong 24h",
                  "Hỗ trợ mẫu thử trước khi sản xuất",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-blue-50">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div ref={rightSectionRef} className="opacity-0 px-6 sm:px-8 py-8 sm:py-10">
              <h3 className="text-base font-bold text-gray-800 mb-5">
                Điền thông tin để được tư vấn
              </h3>
              <form
                onSubmit={handleSubmit}
                className="space-y-3.5"
                role="form"
                aria-label="Form đăng ký tư vấn đồng phục Univi"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên *"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${inputBase} ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-xs mt-1 pl-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại *"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`${inputBase} ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-1 pl-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (tùy chọn)"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputBase} ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mô tả yêu cầu của bạn (loại đồng phục, số lượng…) (tùy chọn)"
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${inputBase} h-28 resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    <span className="absolute bottom-2.5 right-3 text-xs text-gray-400 pointer-events-none">
                      {formData.message.length}/500
                    </span>
                  </div>
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-xs mt-1 pl-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "Đang gửi..."}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#105d97] to-[#1a7ac4] hover:from-[#0d4a7a] hover:to-[#105d97] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                  aria-disabled={status === "Đang gửi..."}
                >
                  {status === "Đang gửi..." ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                      Đang gửi...
                    </>
                  ) : (
                    "Đăng ký tư vấn →"
                  )}
                </button>
              </form>

              {status && status !== "Đang gửi..." && (
                <p
                  className={`mt-3 text-center text-sm font-medium rounded-lg py-2 px-3 ${status.includes("thành công")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                    }`}
                >
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .opacity-0 {
          opacity: 0;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .opacity-0 { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
