import React from 'react';
import { View, Text, Pressable, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavourites } from '@/contexts/FavouritesContext';

type Product = {
  id: string;
  name: string;
  price: string;
  mainImage: string;
};

const FavouriteItem = ({ item }: { item: Product }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const { removeFromFavourites } = useFavourites();

  return (
    <Pressable
      style={[
        styles.itemContainer,
        { backgroundColor: currentColors.background_02 },
      ]}
      onPress={() =>
        router.push({ pathname: `/(tabs)/[id]`, params: { id: item.id } })
      }
    >
      <View style={styles.leftContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text
            style={[styles.name, { color: currentColors.text }]}
            numberOfLines={1}
          >
            {item.name.length > 19
              ? `${item.name.substring(0, 19)}...`
              : item.name}
          </Text>
          <Text style={[styles.price, { color: currentColors.grey }]}>
            ${item.price}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.removeButton,
          { backgroundColor: currentColors.lightBlue },
        ]}
        onPress={() => removeFromFavourites(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: Colors.light.background_02,
    borderRadius: 8,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  price: {
    fontSize: 14,
    color: Colors.light.icon,
  },
});

export default FavouriteItem;
