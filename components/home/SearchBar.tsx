import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './SearchBarStyles';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View
      style={[
        styles.searchBar,
        { backgroundColor: currentColors.background_02 },
      ]}
    >
      <Ionicons name="search" size={20} color={currentColors.grey} />
      <TextInput
        style={[styles.searchInput, { color: currentColors.text }]}
        placeholder="Looking for shoes"
        placeholderTextColor={currentColors.grey}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;
