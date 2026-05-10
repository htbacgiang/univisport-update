import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ContactForm from '../header/ContactForm';
import { FaTimes } from 'react-icons/fa';

export default function ProductQuickViewModal({ slug, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);

  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.product) setProduct(data.product);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [onClose]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder.jpg';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/${imagePath}`;
  };

  const updateSwipers = (index) => {
    setActiveIndex(index);
    if (mainSwiperRef.current) mainSwiperRef.current.slideToLoop(index);
    if (thumbsSwiperRef.current) thumbsSwiperRef.current.slideTo(index);
  };

  const handleColorSelect = (idx) => {
    setSelectedColorIndex(idx);
    updateSwipers(idx);
  };

  const images = product?.colors?.length > 0
    ? product.colors.map(c => c.image)
    : ['/images/placeholder.jpg'];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center  mt-0 justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Đóng"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-[#105d97] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !product ? (
          <div className="flex items-center justify-center h-64 text-gray-500">Không tìm thấy sản phẩm</div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-4 md:p-6">
              <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                loop={images.length > 1}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                onSwiper={(s) => (mainSwiperRef.current = s)}
                className="w-full aspect-square md:aspect-[3/4] rounded-xl overflow-hidden border border-gray-200"
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full aspect-square md:aspect-[3/4] bg-gray-50">
                      <Image
                        src={imageErrors[index] ? '/images/placeholder.jpg' : getImageUrl(src)}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="rounded-xl"
                        priority={index === 0}
                        onError={() => setImageErrors(p => ({ ...p, [index]: true }))}
                        unoptimized={getImageUrl(src).startsWith('http://') || getImageUrl(src).startsWith('https://')}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {images.length > 1 && (
                <div className="mt-3">
                  <Swiper
                    modules={[Navigation, Thumbs]}
                    spaceBetween={8}
                    slidesPerView={4}
                    watchSlidesProgress
                    onSwiper={(s) => { setThumbsSwiper(s); thumbsSwiperRef.current = s; }}
                    className="w-full"
                  >
                    {images.map((src, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className="relative w-full aspect-square cursor-pointer"
                          onClick={() => updateSwipers(index)}
                        >
                          <Image
                            src={imageErrors[index] ? '/images/placeholder.jpg' : getImageUrl(src)}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            className={`rounded-lg border-2 transition-all ${activeIndex === index ? 'border-[#105d97]' : 'border-gray-200 hover:border-gray-400'}`}
                            loading="lazy"
                            onError={() => setImageErrors(p => ({ ...p, [index]: true }))}
                            unoptimized={getImageUrl(src).startsWith('http://') || getImageUrl(src).startsWith('https://')}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col">
              {/* Price */}
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="text-2xl font-bold text-red-500">
                  {product.price?.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice > 0 && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through font-normal">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="text-lg text-gray-900 mb-2 leading-tight">{product.name}</h2>

              {/* SKU */}
              <p className="text-sm text-gray-400 mb-4 hidden md:block">{product.maSanPham || `SP${product.id}`}</p>

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    Màu sắc: <span className="font-medium">{product.colors[selectedColorIndex]?.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, idx) => {
                      const hex1 = color.hex || '#cccccc';
                      const hex2 = color.hex2 || hex1;
                      const isSplit = hex2 !== hex1;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(idx)}
                          aria-label={`Chọn màu ${color.name}`}
                          title={isSplit ? `${hex1} / ${hex2}` : hex1}
                          className={`md:w-9 w-7 h-7 md:h-9 rounded-full border-2 transition-all overflow-hidden ${selectedColorIndex === idx ? 'border-[#f5a623] ring-2 ring-[#f5a623]/30 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                          style={{
                            background: isSplit
                              ? `linear-gradient(90deg, ${hex1} 50%, ${hex2} 50%)`
                              : hex1,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Liên hệ đặt hàng */}
              <div className="mb-4">
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09510] text-white font-semibold py-2.5 px-5 rounded-full transition-colors"
                >
                  Liên hệ nhận báo giá
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {/* View full page link */}
              <Link href={`/san-pham/${slug}`} onClick={onClose}
                className="text-center text-sm text-[#105d97] hover:underline mb-4"
              >
                Xem trang chi tiết sản phẩm →
              </Link>

              {/* Cam kết */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                  <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <p className="text-xs text-gray-700"><span className="font-bold">Đổi, trả miễn phí</span> tại nhà nếu không hài lòng</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                  <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <p className="text-xs text-gray-700">Giao 3-5 ngày, freeship đơn từ 498k</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                  <svg className="w-7 h-7 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <p className="text-xs text-gray-700">Cam kết bảo mật thông tin khách hàng</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#0068ff] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">Za</span>
                  </div>
                  <a href="https://zalo.me/0834204999" target="_blank" rel="noopener noreferrer" className="text-xs text-[#105d97] font-medium hover:underline">
                    Cần tư vấn? Chat ngay!
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {contactOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999999] flex items-center justify-center px-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-center items-center p-4 border-b relative">
              <h3 className="text-[#105d97] font-bold text-base md:text-lg tracking-wide uppercase text-center">
                Đăng ký tư vấn đồng phục Univi
              </h3>
              <button
                onClick={() => setContactOpen(false)}
                className="absolute right-4 text-[#105d97] hover:text-[#0d4c7a] transition-colors rounded-full p-1 hover:rotate-90 duration-300"
                aria-label="Đóng"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <ContactForm source={product ? `Quick View: ${product.name}` : `Quick View (${slug})`} />
          </div>
        </div>
      )}
    </div>
  );
}
