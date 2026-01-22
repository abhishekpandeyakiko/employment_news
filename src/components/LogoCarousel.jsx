import { useState, useRef } from "react";
import ExternalLinkOpener from "./ExternalLinkOpener";
import { FaPause, FaPlay, FaGlobe } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function LogoCarousel({ logos, footerUrl }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [userPaused, setUserPaused] = useState(false);

  const togglePause = () => {
    if (!swiperInstance) return;
    if (userPaused) {
      swiperInstance.autoplay.start();
      setUserPaused(false);
    } else {
      swiperInstance.autoplay.stop();
      setUserPaused(true);
    }
  };

  return (
    <div className="py-4 sm:py-8 bg-white group px-4 sm:px-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-primary-700">
          <span><FaGlobe size={18} className="sm:w-6 sm:h-6" aria-hidden="true" /></span>
          <span>Other Important Sites</span>
        </h2>

        {/* Pause/Play Button */}
        <button
          onClick={togglePause}
          className="bg-gray-100 hover:bg-gray-200 text-primary-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer"
          aria-label={userPaused ? "Start automatic scrolling" : "Stop automatic scrolling"}
          title={userPaused ? "Play" : "Pause"}
        >
          {userPaused ? <FaPlay className="w-3 h-3" /> : <FaPause className="w-3 h-3" />}
        </button>
      </div>

      <div
        className="w-full"
        onMouseEnter={() => !userPaused && swiperInstance?.autoplay?.stop()}
        onMouseLeave={() => !userPaused && swiperInstance?.autoplay?.start()}
        onFocus={() => !userPaused && swiperInstance?.autoplay?.stop()}
        onBlur={(e) => {
          if (!userPaused && !e.currentTarget.contains(e.relatedTarget)) {
            swiperInstance?.autoplay?.start();
          }
        }}
      >
        <Swiper
          modules={[Autoplay]}
          onSwiper={setSwiperInstance}
          spaceBetween={30}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true // Native support often smoother
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            480: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
            1280: { slidesPerView: 6, spaceBetween: 60 },
          }}
          className="w-full flex items-center"
        >
          {logos.map((src, idx) => (
            <SwiperSlide key={idx} className="!flex items-center justify-center py-2 h-20 sm:h-24">
              <ExternalLinkOpener
                url={footerUrl[idx]}
                text={
                  <div className="h-12 sm:h-16 flex items-center justify-center transition-transform hover:scale-105 duration-200">
                    <img
                      src={src}
                      alt={`Logo ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                }
                className="block w-full h-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Style for linear scrolling animation effect */}
        <style>{`
          .swiper-wrapper {
            transition-timing-function: linear;
          }
        `}</style>
      </div>
    </div>
  );
}
