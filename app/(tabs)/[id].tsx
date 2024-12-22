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
import Header from '../../components/productDetails/Header';
import ImageContainer from '../../components/productDetails/ImageContainer';
import ProductDetailsSection from '../../components/productDetails/ProductDetailsSection';
import AddToCartButton from '../../components/productDetails/AddToCartButton';

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
      <Header />
      <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
        <ImageContainer mainImage={product.mainImage} />
        <ProductDetailsSection
          name={product.name}
          price={product.price}
          colour={product.colour}
          description={product.description}
        />
      </Animated.ScrollView>
      <AddToCartButton onPress={() => addToCart({ ...product, image: product.mainImage, quantity: 1 })} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
