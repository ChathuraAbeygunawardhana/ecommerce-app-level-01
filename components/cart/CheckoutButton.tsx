import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CheckoutButtonProps {
  currentColors: {
    lightBlue: string;
  };
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ currentColors }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: currentColors.lightBlue,
          borderRadius: 60,
        },
      ]}
      onPress={() => {}}
    >
      <Text style={styles.buttonText}>Checkout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default CheckoutButton;
