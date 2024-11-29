import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Product {
  mainImage: string;
  name: string;
  price: number;
  colour: string;
  description: string;
}

interface Colors {
  text: string;
  icon: string;
}

const ProductInfo = ({ product, currentColors }: { product: Product; currentColors: Colors }) => {
  return (
    <View>
      <Image source={{ uri: product.mainImage }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={[styles.name, { color: currentColors.text }]}>
          {product.name}
        </Text>
        <Text style={[styles.price, { color: currentColors.icon }]}>
          ${product.price}
        </Text>
        <Text style={[styles.colour, { color: currentColors.icon }]}>
          Color: {product.colour}
        </Text>
        <Text style={[styles.description, { color: currentColors.text }]}>
          {product.description}
        </Text>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontFamily: 'Helvetica',
    fontSize: 30,
    marginBottom: 10,
  },
  price: {
    fontFamily: 'Novecentro',
    fontSize: 20,
    marginBottom: 10,
  },
  colour: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});