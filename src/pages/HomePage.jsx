import React, { useEffect, useState } from "react";

import Announcements from "../components/Announcements";
import JobHighlights from "../components/JobHighlights";
import NoticeBoard from "../components/NoticeBoard";
import Editorial from "../components/Editorial";
import SocialMediaSection from "../components/SocialMediaSection";
import LogoCarousel from "../components/LogoCarousel";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

// Main HomePage Component
const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncement] = useState([]);
  const [jobHighlight, setJobHighlight] = useState([]);
  const [slider, setSlider] = useState([]);
  const [sliderTime, setSliderTime] = useState([]);
  const [advertis, setAdvertis] = useState([]);
  const [articleLead, setArticleLead] = useState([]);
  const [articleSpecial, setArticleSpecial] = useState([]);
  const [footerLogo, setFooterLogo] = useState([]);
  const [footerUrl, setFooterUrl] = useState([]);
  const [social, setSocial] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = await localStorage.getItem("appLang") || "en";
        const response = await getPosts(`home-api?lang=${savedLang}`)
        setLoading(false);
        setAnnouncement(response.announcement.data)
        setJobHighlight(response.jobHighlight)
        setSlider(response.slider)
        setSliderTime(response.sliderTime)
        setAdvertis(response.advertisement)
        setArticleLead(response.articleLead)
        setArticleSpecial(response.articleSpecial)
        setFooterLogo(response.footerLogo)
        setFooterUrl(response.footerUrl)
        setSocial(response.social)
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])
  return (
    <div>
      {loading ? <Loader /> :
        <>
          <JobHighlights jobHighlight={jobHighlight} carouselImages={slider} sliderTime={sliderTime} />
          <Announcements announcements={announcements} />
          <NoticeBoard advertis={advertis} />
          <Editorial article={articleLead} articleSpecial={articleSpecial} />
          <SocialMediaSection data={social} />
          <LogoCarousel logos={footerLogo} footerUrl={footerUrl} />
        </>
      }
    </div>);
};

export default HomePage;
//https://chatgpt.com/c/68f08ecc-660c-8321-b6eb-db0bc14a3086