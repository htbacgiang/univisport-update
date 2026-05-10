import Head from "next/head";
import Link from "next/link";
import DefaultLayout2 from "../components/layout/DefaultLayout2";
import BannerTTG from "../components/tantruonggiang/BannerTTG";
import FAQComponent from "../components/univisport/FAQComponent";
import BlogHero from "../components/profiles/BlogHero";
import FeedbackSection from "../components/profiles/FeedbackSection";
import PostCard from "../components/common/PostCard";
import { readPostsFromDb, formatPosts } from "../lib/utils";
import ProductSlider from "../components/univisport/ProductSlider";
import CategoryGrid from "../components/univisport/CategoryGrid";
import HeroSection1 from "../components/univisport/HeroSection1";
import PartnersSection from "../components/univisport/PartnersSection";
import FabricCardComponent from "../components/univisport/FabricCardComponent";
import db from "../utils/db";
import Product from "../models/Product";
import HomepageSection from "../models/HomepageSection";
import CTABannerSection from "../components/univisport/CTABanner";

// ─────────────────────────────────────────────────────────────
// META OBJECT mặc định — dùng khi getServerSideProps lỗi
// Tách ra ngoài để tránh duplicate code ở catch block
// ─────────────────────────────────────────────────────────────
const DEFAULT_META = {
  title: "Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Tại Hà Nội",
  description:
    "Đồng Phục Univi — xưởng 2.000m² tại Đan Phượng, Hà Nội, công suất 100.000 sp/tháng. Chuyên đồng phục thể thao, giải pháp đồng phục cho các câu lạc bộ, phòng tập & doanh nghiệp B2B. Vải UNI DRY kiểm định QCVN. Thiết kế miễn phí — gọi ngay: 0834.204.999",
  keywords:
    "đồng phục thể thao, đồng phục Gym, đồng phục Yoga, đồng phục Pilates, đồng phục Pickleball, đồng phục Áo Gió, đồng phục Áo Polo, đồng phục phòng tập, xưởng may đồng phục Hà Nội, công nghệ UNI DRY, đồng phục doanh nghiệp B2B, may đồng phục theo yêu cầu, Đồng Phục Univi",
  robots: "index, follow",
  author: "Đồng Phục Univi",
  canonical: "https://dongphucunivi.com",
  og: {
    title: "Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Tại Hà Nội",
    description:
      "Xưởng sản xuất đồng phục thể thao chuyên dụng tại Hà Nội — công nghệ UNI DRY, vải nhập khẩu, kiểm định QCVN 01:2017/BCT. Phục vụ phòng tập Gym, Yoga, Pilates, Pickleball, Áo Gió, Áo Polo và doanh nghiệp toàn quốc.",
    type: "website",
    image: "https://dongphucunivi.com/images/banner-home-1.jpg",
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt:
      "Xưởng sản xuất đồng phục thể thao Univi tại Đan Phượng, Hà Nội — công suất 100.000 sản phẩm/tháng",
    url: "https://dongphucunivi.com",
    site_name: "Đồng Phục Univi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Tại Hà Nội",
    description:
      "Xưởng sản xuất đồng phục thể thao chuyên dụng tại Hà Nội — công nghệ UNI DRY, vải nhập khẩu, kiểm định QCVN 01:2017/BCT.",
    image: "https://dongphucunivi.com/images/banner-home-1.jpg",
  },
};

export default function Home({ posts = [], sections = [], meta = DEFAULT_META }) {
  // ── WebPage Schema (trang chủ) + BreadcrumbList ──────────
  // KHÔNG có Organization schema ở đây — đã xử lý đầy đủ trong _app.js
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://dongphucunivi.com/#webpage",
    "url": "https://dongphucunivi.com",
    "name": meta.title,
    "description": meta.description,
    "isPartOf": { "@id": "https://dongphucunivi.com/#website" },
    "about": { "@id": "https://dongphucunivi.com/#organization" },
    "inLanguage": "vi-VN",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-description", ".fabric-intro", ".faq-section"],
    }
  };

  return (
    <DefaultLayout2>
      {/* H1 ẩn — chuẩn SEO cho trang chủ, có từ khóa local + USP */}
      <h1 className="visually-hidden">
        Đồng Phục Univi: Xưởng May Đồng Phục Thể Thao Chuyên Dụng Tại Hà Nội
      </h1>

      {/* WebPage schema — KHÔNG trùng với Organization trong _app.js */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <BannerTTG />
      <div className="container mx-auto px-4 mb-4">
        <CategoryGrid />
      </div>
      {sections.map((section) =>
        section.products.length > 0 ? (
          <ProductSlider
            key={section._id}
            title={section.title}
            products={section.products}
            viewAllLink={section.viewAllLink}
          />
        ) : null
      )}
      <HeroSection1 />
      <FabricCardComponent />
      <FeedbackSection />
      <PartnersSection />
      <FAQComponent />
      <BlogHero />

      <div className="container mx-auto px-2 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/bai-viet"
            className="group inline-flex items-center  text-gray-800  transform hover:-translate-y-1 transition-all duration-300 hover:text-blue-800"
          >
            <span className="mr-3">Xem tất cả</span>

          </Link>
        </div>
      </div>

      <CTABannerSection />
    </DefaultLayout2>
  );
}

// ─────────────────────────────────────────────────────────────
// MAP PRODUCT — không đổi
// ─────────────────────────────────────────────────────────────
function mapProduct(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    maxPrice: product.originalPrice || product.price,
    discount: product.originalPrice
      ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
      : 0,
    isNew: product.isNew || false,
    colors: Array.isArray(product.colors)
      ? product.colors.map((color) => ({
        name: color.name || "Màu",
        hex: color.hex || "#000000",
        hex2: color.hex2 || "",
        image: color.image || "",
      }))
      : [],
    image:
      product.colors && product.colors.length > 0
        ? product.colors[0].image
        : product.image || "",
    slug: product.slug || "",
  };
}

// ─────────────────────────────────────────────────────────────
// FALLBACK SECTIONS — không đổi
// ─────────────────────────────────────────────────────────────
const FALLBACK_SECTIONS = [
  {
    _id: "gym",
    title: "Đồng Phục Gym",
    category: "dong-phuc-gym",
    viewAllLink: "/san-pham/dong-phuc-gym",
    productLimit: 12,
  },
  {
    _id: "pickleball",
    title: "Đồng Phục Pickleball",
    category: "dong-phuc-pickleball",
    viewAllLink: "/san-pham/dong-phuc-pickleball",
    productLimit: 12,
  },
  {
    _id: "yoga",
    title: "Đồng Phục Yoga - Pilates",
    category: "dong-phuc-yoga-pilates",
    viewAllLink: "/san-pham/dong-phuc-yoga-pilates",
    productLimit: 12,
  },
  {
    _id: "ao-gio",
    title: "Đồng Phục Áo Gió",
    category: "dong-phuc-ao-gio",
    viewAllLink: "/san-pham/dong-phuc-ao-gio",
    productLimit: 12,
  },
  {
    _id: "golf",
    title: "Đồng Phục Golf - Tennis",
    category: "dong-phuc-golf-tennis",
    viewAllLink: "/san-pham/dong-phuc-golf-tennis",
    productLimit: 12,
  },
  {
    _id: "polo",
    title: "Đồng Phục Áo Polo",
    category: "dong-phuc-ao-polo",
    viewAllLink: "/san-pham/dong-phuc-ao-polo",
    productLimit: 12,
  },
];

// ─────────────────────────────────────────────────────────────
// GET SERVER SIDE PROPS
// ─────────────────────────────────────────────────────────────
export async function getServerSideProps() {
  try {
    const posts = await readPostsFromDb(3, 0);
    const formattedPosts = formatPosts(posts);

    await db.connectDb();
    const productsData = (await Product.find({}).lean()) || [];

    let sectionConfigs = [];
    try {
      sectionConfigs = await HomepageSection.find({ isVisible: true })
        .sort({ order: 1 })
        .lean();
    } catch {
      // ignore — fallback bên dưới xử lý
    }
    if (!sectionConfigs || sectionConfigs.length === 0) {
      sectionConfigs = FALLBACK_SECTIONS;
    }

    const sections = sectionConfigs.map((section) => ({
      _id: String(section._id),
      title: section.title,
      viewAllLink: section.viewAllLink,
      products: productsData
        .filter((p) => p.category === section.category)
        .slice(0, section.productLimit)
        .map(mapProduct),
    }));

    return {
      props: {
        posts: formattedPosts,
        sections,
        meta: DEFAULT_META,   // dùng object đã tối ưu ở trên
      },
    };
  } catch (error) {
    console.error("getServerSideProps error:", error.message, error.stack);
    return {
      props: {
        posts: [],
        sections: [],
        meta: DEFAULT_META,   // fallback cũng dùng cùng object — không duplicate
      },
    };
  }
}