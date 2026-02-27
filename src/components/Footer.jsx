import { FaPhone, FaMapMarkerAlt, FaGlobe, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import Translate from "./Translate";
import { Link } from "react-router-dom";
import ExternalLinkOpener from "./ExternalLinkOpener";

export default function Footer({ data }) {

  function PhoneNumber({ help_line }) {
    if (help_line != undefined) {
      return (
        <div className="flex flex-col gap-1">
          {help_line.split(',').map((word, index) => (
            <a key={index} href={`tel:${word.trim()}`} className="hover:text-primary-300 transition-colors">{word.trim()}</a>
          ))}
        </div>
      )
    }
    return '';
  }

  function RelatedSites({ related_sites }) {
    const sanitizeUrl = (url) => {
      if (!url) return "#";
      if (url.toLowerCase().startsWith('javascript:')) return "#";
      return url;
    };

    if (related_sites != undefined) {
      return (
        <ul className="space-y-2 list-none text-xs sm:text-sm">
          {related_sites.map((word, index) => (
            <li key={index} className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover:bg-primary-300 transition-colors"></span>
              <ExternalLinkOpener
                url={sanitizeUrl(word.url)}
                text={<span className="hover:underline flex items-center gap-1.5">{word.title} <FaExternalLinkAlt size={10} className="opacity-50" /></span>}
                className="text-gray-100 hover:text-white transition-colors"
                ariaLabel={`${word.title} - opens in a new window`}
              />
            </li>
          ))}
        </ul>
      )
    }
    return '';
  }

  function MapIframe({ src }) {
    const sanitizeUrl = (url) => {
      if (!url) return "";
      if (url.toLowerCase().startsWith('javascript:')) return "";
      return url;
    };

    return (
      <div className="rounded-xl overflow-hidden border border-primary-700 shadow-inner group relative">
        <iframe
          src={sanitizeUrl(src)}
          width="100%"
          height="150"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
          className="transition-all duration-500"
        />
        <div className="absolute inset-0 pointer-events-none border-2 border-primary-400/20 rounded-xl"></div>
      </div>
    );
  }

  return (
    <footer className="bg-primary-700 text-white border-t-4 border-primary-400 text-left">
      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 py-5 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* About Us */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-primary-300 pb-1 inline-block"><Translate text="about_us" /></h3>
            <p className="text-primary-50 leading-relaxed text-xs sm:text-sm">
              {data.about_us || "Your trusted gateway to authentic national employment news, empowering the youth through timely information and jobs."}
            </p>
          </div>

          {/* Related Sites */}
          <div className="lg:col-span-1 text-left">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-primary-300 pb-1 inline-block"><Translate text="relatedsites" /></h3>
            <RelatedSites related_sites={data.related_sites} />
          </div>

          {/* Information & Helpline Combined */}
          <div className="lg:col-span-1 text-left flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-bold mb-3 border-b-2 border-primary-300 pb-1 inline-block"><Translate text="information" /></h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover:bg-white transition-colors"></span>
                  <Link to="/gallery" className="hover:underline hover:text-white transition-colors">Photo Gallery</Link>
                </li>
                <li className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover:bg-white transition-colors"></span>
                  <Link to="/events" className="hover:underline hover:text-white transition-colors">Events & Highlights</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 border-b-2 border-primary-300 pb-1 inline-block"><Translate text="helpline" /></h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-800 p-2 rounded-lg text-white shadow-inner">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <PhoneNumber help_line={data.help_line} />
                  </div>
                </div>

                <Link
                  to="/web-information-manager"
                  className="bg-[#004049] 
                    hover:bg-[#005c5c] 
                    text-white 
                    text-sm 
                    font-medium 
                    px-3 
                    py-2 
                    rounded-md 
                    shadow-sm 
                    hover:shadow-md 
                    transition-all duration-300 ease-in-out
                    text-center
                    inline-block"
                >
                  <Translate text="web_information_manager" />
                </Link>

              </div>
            </div>
          </div>

          {/* Location Map - Equal width */}
          <div className="lg:col-span-1 text-left">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-primary-300 pb-1 inline-block"><Translate text="locations" /></h3>
            <div className="space-y-3">
              <div className="flex gap-2 text-[11px] text-white mb-2 leading-tight justify-start items-start">
                <FaMapMarkerAlt className="text-white shrink-0 mt-0.5" />
                <p>New Delhi, India - Head Office</p>
              </div>
              <MapIframe src={data.locations} />
            </div>
            <div className="pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-1 leading-none">
                <Translate text="website_last_updated" />
              </h4>
              <p className="text-xs font-medium text-white">
                24/02/2026 11:45:00
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* GIGW 3.0 Policies Bar */}
      <div className="bg-primary-800 border-t border-primary-600">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 py-2.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Standard Policy Links */}
            <nav className="flex flex-row flex-wrap  gap-x-3 sm:gap-x-5 gap-y-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white text-center md:text-left w-full md:w-auto overflow-hidden">
              <Link to="/help" className="hover:text-white transition-colors whitespace-normal"><Translate text="help" /></Link>
              <Link to="/feedback" className="hover:text-white transition-colors"><Translate text="feedback" /></Link>
              <Link to="/sitemap" className="hover:text-white transition-colors"><Translate text="sitemap" /></Link>
              <Link to="/policies/privacy" className="hover:text-white transition-colors"><Translate text="privacy_policy" /></Link>
              <Link to="/policies/hyperlinking" className="hover:text-white transition-colors"><Translate text="hyperlinking_policy" /></Link>
              <Link to="/policies/copyright" className="hover:text-white transition-colors"><Translate text="copyright_policy" /></Link>
              <Link to="/policies/terms" className="hover:text-white transition-colors"><Translate text="terms_conditions" /></Link>
              <Link to="/policies/cmap" className="hover:text-white transition-colors"><Translate text="cmap" /></Link>
              <Link to="/policies/security" className="hover:text-white transition-colors"><Translate text="security_policy" /></Link>
              <Link to="/policies/archival" className="hover:text-white transition-colors"><Translate text="archival_policy" /></Link>
              <Link to="/policies/review" className="hover:text-white transition-colors"><Translate text="review_policy" /></Link>
            </nav>

            {/* Copyright Info */}
            <div className="text-[10px] text-primary-100 font-medium leading-relaxed w-full md:w-auto text-center md:text-right uppercase tracking-tighter mt-2 md:mt-0 break-words">
              Content owned by Publications Division, Ministry of Information & Broadcasting.
              Designed and developed by NIC.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
