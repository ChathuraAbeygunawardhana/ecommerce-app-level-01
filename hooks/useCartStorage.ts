import { useState, useEffect } from 'react';
import { CartItem } from '../types/product';
import { loadCartData, saveCartData } from '../utils/cartStorage';

export const useCartStorage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    loadCartData().then(({ cart, isOnboarded }) => {
      setCart(cart);
      setIsOnboarded(isOnboarded);
    });
  }, []);

  useEffect(() => {
    saveCartData(cart, isOnboarded);
  }, [cart, isOnboarded]);

  return { cart, setCart, isOnboarded, setIsOnboarded };
};
