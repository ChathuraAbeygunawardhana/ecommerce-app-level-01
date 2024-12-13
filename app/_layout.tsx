import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '@/contexts/CartContext';
import { FavouritesProvider } from '@/contexts/FavouritesContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { StyleSheet } from 'react-native';
import { OnboardingProvider } from '../contexts/OnboardingContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <FavouritesProvider>
        <ThemeProvider>
          <OnboardingProvider>
            <NavigationThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </NavigationThemeProvider>
          </OnboardingProvider>
        </ThemeProvider>
      </FavouritesProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({});
