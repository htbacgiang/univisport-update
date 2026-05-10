import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaHome, FaInfoCircle, FaShoppingBag, FaNewspaper, FaPhone, FaStar, FaChevronDown, FaTimes, FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import logo from "../../public/logo-univi.webp";

const menuItems = [
  { name: "Trang chủ", link: "/", icon: FaHome },
  {
    name: "Về Đồng phục Univi",
    icon: FaInfoCircle,
    dropdown: [
      { name: "Giới thiệu", link: "/gioi-thieu" },
      { name: "Hồ sơ năng lực", link: "/ho-so-nang-luc" },
      { name: "Giải pháp 2S", link: "/giai-phap-2s" },
    ],
  },
  {
    name: "Đồng phục thể thao",
    link: "/san-pham/dong-phuc-the-thao",
    icon: FaShoppingBag,
    dropdown: [
      { name: "Đồng phục Gym", link: "/san-pham/dong-phuc-gym" },
      { name: "Đồng phục MMA", link: "/san-pham/dong-phuc-mma" },
      { name: "Đồng phục Chạy bộ", link: "/san-pham/dong-phuc-chay-bo" },
      { name: "Đồng phục Áo gió", link: "/san-pham/dong-phuc-ao-gio" },
      { name: "Đồng phục Pickleball", link: "/san-pham/dong-phuc-pickleball" },
      { name: "Đồng phục Yoga - Pilates", link: "/san-pham/dong-phuc-yoga-pilates" },
      { name: "Đồng phục Golf - Tennis", link: "/san-pham/dong-phuc-golf-tennis" },
    ],
  },
  { name: "Bài viết", link: "/bai-viet", icon: FaNewspaper },
  { name: "Liên hệ", link: "/lien-he", icon: FaPhone },
  { name: "Feedback", link: "/feedback", icon: FaStar },
];

const ResponsiveMenu = ({ isOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const router = useRouter();

  const isActivePath = (href) => {
    if (!href) return false;
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  const toggleDropdown = (idx) => {
    setActiveDropdown(activeDropdown === idx ? null : idx);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (subIdx) => {
    setActiveSubDropdown(activeSubDropdown === subIdx ? null : subIdx);
  };

  // Close on route change
  useEffect(() => {
    toggleMenu && setActiveDropdown(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl border-r border-gray-200 z-[9999] transform transition-all duration-500 ease-out lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
          <Link href="/" onClick={toggleMenu}>
            <Image src={logo} alt="Logo Univi" width={100} height={44} priority className="h-9 w-auto" />
          </Link>

        </div>

        {/* Nav items */}
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex-1 p-5 space-y-3">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const active = isActivePath(item.link);

              return (
                <div key={idx}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${active
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-[#105d97] border border-blue-200"
                          : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                          }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-xl ${active ? "bg-blue-200" : "bg-gray-100"}`}>
                            <Icon className={`text-base ${active ? "text-[#105d97]" : "text-gray-600"}`} />
                          </div>
                          <span className="text-base">{item.name}</span>
                        </div>
                        <FaChevronDown
                          className={`text-sm transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""} ${active ? "text-[#105d97]" : "text-gray-400"}`}
                        />
                      </button>

                      {/* Dropdown */}
                      <div className={`transition-all duration-300 overflow-hidden ${activeDropdown === idx ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="pl-3 space-y-1">
                          {item.dropdown[0]?.link
                            ? item.dropdown.map((sub, i) => (
                              <Link
                                key={i}
                                href={sub.link}
                                onClick={toggleMenu}
                                className="block px-3 py-3 ml-3 text-gray-600 hover:text-[#105d97] hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-2 border-gray-200 hover:border-[#105d97]"
                              >
                                {sub.name}
                              </Link>
                            ))
                            : item.dropdown.map((grp, gIdx) => (
                              <div key={gIdx}>
                                <button
                                  onClick={() => toggleSubDropdown(gIdx)}
                                  className="w-full flex items-center justify-between px-5 py-3 ml-3 text-sm font-semibold text-gray-600 hover:text-[#105d97] hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-2 border-gray-200 hover:border-[#105d97]"
                                >
                                  {grp.name}
                                  <FaChevronDown className={`text-xs transition-transform duration-300 ${activeSubDropdown === gIdx ? "rotate-180" : ""}`} />
                                </button>

                                <div className={`transition-all duration-300 overflow-hidden ${activeSubDropdown === gIdx ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                  <div className="pl-4 space-y-1">
                                    {grp.subDropdown?.map((n, nIdx) => (
                                      <Link
                                        key={nIdx}
                                        href={n.link}
                                        onClick={toggleMenu}
                                        className="block px-5 py-2.5 ml-3 text-sm text-gray-500 hover:text-[#105d97] hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-2 border-gray-100 hover:border-[#105d97]"
                                      >
                                        {n.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={toggleMenu}
                      className={`flex items-center space-x-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${active
                        ? "bg-gradient-to-r from-blue-100 to-blue-50 text-[#105d97] border border-blue-200"
                        : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white text-gray-700 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                        }`}
                    >
                      <div className={`p-2 rounded-xl ${active ? "bg-blue-200" : "bg-gray-100"}`}>
                        <Icon className={`text-base ${active ? "text-[#105d97]" : "text-gray-600"}`} />
                      </div>
                      <span className="text-base">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Social icons */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-3">Theo dõi chúng tôi</p>
              <div className="flex items-center justify-center gap-3">
                {[
                  { icon: FaFacebookF, href: "https://facebook.com/Dongphucunivi", label: "Facebook", bg: "bg-blue-600" },
                  { icon: FaTiktok, href: "https://tiktok.com/@dongphucunivi", label: "TikTok", bg: "bg-gray-900" },
                  { icon: FaYoutube, href: "https://youtube.com/@dongphucunivi", label: "Youtube", bg: "bg-red-600" },
                  { icon: FaLinkedinIn, href: "https://linkedin.com/company/dongphucunivi", label: "LinkedIn", bg: "bg-sky-600" },
                ].map(({ icon: Icon, href, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-white hover:opacity-80 hover:scale-105 transition-all duration-200`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
