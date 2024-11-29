
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/themes/Colors';

interface CartTotalProps {
  cart: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  currentColors: {
    background_01: string;
    text: string;
  };
}

const CartTotal: React.FC<CartTotalProps> = ({ cart, currentColors }) => {
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View
      style={[
        styles.totalContainer,
        { backgroundColor: currentColors.background_01 },
      ]}
    >
      <View>
        <Text style={[styles.totalText, { color: currentColors.text }]}>
          Total Amount:
        </Text>
      </View>
      <View>
        <Text style={[styles.totalAmount, { color: currentColors.text }]}>
          ${calculateTotal()}
        </Text>
      </View>
    </View>
  );
};

export default CartTotal;

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.light.background_02,
    marginTop: 0,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});