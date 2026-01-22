import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { HiMapPin } from "react-icons/hi2";

export default function SalesPointsPage() {
  const [loading, setLoading] = useState(false);
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

      {/* Dark & Compact Header */}
      <div className="w-full py-8 px-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Distribution Network</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text={'sales-points'} />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Locate our distributors across the nation for physical copies."
          </p>
        </div>
      </div>

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* data box */}
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">{item.state_name}</h2>
              <div className="mb-2 text-left">
                <div className="text-gray-600 text-sm">
                  <span className="font-semibold">Pin No:</span> {item.pincode_no}
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-semibold">Phone:</span>{item.phone}
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-semibold">Address: {item.address} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-primary-600 border-l-4 border-primary-400 pl-2 text-left">
            <Translate text="otherSellers" />
          </h2>
          <div className="w-full sm:w-auto flex sm:items-center sm:justify-end">
            <a href={otherPdf} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-600 text-white font-medium shadow hover:bg-primary-700 transition" aria-label="Download PDF for New Delhi">
              <Translate text="viewPDF" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

