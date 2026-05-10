import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/logo-univi.webp";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ContactForm from "./ContactForm";

// ─── Đồng phục thể thao dropdown ─────────────────────────────────────────────
const SportUniformMenu = () => (
  <div className="relative group">
    <Link
      href="/dong-phuc-the-thao"
      className="flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300"
    >
      Đồng phục thể thao
      <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
    </Link>

    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
      <div className="p-4">
        <p className="px-3 text-xs font-bold uppercase tracking-widest text-[#105d97] mb-3">
          Danh mục thể thao
        </p>
        <ul className="space-y-1">
          {[
            { name: "Đồng phục Gym", href: "/san-pham/dong-phuc-gym" },
            { name: "Đồng phục MMA", href: "/san-pham/dong-phuc-mma" },
            { name: "Đồng phục Chạy bộ", href: "/san-pham/dong-phuc-chay-bo" },
            { name: "Đồng phục Pickleball", href: "/san-pham/dong-phuc-pickleball" },
            { name: "Đồng phục Yoga - Pilates", href: "/san-pham/dong-phuc-yoga-pilates" },
            { name: "Đồng phục Golf - Tennis", href: "/san-pham/dong-phuc-golf-tennis" },
            { name: "Đồng phục Áo gió", href: "/san-pham/dong-phuc-ao-gio" }

          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-[#105d97] hover:bg-blue-50 rounded-lg transition-all duration-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);


// ─── Giới thiệu dropdown ────────────────────────────────────────────────────
const GioiThieuDropdown = () => (
  <div className="relative group">
    <button className="flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300">
      Giới thiệu
      <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
      <div className="p-2">
        {[
          { name: "Về chúng tôi", href: "/gioi-thieu" },
          { name: "Hồ sơ năng lực", href: "/ho-so-nang-luc" },
          { name: "Giải pháp 2S", href: "/giai-phap-2s" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="block px-4 py-3 text-sm text-gray-600 hover:text-[#105d97] hover:bg-blue-50 rounded-xl transition-all duration-200">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Navbar ─────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  // Listen for global open contact modal event
  useEffect(() => {
    const handleOpenContact = () => setContactOpen(true);
    window.addEventListener("openContactModal", handleOpenContact);
    return () => window.removeEventListener("openContactModal", handleOpenContact);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[99999] bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src={logo} alt="Đồng Phục Univi" width={110} height={44} priority className="h-auto w-auto" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/" className="px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300">
                Trang chủ
              </Link>
              <GioiThieuDropdown />
              <SportUniformMenu />
              <Link href="/bai-viet" className="px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300">
                Bài viết
              </Link>
              <Link href="/feedback" className="px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300">
                Feedback
              </Link>
              <Link href="/lien-he"
                className="px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-[#105d97] hover:bg-blue-50 transition-all duration-300"
              >
                Liên hệ
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-2">
              {/* Liên hệ đặt hàng button */}
              <button
                onClick={() => setContactOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-[#105d97] hover:bg-[#0d4c7a] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300"
              >
                Liên hệ đặt hàng
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
                aria-label="Mở menu"
              >
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <ResponsiveNavbar isOpen={menuOpen} toggleMenu={() => setMenuOpen(false)} />

      {/* Contact modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999999] flex items-center justify-center px-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-6 py-4 flex justify-center items-center border-b rounded-t-lg relative">
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
            <ContactForm source={`Navbar (${router.asPath})`} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
