import Link from "next/link";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaArrowRight, FaLinkedin } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Top Section - Contact Info */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4  gap-6">
              {/* Phone */}
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gray-300 transition-all duration-300 group-hover:scale-105">
                  <FaPhone className="text-gray-600 text-lg" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Hotline</p>
                  <p className="text-white font-semibold text-lg">0834.204.999</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gray-300 transition-all duration-300 group-hover:scale-105">
                  <FaEnvelope className="text-gray-600 text-lg" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Email</p>
                  <p className="text-white font-semibold text-sm">dongphucunivi@gmail.com</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gray-300 transition-all duration-300 group-hover:scale-105">
                  <FaClock className="text-gray-600 text-lg" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Giờ làm việc</p>
                  <p className="text-white font-semibold text-sm">08:00 - 18:00</p>
                  <p className="text-slate-400 text-xs">T2-CN</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gray-300 transition-all duration-300 group-hover:scale-105">
                  <FaMapMarkerAlt className="text-gray-600 text-lg" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Địa chỉ</p>
                  <p className="text-white font-semibold text-sm">Nhà D14, 180 Thanh Bình, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Company Info - Full width on mobile */}
            <div className="mb-8">
              <div className="mb-6">
                <div className="mb-4">
                  <Image
                    src="/logo-univi.webp"
                    alt="Đồng phục Univi"
                    width={200}
                    height={60}
                    className="h-12 w-auto"
                    priority
                  />
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  Thương hiệu đồng phục thể thao chuyên nghiệp, chất lượng cao với thiết kế hiện đại và sang trọng.
                </p>

                {/* Social Media */}
                <div className="flex space-x-4">
                  <Link href="https://web.facebook.com/Dongphucunivi" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500 transition-all duration-300 hover:scale-110">
                    <FaFacebook className="text-white" />
                  </Link>
                  <Link href="https://www.linkedin.com/company/dongphucunivi/" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-pink-500 transition-all duration-300 hover:scale-110">
                    <BsLinkedin className="text-white" />
                  </Link>
                  <Link href="https://www.youtube.com/@dongphucunivi" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-red-500 transition-all duration-300 hover:scale-110">
                    <FaYoutube className="text-white" />
                  </Link>
                  <Link href="https://www.tiktok.com/@dongphucthethao.univi" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-gray-500 transition-all duration-300 hover:scale-110">
                    <FaTiktok className="text-white" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Custom Grid Layout for mobile */}
            <div className="space-y-6">
              {/* Hàng 1: Giới thiệu và Hỗ trợ khách hàng */}
              <div className="grid grid-cols-2 gap-6">
                {/* Giới thiệu */}
                <div>
                  <p className="text-lg font-semibold text-white mb-4 relative">
                    Giới thiệu
                    <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-blue-500"></div>
                  </p>
                  <ul className="space-y-2">
                    {[
                      { href: "/gioi-thieu", text: "Về Đồng phục Univi" },
                      { href: "/ho-so-nang-luc", text: "Hồ sơ năng lực" },
                      { href: "/lien-he", text: "Liên hệ" },
                      { href: "/tuyen-dung", text: "Tuyển dụng" }
                    ].map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                        >
                          <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hỗ trợ khách hàng */}
                <div>
                  <p className="text-lg font-semibold text-white mb-4 relative">
                    Hỗ trợ khách hàng
                    <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-orange-500"></div>
                  </p>
                  <ul className="space-y-2">
                    {[
                      { href: "/chinh-sach-bao-mat", text: "Chính sách bảo mật" },
                      { href: "/dieu-khoan-su-dung", text: "Điều khoản sử dụng" },
                      { href: "/huong-dan-dat-hang", text: "Hướng dẫn đặt hàng" },
                      { href: "/chinh-sach-bao-hanh", text: "Chính sách bảo hành" },
                      { href: "/chinh-sach-doi-tra", text: "Chính sách đổi trả" },
                      { href: "/chinh-sach-dai-ly", text: "Chính sách đại lý" }

                    ].map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                        >
                          <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hàng 2: Đồng phục thể thao - Full width */}
              <div>
                <p className="text-base font-semibold text-white mb-4 relative">
                  Đồng phục thể thao
                  <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-emerald-500"></div>
                </p>
                <ul className="space-y-2">
                  {[
                    { href: "/san-pham/dong-phuc-gym", text: "Đồng phục Gym" },
                    { href: "/san-pham/dong-phuc-pickleball", text: "Đồng phục Pickleball" },
                    { href: "/san-pham/dong-phuc-yoga-pilates", text: "Đồng phục Yoga - Pilates" },
                    { href: "/san-pham/dong-phuc-golf-tennis", text: "Đồng phục Golf - Tennis" },
                    { href: "/san-pham/dong-phuc-chay-bo", text: "Đồng phục Chạy bộ" },
                    { href: "/san-pham/dong-phuc-mma", text: "Đồng phục MMA" },
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hàng 4: Bản đồ */}
              <div>
                <p className="text-base font-semibold text-white mb-4 relative">
                  Bản đồ chỉ đường
                  <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-blue-500"></div>
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2342853220844!2d105.77886910000001!3d20.983243699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345390f181a5bd%3A0xcdf3833aed740992!2zxJBvzILMgG5nIFBodcyjYyBVbml2aQ!5e0!3m2!1svi!2s!4v1758983479311!5m2!1svi!2s"
                  className="w-full h-[180px] rounded-lg shadow-sm"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ Đồng phục Univi"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Company Info - Full width on mobile, 2 columns on md, 1 column on lg */}
              <div className="md:col-span-2 lg:col-span-1">
                <div className="mb-6">
                  <div className="mb-4">
                    <Image
                      src="/logo-univi.webp"
                      alt="Đồng phục Univi"
                      width={200}
                      height={60}
                      className="h-12 w-auto"
                      priority
                    />
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Thương hiệu đồng phục thể thao chuyên nghiệp, chất lượng cao với thiết kế hiện đại và sang trọng.
                  </p>

                  {/* Social Media */}
                  <div className="flex space-x-4">
                    <a href="https://web.facebook.com/Dongphucunivi" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500 transition-all duration-300 hover:scale-110">
                      <FaFacebook className="text-white" />
                    </a>
                    <a href="https://www.youtube.com/@dongphucunivi" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-red-500 transition-all duration-300 hover:scale-110">
                      <FaYoutube className="text-white" />
                    </a>
                    <a href="http://linkedin.com/company/univi-uniform" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-gray-500 transition-all duration-300 hover:scale-110">
                      <FaLinkedin className="text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Giới thiệu */}
              <div className="md:col-span-1 lg:col-span-1">
                <p className="text-lg font-semibold text-white mb-6 relative">
                  Giới thiệu
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500"></div>
                </p>
                <ul className="space-y-3">
                  {[
                    { href: "/gioi-thieu", text: "Về Đồng phục Univi" },
                    { href: "/dong-sang-lap-univi-sport-tran-hien", text: "Founder UniviSport" },
                    { href: "/ho-so-nang-luc", text: "Hồ sơ năng lực" },
                    { href: "/tuyen-dung", text: "Tuyển dụng" },
                    { href: "/lien-he", text: "Liên hệ" }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Đồng phục thể thao */}
              <div className="md:col-span-1 lg:col-span-1">
                <p className="text-lg font-semibold text-white mb-6 relative">
                  Đồng phục thể thao
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-emerald-500"></div>
                </p>
                <ul className="space-y-3">
                  {[
                    { href: "/san-pham/dong-phuc-gym", text: "Đồng phục Gym" },
                    { href: "/san-pham/dong-phuc-pickleball", text: "Đồng phục Pickleball" },
                    { href: "/san-pham/dong-phuc-golf-tennis", text: "Đồng phục Golf - Tennis" },
                    { href: "/san-pham/dong-phuc-yoga-pilates", text: "Đồng phục Yoga - Pilates" },
                    { href: "/san-pham/dong-phuc-chay-bo", text: "Đồng phục Chạy bộ" },
                    { href: "/san-pham/dong-phuc-mma", text: "Đồng phục MMA" },
                    { href: "/san-pham/dong-phuc-ao-gio", text: "Đồng phục áo gió" }

                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hỗ trợ khách hàng */}
              <div className="md:col-span-1 lg:col-span-1">
                <p className="text-lg font-semibold text-white mb-6 relative">
                  Hỗ trợ khách hàng
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500"></div>
                </p>
                <ul className="space-y-3">
                  {[
                    { href: "/chinh-sach-bao-mat", text: "Chính sách bảo mật" },
                    { href: "/chinh-sach-bao-hanh", text: "Chính sách bảo hành" },
                    { href: "/dieu-khoan-su-dung", text: "Điều khoản sử dụng" },
                    { href: "/huong-dan-dat-hang", text: "Hướng dẫn đặt hàng" },
                    { href: "/chinh-sach-doi-tra", text: "Chính sách đổi trả" },
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-slate-300 text-base hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* GG Maps */}
              <div className="md:col-span-1 lg:col-span-1">
                <p className="text-lg font-semibold text-white mb-6 relative">
                  Bản đồ chỉ đường
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-500"></div>
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2342853220844!2d105.77886910000001!3d20.983243699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345390f181a5bd%3A0xcdf3833aed740992!2zxJBvzILMgG5nIFBodcyjYyBVbml2aQ!5e0!3m2!1svi!2s!4v1758983479311!5m2!1svi!2s"
                  className="w-full h-[180px] rounded-lg shadow-sm"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ Đồng phục Univi"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="text-center space-y-2">
              <p className="text-slate-300 text-xs md:text-base">
                Đồng phục Univi một thương hiệu Thuộc hệ sinh thái Đồng Phục Univi
              </p>
              <p className="text-slate-300 text-xs md:text-base ">
                CÔNG TY CỔ PHẦN TẬP ĐOÀN UNICORE HOLDINGS | MST: 0111401705
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}