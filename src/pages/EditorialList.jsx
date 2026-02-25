import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";


import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";


const EditorialList = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab");
  const [loading, setLoading] = useState(false);
  const [articles, setData] = useState([]);

  useEffect(() => {
    let tabName = "";
    switch (tab) {
      case "lead": tabName = t('lead-articles'); break;
      case "career": tabName = t('career-articles'); break;
      case "special": tabName = t('special-articles'); break;
      case "success": tabName = t('success-stories'); break;
      default: tabName = t('editorial');
    }
    updateMetaTags(
      `${tabName} | ${t('site-title')}`,
      t('editorial-desc'),
      t('editorial-keywords')
    );
  }, [tab, t, i18n.language]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = await localStorage.getItem("appLang") || "en";
        const response = await getPosts(`article-api?lang=${savedLang}&type=${tab}`)
        setLoading(false);
        setData(response.data)
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])

  const getTabTitle = () => {
    switch (tab) {
      case "lead":
        return t('lead-articles');
      case "career":
        return t('career-articles');
      case "special":
        return t('special-articles');
      case "success":
        return t('success-stories');
      default:
        return t('success-stories');
    }
  };

  const DateFormatte = (dateUrl) => {
    const date = new Date(dateUrl);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    return formattedDate;
  }
  return (
    <section className="w-full min-h-[80vh] bg-primary-50 pb-16">
      {loading && <Loader />}
      <PageBanner
        title={`${t('editorial')} - ${getTabTitle()}`}
        subtitle={t('browse-all-articles-from-the') + " " + getTabTitle() + " " + t('section')}
        badgeText="Knowledge Center"
      />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 pb-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/article/${item.id}`)}
              className="border bg-white border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-primary-500 flex flex-col justify-between"
            >
              {/* Top Section */}
              <div>
                <h3 className="text-lg text-left font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <span className="block text-left text-sm text-gray-500">
                  <Translate text={'published-on'} />: {DateFormatte(item.created_at)}
                </span>
              </div>

              {/* Bottom Section (always stays at bottom) */}
              <div className="mt-4 border-t border-gray-200 pt-3 text-right">
                <button className="text-primary-700 font-semibold hover:underline">
                  <Translate text={'see-more'} /> →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default EditorialList;