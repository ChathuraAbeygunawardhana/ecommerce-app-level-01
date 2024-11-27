import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }: {
    cart: CartItem[];
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
  } = useCart();

  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <View
        style={[styles.item, { backgroundColor: currentColors.background_02 }]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={[styles.name, { color: currentColors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.price, { color: currentColors.grey }]}>
            ${item.price}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              disabled={item.quantity === 1}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: currentColors.background_01 },
                ]}
              >
                <Ionicons name="remove" size={15} color={currentColors.text} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.quantity, { color: currentColors.text }]}>
              {item.quantity}
            </Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.lightBlue },
                ]}
              >
                <Ionicons name="add" size={15} color={Colors.white} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons
              name="trash-outline"
              size={24}
              color={currentColors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentColors.background_01, paddingTop: 40 },
      ]}
    >
      <Text style={[styles.headerText, { color: currentColors.text }]}>
        Your Cart
      </Text>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <View>
            <Text>Your cart is empty</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
        />
      )}
      <View
        style={[
          styles.totalContainer,
          { backgroundColor: currentColors.background_01 },
        ]}
      >
        <View>
          <Text style={[styles.totalText, { color: currentColors.text }]}>
            Total Amount:
          </Text>
        </View>
        <View>
          <Text style={[styles.totalAmount, { color: currentColors.text }]}>
            ${calculateTotal()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    color: Colors.light.text,
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.light.background_02,
    marginTop: 0,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});
