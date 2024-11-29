import { StyleSheet, View, Animated, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import sampleData from '../../assets/sample.json';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useFonts } from 'expo-font';
import { Colors } from '../../themes/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import CustomHeader from '@/components/productdetails/CustomHeader';
import ProductInfo from '@/components/productdetails/ProductInfo';
import AddToCartButton from '@/components/productdetails/AddToCartButton';

interface Product {
  id: string;
  mainImage: string;
  name: string;
  price: number;
  colour: string;
  description: string;
}

const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = sampleData.find(
    (item) => item.id === id
  ) as unknown as Product;
  const router = useRouter();
  const { addToCart } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
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
    <View
      style={[
        styles.container,
        { backgroundColor: currentColors.background_01 },
      ]}
    >
      <CustomHeader router={router} currentColors={currentColors} />
      <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
        <ProductInfo product={product} currentColors={currentColors} />
      </Animated.ScrollView>
      <AddToCartButton
        product={product}
        addToCart={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: '',
            quantity: 0,
          })
        }
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
