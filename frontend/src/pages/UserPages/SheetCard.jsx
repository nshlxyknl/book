
import { Button } from '@/components/ui/button'
import React from 'react'

export const SheetCard = ({productId, title,price, quantity, onDelete}) => {

    const delcart = async()=>{

      try{
      const res = await fetch(`http://localhost:4000/carttype/delete/${productId}`,{
        method: "DELETE",
        headers: {
      Authorization:  `Bearer ${localStorage.getItem("token")}`
        }
      })

     if(res.ok){
      const data= await res.json();
      console.log("hhjcbnc",data)
      alert("deleted successfully")
       onDelete(productId);
     }else{
      alert("not ok res")
     }
      
    }
    catch(error){
      alert("error in ")
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
