
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import LocationSection from '@/components/home/LocationSection';

interface HeaderProps {
  toggleTheme: () => void;
  currentColors: {
    theme: string;
    text: string;
    grey: string;
  };
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentColors }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconBackground} onPress={toggleTheme}>
        <Ionicons
          name={currentColors.theme === 'light' ? 'moon' : 'sunny'}
          size={24}
          color={currentColors.text}
        />
      </TouchableOpacity>
      <LocationSection currentColors={currentColors} />
      <TouchableOpacity style={styles.iconBackground}>
        <Feather name="shopping-bag" size={24} color={currentColors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  iconBackground: {
    padding: 15,
    borderRadius: 50,
  },
});

export default Header;