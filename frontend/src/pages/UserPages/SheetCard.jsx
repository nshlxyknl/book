
import { Button } from '@/components/ui/button'
import React from 'react'

export const SheetCard = ({title,price, quantity}) => {

    const delcart = async()=>{

      try{
      const res = await fetch("http://localhost:4000/carttype/delete",{
        method: "DELETE",
        headers: {
      Authorization:  `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data= await res.json();
      console.log("hhjcbnc",data)
      alert("deleted successfully")
    }
    catch(error){
      alert("error")
    }
  }
    return (
      
       
       <div className="p-4 w-80 bg-white shadow-lg">
      
          <div
            className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">
                ${price} × {quantity}
              </p>
            </div>
            <p className="font-bold">${price * quantity}</p>
          </div>

          <Button variant="destructive" onClick={delcart}> Delete </Button>
    </div>
    
    )
}
