import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CartSummaryProps {
  subtotal: number;
  shippingCharge: number;
  total: number;
  currentColors: {
    background_02: string;
    text: string;
    lightBlue: string;
  };
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingCharge,
  total,
  currentColors,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentColors.background_02,
          marginBottom: 55,
          borderTopWidth: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      ]}
    >
      <View style={styles.summaryLine}>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          Subtotal
        </Text>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          ${subtotal.toFixed(2)}
        </Text>
      </View>

      <View style={styles.summaryLine}>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          Shipping
        </Text>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          ${shippingCharge.toFixed(2)}
        </Text>
      </View>

      <View style={styles.summaryLine}>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          Total
        </Text>
        <Text style={[styles.modalText, { color: currentColors.text, paddingHorizontal: 16 }]}>
          ${total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
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
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default CartSummary;
