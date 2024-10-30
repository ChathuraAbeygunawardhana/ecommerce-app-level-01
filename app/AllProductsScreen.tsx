import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import productsData from '../assets/sample.json';

const AllProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const formattedProducts = productsData.map((product) => ({
      ...product,
      price: parseFloat(product.price),
    }));
    setProducts(formattedProducts);
  }, []);

  interface Product {
    id: string;
    name: string;
    price: number;
    mainImage: string;
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default AllProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
    padding: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    padding: 10,
    resizeMode: 'contain',
    transform: [{ rotate: '45deg' }],
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});
