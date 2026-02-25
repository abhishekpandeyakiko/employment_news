import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { HiUserGroup } from "react-icons/hi2";
import PageBanner from "../components/PageBanner";

export default function About() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    updateMetaTags(
      `${t('about_us')} | ${t('site-title')}`,
      t('about-desc'),
      t('about-keywords')
    );
  }, [t, i18n.language]);

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

      <PageBanner
        title={<Translate text={"about_us"} />}
        subtitle={'"Your trusted gateway to authentic national employment news."'}
        badgeText="Official Profile"
      />




      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="bg-white rounded-[24px] border border-[#dadce0] p-8 md:p-12 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">



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
