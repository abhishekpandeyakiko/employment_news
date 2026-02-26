import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

export default function SalesPointsPage() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateMetaTags(
      `${t('sales-points')} | ${t('site-title')}`,
      t('sales-points-desc'),
      t('sales-points-keywords')
    );
  }, [t, i18n.language]);
  const [data, setData] = useState([]);
  const [otherPdf, setOtherPdf] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = (await localStorage.getItem("appLang")) || "en";
        const response = await getPosts(`sales-point-get?lang=${savedLang}`);
        setLoading(false);
        setData(response.data);
        setOtherPdf(response.otherPdf);
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
        title={<Translate text={'sales-points'} />}
        subtitle={'"Locate our distributors across the nation for physical copies."'}
        badgeText="Distribution Network"
      />

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* data box */}
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-primary-200 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
              {/* FAIL: text-primary-600 -> PASS: text-primary-800 (Contrast > 4.5:1 on white background) */}
              <h2 className="text-xl font-semibold text-primary-800 mb-2 text-left border-l-4 border-primary-600 pl-2">{item.state_name}</h2>
              <div className="mb-2 text-left">
                {/* FAIL: text-gray-600 -> PASS: text-gray-800 (Contrast > 4.5:1 on white background) */}
                <div className="text-gray-800 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Pin No:</span> {item.pincode_no}
                </div>
                {/* FAIL: text-gray-600 -> PASS: text-gray-800 */}
                <div className="text-gray-800 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Phone:</span> {item.phone}
                </div>
                {/* FAIL: text-gray-600 -> PASS: text-gray-800 */}
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold text-gray-900">Address:</span> {item.address}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-primary-200 p-6 mb-2 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-lg transition">
          {/* FAIL: text-primary-600 -> PASS: text-primary-800 (Contrast > 4.5:1 on white background) */}
          <h2 className="text-xl font-semibold text-primary-800 border-l-4 border-primary-600 pl-2 text-left">
            <Translate text="otherSellers" />
          </h2>
          <div className="w-full sm:w-auto flex sm:items-center sm:justify-end">
            {/* FAIL: bg-primary-600 hover:bg-primary-700 -> PASS: bg-primary-700 hover:bg-primary-800 (Contrast > 4.5:1 on background and text) */}
            <a
              href={otherPdf}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-700 text-white font-semibold shadow hover:bg-primary-800 transition focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2"
              aria-label={<Translate text="download-pdf-new-delhi" />}
            >
              <Translate text="viewPDF" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
