import React, { createContext, useState, useRef, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/contexts/CartContext';
import { FavouritesProvider } from '@/contexts/FavouritesContext';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useOnboarding } from '../../contexts/OnboardingContext';

export const ModalContext = createContext({
  modalVisible: false,
  setModalVisible: (visible: boolean) => {},
});

export const TabBarContext = createContext({
  tabBarVisible: true,
  setTabBarVisible: (visible: boolean) => {},
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { cart } = useCart();
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current;
  const { tabBarBackground } = useTheme();
  const { isOnboardingVisible } = useOnboarding();

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: tabBarVisible ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [tabBarVisible]);

  useEffect(() => {
    setTabBarVisible(!isOnboardingVisible);
  }, [isOnboardingVisible]);

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
                color={Colors.dark.text}
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

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <TabBarContext.Provider value={{ tabBarVisible, setTabBarVisible }}>
        <FavouritesProvider>
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
                          <Text style={styles.tabCartBadgeText}>
                            {cart.length}
                          </Text>
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
                title: 'Explore',
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
                        <Text style={styles.tabCartBadgeText}>
                          {cart.length}
                        </Text>
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
                headerShown: false, // Hide the default header
                header: ({ navigation }) => (
                  <Header isProductDetails={true} navigation={navigation} />
                ),
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
        </FavouritesProvider>
      </TabBarContext.Provider>
    </ModalContext.Provider>
  );
}

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
