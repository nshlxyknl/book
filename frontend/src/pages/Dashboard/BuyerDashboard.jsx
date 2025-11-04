import { useEffect, useState } from "react";
import BuyerCard from "../UserPages/BuyerCard";
import { useSearch } from "@/context/SearchContext";
import { useSidebar } from "@/context/SidebarContext";


export default function BuyerDashboard() {
  const { searchQuery } = useSearch();
  const [uploads, setUploads] = useState([]);


  const fetchUploads = async () => {
    try {
      const res = await fetch("http://localhost:4000/tasktype/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUploads(data.tasks) || [];
    } catch (err) {
      console.error("Failed to fetch uploads", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  // Filter search ra orders

const {tab } =useSidebar();
    const filterUploads = uploads.filter((upload) => {
    const matchesSearch = searchQuery
      ? upload.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    if (tab === "orders") {
      return matchesSearch && upload.status === "approved"
    }

    return matchesSearch
  })

  const {openSheet2} =useSidebar()

  return (<>

<main
        className={`flex-1 p-6 transition-all duration-300 ${
          openSheet2 ? "md:ml-64" : ""
        }`}>
    <div className="min-h-screen my-20 bg-background p-6">

      <header className=" mb-8">
        <h1 className="text-3xl font-bold"> Buyer Dashboard</h1>
        <p className="text-muted-foreground">Want some books?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        { filterUploads.length>0 ?
        filterUploads.map((upload) => (
          
          <BuyerCard
            key={upload._id}
            _id={upload._id}
            title={upload.title}
            price={upload.price}
            pdfUrl={upload.pdfUrl}
            previewUrl={upload.previewUrl}
            upload={upload}
          />
        ))
      : "No any orders or products"}
      </div>
    </div>
</main>
  </>
  )
}
