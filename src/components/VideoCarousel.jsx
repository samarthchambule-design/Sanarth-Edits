import React, { useState, useRef, useEffect } from 'react';

const VideoCarousel = ({ videos, aspectRatio = "16/9", maxHeight = "300px" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Calculate visible videos (show 4 on desktop, 2 on tablet, 1 on mobile)
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    setVisibleCount(getVisibleCount());

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const maxIndex = Math.max(0, videos.length - visibleCount);

  // Ensure current index doesn't exceed max
  const safeIndex = Math.min(currentIndex, maxIndex);

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full glass-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/20"
        style={{ opacity: safeIndex > 0 ? 1 : 0.3 }}
        disabled={safeIndex === 0}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden mx-8">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${safeIndex * (100 / visibleCount)}%)`,
          }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="group/video relative overflow-hidden rounded-2xl glass hover:bg-white/10 transition-all duration-500">
                <div
                  className="mx-auto w-full"
                  style={{
                    aspectRatio: aspectRatio,
                    maxHeight: maxHeight,
                  }}
                >
                  <video
                    src={video.video}
                    className="w-full h-full object-contain bg-navy-light rounded-xl"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                  <h3 className="text-base font-bold text-white">{video.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full glass-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/20"
        style={{ opacity: safeIndex < maxIndex ? 1 : 0.3 }}
        disabled={safeIndex >= maxIndex}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.min(videos.length, maxIndex + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === safeIndex
                ? 'w-6 bg-gradient-to-r from-accent-blue to-accent-purple'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
