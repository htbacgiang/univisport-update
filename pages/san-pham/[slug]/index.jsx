import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import DefaultLayout from '../../../components/layout/DefaultLayout';
import parse from 'html-react-parser';
import ContactForm from '../../../components/header/ContactForm';
import ProductSlider from '../../../components/univisport/ProductSlider';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import {
  setColorIndex,
  setSize,
  resetSelection,
} from '../../../store/productSlice';
import Gallery from 'react-photo-gallery';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ─── Lightbox Component ──────────────────────────────────────────────────────
function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const photo = photos[currentIndex];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 md:p-3 z-10 transition-colors"
        aria-label="Ảnh trước"
      >
        <FaChevronLeft className="text-xl md:text-2xl" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 md:p-3 z-10 transition-colors"
        aria-label="Ảnh sau"
      >
        <FaChevronRight className="text-xl md:text-2xl" />
      </button>

      <div
        className="relative inline-flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-2 md:-top-7 md:-right-10 bg-gray-600 hover:bg-red-700 text-white rounded-full p-2 md:p-2.5 z-10 transition-colors shadow-lg"
          aria-label="Đóng"
        >
          <FaTimes className="text-base md:text-lg" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={`Ảnh ${currentIndex + 1}`}
          className="max-w-[85vw] max-h-[85vh] md:max-w-[90vw] md:max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}

// ─── Helper: map category slug → tên tiếng Việt ───────────────
// Dùng để hiển thị đúng tên danh mục trong BreadcrumbList schema
const CATEGORY_NAMES = {
  'dong-phuc-gym': 'Đồng Phục Gym',
  'dong-phuc-yoga-pilates': 'Đồng Phục Yoga - Pilates',
  'dong-phuc-pickleball': 'Đồng Phục Pickleball',
  'dong-phuc-ao-gio': 'Đồng Phục Áo Gió',
  'dong-phuc-ao-polo': 'Đồng Phục Áo Polo',
  'dong-phuc-golf-tennis': 'Đồng Phục Golf - Tennis',
  'dong-phuc-chay-bo': 'Đồng Phục Chạy Bộ',
  'dong-phuc-mma': 'Đồng Phục MMA',
  'dong-phuc-cong-so': 'Đồng Phục Công Sở',
  'dong-phuc-team-building': 'Đồng Phục Team Building',
  'dong-phuc-ao-thun': 'Đồng Phục Áo Thun',
  'dong-phuc-le-tan': 'Đồng Phục Lễ Tân',
  'dong-phuc-su-kien': 'Đồng Phục Sự Kiện',
};

// Breadcrumb Component
function Breadcrumb({ product }) {
  const category = product?.category || 'Đồng phục';
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  const productName = product?.name || 'Sản phẩm';
  const categoryNameVN = product?.categoryNameVN || 'Đồng phục';

  return (
    <nav aria-label="Breadcrumb" className="mb-3 mt-[60px] md:mt-[70px]">
      <ol className="flex flex-wrap items-center space-x-1 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-[#105d97] transition-colors">
            Trang chủ
          </Link>
        </li>
        <li><span className="text-gray-400">/</span></li>
        <li>
          <Link
            href={`/san-pham/${categorySlug}`}
            className="hover:text-[#105d97] transition-colors"
          >
            {categoryNameVN}
          </Link>
        </li>
        <li><span className="text-gray-400">/</span></li>
        <li className="text-gray-700 font-medium" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

// StarRating Component
function StarRating({ rating, uniqueId }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex" aria-label={`Được đánh giá ${rating} trên 5 sao`}>
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" role="img" aria-label="Sao đầy">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" role="img" aria-label="Nửa sao">
          <defs>
            <linearGradient id={`${uniqueId}-halfStar`}>
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill={`url(#${uniqueId}-halfStar)`}
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24" role="img" aria-label="Sao trống">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

// Main Component
export default function ProductDetailPage({ product, relatedProducts = [], categorySlug: propCategorySlug = '' }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { colorIndex: selectedColorIndex, size: selectedSize } = useSelector((s) => s.product);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [galleryW, setGalleryW] = useState(0);
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const modalRef = useRef(null);
  const galleryRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((event, { index }) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % (product.gallery?.length || 1));
  }, [product.gallery]);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + (product.gallery?.length || 1)) % (product.gallery?.length || 1));
  }, [product.gallery]);

  const galleryPhotos = useMemo(() => {
    if (!product.gallery || product.gallery.length === 0) return [];
    return product.gallery.map((item, index) => ({
      src: item.src,
      width: item.width || 4,
      height: item.height || 3,
      alt: `${product.name} - gallery ${index + 1}`
    }));
  }, [product.gallery, product.name]);

  // Custom renderer for react-photo-gallery: ensures images fill their frame
  // with correct aspect ratio using object-fit: cover
  const galleryImageRenderer = useCallback(({ index, photo, margin, onClick }) => (
    <div
      key={photo.src}
      style={{
        margin,
        height: photo.height,
        width: photo.width,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '6px',
      }}
      onClick={(e) => onClick(e, { photo, index })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt || ''}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      />
    </div>
  ), []);

  const updateSwipers = useCallback((index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    if (mainSwiperRef.current) mainSwiperRef.current.slideToLoop(index);
    if (thumbsSwiperRef.current) thumbsSwiperRef.current.slideTo(index);
  }, [activeIndex]);

  const handleThumbnailClick = useCallback((index) => {
    updateSwipers(index);
  }, [updateSwipers]);

  const handleMainSlideChange = (swiper) => {
    updateSwipers(swiper.realIndex);
  };

  const handleThumbnailNavigation = (direction) => {
    const len = product?.colors?.length || 1;
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % len
      : (activeIndex - 1 + len) % len;
    updateSwipers(newIndex);
  };

  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;
    const ro = new ResizeObserver(([e]) => setGalleryW(e.contentRect.width));
    ro.observe(galleryRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isFormOpen) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") toggleForm(); };
    const modal = modalRef.current;
    const elems = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = elems?.[0];
    const last = elems?.[elems.length - 1];
    const trapTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    first?.focus();
    modal?.addEventListener("keydown", trapTab);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      modal?.removeEventListener("keydown", trapTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  useEffect(() => {
    dispatch(resetSelection());
  }, [product?.slug, dispatch]);

  if (!router.isReady || !product) {
    return (
      <DefaultLayout>
        <div className="container mx-auto py-8 text-center text-gray-600">Đang tải...</div>
      </DefaultLayout>
    );
  }

  const images = product.colors && product.colors.length > 0
    ? product.colors.map((color) => color.image)
    : ['/images/placeholder.jpg'];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder.jpg';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/${imagePath}`;
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen">
        <div className="container mx-auto py-6 px-4 md:px-0">
          <Breadcrumb product={product} />
          <div className="bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 p-2 lg:px-8">
                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation={false}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={images.length > 1}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  onSlideChange={handleMainSlideChange}
                  onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                  className="w-full aspect-[3/4] lg:aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200"
                  role="region"
                  aria-label="Product image carousel"
                  id="main-swiper"
                >
                  {images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full aspect-[3/4] lg:aspect-square bg-gray-50 overflow-hidden">
                        <Image
                          src={imageErrors[index] ? '/images/placeholder.jpg' : getImageUrl(src)}
                          alt={`${product.name} màu ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          className="rounded-xl transition-all duration-300 hover:scale-[1.02]"
                          priority={index === 0}
                          onError={() => handleImageError(index)}
                          unoptimized={getImageUrl(src).startsWith('http')}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {images.length > 1 && (
                  <div className="relative mt-4">
                    <Swiper
                      modules={[Navigation, Thumbs]}
                      spaceBetween={8}
                      slidesPerView={4}
                      loop={images.length > 1}
                      watchSlidesProgress
                      onSwiper={(swiper) => { setThumbsSwiper(swiper); thumbsSwiperRef.current = swiper; }}
                      className="w-full"
                      role="tablist"
                      id="thumb-swiper"
                    >
                      {images.map((src, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className="relative w-full aspect-square cursor-pointer group"
                            onClick={() => handleThumbnailClick(index)}
                            role="tab"
                            aria-selected={activeIndex === index}
                            aria-label={`Chọn màu ${index + 1}`}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleThumbnailClick(index)}
                          >
                            <Image
                              src={imageErrors[index] ? '/images/placeholder.jpg' : getImageUrl(src)}
                              alt={`${product.name} thumbnail màu ${index + 1}`}
                              fill
                              style={{ objectFit: 'cover', objectPosition: 'center' }}
                              className={`rounded-lg border transition-all duration-200 ${activeIndex === index
                                ? 'border-[#105d97] border-2 shadow-md ring-1 ring-[#105d97]/20'
                                : 'border-gray-200 hover:border-[#105d97]/50 group-hover:shadow-sm'
                                }`}
                              loading="lazy"
                              onError={() => handleImageError(index)}
                              unoptimized={getImageUrl(src).startsWith('http')}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      className="thumb-swiper-button-prev absolute top-1/2 left-[-8px] transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-[#105d97] hover:text-white hover:border-[#105d97] transition-all duration-200"
                      onClick={() => handleThumbnailNavigation('prev')}
                      aria-label="Hình ảnh trước"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      className="thumb-swiper-button-next absolute top-1/2 right-[-8px] transform -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-[#105d97] hover:text-white hover:border-[#105d97] transition-all duration-200"
                      onClick={() => handleThumbnailNavigation('next')}
                      aria-label="Hình ảnh tiếp theo"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="w-full lg:w-1/2 p-2 mt-2 ">
                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                  <span className="text-2xl font-bold text-red-500">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  {product.originalPrice > 0 && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through font-normal">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>
                <h1 className="text-xl text-gray-900 mb-2 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-sm text-gray-400">
                    {product.maSanPham || `SP${product.id}`}
                    {selectedSize ? `-${selectedSize}` : ''}
                  </span>
                  <button
                    className="relative text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Sao chép mã sản phẩm"
                    onClick={() => {
                      const code = `${product.maSanPham || `SP${product.id}`}${selectedSize ? `-${selectedSize}` : ''}`;
                      navigator.clipboard?.writeText(code);
                      setCopyTooltip(true);
                      setTimeout(() => setCopyTooltip(false), 1500);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    {copyTooltip && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Đã sao chép</span>
                    )}
                  </button>
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <p className="text-sm text-gray-700 mb-3">
                      Màu sắc: <span className="font-medium">{product.colors[selectedColorIndex]?.name || ''}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, idx) => {
                        const hex1 = color.hex || '#cccccc';
                        const hex2 = color.hex2 || hex1;
                        const isSplit = hex2 !== hex1;
                        return (
                          <button
                            key={idx}
                            onClick={() => { dispatch(setColorIndex(idx)); updateSwipers(idx); }}
                            aria-label={`Chọn màu ${color.name}`}
                            title={isSplit ? `${hex1} / ${hex2}` : hex1}
                            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 overflow-hidden ${selectedColorIndex === idx ? 'border-[#f5a623] ring-2 ring-[#f5a623]/30 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
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

                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-700">
                      Kích thước: <span className="font-medium">{selectedSize || ''}</span>
                    </p>
                    <button className="text-sm text-[#105d97] hover:underline font-medium">Hướng dẫn chọn size</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL', '2XL', '3XL']).map((size) => (
                      <button
                        key={size}
                        onClick={() => dispatch(setSize(size))}
                        aria-label={`Chọn size ${size}`}
                        className={`min-w-[44px] h-11 px-3 rounded-full text-sm font-medium border-2 transition-all duration-200 ${selectedSize === size ? 'border-[#f5a623] text-[#f5a623]' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={toggleForm}
                    className="w-full flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09510] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Liên hệ nhận báo giá
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold text-gray-900">Univisport cam kết</span>
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                      <svg className="w-8 h-8 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-700"><span className="font-bold">Đổi, trả miễn phí</span> tại nhà nếu không hài lòng</p>
                        <Link href="/chinh-sach-doi-tra" className="text-xs text-[#105d97] hover:underline mt-0.5 inline-block">Xem chính sách ↗</Link>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                      <svg className="w-8 h-8 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <p className="text-sm text-gray-700">Giao trong 3-5 ngày và freeship đơn từ 498k</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                      <svg className="w-8 h-8 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <p className="text-sm text-gray-700">Cam kết bảo mật thông tin khách hàng</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <div className="w-7 h-7 bg-[#0068ff] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Za</span>
                        </div>
                      </div>
                      <a href="https://zalo.me/0834204999" target="_blank" rel="noopener noreferrer" className="text-sm text-[#105d97] font-medium hover:underline self-center">
                        Cần tư vấn thêm? Chat ngay!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Section — Synced with q8design logic */}
          {galleryPhotos.length > 0 && (
            <div className="mt-8 bg-white mx-auto md:px-4 lg:px-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#105d97] rounded-full"></div>
                <h3 className="text-xl font-bold">Thư viện hình ảnh</h3>
                <span className="ml-auto text-xs text-gray-400">{galleryPhotos.length} ảnh</span>
              </div>

              {/* Gallery for both Mobile & Desktop to ensure correct aspect ratios */}
              <div ref={galleryRef}>
                <Gallery
                  photos={galleryPhotos}
                  direction="row"
                  margin={4}
                  targetRowHeight={isDesktop ? 220 : 140} // 140 on mobile is bigger and keeps ratio
                  onClick={openLightbox}
                  renderImage={galleryImageRenderer}
                />
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="mt-6 mx-auto">
            <div className="bg-white md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#105d97] rounded-full"></div>
                <h3 className="text-xl font-bold">Chi tiết sản phẩm</h3>
              </div>
              <div className="relative">
                <div className={`prose blog prose-base md:prose-lg max-w-none text-gray-700 transition-all duration-500 ${!isContentExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
                  <style jsx>{`
                    .blog img { display: block; margin: 1.5em auto; }
                    .blog figure { margin: 1.5em 0; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                    .blog figure img { display: block; margin: 0 auto; }
                    .blog figcaption { margin-top: 0.5em; font-size: 0.875em; color: #6b7280; font-style: italic; text-align: center; width: 100%; max-width: 100%; }
                    .dark .blog figcaption { color: #9ca3af; }
                    .blog :global(table) { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; width: max-content !important; margin: 1.5em auto !important; border-collapse: collapse; border: 1px solid #d1d5db; }
                    .blog :global(td), .blog :global(th) { padding: 0.5em 0.5em; border: 1px solid #d1d5db; text-align: left; vertical-align: top; }
                    .blog :global(th) { background-color: #f3f4f6; font-weight: 600; color: #111827; }
                    .blog :global(td p), .blog :global(th p) { text-align: left !important; margin: 0; }
                    :global(.dark) .blog :global(table) { border-color: #4b5563; }
                    :global(.dark) .blog :global(td), :global(.dark) .blog :global(th) { border-color: #4b5563; }
                    :global(.dark) .blog :global(th) { background-color: #374151; color: #f9fafb; }
                  `}</style>
                  {parse(product.content || '<p class="text-gray-600">Không có thông tin chi tiết sản phẩm.</p>')}
                </div>
                {!isContentExpanded && (
                  <>
                    <div className="absolute bottom-3 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)' }}></div>
                    <div className="relative mt-3 flex justify-center">
                      <button onClick={() => setIsContentExpanded(true)} className="bg-[#105d97] text-white px-4 py-2 rounded-xl hover:bg-[#0e4a7a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5" aria-label="Xem đầy đủ bài viết">
                        Xem chi tiết
                      </button>
                    </div>
                  </>
                )}
                {isContentExpanded && (
                  <div className="mt-3 flex justify-center">
                    <button onClick={() => setIsContentExpanded(false)} className="bg-[#105d97] text-white px-4 py-2 rounded-xl hover:bg-[#0e4a7a] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5" aria-label="Thu gọn bài viết">
                      Thu gọn bài viết
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {relatedProducts && relatedProducts.length > 0 && (
            <ProductSlider title="Sản phẩm liên quan" products={relatedProducts} />
          )}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && toggleForm()}>
            <div ref={modalRef} className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl mx-4" role="dialog" aria-labelledby="contact-form-title">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-[#105d97] to-[#0e4a7a] text-white px-5 py-3.5 flex justify-between items-center">
                  <h2 id="contact-form-title" className="text-lg font-bold">Liên hệ nhận báo giá</h2>
                  <button onClick={toggleForm} aria-label="Đóng" className="text-white/90 hover:text-white hover:bg-white/10 rounded-lg p-1.5 focus:outline-none transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="bg-white"><ContactForm source={`Sản phẩm: ${product.name}`} /></div>
              </div>
            </div>
          </div>
        )}

        {lightboxIndex !== null && (
          <Lightbox
            photos={galleryPhotos.map(p => p.src)}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

// ─── SERVER SIDE PROPS ────────────────────────────────────────
export async function getServerSideProps({ params }) {
  try {
    await db.connectDb();
    const productsData = await Product.find({}).lean() || [];

    const productRaw = productsData.find(p => p.slug === params.slug);
    if (!productRaw) return { notFound: true };

    const product = JSON.parse(JSON.stringify(productRaw));

    const availableProducts = productsData.filter(
      p => p.slug !== product.slug && p.category === product.category
    );
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    const relatedProducts = shuffled.slice(0, 6).map(p => {
      const s = JSON.parse(JSON.stringify(p));
      return {
        id: s.id, name: s.name, price: s.price,
        maxPrice: s.originalPrice || s.maxPrice || s.price,
        discount: s.originalPrice ? Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100) : 0,
        isNew: s.isNew || false,
        colors: Array.isArray(s.colors) ? s.colors.map(c => ({ name: c.name || 'Màu', hex: c.hex || '#000', hex2: c.hex2 || '', image: c.image || '' })) : [],
        image: s.colors?.[0]?.image || s.image || '',
        slug: s.slug || '',
      };
    });

    const defaultImage = '/images/banner-1.webp';
    const productName = product?.name || 'Đồng phục Univi';
    const productDescription = product?.description || 'Đồng phục thể thao chuyên dụng từ Đồng Phục Univi — vải UNI DRY thoát ẩm, kiểm định QCVN 01:2017/BCT, xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội.';
    const productImage = product?.colors?.[0]?.image || product?.image || defaultImage;
    const productCategory = product?.category || 'dong-phuc-gym';

    // ── categorySlug: dùng trực tiếp từ DB (đã là slug), không cần convert
    const categorySlug = productCategory;
    // ── categoryNameVN: dùng map để lấy tên tiếng Việt đúng cho mọi danh mục
    const categoryNameVN = product?.categoryNameVN
      || CATEGORY_NAMES[categorySlug]
      || 'Đồng Phục';

    const meta = {
      title: `${productName} – Đồng phục Univi`,
      description: `${productDescription}`,
      keywords: `${productName}, đồng phục Univi, vải UNI DRY, ${categoryNameVN}, xưởng may đồng phục Hà Nội, kiểm định QCVN, Đồng Phục Univi`,
      author: 'Đồng Phục Univi',
      robots: 'index, follow',
      canonical: `https://dongphucunivi.com/san-pham/${params.slug}`,
      og: {
        title: `${productName} – Đồng phục Univi`,
        description: productDescription,
        type: 'product',
        image: productImage,
        imageWidth: '1200',
        imageHeight: '630',
        imageAlt: `${productName} — ${categoryNameVN} Univi xưởng Đan Phượng, Hà Nội`,
        url: `https://dongphucunivi.com/san-pham/${params.slug}`,
        site_name: 'Đồng Phục Univi',
        locale: 'vi_VN',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} – Đồng phục Univi`,
        description: productDescription,
        image: productImage,
        site: '@UniviOfficial',
      },
      schema: [
        // ✅ Sửa lỗi 1: BreadcrumbList động — đúng cho mọi danh mục
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://dongphucunivi.com' },
            { '@type': 'ListItem', 'position': 2, 'name': categoryNameVN, 'item': `https://dongphucunivi.com/san-pham/${categorySlug}` },
            { '@type': 'ListItem', 'position': 3, 'name': productName, 'item': `https://dongphucunivi.com/san-pham/${params.slug}` },
          ],
        },
        // ✅ Sửa lỗi 3: AggregateRating có guard — chỉ thêm khi có review thật
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `https://dongphucunivi.com/san-pham/${params.slug}#product`,
          'sku': product.maSanPham || `SP${product.id}`,
          'name': productName,
          'brand': {
            '@type': 'Brand',
            'name': 'Đồng Phục Univi',
            '@id': 'https://dongphucunivi.com/#organization',
          },
          'manufacturer': { '@id': 'https://dongphucunivi.com/#organization' },
          'image': productImage,
          'description': productDescription,
          'offers': {
            '@type': 'Offer',
            'url': `https://dongphucunivi.com/san-pham/${params.slug}`,
            'availability': 'https://schema.org/InStock',
            'itemCondition': 'https://schema.org/NewCondition',
            'seller': { '@id': 'https://dongphucunivi.com/#organization' },
            ...(product.price && { 'priceCurrency': 'VND', 'price': product.price }),
          },
          // Chỉ thêm AggregateRating khi có review thật (reviewCount > 0)
          ...(product.reviewCount > 0 && {
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': product.rating,
              'reviewCount': product.reviewCount,
            },
          }),
        },
      ],
    };

    return {
      props: { meta, product, relatedProducts, categorySlug },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
        meta: {
          title: 'Lỗi – Đồng phục Univi',
          description: 'Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.',
        },
      },
    };
  }
}