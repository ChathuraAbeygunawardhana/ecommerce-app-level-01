import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const itemWidth = 220;

interface ProductItemProps {
  item: {
    mainImage: string;
    name: string;
    price: number;
  };
  onPress: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onPress }) => (
  <Pressable style={styles.itemContainer} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
    </View>
    <Text style={styles.name} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.price}>${item.price}</Text>
  </Pressable>
);

export default ProductItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 15,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});
