import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import sampleData from '../../assets/sample.json';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  currentColors: {
    background_01: string;
    background_02: string;
    text: string;
    grey: string;
  };
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  currentColors,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  const product = sampleData.find(p => p.id === item.id);

  return (
    <View style={[styles.item, { backgroundColor: currentColors.background_02 }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.name, { color: currentColors.text }]} numberOfLines={1}>
          {item.name.split(' ').slice(0, 3).join(' ').substring(0, 15)}
              {/* TODO: These kind of small logics should move to utility functions */}
        </Text>
        <Text style={[styles.price, { color: currentColors.grey }]}>
          ${item.price}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>
            <View style={[styles.iconContainer, { backgroundColor: currentColors.background_01 }]}>
              <Ionicons name="remove" size={15} color={currentColors.text} />
            </View>
          </TouchableOpacity>
          <Text style={[styles.quantity, { color: currentColors.text }]}>
            {item.quantity > 0 ? item.quantity : 'Out of Stock'}
          </Text>
          <TouchableOpacity onPress={() => {
            if (product && item.quantity < product.quantity) {
              increaseQuantity(item.id);
            }
          }} disabled={product && item.quantity >= product.quantity}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.lightBlue }]}>
              <Ionicons name="add" size={15} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color={currentColors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 3,
    right: 2,
  },
});

export default CartItem;
