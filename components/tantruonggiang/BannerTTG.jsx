import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FaArrowLeft, FaArrowRight, FaChevronRight } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const modalRef = useRef(null);

  const slides = [
    {
      image: "/images/slide-01.webp",
      mobileImage: "/images/slide-01.jpg",
      smallHeading: "ĐỒNG PHỤC HUẤN LUYỆN VIÊN",
      heading: "Chuyên nghiệp & Phong cách",
      description:
        "Không chỉ tối đa hiệu suất tập luyện mà còn là biểu tượng của một hệ thống chuyên nghiệp",
      collectionLink: "/san-pham",
    },
    {
      image: "/images/slide-03.webp",
      mobileImage: "/images/slide-03.jpg",
      smallHeading: "ĐỒNG PHỤC THỂ THAO",
      heading: "Năng Động & Sáng Tạo",
      description:
        "Bộ sưu tập đồng phục thể thao Univi đa dạng bộ môn, thiết kế theo ý tưởng riêng của các đội nhóm",
      collectionLink: "/san-pham",
    },
    {
      image: "/images/slide-02.webp",
      mobileImage: "/images/slide-02.jpg",
      smallHeading: "GIẢI PHÁP SMART SPORT UNIFORM",
      heading: "Cho Các Phòng Tập",
      description:
        "Được đánh giá cao nhờ tính ứng dụng vượt trội, tối ưu hiệu suất tập luyện. BST 2S Uniform không chỉ tạo sự đồng bộ thương hiệu mà còn mang đến diện mạo trẻ trung, năng động.",
      collectionLink: "/san-pham",
    },
  ];

  const changeSlide = useCallback((newIndex) => {
    if (animating) return;
    setAnimating(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setAnimating(false), 700);
  }, [animating]);

  useEffect(() => {
    if (isPaused || isFormOpen) return;
    const interval = setInterval(() => {
      changeSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length, isPaused, isFormOpen, changeSlide]);

  const goToPreviousSlide = useCallback(() => {
    changeSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }, [currentSlide, slides.length, changeSlide]);

  const goToNextSlide = useCallback(() => {
    changeSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, changeSlide]);

  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFormOpen) return;
      if (e.key === "ArrowLeft") goToPreviousSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide, isFormOpen]);

  useEffect(() => {
    if (!isFormOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") toggleForm(); };
    const modal = modalRef.current;
    const elems = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = elems[0];
    const last = elems[elems.length - 1];
    const trapTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    first?.focus();
    modal.addEventListener("keydown", trapTab);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      modal.removeEventListener("keydown", trapTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  return (
    <>
      <Head>
        {slides.map((slide, index) => (
          <link key={`preload-desktop-${index}`} rel="preload" as="image" href={slide.image} media="(min-width: 640px)" />
        ))}
        {slides.map((slide, index) => (
          <link key={`preload-mobile-${index}`} rel="preload" as="image" href={slide.mobileImage || slide.image} media="(max-width: 639px)" />
        ))}
      </Head>
      <div className="h-[70px]"></div>
      <section
        className="banner-ttg relative overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        {/* Background images - crossfade */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 0.8s ease",
              zIndex: currentSlide === index ? 1 : 0,
            }}
          >
            {/* Desktop Image */}
            <Image
              src={slide.image}
              alt={slide.smallHeading}
              fill
              className={`hidden sm:block ${currentSlide === index ? "slide-img-enter" : ""}`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={100}
              priority={index === 0}
              sizes="100vw"
            />
            {/* Mobile Image */}
            <Image
              src={slide.mobileImage || slide.image}
              alt={slide.smallHeading}
              fill
              className={`block sm:hidden ${currentSlide === index ? "slide-img-enter" : ""}`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={100}
              priority={index === 0}
              sizes="100vw"
            />
            {/* Gradient overlay mobile: full ảnh */}
            <div
              className="absolute inset-0 block sm:hidden"
              style={{ background: "rgba(0,0,0,0.45)" }}
            />
            {/* Gradient overlay desktop */}
            <div
              className="absolute inset-0 hidden sm:block"
              style={{
                background: index === 1
                  ? "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 80%)"
                  : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 80%)",
              }}
            />
          </div>
        ))}

        {/* Content - bên trái hoặc chính giữa */}
        <div className={`absolute inset-0 flex items-center z-10 justify-center text-center ${currentSlide === 1 ? "sm:justify-center sm:text-center" : "sm:justify-start sm:text-left"}`}>
          <div
            className={currentSlide === 1 ? "px-5" : "px-5 sm:px-10 md:pl-24 mb-4 sm:mb-0"}
            style={{ maxWidth: currentSlide === 1 ? "800px" : "" }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${currentSlide === index ? "content-enter" : ""} flex flex-col items-center ${index === 1 ? "sm:items-center" : "sm:items-start"}`}
                style={{ display: currentSlide === index ? "block" : "none" }}
              >
                <p
                  className="line1 text-white font-semibold uppercase mb-1 sm:mb-3 md:mb-4 mt-2"
                  style={{
                    opacity: 0,
                    fontSize: "clamp(0.6rem, 1.1vw, 0.82rem)",
                    letterSpacing: "0.18em",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {slide.smallHeading}
                </p>
                <span
                  className="line2 text-white font-bold mb-2  md:mb-4 text-base md:text-[2.1rem] uppercase block"
                  style={{
                    opacity: 0,
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                    lineHeight: 1.15,
                  }}
                >
                  {slide.heading}
                </span>
                <p
                  className="line3 hidden md:block text-white/90 leading-relaxed mb-1 md:mb-4"
                  style={{
                    opacity: 0,
                    fontSize: "clamp(0.72rem, 1.3vw, 1rem)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  {slide.description}
                </p>
                <div className={`line4 flex flex-wrap gap-2 sm:gap-3 justify-center ${index === 1 ? "" : "sm:justify-start"}`} style={{ opacity: 0 }}>
                  <a href={slide.collectionLink} className="btn-shop">
                    Mua Ngay <FaChevronRight size={10} />
                  </a>
                  <button onClick={toggleForm} className="btn-contact">
                    Liên Hệ Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow trái */}
        <div className="absolute inset-y-0 left-5 flex items-center z-20">
          <button onClick={goToPreviousSlide} className="nav-arrow" aria-label="Slide trước">
            <FaArrowLeft className="text-white text-lg" />
          </button>
        </div>

        {/* Arrow phải */}
        <div className="absolute inset-y-0 right-5 flex items-center z-20">
          <button onClick={goToNextSlide} className="nav-arrow" aria-label="Slide tiếp theo">
            <FaArrowRight className="text-white text-lg" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot-nav ${currentSlide === idx ? "active" : ""}`}
              onClick={() => changeSlide(idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Modal liên hệ */}
        {isFormOpen && (
          <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && toggleForm()}
          >
            <div
              ref={modalRef}
              className="modal-content rounded-lg overflow-hidden"
            >

              <div className="bg-white px-6 py-4 flex justify-center items-center border-b rounded-t-lg relative">
                <h3 className="text-[#105d97] font-bold text-base md:text-lg tracking-wide uppercase text-center">
                  Đăng ký tư vấn đồng phục Univi
                </h3>

                <button
                  onClick={toggleForm}
                  aria-label="Đóng form liên hệ"
                  className="absolute right-4 text-[#105d97] hover:text-[#0d4c7a] focus:outline-none rounded-full p-2 transition-all hover:rotate-90 duration-300 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-white">
                <ContactForm />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
