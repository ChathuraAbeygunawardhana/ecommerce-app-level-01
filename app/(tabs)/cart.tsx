import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useCart } from '@/contexts/CartContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  // Add other properties as needed
}

const Cart = () => {
  const { cart }: { cart: CartItem[] } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
});
