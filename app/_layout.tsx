import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '@/contexts/CartContext';
import { FavouritesProvider } from '@/contexts/FavouritesContext';
import { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={{
            uri: 'https://i.ibb.co/tQjGz7z/Leonardo-Phoenix-Create-a-logo-for-a-sneaker-shop-mobile-app-f-3.jpg',
          }}
          style={[styles.splashImage, { opacity: fadeAnim }]}
        />
      </View>
    );
  }

  return (
    <CartProvider>
      <FavouritesProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </FavouritesProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
