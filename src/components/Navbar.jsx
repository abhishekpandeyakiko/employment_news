
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Translate from "./Translate";
export default function Navbar() {
  const menuItems = [
    { name: <Translate text={'home'} />, href: "/" },
    { name: <Translate text={'about_us'} />, href: "/about" },
    { name: <Translate text={'subscribe'} />, href: "/backend/members" },
    { name: <Translate text={'advertise'} />, href: "/advertisements" },
    {
      name: <Translate text={'grievance'} />,
      href: "#",
      submenu: [
        { name: <Translate text={'RTI'} />, href: "/rti" },
        { name: <Translate text={'feedback-grievance'} />, href: "/grievance" },
      ],
    },
    { name: <Translate text={'archive'} />, href: "/archive" },
    { name: <Translate text={'sales-points'} />, href: "/sales-points" },
    { name: <Translate text={'contact-us'} />, href: "/contact" },
  ];


  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let previousActiveElement;
    if (mobileOpen) {
      previousActiveElement = document.activeElement;
      document.body.style.overflow = "hidden";

      const menu = document.getElementById('mobile-menu-container');
      if (menu) {
        // Focus trap
        const focusableElements = menu.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) {
          setTimeout(() => firstElement.focus(), 100);
        }

        const handleTab = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        const handleEscape = (e) => {
          if (e.key === 'Escape') setMobileOpen(false);
        };

        menu.addEventListener('keydown', handleTab);
        window.addEventListener('keydown', handleEscape);

        return () => {
          menu.removeEventListener('keydown', handleTab);
          window.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = "";
          if (previousActiveElement) {
            setTimeout(() => previousActiveElement.focus(), 100);
          }
        };
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <nav className="w-full border-b border-primary-100 bg-white z-50">
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu overlay"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-end lg:justify-between relative">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-1 focus:outline-none z-50"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block w-5 h-0.5 bg-primary-600 mb-0.5 transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary-600 mb-0.5 transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary-600 transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
        {/* Main nav links */}
        <ul
          id="mobile-menu-container"
          role={mobileOpen ? "dialog" : undefined}
          aria-modal={mobileOpen ? "true" : undefined}
          aria-label="Mobile Navigation Menu"
          className={`
            font-medium text-primary-700 whitespace-nowrap
            flex-col lg:flex-row lg:flex lg:space-x-8
            ${mobileOpen ? 'flex animate-slide-down' : 'hidden'}
            absolute lg:static left-0 right-0 top-full bg-white border-b border-primary-100 z-50 lg:bg-transparent lg:border-0 lg:relative
            transition-all duration-300
            text-base
          `}
          style={mobileOpen ? { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' } : {}}
        >
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`relative ${mobileOpen ? 'border-b border-primary-100 last:border-b-0' : ''}`}
              onMouseEnter={() => item.submenu && setOpenDropdown(idx)}
              onMouseLeave={() => item.submenu && setOpenDropdown(null)}
              // ... handlers ...
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOpenDropdown(null);
              }}
              onBlur={(e) => {
                // Close if focus leaves the entire li tree
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpenDropdown(null);
                }
              }}
            >
              {item.href.startsWith("/") ? (

                idx == 2 ? <a
                  href="https://i5l.95d.mytemp.website/empnews/backend/members"
                  className={`
                    block px-4 py-2 sm:px-6 sm:py-3 transition text-base ${idx == 2 ? `text-red-900` : ``}
                    ${location.pathname === item.href
                      ? "text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full bg-primary-50 after:bg-primary-600"
                      : "hover:text-primary-700"}
                    ${item.submenu ? "pr-8" : ""}
                  `}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  onFocus={() => item.submenu && setOpenDropdown(idx)}
                  aria-expanded={item.submenu ? openDropdown === idx : undefined}
                  aria-haspopup={item.submenu ? "true" : undefined}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-1 text-xs align-middle" aria-hidden="true">▼</span>
                  )}
                </a> :
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 sm:px-6 sm:py-3 transition text-base ${idx == 2 ? `text-red-900` : ``}
                    ${location.pathname === item.href
                        ? "text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full bg-primary-50 after:bg-primary-600"
                        : "hover:text-primary-700"}
                    ${item.submenu ? "pr-8" : ""}
                  `}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    onFocus={() => item.submenu && setOpenDropdown(idx)}
                    aria-expanded={item.submenu ? openDropdown === idx : undefined}
                    aria-haspopup={item.submenu ? "true" : undefined}
                  >
                    {item.name}
                    {item.submenu && (
                      <span className="ml-1 text-xs align-middle" aria-hidden="true">▼</span>
                    )}
                  </Link>
              ) : (
                <button
                  type="button"
                  className={`
                    block px-4 py-2 sm:px-6 sm:py-3 transition text-base w-full text-center lg:text-left
                    ${item.submenu ? "pr-8" : ""}
                    ${openDropdown === idx ? "text-primary-600 font-semibold" : "hover:text-primary-700"}
                  `}
                  aria-expanded={openDropdown === idx}
                  aria-haspopup={item.submenu ? "true" : undefined}
                  onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-1 text-xs align-middle" aria-hidden="true">▼</span>
                  )}
                </button>
              )}
              {item.submenu && openDropdown === idx && (
                <ul
                  className={`
                    ${mobileOpen ? 'block absolute left-2 right-2 top-full mt-1 bg-white border border-primary-100 shadow-xl rounded-lg z-50 min-w-[11rem] py-2 space-y-1' : 'absolute left-0 top-full mt-1 w-max bg-white border border-gray-200 shadow-lg rounded z-50 min-w-[14rem] before:absolute before:-top-3 before:left-0 before:w-full before:h-4 before:content-[""]'}
                  `}
                >
                  {item.submenu.map((sub, subIdx) => (
                    <li key={subIdx}>
                      {sub.href.startsWith("/") ? (
                        <Link
                          to={sub.href}
                          className={`text-base block px-4 py-2 sm:px-6 sm:py-2 hover:bg-primary-50 text-primary-700 whitespace-nowrap rounded transition`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ) : (
                        <a
                          href={sub.href}
                          className={`text-base block px-4 py-2 sm:px-6 sm:py-2 hover:bg-primary-50 text-primary-700 whitespace-nowrap rounded transition`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile menu slide down animation */}
      <style>{`
        @media (max-width: 1023px) {
          .animate-slide-down {
            animation: slideDown 0.25s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </nav>
  );
}
