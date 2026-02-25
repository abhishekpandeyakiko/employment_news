import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (location.pathname === "/") return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 md:space-x-3 text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-bold"
        >
            <Link
                to="/"
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-all duration-300 group"
                aria-label={t("home")}
            >
                <FaHome className="text-xs group-hover:-translate-y-0.5 transition-transform" />
                <span>{t("home")}</span>
            </Link>

            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const displayName = t(value.replace(/-/g, "_")) || value.replace(/-/g, " ");
                const isNonClickable = value.toLowerCase() === "policies";

                return (
                    <React.Fragment key={to}>
                        <div className="text-white/20 select-none">
                            <FaChevronRight size={8} />
                        </div>
                        {last || isNonClickable ? (
                            <div className={`flex items-center gap-2 ${last ? 'text-white border-b-2 border-primary-500 pb-0.5' : 'text-white/50'}`}>
                                <span className="truncate max-w-[150px] md:max-w-none" aria-current={last ? "page" : undefined}>
                                    {displayName}
                                </span>
                            </div>
                        ) : (
                            <Link
                                to={to}
                                className="text-white/50 hover:text-white transition-all duration-300 relative group"
                            >
                                {displayName}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400/50 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
