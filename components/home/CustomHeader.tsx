
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/Colors';
import { useCart } from '@/contexts/CartContext';

interface CustomHeaderProps {
  isProductDetails?: boolean;
  navigation?: any;
  routeName?: string;
  setModalVisible?: (visible: boolean) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  isProductDetails,
  navigation,
  routeName,
  setModalVisible,
}) => {
  const { cart } = useCart();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContainer}>
        {isProductDetails ? (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={24}
                style={{ marginLeft: 10 }}
                color={Colors.dark.text}
              />
            </TouchableOpacity>
            <Text style={styles.productDetailsTitle}>Product Details</Text>
            <View style={{ width: 24, marginRight: 10 }} />
          </>
        ) : routeName === 'index' ? (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible && setModalVisible(true)}
              style={styles.icon}
            >
              <Ionicons name="filter" size={24} color={Colors.dark.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Title</Text>
            <View>
              <Ionicons
                name="cart"
                size={24}
                color={Colors.dark.text}
                style={{ marginRight: 7 }}
              />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.headerTitle}>
            {(routeName ?? '').charAt(0).toUpperCase() +
              (routeName ?? '').slice(1)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: Colors.dark.background_01,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    color: Colors.dark.text,
  },
  icon: {},
  productDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: Colors.dark.text,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: Colors.dark.tint,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    paddingLeft: 7.5,
  },
  cartBadgeText: {
    color: Colors.dark.background_01,
    fontSize: 9,
  },
});

export default CustomHeader;