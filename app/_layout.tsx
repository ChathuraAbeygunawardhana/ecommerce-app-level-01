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
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();

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

const styles = StyleSheet.create({});
