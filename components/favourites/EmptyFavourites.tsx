import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

const EmptyFavourites = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={styles.emptyFavourites}>
      <Ionicons name="heart-outline" size={50} color="gray" />
      <Text style={[styles.emptyText, { color: currentColors.icon }]}>
        No favourite items
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyFavourites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.light.icon,
  },
});

export default EmptyFavourites;
