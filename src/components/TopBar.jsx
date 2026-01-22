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

  const handleLangSelect = (lang) => {
    setLangOpen(false);
    i18n.changeLanguage(lang);
    localStorage.setItem("appLang", lang);
    window.location.reload()
  };
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const searchInputRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close Language Dropdown on Click Outside or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangOpen(false);
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
          <a href={data.facebook_url} aria-label="Visit our Facebook page"><FaFacebookF className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>
          <a href={data.twitter_url} aria-label="Visit our X (Twitter) page"><RiTwitterXLine className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>
          <a href={data.instagram_url} aria-label="Visit our Instagram page"><FaInstagram className="w-3 h-3 xs:w-4 xs:h-4" aria-hidden="true" /></a>
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

          {/* Search */}
          <div className="relative">
            <button onClick={handleSearchClick} aria-label="Toggle search">
              <FaSearch
                className="w-4 h-4 cursor-pointer"
              />
            </button>
            {searchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="absolute right-0 top-6 w-32 xs:w-40 sm:w-48 px-2 py-1 border border-gray-300 rounded shadow focus:outline-none text-xs bg-white z-30"
                onBlur={() => {
                  // Just delay slightly to allow click to register if needed, 
                  // or better yet, rely on the global click outside
                }}
              />
            )}


          </div>
          <div className="ml-auto text-primary-700 text-xs sm:text-sm pl-3">
            <ExternalLinkOpener
              url="https://en.eversion.in/"
              text={<Translate text="eversion" />}
              className="hover:underline"
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
  );
}
