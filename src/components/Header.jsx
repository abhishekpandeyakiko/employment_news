import ExternalLinkOpener from "./ExternalLinkOpener";


export default function Header({data}) {
       
  return (
    <div className="w-full border-b border-primary-100 shadow-sm">
      
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-center gap-x-4 xs:gap-x-4 md:gap-x-28 px-1 xs:px-2 md:px-8 py-2 md:py-4">
        {/* Left Logo */}
        <img src={data.national_logo} alt="Emblem" className="h-7 xs:h-8 sm:h-10 md:h-12 lg:h-[80px] object-contain" />
        {/* Title */}
        <img src={data.logo} alt="logo" className="h-7 xs:h-8 sm:h-10 md:h-12 lg:h-[80px] object-contain" />
        {/* Right Logo */}
         <ExternalLinkOpener 
        url="https://www.publicationsdivision.nic.in/" 
        text={<img src={data.publication_logo} alt="Publications Division" className="h-6 xs:h-7 sm:h-8 md:h-10 lg:h-[76px] object-contain" />}
        
      />
        
      </div>
    </div>
  );
}
