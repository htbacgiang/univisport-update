import Head from 'next/head';

export default function BlogHero() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="md:text-2xl text-xl mt-4 font-semibold text-[#105d97] uppercase tracking-wide"
          id="hero-heading"
        >
          Bài viết Univi
        </p>
        <h3 className="text-base md:text-xl mt-1 font-bold text-gray-900">
          Trang Phục Thể Thao Chuyên Dụng Cho Mọi Phong Cách Sống
        </h3>
      </div>
    </>
  );
}