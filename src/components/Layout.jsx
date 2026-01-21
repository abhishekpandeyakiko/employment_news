import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { getPosts } from "../utils/networkApi";
const Layout = () => {
     const [loading, setLoading] = useState(false);
          const [header,setData]=useState([]);
           const [footer,setFooter]=useState([]);
          useEffect(()=>{
              async function fetchData() {
              try {
                setLoading(true);
                const savedLang =await localStorage.getItem("appLang") || "en";
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
        },[])
    return(    
  <div className="App min-h-screen flex flex-col">
    <div className="sticky top-0 z-50 bg-white shadow">
      <TopBar data={header} />
      <Header data={header} />
      <Navbar />
    </div>
    <main className="flex-1">
      <Outlet />
    </main>
   {!loading&&<Footer data={footer} />}
  </div>
)};

export default Layout;
