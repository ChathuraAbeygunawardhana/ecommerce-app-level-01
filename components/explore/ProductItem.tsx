import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavourites } from '../../contexts/FavouritesContext';

interface ProductItemProps {
  item: any;
  onPress: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onPress }) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: currentColors.background_02, padding: 10 },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.mainImage }} style={styles.image} />
        </View>
        <Text style={[styles.name, { color: currentColors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.price, { color: currentColors.grey }]}>
          ${item.price}
        </Text>
        <View style={{ height: 10 }} />
        <View style={styles.addIconContainer}>
          <TouchableOpacity
            style={[styles.addIcon, { backgroundColor: currentColors.lightBlue }]}
            onPress={() =>
              isFavourite(item.id)
                ? removeFromFavourites(item.id)
                : addToFavourites(item)
            }
          >
            <Ionicons
              name={isFavourite(item.id) ? 'heart' : 'add'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: (Dimensions.get('window').width - 10 * (2 + 1)) / 2,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 130,
    borderRadius: 10,
    resizeMode: 'cover',
    margin: 10,
  },
  name: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.light.text,
  },
  price: {
    fontSize: 14,
    marginTop: 5,
    color: Colors.grey,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: Colors.lightBlue,
  },
  addIcon: {
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
  },
});

export default ProductItem;
