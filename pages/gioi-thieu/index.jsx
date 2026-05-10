import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Users, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import AboutNavigation from "../../components/univisport/AboutNavigation";
import AboutUniviPage from "../../components/univisport/AboutUniviPage";
import CategoryGrid from "../../components/univisport/CategoryGrid";
import PartnersSection from "../../components/univisport/PartnersSection";

export default function AboutUs({ meta }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const yearsExperience = new Date().getFullYear() - 2017;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => { });
          else video.pause();
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => { if (video) observer.unobserve(video); };
  }, []);

  return (
    <DefaultLayout>
      <div className="h-[80px]" />

      {/* Hero Video */}
      <div className="relative w-full h-[30vh] md:h-[70vh] overflow-hidden bg-gray-900">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/gioi-thieu-univi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted
            ? <VolumeX className="w-5 h-5 text-[#105d97]" />
            : <Volume2 className="w-5 h-5 text-[#105d97]" />
          }
        </button>
      </div>

      {/* Hành trình */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#105d97] mb-3">
              Câu chuyện của chúng tôi
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase">
              I. Hành trình <span className="text-[#105d97]">{yearsExperience} năm</span> phát triển
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-[#105d97]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                <span className="font-bold text-[#105d97]">Đồng Phục Univi</span> là đơn vị xưởng may chuyên cung cấp đồng phục thể thao, đồng phục công ty, đồng phục công sở, áo polo, áo sơ mi văn phòng cao cấp.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Với hơn <span className="font-semibold text-[#105d97]">{yearsExperience} năm kinh nghiệm</span> trong lĩnh vực thiết kế đồng phục, chúng tôi đã trở thành một cái tên quen thuộc trong ngành thời trang đồng phục.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#105d97]/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#105d97]" />
                  </div>
                  <div className="text-2xl font-bold text-[#105d97]">{yearsExperience}+</div>
                  <div className="text-sm text-gray-500 mt-1">Năm kinh nghiệm</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#105d97]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#105d97]" />
                  </div>
                  <div className="text-2xl font-bold text-[#105d97]">500+</div>
                  <div className="text-sm text-gray-500 mt-1">Khách hàng tin tưởng</div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg group">
              <Image
                src="/images/gioi-thieu/xuong-san-xuat.jpg"
                alt="Xưởng sản xuất đồng phục thể thao Đồng Phục Univi tại Đan Phượng, Hà Nội — diện tích 2.000m²"
                width={800}
                height={600}
                className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-gray-50 py-6">
            <PartnersSection />
          </div>
        </div>
      </section>

      {/* Lịch sử & Phát triển */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#105d97] uppercase">
              Lịch sử hình thành và phát triển
            </h2>
            <div className="w-16 h-1 mx-auto mt-3 rounded-full bg-[#105d97]" />
          </div>
        </div>

        <div className="container mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full space-y-4">
                <h3 className="text-xl font-bold text-[#105d97]">VỀ UNIVI</h3>
                <p className="text-gray-700 leading-relaxed">
                  Univi tự tin là thương hiệu dẫn đầu trong lĩnh vực thiết kế và cung cấp Đồng Phục Thể Thao cho các doanh nghiệp, phòng tập và đội nhóm tập thể thao.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Chúng tôi không chỉ tạo ra những sản phẩm chất lượng, tối ưu hiệu suất tập luyện, an toàn với sức khỏe người tập mà còn giúp các đơn vị truyền tải câu chuyện thương hiệu một cách sống động nhất.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/dong-phuc-the-taho.jpg" alt="Showroom Đồng Phục Univi — các sản phẩm đồng phục thể thao chuyên dụng" width={400} height={300} className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/team-univi.jpg" alt="Đội ngũ nhân sự Đồng Phục Univi tại xưởng Đan Phượng, Hà Nội" width={400} height={300} className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/dong-phuc-pikeaball.jpg" alt="Đồng phục Pickleball chuyên dụng từ Univi" width={200} height={200} className="object-cover w-full h-32 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/dong-phuc-huan-luyen-vien.webp" alt="Đồng phục huấn luyện viên Gym chuyên dụng từ Univi" width={200} height={200} className="object-cover w-full h-32 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/yoga.jpg" alt="Đồng phục Yoga Pilates vải Super Cool từ Univi" width={200} height={200} className="object-cover w-full h-32 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <Image src="/images/chay-bo.jpg" alt="Đồng phục chạy bộ marathon chuyên dụng từ Univi" width={200} height={200} className="object-cover w-full h-32 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#105d97] uppercase">Dòng sản phẩm chủ lực</h3>
            <div className="w-16 h-1 mx-auto mt-3 rounded-full bg-[#105d97]" />
            <p className="text-gray-600 max-w-5xl mx-auto mt-3 text-base">
              Ngay từ những bước đầu, các dòng sản phẩm của Univi đã được đón nhận vượt kỳ vọng từ khách hàng trên toàn quốc.
            </p>
          </div>
          <CategoryGrid />
          <AboutNavigation />
        </div>
      </section>

      <AboutUniviPage />
    </DefaultLayout>
  );
}

// ─── SERVER SIDE PROPS ────────────────────────────────────────
export async function getServerSideProps() {
  const yearsExperience = new Date().getFullYear() - 2017;

  // ── AboutPage + BreadcrumbList schema ──────────────────────
  const schema = [
    // 1. Breadcrumb — giữ nguyên
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://dongphucunivi.com" },
        { "@type": "ListItem", "position": 2, "name": "Giới thiệu", "item": "https://dongphucunivi.com/gioi-thieu" },
      ],
    },

    // 2. AboutPage — chỉ REFERENCE đến Organization, KHÔNG nhúng lại
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://dongphucunivi.com/gioi-thieu#webpage",
      "name": "Giới Thiệu Đồng Phục Univi — Xưởng May Đồng Phục Thể Thao Chuyên Dụng",
      "description": `Đồng Phục Univi thành lập năm 2017, xưởng 2.000m² tại Đan Phượng, Hà Nội. Chuyên đồng phục Gym, Yoga, Pickleball cho phòng tập & doanh nghiệp B2B. Hơn ${yearsExperience} năm kinh nghiệm, 500+ khách hàng tin tưởng, công suất 100.000 sản phẩm/tháng.`,
      "url": "https://dongphucunivi.com/gioi-thieu",
      "inLanguage": "vi-VN",
      "isPartOf": { "@id": "https://dongphucunivi.com/#website" },

      // ✅ Chỉ reference — không nhúng lại Organization
      "about": { "@id": "https://dongphucunivi.com/#organization" },
      "mainEntity": { "@id": "https://dongphucunivi.com/#organization" },

      // Tín hiệu E-E-A-T riêng cho trang About (không trùng Organization)
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://dongphucunivi.com/images/gioi-thieu/xuong-san-xuat.jpg",
        "width": 1200,
        "height": 630,
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2"],
      },
    },
  ];

  const meta = {
    title: `Đồng Phục Univi: Xưởng May ${yearsExperience} Năm Kinh Nghiệm Tại Hà Nội`,
    description: `Đồng Phục Univi thành lập 2017 tại Hà Nội — xưởng 2.000m², công suất 100.000 sp/tháng, ${yearsExperience}+ năm kinh nghiệm. Chuyên đồng phục Gym, Yoga, Pickleball cho phòng tập & doanh nghiệp. Vải UNI DRY kiểm định QCVN. Thiết kế miễn phí.`,
    keywords: `giới thiệu Đồng Phục Univi, xưởng may đồng phục Hà Nội, đồng phục thể thao chuyên dụng, đồng phục Gym Yoga Pickleball, công nghệ UNI DRY, kiểm định QCVN, ${yearsExperience} năm kinh nghiệm`,
    robots: "index, follow",
    author: "Đồng Phục Univi",
    canonical: "https://dongphucunivi.com/gioi-thieu",
    og: {
      title: `Đồng Phục Univi: Xưởng May ${yearsExperience} Năm Kinh Nghiệm`,
      description: `Xưởng sản xuất đồng phục thể thao chuyên dụng tại Hà Nội — ${yearsExperience}+ năm, 2.000m², 100.000 sp/tháng. Vải UNI DRY nhập khẩu, kiểm định QCVN 01:2017/BCT.`,
      type: "website",
      image: "https://dongphucunivi.com/images/gioi-thieu/xuong-san-xuat.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      imageAlt: "Xưởng sản xuất đồng phục thể thao Đồng Phục Univi tại Đan Phượng, Hà Nội — diện tích 2.000m²",
      url: "https://dongphucunivi.com/gioi-thieu",
      site_name: "Đồng Phục Univi",
    },
    twitter: {
      card: "summary_large_image",
      title: `Đồng Phục Univi: Xưởng May ${yearsExperience} Năm Kinh Nghiệm`,
      description: `Xưởng sản xuất đồng phục thể thao chuyên dụng tại Hà Nội — ${yearsExperience}+ năm, 2.000m², 100.000 sp/tháng.`,
      image: "https://dongphucunivi.com/images/gioi-thieu/xuong-san-xuat.jpg",
    },
    schema,
  };

  return { props: { meta } };
}