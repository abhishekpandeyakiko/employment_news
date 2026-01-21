import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ArchivePage() {
   const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");
  const [loading, setLoading] = useState(false);
   const [oldData,setOldData]=useState([]);
   const [newData,setNewData]=useState([]);
    useEffect(()=>{
         async function fetchData() {
         try {
           setLoading(true);
           const savedLang =await localStorage.getItem("appLang") || "en";
           const response = await getPosts(`archive-api?lang=${savedLang}`)
           setLoading(false);
           setOldData(response.archiveResultasc)
           setNewData(response.archiveResultdesc)
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
      <div className="w-full max-w-5xl mx-auto">
  <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center"><Translate text="archive" /></h1>
 {/* Cards Grid */}

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
  {oldData.map((job) => (
    <article key={job.id}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between" >

      <div className="w-full h-56">
        <img src={job.image || "/default.jpg"} alt={job.title}
          className="w-full h-full object-cover" />
      </div>

      <div className="p-1 flex-1">
        <h2 className="text-lg font-semibold text-primary-600 border-l-4 border-primary-400 pl-2 text-left">
          {job.title}
        </h2>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 p-4 mt-2">
        <span className="text-xs text-gray-500">
          Date: {job.date}
        </span>
        <a target="_blank" href={job.free_pdf}
          className="inline-block text-sm font-medium px-3 py-1 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 transition" >
          View PDF
        </a>
      </div>
    </article>
  ))}
    {newData.map((job) => (
     <article key={job.id}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between" >

        <div className="w-full h-56">
          <img src={job.image || "/default.jpg"} alt={job.title}
            className="w-full h-full object-cover" />
        </div>

        <div className="p-1 flex-1">
          <h2 className="text-lg font-semibold text-primary-600 border-l-4 border-primary-400 pl-2 text-left">
            {job.title}
          </h2>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 p-4 mt-2">
          <span className="text-xs text-gray-500">
            Date: {job.date}
          </span>
          <a target="_blank" href={job.free_pdf}
            className="inline-block text-sm font-medium px-3 py-1 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 transition" >
            View PDF
          </a>
        </div>
      </article>
  ))}
</section>

  {/* ✅ View All Button */}
    <div className="text-center">
      <button
        onClick={() => navigate("/archives")} // <-- change to your actual route
        className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium shadow hover:bg-primary-700 transition"
      >
        View All
      </button>
    </div>



      </div>
    </section>
  );
}


