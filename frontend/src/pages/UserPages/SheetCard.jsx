
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import React, { useState } from 'react'

export const SheetCard = ({productId, title,price, quantity, onDelete, onClear}) => {
  
    const {cartadd}= useCart()
    const [q,setq]=useState(quantity)


   const handleeadd=async ()=> {
    console.log("SheetCard Add clicked", { productId, quantity });
    cartadd({ _id:productId, title, price, quantity} )
    await fetchUploads();
}

    const delcart = async()=>{
      try{
      const res = await fetch(`http://localhost:4000/carttype/delete/${productId}`,{
        method: "DELETE",
        headers: {
      Authorization:  `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data= await res.json();
      
     if(res.ok){
      //  setCart(data)
      console.log("deleted data",data)
      alert("deleted successfully")
       onDelete(productId,quantity);
       await fetchUploads();

     }else{
      alert("not ok res")
     }
    }
    catch(error){
       res.status(500).json({
            message: "Could not add to cart",
            details: error.message,
    })}
  }
    return (
       
       <div className="p-4 w-80 bg-white shadow-lg"> 
          <div
            className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">
                ${price} × {q}
              </p>
            </div>
            <p className="font-bold">${price * quantity}</p>
          </div>
       <div className="flex items-center gap-2 mt-1">
          <Button disabled={q === 1}
 variant="outline" size="sm" 
            onClick={() => {
        if (q >= 1) {
          setq(q - 1);
          delcart(productId);
        }
        else if(q===0){
          onDelete(productId)
        }
      }}
            >-</Button>
          <span>{q}</span>
          <Button variant="outline" size="sm" 
          onClick={  () => {
          setq(q + 1);
            handleeadd(productId)}}
            >+</Button>
        </div>
        <Button onClick={ ()=>{ onClear(productId)}}>Delete</Button>
    </div>
    )
}


