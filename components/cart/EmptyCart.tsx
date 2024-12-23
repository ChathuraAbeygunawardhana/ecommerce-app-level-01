import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const EmptyCart: React.FC = () => {
  return (
    <View style={styles.emptyCart}>
      <View>
        <Text style={{ color: Colors.grey }}>Your cart is empty</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyCart;
