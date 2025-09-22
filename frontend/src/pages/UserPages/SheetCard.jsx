import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/CartContext'
import React from 'react'



export const SheetCard = ({ title, price }) => {

    const {cartItems , cartCount} = useCart()

    return (
       <div className="p-4 w-80 bg-white shadow-lg">
      <h2 className="font-bold text-lg mb-2">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                ${item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-bold">${item.price * item.quantity}</p>
          </div>
        ))
      )}
    </div>
    )
}
