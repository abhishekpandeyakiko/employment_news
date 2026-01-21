import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

export default function About() {

        const [loading, setLoading] = useState(false);
        const [data,setData]=useState([]);
        useEffect(()=>{
            async function fetchData() {
            try {
              setLoading(true);
              const savedLang =await localStorage.getItem("appLang") || "en";
              const response = await getPosts(`about-us?lang=${savedLang}`)
              setLoading(false);
              setData(response.data.content)
            } catch (error) {
               setLoading(false);
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData();
      },[])

  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-4 sm:px-6 md:px-8">
      {loading&&<Loader/>}
      <div className="w-full max-w-4xl mx-auto">
  <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center">{<Translate text={'about_us'}/>}</h1>
             <div dangerouslySetInnerHTML={{ __html: data }} />    
      </div>
    </section>
  );
}