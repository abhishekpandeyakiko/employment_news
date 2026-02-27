import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { MdAccessibilityNew } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import AccessibilityDrawer from "./AccessibilityDrawer";
import { useTranslation } from "react-i18next";
import Translate from "./Translate";
import ExternalLinkOpener from "./ExternalLinkOpener";

export default function TopBar({ data }) {
  const { i18n } = useTranslation();

  const [isChanging, setIsChanging] = useState(false);
  const [targetLangName, setTargetLangName] = useState("");

  const handleLangSelect = (lang) => {
    if (lang === i18n.language) {
      setLangOpen(false);
      return;
    }
    setIsChanging(true);
    setTargetLangName(lang === "en" ? "English" : "हिंदी");
    setLangOpen(false);

    // Smooth transition
    i18n.changeLanguage(lang);
    localStorage.setItem("appLang", lang);

    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close Language Dropdown on Click Outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setSearchOpen(false);
      }
    };

    if (langOpen || searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [langOpen, searchOpen]);


  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
    setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100);
  };

  return (
    <>
      {isChanging && (
        <div className="fixed top-0 left-0 w-full bg-primary-700 text-white py-2.5 z-[9999] shadow-2xl flex items-center justify-center space-x-3 transition-all animate-slide-down">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium text-sm sm:text-base">
            {targetLangName === "हिंदी" ? "भाषा बदली जा रही है: हिंदी..." : "Changing language to English..."}
          </span>
        </div>
      )}
      <div className="w-full border-b border-primary-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-1 sm:px-4 py-1 sm:py-2 gap-y-1 text-xs sm:text-sm">
          {/* Left Side */}
          <div className="flex items-center space-x-4 text-primary-700">
            <button
              onClick={() => {
                const target = document.getElementById('skip-target') || document.getElementById('main-content');
                if (target) {
                  target.focus();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:underline text-sm font-medium cursor-pointer"
            >
              <Translate text="skip-to-main-content" />
            </button>
            <span className="text-primary-700" aria-hidden="true">|</span>
            <Link to="/screen-reader-access" className="hover:underline text-sm font-medium"><Translate text="screen_reader" /></Link>
          </div>
          {/* Right Side */}
          <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 text-primary-700 relative text-base">
            <ExternalLinkOpener
              url={data.facebook_url}
              ariaLabel="Visit our Facebook page"
              text={<FaFacebookF className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" />}
            />
            <ExternalLinkOpener
              url={data.twitter_url}
              ariaLabel="Visit our X (Twitter) page"
              text={<RiTwitterXLine className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" />}
            />
            {/* <ExternalLinkOpener
              url={data.instagram_url}
              ariaLabel="Visit our Instagram page"
              text={<FaInstagram className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" />}
            /> */}

            {/* <a href={data.facebook_url} aria-label="Visit our Facebook page"><FaFacebookF className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>
            <a href={data.twitter_url} aria-label="Visit our X (Twitter) page"><RiTwitterXLine className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>
            <a href={data.instagram_url} aria-label="Visit our Instagram page"><FaInstagram className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>  */}


            <span className="text-primary-700" aria-hidden="true">|</span>

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                className="flex items-center space-x-1 cursor-pointer focus:outline-none"
                onClick={() => setLangOpen((prev) => !prev)}
                aria-expanded={langOpen}
                aria-haspopup="true"
                aria-label="Language Selector"
              >
                <span>{i18n.language == 'en' ? "English" : "हिंदी"}</span>
                <FaChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow z-20 min-w-[80px]" role="menu">
                  <button
                    className={`w-full text-left px-3 py-1 hover:bg-primary-50 cursor-pointer ${i18n.language === "en" ? "font-semibold" : ""}`}
                    onClick={() => handleLangSelect("en")}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    className={`w-full text-left px-3 py-1 hover:bg-primary-50 cursor-pointer ${i18n.language === "hi" ? "font-semibold" : ""}`}
                    onClick={() => handleLangSelect("hi")}
                    role="menuitem"
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            <span className="text-gray-600" aria-hidden="true">|</span>
            <button
              onClick={() => setAccessibilityOpen(true)}
              className="p-1 hover:bg-gray-100 rounded focus:ring-2 focus:ring-primary-500"
              aria-label="Open accessibility options"
            >
              <MdAccessibilityNew className="w-5 h-5 text-primary-600" />
            </button>
            <span className="text-gray-600" aria-hidden="true">|</span>

            {/* Search Bar */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={handleSearchClick}
                className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${searchOpen ? 'bg-primary-100 text-primary-800' : 'hover:bg-primary-50 text-primary-700'}`}
                aria-label="Toggle search"
              >
                <FaSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-10 w-48 xs:w-56 sm:w-72 bg-white border border-primary-100 rounded-lg shadow-xl p-1.5 z-50 flex items-center animate-slide-down">
                  <div className="relative w-full">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Type and search..."
                      className="w-full pl-3 pr-10 py-1.5 bg-gray-50 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white text-xs sm:text-sm transition-all text-primary-900"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const query = e.target.value;
                          if (query) console.log("Search query:", query);
                        }
                      }}
                    />
                    <button
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-primary-600 hover:text-primary-800 transition-colors"
                      aria-label="Submit search"
                      onClick={() => {
                        const val = searchInputRef.current?.value;
                        if (val) console.log("Search query:", val);
                      }}
                    >
                      <FaSearch className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-auto text-primary-700 text-xs sm:text-sm pl-3">
              <ExternalLinkOpener
                url="https://en.eversion.in/"
                text={<Translate text="eversion" />}
                className="hover:underline"
                ariaLabel="Open e-version of Employment News in a new tab"
              />
            </div>
          </div>

        </div>

        {/* Accessibility Drawer */}
        <AccessibilityDrawer
          isOpen={accessibilityOpen}
          onClose={() => setAccessibilityOpen(false)}
        />
      </div>
    </>
  );
}
