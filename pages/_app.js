import "../styles/globals.css";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/router";

// Global polyfill for Promise.withResolvers if not available
if (typeof Promise !== "undefined" && !Promise.withResolvers) {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

const hankenGrotesk = localFont({
  variable: "--font-hanken-grotesk",
  display: "swap",
  src: [
    { path: "../public/fonts/HankenGrotesk-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/HankenGrotesk-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/HankenGrotesk-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/HankenGrotesk-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/HankenGrotesk-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/HankenGrotesk-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
});

// Helper: tự động detect đúng MIME type từ URL ảnh
function getImageMimeType(url = "") {
  if (url.includes(".webp")) return "image/webp";
  if (url.includes(".png")) return "image/png";
  if (url.includes(".gif")) return "image/gif";
  return "image/jpeg";
}


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://dongphucunivi.com/#organization",

  // Danh tính thương hiệu
  "name": "Đồng Phục Univi",
  "legalName": "Công ty Cổ phần Tập đoàn Unicore Holdings",
  "alternateName": "Univi Uniform",
  "foundingDate": "2017",
  "slogan": "YOUR UNIFORM, YOUR BRAND!",
  "description": "Đồng Phục Univi — xưởng sản xuất đồng phục thể thao chuyên dụng số lượng lớn tại Hà Nội. Chuyên đồng phục Gym, Yoga, Pickleball, phòng tập và doanh nghiệp. Công nghệ vải UNI DRY, kiểm định QCVN 01:2017/BCT, xưởng 2.000m², công suất 100.000 sản phẩm/tháng.",

  // Nhân lực & quy mô
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 100,
  },

  // Hình ảnh & logo
  "url": "https://dongphucunivi.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://dongphucunivi.com/images/logo-univi.png",
    "width": 200,
    "height": 60,
  },
  "image": "https://dongphucunivi.com/images/banner-home-1.jpg",

  // Giá tham khảo
  "priceRange": "99.000đ - 499.000đ",

  // Địa chỉ văn phòng chính
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nhà D14, Ng. 180 Đường Thanh Bình",
    "addressLocality": "Hà Đông",
    "addressRegion": "Hà Nội",
    "postalCode": "100000",
    "addressCountry": "VN",
  },

  // Tọa độ văn phòng Hà Đông
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.9678,
    "longitude": 105.7776,
  },

  // Địa điểm bổ sung: xưởng sản xuất Đan Phượng
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Xưởng sản xuất",
      "value": "Xã Thọ An, Huyện Đan Phượng, Hà Nội — Diện tích 2.000m²",
    },
    {
      "@type": "PropertyValue",
      "name": "Công suất sản xuất",
      "value": "~100.000 sản phẩm/tháng",
    },
    {
      "@type": "PropertyValue",
      "name": "Tiêu chuẩn kiểm định",
      "value": "QCVN 01:2017/BCT — Không Formaldehyde, không thuốc nhuộm Azo",
    },
  ],

  // Giờ làm việc
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ],
    "opens": "08:00",
    "closes": "18:00",
  },

  // Khu vực phục vụ
  "areaServed": [
    { "@type": "Country", "name": "Vietnam" },
    { "@type": "City", "name": "Hà Nội" },
  ],

  // Liên hệ — 2 số hotline + email
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+84-83-420-4999",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00",
      },
    },
    {
      "@type": "ContactPoint",
      "telephone": "+84-96-156-7997",
      "contactType": "sales",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese",
    },
    {
      "@type": "ContactPoint",
      "email": "dongphucunivi@gmail.com",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese",
    },
  ],

  // Liên kết mạng xã hội — Google dùng để xây entity
  "sameAs": [
    "https://facebook.com/Dongphucunivi",
    "https://instagram.com/dongphucunivi",
    "https://youtube.com/@dongphucunivi",
    "https://zalo.me/0834204999",
    "https://www.linkedin.com/company/univi-uniform",
  ],

  // Lĩnh vực chuyên môn — entity keywords
  "knowsAbout": [
    "Công nghệ UNI DRY",
    "Vải Quick Dry thể thao",
    "Vải Super Cool Polyamide",
    "Đồng phục Gym chuyên dụng",
    "Đồng phục Yoga Pilates",
    "Đồng phục Pickleball",
    "Đồng phục huấn luyện viên",
    "Đồng phục phòng tập",
    "Đồng phục doanh nghiệp B2B",
    "May đồng phục theo yêu cầu",
    "Thiết kế đồng phục thể thao",
    "Đồng phục Áo gió",
    "Đồng phục Teambuilding",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dongphucunivi.com/#website",
  "url": "https://dongphucunivi.com",
  "name": "Đồng Phục Univi",
  "description": "Đồng Phục Univi chuyên thiết kế và sản xuất đồng phục thể thao, đồng phục phòng tập, đồng phục huấn luyện viên chất lượng cao — xưởng sản xuất tại Hà Nội, giao hàng toàn quốc.",
  "publisher": {
    "@id": "https://dongphucunivi.com/#organization",
  },
  // potentialAction/SearchAction đã được xoá —
  // trang /search chưa tồn tại, tránh gây lỗi 404 trong Search Console.
  // Thêm lại khi triển khai tính năng tìm kiếm nội bộ.
  "inLanguage": "vi-VN",
  "copyrightYear": "2017",
  "copyrightHolder": {
    "@id": "https://dongphucunivi.com/#organization",
  },
};

// FAQPage thương hiệu — 7 câu hỏi chung về Univi
// CHỈ inject ở trang chủ (pathname === "/")
// Các trang bài viết tự inject FAQPage riêng trong [slug].tsx
const brandFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Vải Univi có phải vải thun lạnh ngoài thị trường không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Không. Vải Univi được đặt sản xuất riêng từ nước ngoài — dệt từ Polyamide/Polyester cao cấp, tỷ lệ spandex 20–25%, ứng dụng công nghệ thoát ẩm một chiều UNI DRY. Khác hoàn toàn vải thun lạnh thị trường về thành phần, công nghệ và độ bền (bền màu sau 200–300 lần giặt).",
      },
    },
    {
      "@type": "Question",
      "name": "Đặt đồng phục Univi tối thiểu bao nhiêu chiếc?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Từ 10 chiếc trở lên đã được hưởng chính sách đối tác. Đồng phục Gym theo mẫu thiết kế riêng tối thiểu 80 chiếc. Mẫu có sẵn (màu đen/xám/trắng, size S–XXL) giao trong 2–3 ngày tại Hà Nội.",
      },
    },
    {
      "@type": "Question",
      "name": "Thời gian giao hàng đồng phục Univi là bao lâu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mẫu có sẵn: 2–3 ngày (Hà Nội và TP.HCM). Mẫu đặt theo yêu cầu: 10–12 ngày làm việc. Mùa cao điểm (Q1, mùa hè) có thể lâu hơn — liên hệ hotline 0834.204.999 để được tư vấn tiến độ cụ thể.",
      },
    },
    {
      "@type": "Question",
      "name": "Công nghệ UNI DRY là gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UNI DRY là công nghệ vải thoát ẩm một chiều độc quyền của Đồng Phục Univi — hoạt động như van một chiều: mồ hôi chỉ thoát ra ngoài, không thấm ngược vào da. Kết quả: áo khô trong 10–15 phút, người tập luôn khô thoáng dù vận động cường độ cao.",
      },
    },
    {
      "@type": "Question",
      "name": "Univi có hỗ trợ thiết kế đồng phục theo yêu cầu không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có — Đồng Phục Univi thiết kế miễn phí trong 1 giờ theo yêu cầu khách hàng. Xưởng sản xuất 2.000m² tại Đan Phượng, Hà Nội với công suất ~100.000 sản phẩm/tháng, đáp ứng đơn hàng số lượng lớn cho chuỗi phòng tập và doanh nghiệp.",
      },
    },
    {
      "@type": "Question",
      "name": "Vải đồng phục Univi có an toàn cho da không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có. Vải Univi đạt tiêu chuẩn QCVN 01:2017/BCT — không chứa Formaldehyde, không thuốc nhuộm Azo gây ung thư, được kiểm định bởi Viện kiểm nghiệm độc lập được Nhà nước công nhận.",
      },
    },
    {
      "@type": "Question",
      "name": "Univi có nhận làm đồng phục cho doanh nghiệp không phải phòng tập không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có. Ngoài đồng phục phòng tập, Đồng Phục Univi chuyên sản xuất đồng phục công sở, áo polo doanh nghiệp và đồng phục teambuilding số lượng lớn. Đã hợp tác với Sun Group, Vingroup, Tập đoàn Than Khoáng sản Việt Nam và nhiều tập đoàn lớn.",
      },
    },
  ],
};

function MyApp({ Component, pageProps: { session, meta, ...pageProps } }) {
  const router = useRouter();
  // FAQ thương hiệu chỉ inject đúng 1 nơi: trang chủ
  const isHomePage = router.pathname === "/";

  const ogImageType = getImageMimeType(meta?.og?.image);

  return (
    <>
      <Head>
        {meta && (
          <>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <meta name="robots" content={meta.robots} />
            <meta name="author" content={meta.author} />
            <link rel="canonical" href={meta.canonical} />

            {/* Geo & Language */}
            <meta name="geo.region" content="VN" />
            <meta name="geo.placename" content="Hà Nội" />
            <meta name="geo.position" content="20.9678;105.7776" />
            <meta name="ICBM" content="20.9678, 105.7776" />
            <meta name="language" content="vi" />
            <meta name="revisit-after" content="7 days" />
            <meta name="theme-color" content="#105d97" />
            <meta name="msapplication-TileColor" content="#105d97" />

            {/* Open Graph */}
            <meta property="og:title" content={meta.og.title} />
            <meta property="og:description" content={meta.og.description} />
            <meta property="og:type" content={meta.og.type} />
            <meta property="og:image" content={meta.og.image} />
            <meta property="og:image:width" content={meta.og.imageWidth} />
            <meta property="og:image:height" content={meta.og.imageHeight} />
            <meta
              property="og:image:alt"
              content={meta.og.imageAlt ?? "Đồng Phục Univi - Đồng phục thể thao chuyên nghiệp"}
            />
            <meta property="og:image:type" content={ogImageType} />
            <meta property="og:url" content={meta.og.url} />
            <meta property="og:site_name" content={meta.og.site_name ?? "Đồng Phục Univi"} />
            <meta property="og:locale" content="vi_VN" />

            {/* Twitter */}
            <meta name="twitter:card" content={meta.twitter?.card ?? "summary_large_image"} />
            <meta name="twitter:title" content={meta.twitter?.title ?? meta.title} />
            <meta name="twitter:description" content={meta.twitter?.description ?? meta.description} />
            <meta name="twitter:image" content={meta.twitter?.image ?? meta.og?.image} />

            {/*
              ── JSON-LD: Organization + WebSite ──────────────────────────
              Inject trên MỌI trang — đây là nguồn canonical duy nhất cho
              entity thương hiệu. Các trang con chỉ được reference qua @id,
              KHÔNG khai báo lại Organization.
            */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([organizationSchema, websiteSchema]),
              }}
            />

            {/*
              ── JSON-LD: FAQPage thương hiệu ─────────────────────────────
              CHỈ inject ở trang chủ (pathname === "/").
              Trang bài viết [slug].tsx tự inject FAQPage riêng → không duplicate.
              Trang giới thiệu, sản phẩm, danh mục → không có FAQPage nào cả.
            */}
            {isHomePage && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(brandFaqSchema),
                }}
              />
            )}

            {/*
              ── JSON-LD động theo từng trang ─────────────────────────────
              Article, Product, CollectionPage, BreadcrumbList, AboutPage...
              Được generate trong getServerSideProps của từng trang và truyền
              qua meta.schema. KHÔNG bao gồm Organization hay FAQPage thương hiệu.
            */}
            {meta?.schema && Array.isArray(meta.schema) && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(meta.schema) }}
              />
            )}
          </>
        )}
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div
              className={hankenGrotesk.variable}
              style={{
                fontFamily:
                  "var(--font-hanken-grotesk), -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              <Toaster position="bottom-right" />
              <Component {...pageProps} />
            </div>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;