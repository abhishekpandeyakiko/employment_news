import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { HiUserGroup } from "react-icons/hi2";

export default function About() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = (await localStorage.getItem("appLang")) || "en";
        const response = await getPosts(`about-us?lang=${savedLang}`);
        setLoading(false);
        setData(response.data.content);
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

      {/* Compact Dark Premium Header */}
      <div className="w-full py-8 px-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
        {/* Subtle Polish Shapes */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Official Profile</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text={"about_us"} />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Your trusted gateway to authentic national employment news."
          </p>
        </div>
      </div>




      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="bg-white rounded-[24px] border border-[#dadce0] p-8 md:p-12 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">


          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-bl-full -mr-20 -mt-20 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-50 rounded-tr-full -ml-12 -mb-12 opacity-50"></div>

          <div className="relative z-10">
            <div
              className="about-content text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
        </div>

        {/* Bottom Decorative Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-50 hover:shadow-md transition cursor-default">
            <div className="text-primary-600 font-bold text-lg mb-1 italic">Vision</div>
            <p className="text-gray-500 text-sm">Empowering the youth through information and opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-50 hover:shadow-md transition cursor-default">
            <div className="text-primary-600 font-bold text-lg mb-1 italic">Mission</div>
            <p className="text-gray-500 text-sm">Providing timely and authentic updates on government jobs and news.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-50 hover:shadow-md transition cursor-default">
            <div className="text-primary-600 font-bold text-lg mb-1 italic">Values</div>
            <p className="text-gray-500 text-sm">Integrity, Transparency, and Service to the Nation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
