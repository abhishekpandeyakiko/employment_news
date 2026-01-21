
import React, { useState } from "react";
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

  return (
    <nav className="w-full border-b border-primary-100 bg-white z-50">
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu overlay"
        />
      )}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-end sm:justify-between relative">
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden p-1 focus:outline-none z-50"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block w-5 h-0.5 bg-primary-600 mb-0.5 transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary-600 mb-0.5 transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-primary-600 transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
        {/* Main nav links */}
        <ul
          className={`
            font-medium text-primary-700 whitespace-nowrap
            flex-col sm:flex-row sm:flex sm:space-x-8
            ${mobileOpen ? 'flex animate-slide-down' : 'hidden'}
            absolute sm:static left-0 right-0 top-full bg-white border-b border-primary-100 z-50 sm:bg-transparent sm:border-0 sm:relative
            transition-all duration-300
            text-base sm:text-sm
          `}
          style={mobileOpen ? { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' } : {}}
        >
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`relative ${mobileOpen ? 'border-b border-primary-100 last:border-b-0' : ''}`}
              onMouseEnter={() => item.submenu && setOpenDropdown(idx)}
              onMouseLeave={() => item.submenu && setOpenDropdown(null)}
            >
              {item.href.startsWith("/") ? (

                idx == 2 ? <a
                  href="https://i5l.95d.mytemp.website/empnews/backend/members"
                  className={`
                    block px-4 py-2 sm:px-6 sm:py-3 transition text-xl ${idx == 2 ? `text-red-900` : ``}
                    ${location.pathname === item.href
                      ? "text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full bg-primary-50 after:bg-primary-600"
                      : "hover:text-primary-700"}
                    ${item.submenu ? "pr-8" : ""}
                  `}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-1 text-xs align-middle">▼</span>
                  )}
                </a> :
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 sm:px-6 sm:py-3 transition text-xl ${idx == 2 ? `text-red-900` : ``}
                    ${location.pathname === item.href
                        ? "text-primary-600 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full bg-primary-50 after:bg-primary-600"
                        : "hover:text-primary-700"}
                    ${item.submenu ? "pr-8" : ""}
                  `}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                    {item.submenu && (
                      <span className="ml-1 text-xs align-middle">▼</span>
                    )}
                  </Link>
              ) : (
                <span
                  className={`
                    block px-4 py-2 sm:px-6 sm:py-3 transition text-xl 
                    ${item.submenu ? "pr-8" : ""}
                  `}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-1 text-xs align-middle">▼</span>
                  )}
                </span>
              )}
              {item.submenu && openDropdown === idx && (
                <ul
                  className={`
                    ${mobileOpen ? 'block absolute left-2 right-2 top-full mt-1 bg-white border border-primary-100 shadow-xl rounded-lg z-50 min-w-[180px] py-2 space-y-1' : 'absolute left-0 top-full mt-1 w-max bg-white border border-gray-200 shadow-lg rounded z-50 min-w-[220px]'}
                  `}
                >
                  {item.submenu.map((sub, subIdx) => (
                    <li key={subIdx}>
                      {sub.href.startsWith("/") ? (
                        <Link
                          to={sub.href}
                          className={`text-xl block px-4 py-2 sm:px-6 sm:py-2 hover:bg-primary-50 text-primary-700 whitespace-nowrap rounded transition`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ) : (
                        <a
                          href={sub.href}
                          className={`block px-4 py-2 sm:px-6 sm:py-2 hover:bg-primary-50 text-primary-700 whitespace-nowrap rounded transition`}
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
        @media (max-width: 639px) {
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
