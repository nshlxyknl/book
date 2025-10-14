import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const TotalSales = () => {
  const [sales,setSales]=useState([])

  useEffect(()=>{
    const handlesales=async()=>{
      const res= await fetch("http://localhost:4000/tasktype/sales",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      const data= await res.json()
      setSales(data)
  }
  handlesales()
  },[])
  

  return (

  
    <div className=" overflow-hidden rounded-md border ">
      <Table>
        <TableHeader>
           <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Quantity Sold</TableHead>
            <TableHead>Total Revenue ($)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          
              {sales.length > 0 ? ( 
            sales.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.totalSold}</TableCell>
                <TableCell>{item.totalRevenue}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No sales data yet.
              </TableCell>
            </TableRow>
          )}
            
        </TableBody>
      </Table>
    </div>
  
)}



