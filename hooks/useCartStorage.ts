import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStorage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('@cart');
        const storedIsOnboarded = await AsyncStorage.getItem('@isOnboarded');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
        if (storedIsOnboarded !== null) {
          setIsOnboarded(JSON.parse(storedIsOnboarded));
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        await AsyncStorage.setItem('@isOnboarded', JSON.stringify(isOnboarded));
      } catch (error) {
        console.error('Failed to save data', error);
      }
    };
    saveData();
  }, [cart, isOnboarded]);

  return { cart, setCart, isOnboarded, setIsOnboarded };
};
