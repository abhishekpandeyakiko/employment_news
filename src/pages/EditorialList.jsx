import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";


const EditorialList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab");
  const [loading, setLoading] = useState(false);
  const [articles, setData] = useState([]);
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
        return <Translate text={'lead-articles'} />;
      case "career":
        return <Translate text={'career-articles'} />;
      case "special":
        return <Translate text={'special-articles'} />;
      case "success":
        return <Translate text={'success-stories'} />;
      default:
        return <Translate text={'success-stories'} />;
    }
  };

  // const articles = [
  //   "Empowering Consumers and Farmers: The Twin Benefits of Farm to Fork",
  //   "Khelo India Winter Games 2025: Unleashing India's Winter Sporting Potential",
  //   "Year-End Review 2024 Ministry of Social Justice and Empowerment",
  //   "Year-End Review 2024 Ministry of Social Justice and Empowerment",
  //   "Building a Sustainable Future: Green Energy Initiatives",
  //   "Digital India: Transforming Governance and Services",
  //   "Healthcare for All: Recent Developments in Public Health",
  //   "Education Reforms: Shaping Tomorrow's Leaders",
  // ];
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
    <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-4 sm:px-6 md:px-8">
      {loading && <Loader />}
      <div className="w-full max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            <Translate text={'editorial'} /> - {getTabTitle()}
          </h1>
          <p className="text-gray-600 mb-6">
            <Translate text={'browse-all-articles-from-the'} /> {getTabTitle()}  <Translate text={'section'} />
          </p>

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
      </div>
    </section>

  );
};

export default EditorialList;