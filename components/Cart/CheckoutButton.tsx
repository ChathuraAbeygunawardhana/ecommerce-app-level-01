import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CheckoutButtonProps {
  onPress: () => void;
}

const CheckoutButton = ({ onPress }: CheckoutButtonProps) => {
  return (
    <TouchableOpacity style={styles.checkoutButton} onPress={onPress}>
      <View>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({
  checkoutButton: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 8,
    width: '80%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
