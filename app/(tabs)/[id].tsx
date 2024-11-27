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
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme(); // Ensure theme is obtained from context
  const currentColors = Colors[theme as 'light' | 'dark'];

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
    <View style={[styles.container, { backgroundColor: currentColors.background_01 }]}>
      <View style={[styles.customHeader, { backgroundColor: currentColors.background_01 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={currentColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentColors.text }]}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Existing Content */}
      <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
        <Image source={{ uri: product.mainImage }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={[styles.name, { color: currentColors.text }]}>{product.name}</Text>
          <Text style={[styles.price, { color: currentColors.icon }]}>${product.price}</Text>
          <Text style={[styles.colour, { color: currentColors.icon }]}>Color: {product.colour}</Text>
          <Text style={[styles.description, { color: currentColors.text }]}>
            {product.description}
          </Text>
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
    // backgroundColor: Colors.dark.background_01, // Removed to use dynamic background
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
    // color: Colors.dark.text, // Removed to use dynamic color
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
    // color: Colors.dark.text, // Removed to use dynamic color
  },
  price: {
    fontFamily: 'Novecentro',
    fontSize: 20,
    // color: Colors.dark.icon, // Removed to use dynamic color
    marginBottom: 10,
  },
  colour: {
    fontSize: 16,
    // color: Colors.dark.icon, // Removed to use dynamic color
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    // color: Colors.dark.text, // Removed to use dynamic color
    textAlign: 'justify',
  },
  addToCartButton: {
    backgroundColor: Colors.lightBlue, // Changed background color to lightBlue
    marginHorizontal: 14,
    marginBottom: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80, // Moved up further by increasing the bottom value
    left: 1,
    right: 1,
    borderRadius: 10,
  },
  addToCartText: {
    color: Colors.white, // Changed text color to white
    fontSize: 18,
    fontWeight: 'bold',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingTop: 40,
    // backgroundColor: Colors.dark.background_01, // Removed to use dynamic background
  },
});
