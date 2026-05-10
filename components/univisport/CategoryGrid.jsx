import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Đồng phục Gym",
    slug: "/san-pham/dong-phuc-gym",
    image: "/product/dong-phuc-gym.webp",
    count: 7,
  },
  {
    name: "Yoga - Pilates",
    slug: "/san-pham/dong-phuc-yoga-pilates",
    image: "/product/dong-phuc-yoga.webp",
    count: 5,
  },
  {
    name: "Chạy bộ",
    slug: "/san-pham/dong-phuc-chay-bo",
    image: "/product/dong-phuc-chay-bo.webp",
    count: 4,
  },
  {
    name: "Pickleball",
    slug: "/san-pham/dong-phuc-pickleball",
    image: "/product/dong-phuc-pickaball.webp",
    count: 4,
  },
  {
    name: "MMA Đồng phục",
    slug: "/san-pham/dong-phuc-mma",
    image: "/product/mma-dong-phuc.webp",
    count: 3,
  },
  {
    name: "Golf - Tennis",
    slug: "/san-pham/dong-phuc-golf-tennis",
    image: "/product/dong-phuc-golf.webp",
    count: 8,
  },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto py-12 ">
      {/* Using grid-cols-2 md:grid-cols-3 lg:grid-cols-6 to fit the 6 items gracefully */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6">
        {categories.map((c, i) => (
          <Link
            key={i}
            href={`/${c.slug || c.name.toLowerCase().replace(/\s+/g, "-")}`}
            aria-label={`View ${c.name} products`}
            className="group flex flex-col items-center"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl mb-4 bg-gray-100">
              <Image
                src={c.image}
                alt={c.name}
                fill
                quality={100}
                style={{ objectFit: "cover" }}
                className="transition-transform duration-700 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>

            {/* Category Info */}
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 transition-colors duration-200">
                {c.name}
              </h3>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}