import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";
import { HiMegaphone } from "react-icons/hi2";

export default function AdvertisementPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = (await localStorage.getItem("appLang")) || "en";
        const response = await getPosts(`advertiserment?lang=${savedLang}`);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-primary-50/30 pb-16">
      {loading && <Loader />}

      {/* Dark & Compact Header */}
      <div className="w-full py-8 px-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Promotion Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text={'advertisements'} />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Your platform for reach and visibility across the recruitment landscape."
          </p>
        </div>
      </div>

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="bg-white rounded-[24px] border border-[#dadce0] overflow-hidden shadow-sm">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiMegaphone className="text-primary-600 text-lg" />
            </div>
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Latest Notices</span>
          </div>

          <ul className="divide-y divide-gray-50">
            {data.map((ad, idx) => (
              <li key={idx} className="group hover:bg-primary-50/30 transition duration-200">
                <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-left text-gray-800 hover:text-primary-600 transition duration-200 block truncate"
                    >
                      {ad.title}
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase tracking-tight">Issue</span>
                      <span className="text-xs text-gray-400 font-medium italic">{ad.issue_no}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <a
                      href={ad.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-100 bg-white text-primary-600 text-xs font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition duration-300 shadow-sm"
                    >
                      View Notice
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

