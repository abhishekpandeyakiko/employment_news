import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import Translate from "../components/Translate";

export default function RTIPage() {
 const savedLang = localStorage.getItem("appLang") || "en";
    const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  useEffect(()=>{
      async function fetchData() {
      try {
        setLoading(true);
       
        const response = await getPosts(`rti-get`)
        setLoading(false);
      
          setData(response.data)
     
        
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
      <div className="w-full max-w-3xl mx-auto">
  <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center">{<Translate text={'rti'} />}</h1>
        {savedLang=='en'?
         <div dangerouslySetInnerHTML={{ __html: data.rti_english }} />:<div dangerouslySetInnerHTML={{ __html: data.rti_hindi }} />}
      </div>
    </section>
  );
}
