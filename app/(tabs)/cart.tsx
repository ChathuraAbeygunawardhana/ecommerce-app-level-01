import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/Cart/CartItem';
import CartTotal from '@/components/Cart/CartTotal';
import CheckoutButton from '@/components/Cart/CheckoutButton';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <View>
            <Text>Your cart is empty</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          )}
        />
      )}
      <CartTotal total={calculateTotal()} />
      <View style={styles.checkoutButtonContainer}>
        <CheckoutButton
          onPress={() => console.log('Checkout button pressed')}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
