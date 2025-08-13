import { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useDashboardContext();
  const isDemoUser = user?.role === 'demo';

  const addToCart = (item) => {
    if (isDemoUser) {
      // For demo users, add a demo indicator to the item
      const demoItem = {
        ...item,
        isDemoItem: true,
        demoId: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      setCartItems((prevItems) => [...prevItems, demoItem]);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  // Clear cart when demo user logs out or changes
  useEffect(() => {
    if (isDemoUser) {
      // Demo users start with empty cart each session
      setCartItems([]);
    }
  }, [isDemoUser]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal,
      isDemoUser 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
