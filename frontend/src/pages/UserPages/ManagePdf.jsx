import React, { useEffect, useState } from 'react'

export const ManagePdf = () => {
const [pdf,setPdf]= useState([])

  const handlepdf =async()=>{
    const res = await fetch("http://localhost:4000/tasktype/all",{
      method: "GET",
      headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`},
    })
    const data = await res.json();
    setPdf(data.tasks)
    console.log(data) 
  }

   useEffect(() => {
    handlepdf()
  }, [])
  

  return (
    <div className="p-4 w-80 bg-white shadow-lg">
      
          <div
            className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="font-semibold">{pdf.title}</h3>
              <p className="text-sm text-gray-600">
                ${pdf.price} 
              </p>
            </div>
            <p className="font-bold">${pdf.username}</p>
          </div>
          </div>
  )
}
