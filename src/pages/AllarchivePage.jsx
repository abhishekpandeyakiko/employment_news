import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

export default function AllarchivePage() {

  const [loading, setLoading] = useState(false);
   const [oldData,setOldData]=useState([]);

   const [pagination, setPagination] = useState({});
     async function fetchData(page = 1) {
         try {
           setLoading(true);
           const savedLang =await localStorage.getItem("appLang") || "en";
           const response = await getPosts(`allArchive-api?lang=${savedLang}&page=${page}`)
           console.log(response.archive.data)
           setOldData(response.archive.data);
           setPagination({
                current_page: response.archive.current_page,
                last_page: response.archive.last_page,
            });
           setLoading(false);
         } catch (error) {
            setLoading(false);
           console.error('Error fetching data:', error);
         }
       }
   
    useEffect(()=>{
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
          {job.title} {job.id}
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
    <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              disabled={pagination.current_page === 1}
              onClick={() => fetchData(pagination.current_page - 1)}
            >
              Previous 
            </button>

            <span>{` `}Page {pagination.current_page} of {pagination.last_page}</span>

            <button
              className="btn btn-primary"
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => fetchData(pagination.current_page + 1)}
            >
            {` `}  Next
            </button>
          </div>



      </div>
    </section>
  );
}


