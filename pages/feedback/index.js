import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import CTABannerSection from "../../components/univisport/CTABanner";
import { FaArrowRight, FaBuilding, FaTshirt } from "react-icons/fa";

const PROJECTS_PER_PAGE = 9;

export default function FeedbackPage({ meta = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/feedback');
        const data = await response.json();
        if (data.success && data.data) {
          setProjects(data.data.projects || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const defaultMeta = {
    title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
    description:
      "Xem đánh giá từ khách hàng về đồng phục Univi: chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
    keywords:
      "phản hồi đồng phục Univi, đánh giá khách hàng, đồng phục chất lượng",
    author: "Đồng Phục Univi",
    robots: "index, follow",
    canonical: "https://dongphucunivi.com/feedback",
    og: {
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Xem đánh giá từ khách hàng về đồng phục Univi: chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
      type: "website",
      image: "https://dongphucunivi.com/images/banner-home-1.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://dongphucunivi.com/feedback",
      site_name: "Đồng Phục Univi",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Khám phá phản hồi từ khách hàng về đồng phục Univi.",
      image: "",
      site: "@DongPhucUnivi",
    },
  };

  const safeMeta = {
    ...defaultMeta,
    ...meta,
    og: { ...defaultMeta.og, ...meta.og },
    twitter: { ...defaultMeta.twitter, ...meta.twitter },
  };

  return (
    <DefaultLayout2>
      <div className="min-h-screen">
        {/* ── Hero Section ── */}
        <section className="relative h-[35vh] md:h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/feedback.jpg"
              alt="Phản hồi khách hàng Univi"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#105d97]/70 to-black/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-white mb-3">
              Phản hồi khách hàng
            </p>
            <h1 className="text-xl md:text-4xl font-bold mb-0 md:mb-2 leading-tight">
              <span className="text-white">Hàng nghìn</span> khách hàng{" "}
              tin tưởng Univi
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Mỗi bộ đồng phục là một câu chuyện thành công — khám phá các dự
              án thực tế mà Univi đã đồng hành cùng khách hàng.
            </p>
          </div>
        </section>

        {/* ── Projects Grid ── */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[5/3] rounded-xl mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : paginatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedProjects.map((project) => (
                  <Link
                    key={project.slug || project._id}
                    href={`/feedback/${project.slug}`}
                    className="group block"
                  >
                    <div className="relative w-full aspect-[5/3] overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                      {/* Background Image */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-[#105d97]/80 group-hover:to-black/75 transition-all duration-300" />

                      {/* Category badge — visible by default, hidden on hover */}
                      <div className="absolute top-4 left-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#105d97] rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                          {project.category === "Đồng phục thể thao" ? (
                            <FaTshirt className="text-[10px]" />
                          ) : (
                            <FaBuilding className="text-[10px]" />
                          )}
                          {project.category}
                        </span>
                      </div>

                      {/* Center content — appears on hover */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <div className="text-center px-6 max-w-sm">
                          <h3 className="text-white font-bold text-xl md:text-2xl mb-3 drop-shadow-2xl">
                            {project.title}
                          </h3>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d2a35b] text-white text-sm font-semibold rounded-full shadow-lg">
                            Xem chi tiết
                            <FaArrowRight className="text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="pt-3 pb-1 px-1">
                      <h3 className="text-gray-800 font-semibold text-base group-hover:text-[#105d97] transition-colors duration-200 truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">{project.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Không có dự án nào.</p>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white text-[#105d97] rounded-full border border-[#105d97]/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#105d97] hover:text-white transition-all duration-200 font-medium flex items-center gap-2 shadow-sm"
                >
                  <FaArrowRight className="rotate-180 text-sm" />
                  Trước
                </button>

                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const maxVisible = 5;
                    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                    let end = Math.min(totalPages, start + maxVisible - 1);
                    if (end - start + 1 < maxVisible) {
                      start = Math.max(1, end - maxVisible + 1);
                    }

                    if (start > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => handlePageChange(1)}
                          className="w-10 h-10 bg-white text-[#105d97] rounded-full border border-[#105d97]/30 hover:bg-[#105d97]/10 transition-colors font-medium flex items-center justify-center shadow-sm"
                        >
                          1
                        </button>
                      );
                      if (start > 2)
                        pages.push(
                          <span key="s-el" className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                    }

                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`w-10 h-10 rounded-full font-medium transition-all duration-200 flex items-center justify-center shadow-sm ${i === currentPage
                            ? "bg-[#105d97] text-white shadow-lg scale-110"
                            : "bg-white text-[#105d97] border border-[#105d97]/30 hover:bg-[#105d97]/10"
                            }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    if (end < totalPages) {
                      if (end < totalPages - 1)
                        pages.push(
                          <span key="e-el" className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => handlePageChange(totalPages)}
                          className="w-10 h-10 bg-white text-[#105d97] rounded-full border border-[#105d97]/30 hover:bg-[#105d97]/10 transition-colors font-medium flex items-center justify-center shadow-sm"
                        >
                          {totalPages}
                        </button>
                      );
                    }

                    return pages;
                  })()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white text-[#105d97] rounded-full border border-[#105d97]/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#105d97] hover:text-white transition-all duration-200 font-medium flex items-center gap-2 shadow-sm"
                >
                  Sau
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <CTABannerSection
          title="Bắt đầu dự án đồng phục của bạn ngay hôm nay"
          description="Nhận tư vấn chuyên nghiệp và báo giá trong vòng 24 giờ. Hãy để Univi giúp bạn tạo nên sự khác biệt!"
          image="/images/banner-home-1.jpg"
          buttonText="Yêu cầu báo giá"
          buttonLink="/contact"
        />
      </div>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  try {
    const meta = {
      title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
      description:
        "Xem đánh giá từ khách hàng về đồng phục Univi: chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc. Gửi phản hồi của bạn ngay!",
      keywords:
        "phản hồi đồng phục Univi, đánh giá khách hàng, đồng phục chất lượng, đồng phục công ty, thiết kế đồng phục",
      author: "Đồng Phục Univi",
      robots: "index, follow",
      canonical: "https://dongphucunivi.com/feedback",
      og: {
        title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
        description:
          "Đọc đánh giá từ khách hàng về đồng phục Univi. Chất lượng cao, thiết kế miễn phí, giao hàng toàn quốc.",
        type: "website",
        image: "/images/banner-home-1.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://dongphucunivi.com/feedback",
        site_name: "Đồng Phục Univi",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "Phản Hồi Khách Hàng – Đồng Phục Univi",
        description:
          "Khám phá phản hồi từ khách hàng về đồng phục Univi. Thiết kế miễn phí, giao hàng toàn quốc.",
        image: "/images/banner-home-1.jpg",
        site: "@DongPhucUnivi",
      },
    };
    return { props: { meta } };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return { props: { meta: {} } };
  }
}