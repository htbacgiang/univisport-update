import ProductCard from './ProductCard';
import DefaultLayout2 from '../layout/DefaultLayout2';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import BannerCarousel from './BannerCarousel';

const SIDEBAR_CATEGORIES = [
  ['dong-phuc-gym', 'Đồng phục Gym'],
  ['dong-phuc-yoga-pilates', 'Đồng phục Yoga - Pilates'],
  ['dong-phuc-pickleball', 'Đồng phục Pickleball'],
  ['dong-phuc-chay-bo', 'Đồng phục Chạy bộ'],
  ['dong-phuc-mma', 'Đồng phục MMA'],
  ['dong-phuc-golf-tennis', 'Đồng phục Golf - Tennis'],
  ['dong-phuc-ao-polo', 'Đồng phục áo Polo'],
  ['dong-phuc-cong-so', 'Đồng phục công sở'],
  ['dong-phuc-team-building', 'Đồng phục Team building'],
  ['dong-phuc-ao-gio', 'Đồng phục Áo gió'],
  ['dong-phuc-ao-thun', 'Đồng phục Áo thun'],
  ['dong-phuc-le-tan', 'Đồng phục Lễ tân'],
  ['dong-phuc-su-kien', 'Đồng phục Sự kiện'],
];

const PRICE_RANGES = [
  { label: 'Tất cả', min: 0, max: Infinity },
  { label: 'Dưới 100.000₫', min: 0, max: 100000 },
  { label: '100.000₫ – 200.000₫', min: 100000, max: 200000 },
  { label: '200.000₫ – 300.000₫', min: 200000, max: 300000 },
  { label: 'Trên 300.000₫', min: 300000, max: Infinity },
];

export default function
  CategoryPageTemplate({ categorySlug, initialProducts, categoryCounts = {}, ArticleComponent }) {
  const safeProducts = Array.isArray(initialProducts) ? initialProducts : [];
  const displayCategory =
    SIDEBAR_CATEGORIES.find(([slug]) => slug === categorySlug)?.[1] ||
    categorySlug.replace(/-/g, ' ').toUpperCase();

  const [products, setProducts] = useState(safeProducts);
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllCats, setShowAllCats] = useState(false);

  // Danh mục có sản phẩm luôn hiển thị; danh mục = 0 ẩn (trừ danh mục đang active)
  const visibleCats = SIDEBAR_CATEGORIES.filter(
    ([slug]) => (categoryCounts[slug] ?? 0) > 0 || slug === categorySlug
  );
  const hiddenCats = SIDEBAR_CATEGORIES.filter(
    ([slug]) => (categoryCounts[slug] ?? 0) === 0 && slug !== categorySlug
  );
  const displayedCats = showAllCats ? SIDEBAR_CATEGORIES : visibleCats;

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const applyFilters = (sort, rangeIdx) => {
    const range = PRICE_RANGES[rangeIdx];
    let filtered = safeProducts.filter((p) => {
      const price = p.maxPrice || p.price || 0;
      return price >= range.min && price <= range.max;
    });
    if (sort === 'price-asc') filtered.sort((a, b) => (a.maxPrice || a.price) - (b.maxPrice || b.price));
    else if (sort === 'price-desc') filtered.sort((a, b) => (b.maxPrice || b.price) - (a.maxPrice || a.price));
    else if (sort === 'oldest') filtered.sort((a, b) => (a.id > b.id ? 1 : -1));
    else if (sort === 'newest') filtered.sort((a, b) => (a.id > b.id ? -1 : 1));
    setProducts(filtered);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    applyFilters(option, priceRangeIdx);
  };

  const handlePriceRange = (idx) => {
    setPriceRangeIdx(idx);
    applyFilters(sortOption, idx);
  };

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const fromItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const toItem = Math.min(currentPage * itemsPerPage, totalItems);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${displayCategory} - Đồng phục Univi`,
    url: `https://dongphucunivi.com/san-pham/${categorySlug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://dongphucunivi.com/' },
        { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://dongphucunivi.com/san-pham' },
        { '@type': 'ListItem', position: 3, name: displayCategory, item: `https://dongphucunivi.com/san-pham/${categorySlug}` },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: product.name,
        url: `https://dongphucunivi.com/san-pham/${product.slug}`,
        image: product.image,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.maxPrice || product.price,
          priceCurrency: 'VND',
          availability: 'https://schema.org/InStock',
        },
      })),
    },
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    const btnBase = 'w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md';
    const btnDefault = `${btnBase} text-gray-600 bg-white border border-gray-300 hover:bg-[#105d97] hover:text-white hover:border-[#105d97]`;
    const btnActive = `${btnBase} bg-[#105d97] text-white border-[#105d97] shadow-lg`;
    const navBtn =
      'w-10 h-10 flex items-center justify-center text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-[#105d97] hover:text-white hover:border-[#105d97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-300 transition-all duration-200 shadow-sm';

    const pages = [];
    if (start > 1) {
      pages.push(<button key={1} onClick={() => setCurrentPage(1)} className={btnDefault}>1</button>);
      if (start > 2) pages.push(<span key="s-ellipsis" className="flex items-center justify-center w-10 h-10 text-gray-400 font-medium">...</span>);
    }
    for (let i = start; i <= end; i++) {
      pages.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? btnActive : btnDefault}>{i}</button>
      );
    }
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push(<span key="e-ellipsis" className="flex items-center justify-center w-10 h-10 text-gray-400 font-medium">...</span>);
      pages.push(<button key={totalPages} onClick={() => setCurrentPage(totalPages)} className={btnDefault}>{totalPages}</button>);
    }

    return (
      <div className="flex justify-center items-center mt-8 mb-6 relative z-10">
        <nav className="flex items-center space-x-1 p-2">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className={navBtn} aria-label="Trang trước">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-1 px-2">{pages}</div>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={navBtn} aria-label="Trang tiếp theo">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    );
  };

  return (
    <DefaultLayout2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="h-[70px]"></div>

      <div className="p-4 md:p-6 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Mobile Drawer ── */}
          {/* Backdrop — z-[9998] chặn toàn bộ tương tác bên ngoài */}
          <div
            className={`fixed inset-0 bg-black/50 z-[9998] lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer panel — z-[9999] đè lên tất cả */}
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-white z-[9999] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="font-bold text-gray-800 text-base">Lọc sản phẩm</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Đóng bộ lọc"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              {/* Danh mục */}
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">
                  Danh mục
                </h3>
                <ul className="space-y-0.5">
                  {displayedCats.map(([slug, name]) => {
                    const isActive = slug === categorySlug;
                    const count = categoryCounts[slug] ?? null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/san-pham/${slug}`}
                          onClick={() => setIsSidebarOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center justify-between py-2 px-2 rounded text-sm transition-colors ${isActive
                            ? 'text-blue-700 font-semibold bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                          <span>{name}</span>
                          {count !== null && (
                            <span className="text-gray-400 text-xs">({count})</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {hiddenCats.length > 0 && (
                  <button
                    onClick={() => setShowAllCats((v) => !v)}
                    className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {showAllCats ? (
                      <><ChevronUp className="w-3.5 h-3.5" /> Rút gọn</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5" /> Xem thêm ({hiddenCats.length})</>
                    )}
                  </button>
                )}
              </div>

              {/* Lọc theo giá */}
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">
                  Lọc theo giá
                </h3>
                <ul className="space-y-2">
                  {PRICE_RANGES.map((range, idx) => (
                    <li key={idx}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRangeMobile"
                          checked={priceRangeIdx === idx}
                          onChange={() => handlePriceRange(idx)}
                          className="accent-blue-600 w-4 h-4 cursor-pointer"
                        />
                        <span className={`text-sm transition-colors ${priceRangeIdx === idx
                          ? 'text-blue-700 font-semibold'
                          : 'text-gray-600 group-hover:text-blue-600'
                          }`}>
                          {range.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply button */}
            <div className="px-5 py-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full bg-[#105d97] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#0e4f82] transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block lg:w-1/5 space-y-4">

            {/* Danh mục */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider">
                Danh mục
              </h3>
              <ul className="space-y-0.5">
                {displayedCats.map(([slug, name]) => {
                  const isActive = slug === categorySlug;
                  const count = categoryCounts[slug] ?? null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/san-pham/${slug}`}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between py-2 px-2 rounded text-sm transition-colors ${isActive
                          ? 'text-blue-700 font-semibold bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                      >
                        <span>{name}</span>
                        {count !== null && (
                          <span className="text-gray-400 text-xs">({count})</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {hiddenCats.length > 0 && (
                <button
                  onClick={() => setShowAllCats((v) => !v)}
                  className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {showAllCats ? (
                    <><ChevronUp className="w-3.5 h-3.5" /> Rút gọn</>
                  ) : (
                    <><ChevronDown className="w-3.5 h-3.5" /> Xem thêm ({hiddenCats.length})</>
                  )}
                </button>
              )}
            </div>

            {/* Lọc theo giá */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider">
                Lọc theo giá
              </h3>
              <ul className="space-y-2">
                {PRICE_RANGES.map((range, idx) => (
                  <li key={idx}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRangeIdx === idx}
                        onChange={() => handlePriceRange(idx)}
                        className="accent-blue-600 w-4 h-4 cursor-pointer"
                      />
                      <span className={`text-sm transition-colors ${priceRangeIdx === idx
                        ? 'text-blue-700 font-semibold'
                        : 'text-gray-600 group-hover:text-blue-600'
                        }`}>
                        {range.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Banner carousel */}
            <div className="hidden md:block">
              <BannerCarousel />
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-4/5">

            {/* Top Controls Bar */}
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-2 flex flex-wrap items-center gap-3">
              {/* Kết quả */}
              <span className="text-sm text-gray-600 hidden md:block">
                Hiển thị {fromItem}–{toItem} của {totalItems} kết quả
              </span>

              {/* Lọc sản phẩm (mobile) */}
              <button
                onClick={() => setIsSidebarOpen((o) => !o)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 px-3 py-2 rounded hover:border-gray-400 hover:bg-gray-50 transition-colors lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Lọc sản phẩm
              </button>

              <div className="ml-auto flex flex-wrap items-center gap-3">
                {/* Sắp xếp */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Sắp xếp:</span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={handleSort}
                      className="appearance-none border border-gray-300 rounded px-3 py-2 pr-7 text-sm text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer bg-white"
                      aria-label="Sắp xếp sản phẩm"
                    >
                      <option value="default">Sắp xếp mặc định</option>
                      <option value="newest">Mới nhất</option>
                      <option value="oldest">Cũ nhất</option>
                      <option value="price-asc">Giá: Thấp → Cao</option>
                      <option value="price-desc">Giá: Cao → Thấp</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Hiển thị */}
                <div className=" items-center gap-2 hidden md:flex">
                  <span className="text-sm text-gray-500 hidden sm:inline">Hiển thị:</span>
                  <div className="relative">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(+e.target.value); setCurrentPage(1); }}
                      className="appearance-none border border-gray-300 rounded px-3 py-2 pr-7 text-sm text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer bg-white"
                      aria-label="Số sản phẩm mỗi trang"
                    >
                      <option value={8}>8 sản phẩm</option>
                      <option value={16}>16 sản phẩm</option>
                      <option value={32}>32 sản phẩm</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Danh sách sản phẩm */}
            {currentProducts.length > 0 ? (
              <section
                className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
                aria-label={`Danh sách sản phẩm ${displayCategory}`}
              >
                {currentProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      maxPrice={product.maxPrice}
                      discount={product.discount}
                      isNew={product.isNew}
                      isFeatured={product.isFeatured}
                      colors={product.colors}
                      image={product.image}
                      slug={product.slug}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <p className="text-center text-gray-500 py-12">
                Không tìm thấy sản phẩm nào trong danh mục {displayCategory}.
              </p>
            )}

            {renderPagination()}
            {ArticleComponent && (
              <div className="sr-only" aria-hidden="true">
                <ArticleComponent />
              </div>
            )}
          </main>
        </div>
      </div>
    </DefaultLayout2>
  );
}
