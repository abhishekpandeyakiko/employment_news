import { useState } from "react";
import ExternalLinkOpener from "./ExternalLinkOpener";
import { FaPause, FaPlay, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function LogoCarousel({ logos = [], footerUrl = [] }) {
  const [userPaused, setUserPaused] = useState(false);
  const { t } = useTranslation();

  // Helper to extract a descriptive name from a URL for alt tags
  const getSiteName = (url) => {
    if (!url || url === "#") return "Government Portal";
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.split(".");
      const name = parts.length > 2 ? parts[parts.length - 2] : parts[0];
      return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ") + " Portal";
    } catch (e) {
      return "Government Official Portal";
    }
  };

  // Combine logos once for cleaner markup, doubling for the animation track
  const combinedLogos = [...logos, ...logos];
  const combinedUrls = [...footerUrl, ...footerUrl];

  return (
    <section
      className="py-4 sm:py-8 bg-white group px-4 sm:px-6"
      aria-label={t("relatedsites") || "Other Important Sites and Portals"}
    >
      <div className="mx-auto flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-primary-700">
          <span><FaGlobe size={18} className="sm:w-6 sm:h-6" aria-hidden="true" /></span>
          <span>{t("relatedsites") || "Other Important Sites"}</span>
        </h2>

        {/* Pause/Play Button for Accessibility */}
        <button
          onClick={() => setUserPaused(!userPaused)}
          className="bg-gray-100 hover:bg-gray-200 text-primary-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer z-10 relative"
          aria-label={userPaused ? "Start automatic scrolling" : "Stop automatic scrolling"}
          title={userPaused ? "Play" : "Pause"}
        >
          {userPaused ? <FaPlay className="w-3 h-3" /> : <FaPause className="w-3 h-3" />}
        </button>
      </div>

      <div
        className="w-full overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
        }}
      >
        <div
          className="flex gap-6 sm:gap-16 animate-scroll-left w-max"
          style={{
            animationPlayState: userPaused ? "paused" : "running"
          }}
          role="list"
          aria-live={userPaused ? "polite" : "off"}
        >
          {combinedLogos.map((src, idx) => {
            const isDuplicate = idx >= logos.length;
            const originalIdx = idx % logos.length;
            const url = footerUrl[originalIdx] || "https://www.india.gov.in/";
            const siteName = getSiteName(url);

            return (
              <div
                key={`${isDuplicate ? "dup" : "orig"}-${idx}`}
                className="shrink-0"
                role="listitem"
                aria-hidden={isDuplicate ? "true" : "false"}
              >
                <ExternalLinkOpener
                  url={url}
                  text={
                    <img
                      src={src}
                      alt={`${siteName} Logo`}
                      className="h-10 sm:h-14 object-contain transition-all duration-500"
                    />
                  }
                  className="block focus:outline-none"
                  ariaLabel={`Visit ${siteName} - opens in a new window`}
                  tabIndex={isDuplicate ? -1 : 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
