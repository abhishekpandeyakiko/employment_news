import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";

export default function RTIPage() {
  const savedLang = localStorage.getItem("appLang") || "en";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

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

      {/* Dark & Compact Header */}
      <div className="w-full py-8 px-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Transparency Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text={'rti'} />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Ensuring your right to information with transparency and accountability."
          </p>
        </div>
      </div>

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
      </div>

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
    </section>
  );
}

