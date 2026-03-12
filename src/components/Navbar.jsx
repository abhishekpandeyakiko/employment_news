
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Translate from "./Translate";
import { HiXMark } from "react-icons/hi2";

export default function Navbar({ data }) {
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

      const menu = document.getElementById('mobile-menu-sidebar');
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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12 lg:h-auto overflow-visible relative">
        {/* Mobile Hamburger - Hidden on Large Screens */}
        <button
          className="lg:hidden p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors z-[70]"
          onClick={() => setMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className="block w-full h-0.5 bg-current rounded-full"></span>
            <span className="block w-full h-0.5 bg-current rounded-full"></span>
            <span className="block w-full h-0.5 bg-current rounded-full"></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center lg:justify-between w-full overflow-visible">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="relative py-3 group"
              onMouseEnter={() => item.submenu && setOpenDropdown(idx)}
              onMouseLeave={() => item.submenu && setOpenDropdown(null)}
            >
              {idx === 2 ? (
                <a
                  href="https://i5l.95d.mytemp.website/empnews/backend/members"
                  className={`text-[14px] font-semibold transition-colors text-red-900 hover:text-red-700`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={`text-[14px] font-semibold transition-colors ${location.pathname === item.href ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                >
                  {item.name}
                  {item.submenu && <span className="ml-1 text-[10px]">▼</span>}
                </Link>
              )}

              {item.submenu && openDropdown === idx && (
                <ul className="absolute top-full left-0 w-max min-w-[14rem] bg-white border border-primary-100 shadow-xl rounded-b-lg py-2 z-[100] animate-fade-in">
                  {item.submenu.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        to={sub.href}
                        className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Sidebar */}
        <div
          id="mobile-menu-sidebar"
          className={`fixed inset-y-0 left-0 w-72 xs:w-80 bg-white z-[100] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-primary-100 flex items-center justify-between bg-primary-50/20">
            <div className="flex items-center gap-2 text-left">
              <img src={data?.logo} alt="Logo" className="h-8 object-contain" />
              <div className="flex flex-col">
                {/* <p className="font-bold text-primary-800 text-xs leading-none">Employment News</p> */}
                {/* <p className="text-[10px] text-primary-600 font-medium tracking-tight">Publications Division</p> */}
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-4 text-left">
            <ul className="px-2 space-y-1">
              {menuItems.map((item, idx) => (
                <li key={idx} className="block">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${openDropdown === idx ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-700 hover:bg-primary-50/50'}`}
                      >
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className={`text-[10px] transition-transform duration-300 ${openDropdown === idx ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      <ul className={`ml-4 mt-1 border-l-2 border-primary-100 space-y-1 transition-all duration-300 ${openDropdown === idx ? 'block' : 'hidden'}`}>
                        {item.submenu.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <Link
                              to={sub.href}
                              className="block p-3 text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50/30 rounded-lg transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    idx === 2 ? (
                      <a
                        href="https://i5l.95d.mytemp.website/empnews/backend/members"
                        className={`block p-3 rounded-xl transition-all text-sm font-bold text-red-900 hover:bg-red-50/50`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block p-3 rounded-xl transition-all text-sm font-semibold ${location.pathname === item.href ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-700 hover:bg-primary-50/50'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 bg-gray-50 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Official Portal</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
