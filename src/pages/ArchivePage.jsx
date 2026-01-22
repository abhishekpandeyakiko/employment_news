import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ArchivePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [oldData, setOldData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = (await localStorage.getItem("appLang")) || "en";
        const response = await getPosts(`archive-api?lang=${savedLang}`);
        setLoading(false);
        setOldData(response.archiveResultasc);
        setNewData(response.archiveResultdesc);
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Publication Archive</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text="archive" />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Preserving history through every edition and story told."
          </p>
        </div>
      </div>

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[...oldData, ...newData].map((job) => (
            <article
              key={job.id}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md border border-[#dadce0] transition flex flex-col group"
            >
              <div className="w-full h-52 overflow-hidden">
                <img
                  src={job.image || "/default.jpg"}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-2 mb-4">
                  {job.title}
                </h2>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Dated</span>
                    <span className="text-sm font-medium text-primary-600">{job.date}</span>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={job.free_pdf}
                    className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold hover:bg-primary-600 hover:text-white transition duration-300 border border-primary-100"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/archives")}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition duration-300"
          >
            Explore Complete Archive
          </button>
        </div>
      </div>
    </section>
  );
}



