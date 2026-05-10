import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    src: '/images/banner-promotion-1.jpg', // Replace with your actual image path
    alt: 'Công nghệ mát lạnh cảm biến – UNI IC',
  },
  {
    src: '/images/banner-promotion-2.jpg', // Replace with your actual image path
    alt: 'Công nghệ mát lạnh cảm biến – UNI IC',

  },
  {
    src: '/images/banner-promotion-3.jpg', // Replace with your actual image path
    alt: 'Công nghệ mát lạnh cảm biến – UNI IC',

  },
];

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 hidden md:block">
      <div className="relative w-full min-h-[400px] overflow-hidden rounded-lg">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="w-full h-full object-fill"
              priority={index === 0} // Optimize first image
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;