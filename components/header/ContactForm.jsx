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
  const formRef = useRef(null);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (source) {
      setResolvedSource(source);
    } else {
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
    if (formRef.current) observer.observe(formRef.current);
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
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
        setStatus("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");
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
    "w-full bg-transparent border-0 border-b border-[#d1cfc8] pb-2 text-gray-800 placeholder-gray-600 transition-all duration-200 focus:outline-none focus:border-[#105d97] focus:ring-0 rounded-none text-[14px]";

  return (
    <div className="bg-white py-8 md:px-10 px-5 font-sans">
      <div className="max-w-lg mx-auto opacity-0" ref={formRef}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-[#105d97] font-bold text-xs tracking-widest uppercase">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#105d97] inline-block"></span>
            Tư vấn miễn phí
          </div>
          <h2 className="text-xl md:text-2xl font-normal text-[#1a1a1a] mb-1.5 uppercase tracking-tight leading-tight">
            Điền thông tin để được tư vấn
          </h2>
          <p className="text-gray-600 text-[13px]">
            Thông tin của bạn sẽ được bảo mật. Các trường bắt buộc được đánh dấu <span className="text-red-500 font-bold">*</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" role="form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="relative pt-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className={`peer ${inputBase} ${errors.name ? "border-red-400" : ""}`}
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-2 text-gray-500 text-[14px] transition-all duration-200 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-[#105d97] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Họ và tên <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <div className="relative pt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={`peer ${inputBase} ${errors.email ? "border-red-400" : ""}`}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-2 text-gray-500 text-[14px] transition-all duration-200 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-[#105d97] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Email (tùy chọn)
                </label>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div className="relative pt-2">
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className={`peer ${inputBase} ${errors.phone ? "border-red-400" : ""}`}
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-2 text-gray-500 text-[14px] transition-all duration-200 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-[#105d97] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <div className="relative pt-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className={`peer ${inputBase} h-10 resize-y ${errors.message ? "border-red-400" : ""}`}
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-2 text-gray-500 text-[14px] transition-all duration-200 pointer-events-none peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-[#105d97] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Mô tả yêu cầu của bạn (loại đồng phục, số lượng…) (tùy chọn)
              </label>
            </div>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "Đang gửi..."}
            className="bg-[#105d97] hover:bg-[#0d4a7a] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2.5 w-max"
          >
            {status === "Đang gửi..." ? "Đang gửi..." : "Đăng ký tư vấn"}
            {status !== "Đang gửi..." && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </form>

        {status && status !== "Đang gửi..." && (
          <p className={`mt-6 text-sm font-medium p-4 border-l-4 ${status.includes("thành công") ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
            }`}>
            {status}
          </p>
        )}
      </div>

      <style jsx>{`
        .opacity-0 {
          opacity: 0;
        }
        .slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .opacity-0 { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
