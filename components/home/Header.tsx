import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const router = useRouter();
  const { cart } = useCart();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconBackground} onPress={toggleTheme}>
        <Ionicons
          name={theme === 'light' ? 'moon' : 'sunny'}
          size={24}
          color={currentColors.text}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.storeLocationText, { color: currentColors.grey }]}>
          Store location
        </Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={18} color={Colors.orange} />
          <Text style={[styles.locationText, { color: currentColors.text }]}>
            {' '}
            Colombo , Sri Lanka
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.iconBackground}
          onPress={() => router.push('/cart')}
        >
          <Feather name="shopping-bag" size={24} color={currentColors.text} />
        </TouchableOpacity>
        {cart.length > 0 && (
          <View style={[styles.cartDot, { backgroundColor: Colors.orange }]} />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  storeLocationText: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconBackground: {
    padding: 15,
    borderRadius: 50,
  },
  cartDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.orange,
  },
});
