import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Colors } from '@/themes/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import CartItem from '../../components/cart/CartItem';
import CartTotal from '../../components/cart/CartTotal';
import EmptyCart from '../../components/cart/EmptyCart';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const { cart } = useCart();

  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const renderItem = ({ item }: { item: CartItemType }) => (
    <CartItem item={item} currentColors={currentColors} />
  );

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background_01 }]}>
      <Text style={[styles.headerText, { color: currentColors.text }]}>
        Your Cart
      </Text>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
        />
      )}
      <CartTotal cart={cart} currentColors={currentColors} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});
