import { useState, useContext, createContext,useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart,setCart]=useState([])
useEffect(()=>{
let exixtingCartItem=localStorage.getItem('cart')
if(exixtingCartItem)setCart(JSON.parse(exixtingCartItem))
},[])
  return (
    <CartContext.Provider value={[cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
