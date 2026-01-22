import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Translate from "./Translate";

export default function CompanyLogoSlider({ advertis }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white py-6 sm:py-8 px-4 sm:px-6">
      {/* Header + Buttons */}
      <div className=" mx-auto flex items-center justify-between sm:px-4 mb-4">
        {/* Left: Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-primary-700">
          <Translate text="web-advertisement" />
        </h2>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Previous advertisement"
            className="bg-gray-500 bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full shadow-md transition"
          >
            <FaChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next advertisement"
            className="bg-gray-500 bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full shadow-md transition"
          >
            <FaChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Native Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {advertis.map((company, index) => (
          <div key={index} className="flex-shrink-0 w-40 sm:w-48">
            <a
              href={company.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="block group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-[10px]"
            >
              <div className="bg-white border border-gray-200 h-32 rounded-[10px] overflow-hidden shadow-sm group-hover:shadow-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <img
                  src={company.image}
                  alt={company.name || "Advertisement"}
                  className="object-contain max-h-24 w-auto p-2"
                />
              </div>
              <p className="text-center text-[14px] mt-2 text-gray-600 font-medium tracking-wide group-hover:text-primary-700 truncate px-1">
                {company.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
