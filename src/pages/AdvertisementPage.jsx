import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";
import { HiMegaphone } from "react-icons/hi2";

export default function AdvertisementPage() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateMetaTags(
      `${t('advertisements')} | ${t('site-title')}`,
      t('advertisement-desc'),
      t('advertisement-keywords')
    );
  }, [t, i18n.language]);
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

      <PageBanner
        title={<Translate text={'advertisements'} />}
        subtitle={'"Your platform for reach and visibility across the recruitment landscape."'}
        badgeText="Promotion Hub"
      />

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
      </div >
    </section >
  );
}

