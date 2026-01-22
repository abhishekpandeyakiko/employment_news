import ExternalLinkOpener from "./ExternalLinkOpener";


import { useLocation } from "react-router-dom";
export default function Header({ data }) {
  const location = useLocation();

  return (
    <header className="w-full border-b border-primary-100 shadow-sm">

      <div className="max-w-7xl mx-auto flex flex-row items-center justify-center gap-x-2 xs:gap-x-4 md:gap-x-28 px-1 xs:px-2 md:px-8 py-2 md:py-4">
        {/* Left Logo */}
        <img src={data.national_logo} alt="Emblem" className="h-6 xs:h-8 sm:h-10 md:h-12 lg:h-20 object-contain" />
        {/* Title */}
        <div className="flex flex-col items-center">
          {location.pathname === "/" ? (
            <h1 className="sr-only">Employment News</h1>
          ) : (
            <div className="sr-only">Employment News</div>
          )}
          <img src={data.logo} alt="Employment News Logo" className="h-6 xs:h-8 sm:h-10 md:h-12 lg:h-20 object-contain" />
        </div>
        {/* Right Logo */}
        <ExternalLinkOpener
          url="https://www.publicationsdivision.nic.in/"
          text={<img src={data.publication_logo} alt="Publications Division" className="h-6 xs:h-7 sm:h-8 md:h-10 lg:h-[4.75rem] object-contain" />}

        />

      </div>
    </header>
  );
}
