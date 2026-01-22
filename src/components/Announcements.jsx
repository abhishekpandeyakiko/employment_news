import { FaExclamationTriangle, FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import Translate from "./Translate";

export default function Announcements({ announcements }) {

  const [paused, setPaused] = useState(false);

  return (
    <div className="w-full bg-primary-700 text-white text-sm">
      <div className="max-w-8xl mx-auto flex items-center px-2 sm:px-6 md:px-12 py-2 space-x-2 sm:space-x-3">
        <div className="hidden sm:flex items-center bg-primary-700 px-3 py-1 rounded text-xs font-semibold space-x-2">
          <FaExclamationTriangle className="w-3 h-3" aria-hidden="true" />
          <h2><Translate text={'announcements'} /></h2>
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play announcements" : "Pause announcements"}
            className="border border-white rounded-full p-1 hover:bg-primary-800 transition"
          >
            {paused ? (
              <FaPlay className="w-2.5 h-2.5" aria-hidden="true" />
            ) : (
              <FaPause className="w-2.5 h-2.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Marquee Wrapper */}
        <div
          className="relative flex-1 overflow-hidden bg-white px-2 sm:px-3 py-1 rounded font-bold text-xs sm:text-sm text-[#6C4713]"
          role="region"
          aria-label="Announcements"
          aria-live="polite"
        >
          <div
            className={`flex gap-12 whitespace-nowrap ${paused ? "" : "animate-marquee"
              }`}
          >
            {announcements.map((item, index) => (
              item?.url ? (
                <a
                  href={item.url}
                  key={index}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                >
                  {item.title}
                </a>
              ) : (
                <span key={index}>{item.title}</span>
              )
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <button className="bg-white text-primary-600 text-xs font-semibold px-3 py-1 rounded shadow">
            <Translate text={'view-all'} />
          </button>
        </div>
      </div>
    </div>
  );
}
