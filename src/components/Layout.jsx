import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { getPosts } from "../utils/networkApi";
import Translate from "../components/Translate";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const [header, setData] = useState([]);
  const [footer, setFooter] = useState([]);
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = await localStorage.getItem("appLang") || "en";
        const response = await getPosts(`header-api?lang=${savedLang}`)
        setData(response.data)
        setFooter(response.footerData)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])
  return (
    <div className="App min-h-screen flex flex-col relative">
      <a
        href="#skip-target"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:z-[100] focus:rounded focus:outline-none focus:ring-2 focus:ring-white font-medium text-[14px]"
      >
        <Translate text="skip-to-main-content" />
      </a>
      <div className="sticky top-0 z-50 bg-white shadow">
        <TopBar data={header} />
        <Header data={header} />
        <Navbar />
      </div>
      <main id="main-content" className="flex-1 focus:outline-none scroll-mt-32" tabIndex="-1">
        {location.pathname !== "/" && <div id="skip-target" className="scroll-mt-32" />}
        <Outlet />
      </main>
      {!loading && <Footer data={footer} />}
    </div>
  )
};

export default Layout;
