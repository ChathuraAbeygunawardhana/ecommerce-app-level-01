import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CartTotalProps {
  total: string;
}

const CartTotal = ({ total }: CartTotalProps) => {
  return (
    <View style={styles.totalContainer}>
      <View>
        <Text style={styles.totalText}>Total Amount:</Text>
      </View>
      <View>
        <Text style={styles.totalAmount}>${total}</Text>
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
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
