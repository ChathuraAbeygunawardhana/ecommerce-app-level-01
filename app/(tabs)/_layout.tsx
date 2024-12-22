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
import TabBarComponent from '../../components/home/TabBarComponent';
import { TabBarContext } from '../../contexts/TabBarContext';

export const ModalContext = createContext({
  modalVisible: false,
  setModalVisible: (visible: boolean) => {},
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
          <TabBarComponent />
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
