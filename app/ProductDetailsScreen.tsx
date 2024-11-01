import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import { RouteProp } from '@react-navigation/native';

type ProductDetailsScreenRouteProp = RouteProp<
  { params: { product: { mainImage: string; name: string; price: number } } },
  'params'
>;

const ProductDetailsScreen = ({
  route,
}: {
  route: ProductDetailsScreenRouteProp;
}) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.mainImage }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      {/* Add more product details here */}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 16,
  },
});
