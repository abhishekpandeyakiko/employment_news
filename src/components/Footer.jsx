import { FaPhone } from "react-icons/fa6";
import Translate from "./Translate";

export default function Footer({ data }) {



  function PhoneNumber({ help_line }) {

    if (help_line != undefined) {
      return (<>
        {help_line.split(',').map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </>
      )
    }
    return '';
  }
  function RelatedSites({ related_sites }) {
    const sanitizeUrl = (url) => {
      if (!url) return "#";
      // Prevent javascript: protocol
      if (url.toLowerCase().startsWith('javascript:')) {
        return "#";
      }
      return url;
    };

    if (related_sites != undefined) {
      return (<>
        {related_sites.map((word, index) => (
          <li key={index}><a href={sanitizeUrl(word.url)} target="_blank" rel="noopener noreferrer">{word.title}</a></li>
        ))}
      </>
      )
    }
    return '';
  }
  function MapIframe({ src }) {
    const sanitizeUrl = (url) => {
      if (!url) return "";
      if (url.toLowerCase().startsWith('javascript:')) {
        return "";
      }
      return url;
    };

    return (
      <iframe
        src={sanitizeUrl(src)}
        width="200"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
      />
    );
  }
  return (
    <footer className="bg-primary-800 text-white text-sm text-left border-t border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">

        {/* About Us - slightly more space */}
        <div className="md:col-span-2 col-span-1 pb-4 md:pb-0">
          <h3 className="font-semibold mb-3 text-base sm:text-lg"><Translate text="about_us" /></h3>
          <p className="text-gray-100 leading-relaxed text-justify text-xs sm:text-sm md:text-base">
            {data.about_us}
          </p>
        </div>

        {/* Related Sites */}
        <div>
          <h3 className="font-semibold mb-3 text-base sm:text-lg"><Translate text="relatedsites" /></h3>
          <ul className="space-y-0.5 sm:space-y-1 list-disc list-inside text-xs sm:text-sm">
            <RelatedSites related_sites={data.related_sites} />
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-3 text-base sm:text-lg"><Translate text="information" /></h3>
          <ul className="space-y-0.5 sm:space-y-1 list-disc list-inside text-xs sm:text-sm">
            <li>Photo Gallery</li>
            <li>Events & Highlights</li>
            {/* <li>Jobs through NCS</li> */}
            {/* <li>AICTE Placement Portal</li> */}
          </ul>



          {/* Helpline */}
          <div className="mt-4 sm:mt-5">
            <h3 className="font-semibold mb-3 text-base sm:text-lg"><Translate text="helpline" /></h3>
            <div className="flex items-center space-x-3 sm:space-x-3.5">
              {/* Icon box */}
              <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                <FaPhone className="w-6 h-6 text-primary-800" />
              </div>

              {/* Numbers */}
              <div className="flex flex-col">
                <PhoneNumber help_line={data.help_line} />



              </div>
            </div>
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-200">
            <p className="font-medium">
              <Translate text="website_last_updated" /> <br></br> 21/01/2026 17:38:30
            </p>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h3 className="font-semibold mb-3 text-base sm:text-lg"><Translate text="locations" /></h3>
          <div className="space-y-2 sm:space-y-2.5">
            {/* {data.locations} */}
            <MapIframe src={data.locations} />
          </div>
        </div>
      </div>

    </footer>
  );
}
