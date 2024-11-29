import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../themes/Colors';

interface Product {
  mainImage: string;
  image?: string;
  quantity?: number;
}

const AddToCartButton = ({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (product: Product) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() =>
        addToCart({ ...product, image: product.mainImage, quantity: 1 })
      }
    >
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: Colors.lightBlue,
    marginHorizontal: 14,
    marginBottom: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    left: 1,
    right: 1,
    borderRadius: 10,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
