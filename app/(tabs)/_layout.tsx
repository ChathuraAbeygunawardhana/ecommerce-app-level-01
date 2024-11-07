import React, { createContext, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/contexts/CartContext';

export const ModalContext = createContext({
  modalVisible: false,
  setModalVisible: (visible: boolean) => {},
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { cart } = useCart();

  const Header = ({
    isProductDetails,
    navigation,
    routeName,
  }: {
    isProductDetails?: boolean;
    navigation?: any;
    routeName?: string;
  }) => (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContainer}>
        {isProductDetails ? (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={24}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
            <Text style={styles.productDetailsTitle}>Product Details</Text>
            <View style={{ width: 24, marginRight: 10 }} />
          </>
        ) : routeName === 'index' ? (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.icon}
            >
              <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Title</Text>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart" size={24} color="black" />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.headerTitle}>
            {(routeName ?? '').charAt(0).toUpperCase() + (routeName ?? '').slice(1)}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          header: ({ navigation }) => (
            <Header navigation={navigation} routeName={route.name} />
          ),
          tabBarIcon: ({ color, focused }) => {
            if (route.name === 'cart') {
              return (
                <View style={styles.tabIconContainer}>
                  <TabBarIcon
                    name={focused ? 'cart' : 'cart-outline'}
                    color={color}
                  />
                  {cart.length > 0 && (
                    <View style={styles.tabCartBadge}>
                      <Text style={styles.tabCartBadgeText}>{cart.length}</Text>
                    </View>
                  )}
                </View>
              );
            }
            return (
              <TabBarIcon
                name={focused ? (route.name as keyof typeof Ionicons.glyphMap) : (`${route.name}-outline` as keyof typeof Ionicons.glyphMap)}
                color={color}
              />
            );
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'search' : 'search-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'cart' : 'cart-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'person' : 'person-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="[id]"
          options={{
            title: 'Product Details',
            headerShown: true,
            header: ({ navigation }) => (
              <Header isProductDetails={true} navigation={navigation} />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'person' : 'person-outline'}
                color={color}
              />
            ),
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: 'white',
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    paddingHorizontal: 10,
  },
  productDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
  tabIconContainer: {
    position: 'relative',
  },
  tabCartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabCartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
});
