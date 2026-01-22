import React, { useState, useEffect } from "react";
import {
  MdClose,
  MdTextIncrease,
  MdTextDecrease,
  MdVisibility,
  MdVolumeUp,
  MdKeyboard,
  MdLightMode,
  MdDarkMode,
  MdLink,
  MdImage,
  MdMouse,
  MdContrast,
  MdVerticalAlignTop,
  MdRecordVoiceOver,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Translate from "./Translate";

export default function AccessibilityDrawer({ isOpen, onClose }) {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light'); // 'light', 'dark'
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [textSpacing, setTextSpacing] = useState({ lineHeight: 1.5, letterSpacing: 0 });
  const [hideImages, setHideImages] = useState(false);
  const [cursorSize, setCursorSize] = useState('normal'); // 'normal', 'large', 'extra-large'
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  // Body scroll lock and Focus Trap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Focus trap logic
      const drawer = document.querySelector('.accessibility-drawer');
      if (drawer) {
        const focusableElements = drawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element on open
        setTimeout(() => firstElement?.focus(), 100);

        const handleTab = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) { /* shift + tab */
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else { /* tab */
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        const handleEscape = (e) => {
          if (e.key === 'Escape') onClose();
        };

        drawer.addEventListener('keydown', handleTab);
        window.addEventListener('keydown', handleEscape);

        return () => {
          drawer.removeEventListener('keydown', handleTab);
          window.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = "";
        };
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  // Apply accessibility settings
  useEffect(() => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}px`;

    // Theme
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);

    // High contrast
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }

    // Text spacing
    document.documentElement.style.setProperty('--line-height', textSpacing.lineHeight);
    document.documentElement.style.setProperty('--letter-spacing', `${textSpacing.letterSpacing}px`);

    // Highlight links
    if (highlightLinks) {
      document.body.classList.add("highlight-links");
    } else {
      document.body.classList.remove("highlight-links");
    }

    // Hide images
    if (hideImages) {
      document.body.classList.add("hide-images");
    } else {
      document.body.classList.remove("hide-images");
    }

    // Cursor size
    document.body.classList.remove("cursor-normal", "cursor-large", "cursor-extra-large");
    document.body.classList.add(`cursor-${cursorSize}`);

    // Focus indicators
    if (focusVisible) {
      document.body.classList.add("focus-visible");
    } else {
      document.body.classList.remove("focus-visible");
    }

    // Screen Reader Mode
    if (screenReader) {
      document.body.classList.add("screen-reader-mode");
    } else {
      document.body.classList.remove("screen-reader-mode");
    }

    // Keyboard Navigation Mode
    if (keyboardNav) {
      document.body.classList.add("keyboard-nav-mode");
    } else {
      document.body.classList.remove("keyboard-nav-mode");
    }

    return () => {
      document.documentElement.style.fontSize = "16px";
      document.body.classList.remove(
        "theme-light", "theme-dark", "high-contrast",
        "highlight-links", "hide-images",
        "cursor-normal", "cursor-large", "cursor-extra-large",
        "focus-visible", "screen-reader-mode", "keyboard-nav-mode"
      );
      document.documentElement.style.removeProperty('--line-height');
      document.documentElement.style.removeProperty('--letter-spacing');
    };
  }, [fontSize, theme, highContrast, highlightLinks, textSpacing, hideImages, cursorSize, focusVisible, screenReader, keyboardNav]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 32));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const updateTextSpacing = (property, value) => {
    setTextSpacing(prev => ({ ...prev, [property]: value }));
  };

  const resetSettings = () => {
    setFontSize(16);
    setTheme('light');
    setHighContrast(false);
    setHighlightLinks(false);
    setTextSpacing({ lineHeight: 1.5, letterSpacing: 0 });
    setHideImages(false);
    setCursorSize('normal');
    setScreenReader(false);
    setKeyboardNav(false);
    setFocusVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] transition-colors duration-300 ${isOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
        }`}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        className={`accessibility-drawer absolute right-0 top-0 h-full w-[360px] bg-white shadow-lg flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ zIndex: 110 }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-500 text-white">
          <h2 className="text-lg font-semibold">Accessibility Options</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-600 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close accessibility drawer"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdVerticalAlignTop className="w-5 h-5 mr-2 text-primary-600" />
              Quick Actions
            </h3>
            <button
              onClick={() => {
                const main = document.getElementById('main-content');
                if (main) {
                  main.focus();
                  main.scrollIntoView({ behavior: 'smooth' });
                  onClose();
                }
              }}
              className="w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg font-medium flex items-center justify-between transition-colors border border-primary-100"
            >
              <span><Translate text="skip-to-main-content" /></span>
              <MdVerticalAlignTop className="w-5 h-5 rotate-180" />
            </button>

            <Link
              to="/screen-reader-access"
              onClick={onClose}
              className="w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg font-medium flex items-center justify-between transition-colors border border-primary-100"
            >
              <span><Translate text="screen_reader" /></span>
              <MdRecordVoiceOver className="w-5 h-5" />
            </Link>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdLightMode className="w-5 h-5 mr-2 text-primary-600" />
              Theme
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <MdLightMode className="w-4 h-4" />
                <span className="text-sm">Light</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <MdDarkMode className="w-4 h-4" />
                <span className="text-sm">Dark</span>
              </label>
            </div>
          </div>

          {/* High Contrast */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdContrast className="w-5 h-5 mr-2 text-primary-600" />
              High Contrast
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Enable high contrast mode for better visibility</span>
            </label>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdTextIncrease className="w-5 h-5 mr-2 text-primary-600" />
              Text Size
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={decreaseFontSize}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Decrease font size"
              >
                <MdTextDecrease className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {fontSize}px
              </span>
              <button
                onClick={increaseFontSize}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Increase font size"
              >
                <MdTextIncrease className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-600">Range: 12px - 32px</p>
          </div>

          {/* Highlight Links */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdLink className="w-5 h-5 mr-2 text-primary-600" />
              Highlight Links
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightLinks}
                onChange={(e) => setHighlightLinks(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Make links more visible</span>
            </label>
          </div>

          {/* Text Spacing */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdTextIncrease className="w-5 h-5 mr-2 text-primary-600" />
              Text Spacing
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Line Height</label>
                <input
                  type="range"
                  min="1.2"
                  max="2.5"
                  step="0.1"
                  value={textSpacing.lineHeight}
                  onChange={(e) => updateTextSpacing('lineHeight', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Tight</span>
                  <span>{textSpacing.lineHeight}</span>
                  <span>Loose</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Letter Spacing</label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={textSpacing.letterSpacing}
                  onChange={(e) => updateTextSpacing('letterSpacing', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Tight</span>
                  <span>{textSpacing.letterSpacing}px</span>
                  <span>Loose</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hide Images */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdImage className="w-5 h-5 mr-2 text-primary-600" />
              Hide Images
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hideImages}
                onChange={(e) => setHideImages(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Hide images for better text focus</span>
            </label>
          </div>

          {/* Cursor Size */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdMouse className="w-5 h-5 mr-2 text-primary-600" />
              Cursor Size
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="cursorSize"
                  value="normal"
                  checked={cursorSize === 'normal'}
                  onChange={(e) => setCursorSize(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">Normal</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="cursorSize"
                  value="large"
                  checked={cursorSize === 'large'}
                  onChange={(e) => setCursorSize(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">Large</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="cursorSize"
                  value="extra-large"
                  checked={cursorSize === 'extra-large'}
                  onChange={(e) => setCursorSize(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">Extra Large</span>
              </label>
            </div>
          </div>

          {/* Focus Indicators */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdVisibility className="w-5 h-5 mr-2 text-primary-600" />
              Focus Indicators
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={focusVisible}
                onChange={(e) => setFocusVisible(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Enhanced focus indicators</span>
            </label>
          </div>

          {/* Screen Reader */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdVolumeUp className="w-5 h-5 mr-2 text-primary-600" />
              Screen Reader
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={screenReader}
                onChange={(e) => setScreenReader(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Screen reader friendly mode</span>
            </label>
          </div>

          {/* Keyboard Navigation */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center">
              <MdKeyboard className="w-5 h-5 mr-2 text-primary-600" />
              Keyboard Navigation
            </h3>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={keyboardNav}
                onChange={(e) => setKeyboardNav(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Enhanced keyboard navigation</span>
            </label>
          </div>
        </div>

        {/* Reset Button (sticky bottom) */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={resetSettings}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
