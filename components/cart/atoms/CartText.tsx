
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CartText = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default CartText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});