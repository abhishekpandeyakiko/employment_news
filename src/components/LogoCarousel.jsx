import { useState } from "react";
import ExternalLinkOpener from "./ExternalLinkOpener";
import { FaPause, FaPlay, FaGlobe } from "react-icons/fa";

export default function LogoCarousel({ logos, footerUrl }) {
  const [userPaused, setUserPaused] = useState(false);

  return (
    <div className="py-4 sm:py-8 bg-white group px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-primary-700">
          <span><FaGlobe size={18} className="sm:w-6 sm:h-6" aria-hidden="true" /></span>
          <span>Other Important Sites</span>
        </h2>

        {/* Pause/Play Button */}
        <button
          onClick={() => setUserPaused(!userPaused)}
          className="bg-gray-100 hover:bg-gray-200 text-primary-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer z-10 relative"
          aria-label={userPaused ? "Start automatic scrolling" : "Stop automatic scrolling"}
          title={userPaused ? "Play" : "Pause"}
        >
          {userPaused ? <FaPlay className="w-3 h-3" /> : <FaPause className="w-3 h-3" />}
        </button>
      </div>

      {/* 
        Outer container: 
        - Hides overflow
        - Applies the mask image so the fade effect is static
      */}
      <div
        className="w-full overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
        }}
      >
        {/* 
          Inner track: 
          - Flex container
          - Animation
          - Width: max-content to fit all items
        */}
        <div
          className="flex gap-6 sm:gap-16 animate-scroll-left w-max"
          style={{
            animationPlayState: userPaused ? "paused" : "running"
          }}
          onMouseEnter={() => { }} // Hover pause is handled by CSS
          onMouseLeave={() => { }}
          role="marquee"
          aria-live={userPaused ? "polite" : "off"}
        >
          {/* First set of logos */}
          {logos.map((src, idx) => (
            <div key={`original-${idx}`} className="shrink-0">
              <ExternalLinkOpener
                url={footerUrl[idx]}
                text={<img src={src} alt="" className="h-10 sm:h-14 object-contain  transition-all duration-500 cursor-pointer" />}
                className="block"
                ariaLabel={`Visit website: ${footerUrl[idx]}`}
              />
            </div>
          ))}

          {/* Duplicate set of logos for seamless loop */}
          {logos.map((src, idx) => (
            <div key={`duplicate-${idx}`} className="shrink-0">
              <ExternalLinkOpener
                url={footerUrl[idx]}
                text={<img src={src} alt="" className="h-10 sm:h-14 object-contain  transition-all duration-500 cursor-pointer" />}
                className="block"
                ariaLabel={`Visit website: ${footerUrl[idx]}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
