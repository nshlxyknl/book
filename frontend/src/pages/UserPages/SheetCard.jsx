
import React from 'react'

export const SheetCard = () => {


    return (
      <div>
      <h2 className="font-bold text-lg mb-2">Your Cart</h2>
       <div className="p-4 w-80 bg-white shadow-lg">
      
          <div
            key={productId}
            className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">
                ${price} × {quantity}
              </p>
            </div>
            <p className="font-bold">${price * quantity}</p>
          </div>

    </div>
    </div>
    )
}
