import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const FeedbackSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback?limit=15'); // Limit to 15 latest feedbacks
        const data = await res.json();
        if (data.success && data.data && data.data.projects) {
          setFeedbacks(
            data.data.projects.map(p => ({
              title: p.title,
              image: p.image || '/images/dong-phuc-default.jpg',
              link: `/feedback/${p.slug}`,
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 480) {
        setItemsPerSlide(1); // 1 item on very small screens
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2); // 2 items on mobile
      } else {
        setItemsPerSlide(5); // 5 items on desktop
      }
      setCurrentSlide(0); // Reset slide on resize
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => prev + 1);
  const prevSlide = () => setCurrentSlide((prev) => Math.max(0, prev - 1));

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= feedbacks.length - itemsPerSlide;
  const itemWidthPercentage = itemsPerSlide === 1 ? 100 : itemsPerSlide === 2 ? 50 : 20;

  if (isLoading) {
    return <div className="text-center py-10">Đang tải data feedback...</div>;
  }

  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center md:text-2xl text-xl uppercase font-bold text-[#105d97] mb-4 sm:mb-6 md:mb-10">
          FEEDBACK KHÁCH HÀNG UNIVI
        </h2>
        <div className="relative overflow-hidden">
          <div
            id="feedback-slider"
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * itemWidthPercentage}%)` }}
          >
            {feedbacks.map((feedback, index) => (
              <div key={index} className={`px-1 sm:px-2 ${itemsPerSlide === 1 ? 'min-w-full' : itemsPerSlide === 2 ? 'min-w-[50%]' : 'min-w-[20%]'}`}>
                <Link href={feedback.link}>
                  <div
                    className="flex flex-col cursor-pointer group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    role="link"
                    tabIndex={0}
                    aria-label={`Xem feedback từ ${feedback.title}`}
                  >
                    <div className="relative aspect-[3/2]  rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Image
                        src={feedback.image}
                        width={400}
                        height={300}
                        alt={`Feedback from ${feedback.title}`}
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 20vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl transition-opacity duration-300">
                          <span className="px-4 py-2 bg-[#105d97] text-white rounded-full hover:bg-[#084a7a] transition-colors font-medium">
                            Xem chi tiết
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-gray-800 text-base font-semibold mt-3 text-center leading-tight px-1 group-hover:text-[#105d97] transition-colors duration-200">
                      {feedback.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Positioned at left and right of image area */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute left-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#105d97] text-white transition-all duration-200 hover:bg-[#084a7a] focus:outline-none focus:ring-2 focus:ring-[#105d97]/50 shadow-lg z-20 ${isPrevDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-110 active:scale-95"
              }`}
            style={{ top: '40%' }}
            aria-label="Feedback trước"
            aria-disabled={isPrevDisabled}
            aria-controls="feedback-slider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#105d97] text-white transition-all duration-200 hover:bg-[#084a7a] focus:outline-none focus:ring-2 focus:ring-[#105d97]/50 shadow-lg z-20 ${isNextDisabled ? "cursor-not-allowed opacity-50" : "hover:scale-110 active:scale-95"
              }`}
            style={{ top: '40%' }}
            aria-label="Feedback tiếp theo"
            aria-disabled={isNextDisabled}
            aria-controls="feedback-slider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Dots Indicator */}
          {itemsPerSlide < 5 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: Math.ceil(feedbacks.length / itemsPerSlide) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${Math.floor(currentSlide / itemsPerSlide) === index
                    ? 'bg-[#105d97] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Đi đến slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;