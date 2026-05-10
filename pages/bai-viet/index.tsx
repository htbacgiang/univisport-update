import { useMemo, useRef, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { trimText } from "../../utils/helper";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import { readAllPostsFromDb, formatPosts } from "../../lib/utils";
import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    site_name: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

interface Props {
  initialPosts: PostDetail[];
}

const meta: MetaData = {
  title: "Bài viết - Đồng phục Univi",
  description:
    "Cập nhật các bài viết mới nhất về đồng phục thể thao, đồng phục doanh nghiệp, xu hướng thiết kế và kinh nghiệm chọn đồng phục chất lượng từ Đồng phục Univi",
  keywords:
    "đồng phục, thiết kế đồng phục, đồng phục công ty, đồng phục thể thao, đồng phục doanh nghiệp, đồng phục học sinh, Univi",
  author: "Đồng phục Univi",
  robots: "index, follow",
  canonical: "https://dongphucunivi.com/bai-viet",
  og: {
    title: "Bài viết - Đồng phục Univi",
    description:
      "Cập nhật các bài viết mới nhất về đồng phục thể thao, đồng phục doanh nghiệp, xu hướng thiết kế và kinh nghiệm chọn đồng phục chất lượng từ Đồng phục Univi",
    type: "website",
    image: "https://dongphucunivi.com/images/banner-1.webp",
    imageWidth: "1200",
    imageHeight: "630",
    url: "https://dongphucunivi.com/bai-viet",
    site_name: "Đồng phục Univi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bài viết - Đồng phục Univi",
    description:
      "Cập nhật các bài viết mới nhất về đồng phục thể thao, đồng phục doanh nghiệp, xu hướng thiết kế và kinh nghiệm chọn đồng phục chất lượng từ Đồng phục Univi",
    image: "https://dongphucunivi.com/images/banner-1.webp",
  },
};

const Blogs: NextPage<Props> = ({ initialPosts = [] }) => {
  const posts = initialPosts;
  const [currentPage, setCurrentPage] = useState(1);
  const filterBarRef = useRef<HTMLDivElement | null>(null);

  const recentPostsPerPage = 9;
  const featuredPostsCount = 4; // max 4 featured posts

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined" && filterBarRef.current) {
      const headerOffset = 90;
      const rect = filterBarRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const featuredPosts = useMemo(
    () =>
      posts
        .filter((p) => p.isFeatured === true)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, featuredPostsCount),
    [posts]
  );

  const recentPostsAll = useMemo(
    () => posts.filter((p) => !p.isFeatured),
    [posts]
  );

  const recentStartIndex = (currentPage - 1) * recentPostsPerPage;
  const recentPosts = recentPostsAll.slice(recentStartIndex, recentStartIndex + recentPostsPerPage);
  const actualTotalPages = Math.max(1, Math.ceil(recentPostsAll.length / recentPostsPerPage));

  const blogSchema = useMemo(() => [
    // BreadcrumbList cho trang danh sách bài viết
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://dongphucunivi.com" },
        { "@type": "ListItem", "position": 2, "name": "Bài viết", "item": "https://dongphucunivi.com/bai-viet" },
      ],
    },
    // Blog schema — publisher chỉ REFERENCE @id, không nhúng lại Organization
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://dongphucunivi.com/bai-viet#blog",
      name: "Bài viết - Đồng phục Univi",
      description: meta.description,
      url: meta.canonical,
      inLanguage: "vi-VN",
      isPartOf: { "@id": "https://dongphucunivi.com/#website" },
      publisher: { "@id": "https://dongphucunivi.com/#organization" },
      blogPost: posts.slice(0, 10).map((p, index) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `https://dongphucunivi.com/bai-viet/${p.slug}`,
        datePublished: p.createdAt,
        image: p.thumbnail ? [p.thumbnail] : undefined,
        position: index + 1,
      })),
    },
  ], [posts]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="robots" content={meta.robots} />
        <link rel="canonical" href={meta.canonical} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={meta.og.title} />
        <meta property="og:description" content={meta.og.description} />
        <meta property="og:type" content={meta.og.type} />
        <meta property="og:image" content={meta.og.image} />
        <meta property="og:image:width" content={meta.og.imageWidth} />
        <meta property="og:image:height" content={meta.og.imageHeight} />
        <meta property="og:url" content={meta.og.url} />
        <meta property="og:site_name" content={meta.og.site_name} />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:image:alt" content="Đồng phục Univi" />
        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </Head>
      <DefaultLayout2>
        <div className="h-[80px] bg-white"></div>
        <div className="pb-12 mt-6 container mx-auto px-4">
          <div className="flex flex-col gap-4 justify-center w-full">
            <div className="flex gap-2 uppercase">
              <Link href="/" className="hover:text-[#105d97] transition-colors">
                Trang chủ
              </Link>
              <span>•</span>
              <Link href="/bai-viet" className="text-[#105d97] uppercase">
                Bài viết & Chia Sẻ
              </Link>
            </div>

            {featuredPosts.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                {featuredPosts[0]?.thumbnail && (
                  <div className="w-full lg:w-8/12 flex flex-col gap-2">
                    <Link href={`/bai-viet/${featuredPosts[0].slug}`}>
                      <div className="aspect-video relative cursor-pointer rounded shadow-sm overflow-hidden group">
                        <Image
                          src={featuredPosts[0].thumbnail}
                          layout="fill"
                          className="object-cover group-hover:scale-105 transition-all ease duration-300"
                          alt={featuredPosts[0].title}
                        />
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/bai-viet/${featuredPosts[0].slug}`}
                        className="text-gray-900 lg:text-lg uppercase font-bold hover:text-[#105d97] transition-colors"
                      >
                        {featuredPosts[0].title}
                      </Link>
                    </div>
                    <p className="text-base font-medium line-clamp-2 text-gray-600">
                      {trimText(featuredPosts[0].meta, 160)}
                    </p>
                    <div className="text-sm text-gray-500">
                      {formatDate(featuredPosts[0].createdAt)}
                    </div>
                  </div>
                )}
                <div className="w-full lg:w-6/12 flex flex-col gap-4">
                  {featuredPosts.slice(1, 4).map((post) =>
                    post.thumbnail ? (
                      <div key={post.id} className="flex justify-between gap-4 h-auto lg:h-1/3">
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="w-1/3 aspect-video relative cursor-pointer rounded shadow-sm overflow-hidden group"
                        >
                          <Image
                            src={post.thumbnail}
                            layout="fill"
                            className="object-cover group-hover:scale-105 transition-all ease duration-300"
                            alt={post.title}
                          />
                        </Link>
                        <div className="w-2/3 flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-sm lg:text-base mb-1">
                            <Link
                              href={`/bai-viet/${post.slug}`}
                              className="text-gray-900 uppercase font-bold hover:text-[#105d97] transition-colors"
                            >
                              {post.title}
                            </Link>
                          </div>
                          <p className="text-sm font-medium line-clamp-2 text-gray-600">
                            {trimText(post.meta, 100)}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}

            <div ref={filterBarRef} />

            {recentPosts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Bài viết gần đây</h2>
                  <p className="text-gray-600">{recentPostsAll.length} bài viết</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white overflow-hidden transition-all duration-500 transform"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        {post.thumbnail ? (
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                            <span className="text-[#105d97] text-3xl">📄</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="py-6">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#105d97] transition-colors line-clamp-2">
                          <Link href={`/bai-viet/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <div className="flex items-center mt-2 justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <Link
                            href={`/bai-viet/${post.slug}`}
                            className="inline-flex items-center text-[#105d97] hover:text-[#0e4a7a] font-medium transition-colors"
                          >
                            Đọc thêm
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {posts.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-[#105d97] text-4xl">📄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chưa có bài viết nào</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Chúng tôi đang chuẩn bị những nội dung thú vị. Hãy quay lại sau nhé!
                </p>
              </div>
            )}

            {actualTotalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-[#105d97] hover:border-gray-300 transition-colors font-medium flex items-center gap-2"
                >
                  <FaArrowRight className="rotate-180 text-sm" />
                  Trước
                </button>
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const maxVisiblePages = 5;
                    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                    let endPage = Math.min(actualTotalPages, startPage + maxVisiblePages - 1);
                    if (endPage - startPage + 1 < maxVisiblePages) {
                      startPage = Math.max(1, endPage - maxVisiblePages + 1);
                    }
                    if (startPage > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => handlePageChange(1)}
                          className="w-10 h-10 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                        >
                          1
                        </button>
                      );
                      if (startPage > 2) {
                        pages.push(
                          <span key="start-ellipsis" className="px-2 text-gray-400">...</span>
                        );
                      }
                    }
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`w-10 h-10 rounded-full font-medium transition-colors flex items-center justify-center ${i === currentPage
                              ? "bg-[#105d97] text-white shadow-lg"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    if (endPage < actualTotalPages) {
                      if (endPage < actualTotalPages - 1) {
                        pages.push(
                          <span key="end-ellipsis" className="px-2 text-gray-400">...</span>
                        );
                      }
                      pages.push(
                        <button
                          key={actualTotalPages}
                          onClick={() => handlePageChange(actualTotalPages)}
                          className="w-10 h-10 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                        >
                          {actualTotalPages}
                        </button>
                      );
                    }
                    return pages;
                  })()}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === actualTotalPages}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-[#105d97] hover:border-gray-300 transition-colors font-medium flex items-center gap-2"
                >
                  Sau
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            )}
          </div>
        </div>
      </DefaultLayout2>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const raw = await readAllPostsFromDb(false);
    const posts = formatPosts(raw) || [];
    return {
      props: {
        initialPosts: posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};

export default Blogs;
