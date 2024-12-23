import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onBackPress: () => void;
  onFilterPress: () => void;
  onSearchPress: () => void;
  isSearchVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onBackPress,
  onFilterPress,
  onSearchPress,
  isSearchVisible,
}) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: currentColors.background_01 },
      ]}
    >
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={currentColors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: currentColors.text }]}>
        Explore
      </Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onFilterPress}>
          <Feather name="sliders" size={24} color={currentColors.text} />
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          onPress={onSearchPress}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="search" size={24} color={currentColors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
