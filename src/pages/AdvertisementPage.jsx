import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";

const advertisements = [
  {
    title: "Central Adoption Resource Authority",
    issue: "Issue no 26,27 September - 03 October 2025",
    link: "#"
  },
  {
    title: "NATIONAL DISASTER MANAGEMENT AUTHORITY",
    issue: "Issue no 26,27 September - 03 October 2025",
    link: "#"
  },
  {
    title: "M/O Fisheries Animal Husbandry & Dairying, Fisheries Survey of India",
    issue: "Issue no 26,27 September - 03 October 2025",
    link: "#"
  },
  {
    title: "Steel Authority of India, Salem Steel Plant",
    issue: "Issue no 26,27 September - 03 October 2025",
    link: "#"
  },
  {
    title: "National Institute of Corporate Affairs",
    issue: "Issue no 25,20 - 26 September 2025",
    link: "#"
  },
  {
    title: "Directorate General of Commercial Intelligence and Statistics, M/O COMMERCE & INDUSTRY",
    issue: "Issue no 25,20 - 26 September 2025",
    link: "#"
  },
  {
    title: "National Institute of Technology Warangal",
    issue: "Issue no 25,20 - 26 September 2025",
    link: "#"
  },
  {
    title: "Andaman and Nicobar Administration Secretariat",
    issue: "Issue no 25,20 - 26 September 2025",
    link: "#"
  },
  {
    title: "Raman Research Institute",
    issue: "Issue no 25,20 - 26 September 2025",
    link: "#"
  },
  {
    title: "NSIC TECHNICAL SERVICES CENTRE",
    issue: "Issue no 24,13 - 19 September 2025",
    link: "#"
  },
  {
    title: "National Institute of Hydrology ,Roorkee",
    issue: "Issue no 24,13 - 19 September 2025",
    link: "#"
  },
  {
    title: "Andaman and Nicobar Administration Secretariat",
    issue: "Issue no 23,06 September - 12 September 2025",
    link: "#"
  },
  {
    title: "Indian Oil Corporation Limited",
    issue: "Issue no 23,06 September - 12 September 2025",
    link: "#"
  },
  {
    title: "Rajiv Gandhi Institute of Petroleum Technology",
    issue: "Issue no 23,06 September - 12 September 2025",
    link: "#"
  },
  {
    title: "Indian Oil Corporation Limited",
    issue: "Issue no 23,06 September - 12 September 2025",
    link: "#"
  },
  {
    title: "Goa Shipyard Limited",
    issue: "Issue no 23,06 September - 12 September 2025",
    link: "#"
  },
  {
    title: "Indian Institute of Technology Mandi",
    issue: "Issue no 22,30 August - 05 September 2025",
    link: "#"
  },
  {
    title: "National Cooperative Development Corporation",
    issue: "Issue no 22,30 August - 05 September 2025",
    link: "#"
  },
  {
    title: "PONDICHERRY UINVERSITY",
    issue: "Issue no 22,30 August - 05 September 2025",
    link: "#"
  },
  {
    title: "Goa Shipyard Limited",
    issue: "Issue no 22,30 August - 05 September 2025",
    link: "#"
  },
  {
    title: "Footwear Design and Development Institute",
    issue: "Issue no 21, 23 - 29 August 2025",
    link: "#"
  },
  {
    title: "Sanjay Gandhi Post Graduate Institute of Medical Sciences",
    issue: "Issue no 21, 23 - 29 August 2025",
    link: "#"
  },
  {
    title: "Central Adoption Resource Authority",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "Indian Institute of Management Amritsar",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "Tirumala Tirupati Devsthanams, Sri Venkatsewara College",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "ICAR- Krishi Vigyan Kendra",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "M/O Home Affairs, National Fire Services College",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "Hooghly Cochin Shipyard Limited",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "Centre for Development of Telematics",
    issue: "Issue no 20, 16 - 22 August 2025",
    link: "#"
  },
  {
    title: "Sainik School Purulia",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "NATIONAL COOPERATIVE DEVELOPMENT CORPORATION",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "PONDICHERRY UINVERSITY",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "NATIONAL DISASTER MANAGEMENT AUTHORITY",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "KHUDA BAKSHS ORIENTAL PUBLIC LIBRARY, PATNA",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "NATIONAL DISASTER MANAGEMENT AUTHORITY",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "NATIONAL DISASTER MANAGEMENT AUTHORITY",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "NATIONAL DISASTER MANAGEMENT AUTHORITY",
    issue: "Issue no 19, 09 - 15 August 2025",
    link: "#"
  },
  {
    title: "LAL BAHADUR SHASTRI NATIONAL ACADEMY OF ADMINISTRATION",
    issue: "Issue advertisemant section each assocuated will a link to open make it like to open a l=ink ites kind of or in any other eay this is advertisement page",
    link: "#"
  }
];

export default function AdvertisementPage() {
      const [loading, setLoading] = useState(false);
      const [data,setData]=useState([]);
      useEffect(()=>{
          async function fetchData() {
          try {
            setLoading(true);
            const savedLang =await localStorage.getItem("appLang") || "en";
            const response = await getPosts(`advertiserment?lang=${savedLang}`)
            setLoading(false);
            setData(response.data)
          } catch (error) {
             setLoading(false);
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
    },[])
  
  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-6 px-4 sm:px-6 md:px-8">
      {loading&&<Loader/>}
      <div className="w-full max-w-4xl mx-auto">
  <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center"><Translate text={'advertisements'} /></h1>
        <ul className="divide-y divide-primary-100">
          {data.map((ad, idx) => (
            <li key={idx} className="py-2 flex flex-row items-start justify-start">
              <div className="flex-1 min-w-0">
                <a href={ad.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 hover:underline block text-left">
                  {ad.title}
                </a>
                <span className="block text-xs text-gray-500 mt-0.5 text-left">{ad.issue_no}</span>
              </div>
              <a href={ad.pdf} target="_blank" rel="noopener noreferrer" className="ml-4 mt-0.5 text-primary-500 hover:text-primary-600 font-medium underline whitespace-nowrap">View</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
