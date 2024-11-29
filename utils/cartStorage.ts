
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types/product';

export const loadCartData = async () => {
  try {
    const storedCart = await AsyncStorage.getItem('@cart');
    const storedIsOnboarded = await AsyncStorage.getItem('@isOnboarded');
    return {
      cart: storedCart ? JSON.parse(storedCart) : [],
      isOnboarded: storedIsOnboarded ? JSON.parse(storedIsOnboarded) : false
    };
  } catch (error) {
    console.error('Failed to load data', error);
    return { cart: [], isOnboarded: false };
  }
};

export const saveCartData = async (cart: CartItem[], isOnboarded: boolean) => {
  try {
    await AsyncStorage.setItem('@cart', JSON.stringify(cart));
    await AsyncStorage.setItem('@isOnboarded', JSON.stringify(isOnboarded));
  } catch (error) {
    console.error('Failed to save data', error);
  }
};