import React, { useEffect, useState } from 'react'
import PayContext from './PayContext'

export const PayProvider = ({children}) => {

      const [openSheet, setOpenSheet] = useState(false)
      const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await fetch("http://localhost:4000/carttype/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCart(data);
        console.log("cart data", data)

      } catch (err) {
        console.error("Failed to fetch uploads", err);
      }
    };

    if (openSheet) {
      fetchUploads();
    }
  }, [openSheet]);

  const addhandle = (addId) => {

    setCart((prev) =>
      prev.map((u) =>
        u.productId === addId
          ? { ...u, quantity: u.quantity }
          : u
      )
    );
  }

  const delhandle = (deletedId) => {

    setCart((prev) =>
      prev.map((u) =>
        u.productId === deletedId
          ? { ...u, quantity: u.quantity }
          : u
      )
    );
  }

  const clearcart = async () => {
    alert("clear cart")
    try {
      const res = await fetch("http://localhost:4000/carttype/clearcart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      const data = await res.json();
      
       if(res.ok){
       setCart([])
      console.log("cart clear data",data)
     }else{
      alert("not ok res")
     }
    } catch (err) {
      console.error("clear bhayena la", err);
    }
  }


  const handlepay=async({cart})=>{
    try {
       if (!cart || !cart.length) {
      alert("Your cart is empty");
      return;
    }

      const res = await fetch("http://localhost:4000/carttype/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    body: JSON.stringify({ items: cart }),
  });

  const data = await res.json();
  window.location.href = data.url;

    } catch (error) {
     console.error("Stripe error:", error.message);
    }
  }


  return (
    <PayContext.Provider value={{cart,openSheet, setOpenSheet,addhandle,delhandle,clearcart,handlepay}}>
        {children}
    </PayContext.Provider>
  )
}
