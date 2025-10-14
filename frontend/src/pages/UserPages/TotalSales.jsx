import React, { useEffect, useState } from 'react'

export const TotalSales = () => {
  const [sales,setSales]=useState([])

  useEffect(()=>{
    const handlesales=async(req,res)=>{
      const res= await fetch("http://localhost:4000/tasktype/sales",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      const data=res.json()
      setSales(data)
  }
  handlesales()
  },[])
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Your PDF Sales</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Total Sold</th>
            <th className="border p-2">Total Revenue ($)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="border p-2">{sale.title}</td>
              <td className="border p-2">{sale.totalSold}</td>
              <td className="border p-2">{sale.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  

