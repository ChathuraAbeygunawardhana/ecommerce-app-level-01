import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={[styles.customHeader, { backgroundColor: currentColors.background_01 }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={currentColors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: currentColors.text }]}>
        Product Details
      </Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Header;
