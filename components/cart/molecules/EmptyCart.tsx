import React from 'react';
import { View, StyleSheet } from 'react-native';
import CartText from '../atoms/CartText';

const EmptyCart = () => {
  return (
    <View style={styles.emptyCart}>
      <View>
        <CartText>Your cart is empty</CartText>
      </View>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
