import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function RTIPage() {
  const { t, i18n } = useTranslation();
  const savedLang = localStorage.getItem("appLang") || "en";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    updateMetaTags(
      `${t('rti')} | ${t('site-title')}`,
      t('rti-desc'),
      t('rti-keywords')
    );
  }, [t, i18n.language]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getPosts(`rti-get`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-primary-50/30 pb-16">
      {loading && <Loader />}

      <PageBanner
        title={<Translate text={'rti'} />}
        subtitle={'"Ensuring your right to information with transparency and accountability."'}
        badgeText="Transparency Portal"
      />

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="bg-white rounded-[24px] border border-[#dadce0] p-8 md:p-12 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative z-10">
            <article
              className="
                rti-content text-gray-700 leading-relaxed space-y-4
                prose prose-slate prose-lg md:prose-xl max-w-none
                prose-headings:text-primary-700 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-primary-800
                prose-a:text-primary-600 prose-a:font-semibold hover:text-primary-800
                prose-ul:list-disc prose-ul:marker:text-primary-500
              "
            >
              {savedLang === "en" ? (
                <div dangerouslySetInnerHTML={{ __html: data.rti_english }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.rti_hindi }} />
              )}
            </article>
          </div>
        </div>
      </div >

      <style jsx>{`
        .rti-content :global(h2) {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: #006B7A !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          border-left: 4px solid #009DB3 !important;
          padding-left: 1rem !important;
        }
        .rti-content :global(p) { margin-bottom: 1.25rem !important; text-align: justify !important; }
        .rti-content :global(table) { width: 100% !important; border-collapse: collapse !important; border: 1px solid #e2e8f0 !important; margin: 1.5rem 0 !important; }
        .rti-content :global(th), .rti-content :global(td) { border: 1px solid #e2e8f0 !important; padding: 0.75rem !important; text-align: left !important; }
        .rti-content :global(th) { background-color: #f8fafc !important; }
      `}</style>
    </section >
  );
}

