import React, { useEffect, useState } from 'react'
import BuyerCard from './BuyerCard'
import { useCount } from '@/context/CountContext';

export const SellerUploads = () => {

     const [uploads, setUploads] = useState([]);
     const {setCountUploads, countUploads} = useCount();
    
      useEffect(() => {
        const fetchUploads = async () => {
          try {
            const res = await fetch("http://localhost:4000/tasktype/user",{
              method:"GET",
               headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
          });
            const data = await res.json();
            setUploads(data.tasks);
            setCountUploads(data.count)
          } catch (err) {
            console.error("Failed to fetch uploads", err);
          }
        };
    
        fetchUploads();
      }, []);


  return (
     <div className="min-h-screen my-10 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold"> Seller Uploads</h1>
      </header>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
         {uploads.map((upload) => (
           <BuyerCard
             key={upload._id}
             title={upload.title}
             price={upload.price}
             pdfUrl={upload.pdfUrl}
             previewUrl={upload.previewUrl}
           />
         ))}
       </div>
       </div>
  
  )
}

