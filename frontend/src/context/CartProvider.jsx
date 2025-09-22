import React, { useState } from 'react'
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {

const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (newCart) => {
    setCartItems(newCart.items);
    setCartCount(newCart.items.reduce((acc, item) => acc + item.quantity, 0));
  };


    return (
        <CartContext.Provider value={{cartCount,cartItems,updateCart}}>
            {children}
        </CartContext.Provider>
    )
}
