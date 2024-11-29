
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyCart = () => {
  return (
    <View style={styles.emptyCart}>
      <View>
        <Text>Your cart is empty</Text>
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