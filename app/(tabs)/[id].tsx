import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import sampleData from '../../assets/sample.json';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useFonts } from 'expo-font';
import { Colors } from '../../constants/Colors';

interface Product {
  id: string;
  name: string;
  price: number;
  mainImage: string;
  colour: string;
  description: string;
}

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const product = sampleData.find(
    (item) => item.id === id
  ) as unknown as Product;
  const router = useRouter();
  const { addToCart } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [id]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  let [fontsLoaded] = useFonts({
    Helvetica: require('../../assets/fonts/Helvetica.ttf'),
    Novecentro: require('../../assets/fonts/Novecentro.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
        <Image source={{ uri: product.mainImage }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.colour}>Color: {product.colour}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() =>
          addToCart({ ...product, image: product.mainImage, quantity: 1 })
        }
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background_01,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.light.text,
  },
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
    color: Colors.light.text,
  },
  price: {
    fontFamily: 'Novecentro',
    fontSize: 20,
    color: Colors.light.icon,
    marginBottom: 10,
  },
  colour: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    textAlign: 'justify',
  },
  addToCartButton: {
    backgroundColor: Colors.light.tint,
    marginHorizontal: 14,
    marginBottom: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    left: 1,
    right: 1,
    borderRadius: 10,
  },
  addToCartText: {
    color: Colors.light.background_01,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
