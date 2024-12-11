import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFavourites } from '@/contexts/FavouritesContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

type Product = {
  id: string;
  name: string;
  price: string;
  mainImage: string;
};

const Favourites = () => {
  const { favourites, removeFromFavourites } = useFavourites();
  const router = useRouter();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      style={[styles.itemContainer, { backgroundColor: currentColors.background_02 }]}
      onPress={() =>
        router.push({ pathname: `/(tabs)/[id]`, params: { id: item.id } })
      }
    >
      <View style={styles.leftContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: currentColors.text }]} numberOfLines={1}>
            {item.name.length > 19
              ? `${item.name.substring(0, 19)}...`
              : item.name}
          </Text>
          <Text style={[styles.price, { color: currentColors.grey }]}>${item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: currentColors.lightBlue }]}
        onPress={() => removeFromFavourites(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background_01 }]}>
      {favourites.length === 0 ? (
        <View style={styles.emptyFavourites}>
          <Ionicons name="heart-outline" size={50} color="gray" />
          <Text style={[styles.emptyText, { color: currentColors.icon }]}>No favourite items</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background_01,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
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
  imageContainer: {},
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
  emptyFavourites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.light.icon,
  },
});
