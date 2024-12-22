import React, { useContext } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { TabBarContext } from '../../contexts/TabBarContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabBarComponent() {
  const { tabBarVisible } = useContext(TabBarContext);
  const { cart } = useCart();
  const { tabBarBackground } = useTheme();
  const translateY = new Animated.Value(tabBarVisible ? 0 : 100);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.lightBlue,
        headerShown: route.name !== 'index',
        tabBarIcon: ({ color, focused }) => {
          if (route.name === 'cart') {
            return (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={focused ? 'cart' : 'cart-outline'}
                  size={24}
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
            <Ionicons
              name={
                focused
                  ? (route.name as keyof typeof Ionicons.glyphMap)
                  : (`${route.name}-outline` as keyof typeof Ionicons.glyphMap)
              }
              color={color}
              size={24}
            />
          );
        },
        tabBarStyle: {
          transform: [{ translateY }],
          height: 55,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.dark.background_02,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
          borderTopWidth: 0,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <View
            style={[
              styles.tabBarBackground,
              { backgroundColor: tabBarBackground },
            ]}
          />
        ),
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons
                name={focused ? 'cart' : 'cart-outline'}
                size={24}
                color={color}
              />
              {cart.length > 0 && (
                <View style={styles.tabCartBadge}>
                  <Text style={styles.tabCartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          title: 'Product Details',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {},
  tabCartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    paddingLeft: 7.5,
  },
  tabCartBadgeText: {
    color: Colors.white,
    fontSize: 9,
  },
  tabBarBackground: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 55,
    zIndex: -1,
  },
});
