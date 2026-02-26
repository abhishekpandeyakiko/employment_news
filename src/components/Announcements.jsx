import { FaExclamationTriangle, FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import Translate from "./Translate";
import { Link } from "react-router-dom";

export default function Announcements({ announcements }) {

  const [paused, setPaused] = useState(false);

  return (
    <div className="w-full bg-primary-700 text-white text-sm">
      <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-start sm:items-center px-2 sm:px-6 md:px-12 py-2 gap-2 sm:gap-3">
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start bg-primary-700 px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold shrink-0 gap-1 sm:gap-2">
          <FaExclamationTriangle className="w-3 h-3 shrink-0" aria-hidden="true" />
          <h2 className="whitespace-nowrap"><Translate text={'announcements'} /></h2>
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
          className="relative flex-1 w-full overflow-hidden bg-white px-2 sm:px-3 py-1 rounded font-bold text-xs sm:text-sm text-[#6C4713]"
          role="region"
          aria-label="Announcements"
        >
          <div
            className="flex gap-12 whitespace-nowrap animate-scroll-left w-max"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {/* Original Content */}
            {announcements.map((item, index) => (
              item?.url ? (
                <a
                  href={item.url}
                  key={`orig-${index}`}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <span key={`orig-${index}`}>{item.title}</span>
              )
            ))}

            {/* Duplicate Content for seamless loop */}
            {announcements.map((item, index) => (
              item?.url ? (
                <a
                  href={item.url}
                  key={`dup-${index}`}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden="true" // Hide duplicate links from screen readers to avoid redundancy
                  tabIndex="-1" // Prevent tab focus on duplicates if desired, or let them be valid targets? 
                >
                  {item.title}
                </a>
              ) : (
                <span key={`dup-${index}`}>{item.title}</span>
              )
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <Link
            to="/all-announcements"
            className="bg-white text-primary-600 text-xs font-semibold px-3 py-1 rounded shadow hover:bg-gray-100 transition-colors"
          >
            <Translate text={'view-all'} />
          </Link>
        </div>
      </div>
    </div>
  );
}
