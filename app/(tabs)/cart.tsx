import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import sampleData from '../../assets/sample.json';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }: {
    cart: CartItem[];
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
  } = useCart();

  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const shippingCharge = 40.99;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCharge;

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <CartItem
        item={item}
        currentColors={currentColors}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentColors.background_01, paddingTop: 40 },
      ]}
    >
      <Text style={[styles.headerText, { color: currentColors.text }]}>
        Your Cart
      </Text>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
          />
          <CartSummary
            subtotal={subtotal}
            shippingCharge={shippingCharge}
            total={total}
            currentColors={currentColors}
          />
        </>
      )}
      <View
        style={[
          styles.newSection,
          { backgroundColor: currentColors.background_02, borderTopWidth: 0 },
        ]}
      >
        <Text style={[styles.newSectionText, { color: currentColors.text }]}>
          Sample Text
        </Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 3,
    right: 2,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  filterContainer: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  brandButton: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
  },
  brandButtonText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: Colors.lightBlue,
  },
  applyButton: {
    backgroundColor: Colors.lightBlue,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  newSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newSectionText: {
    fontSize: 16,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
