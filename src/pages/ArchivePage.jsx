import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageBanner from "../components/PageBanner";

export default function ArchivePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    updateMetaTags(
      `${t('archive')} | ${t('site-title')}`,
      t('archive-desc'),
      t('archive-keywords')
    );
  }, [t, i18n.language]);
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

      <PageBanner
        title={<Translate text="archive" />}
        subtitle={'"Access past editions and historical records of Employment News."'}
        badgeText="Publication Archive"
      />

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
                    aria-label={`View PDF for ${job.title}`}
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
      </div >
    </section >
  );
}



