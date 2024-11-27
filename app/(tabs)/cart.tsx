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

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              disabled={item.quantity === 1}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="remove" size={15} color="black" />
              </View>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
              <View style={styles.iconContainer}>
                <Ionicons name="add" size={15} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={24} color="black" />
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
    <View style={styles.container}>
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
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.totalText}>Total Amount:</Text>
        </View>
        <View>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>
      </View>
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => console.log('Checkout button pressed')}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background_01,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.icon,
    backgroundColor: Colors.light.background_02,
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
    color: Colors.light.icon,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    color: Colors.light.icon,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.icon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
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
    backgroundColor: Colors.light.background_01,
    marginTop: 0,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 18,
    color: Colors.light.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  checkoutContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.light.background_02,
    marginTop: 4,
    marginBottom: 60,
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
  },
  checkoutButtonText: {
    color: Colors.light.background_02,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
