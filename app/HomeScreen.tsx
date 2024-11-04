import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 200 },
    // ...other products
  ];

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.product}
          onPress={() => navigation.navigate('ProductDetails', { product })}
        >
          <Text style={styles.productName}>{product.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  product: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  productName: {
    fontSize: 18,
  },
});
