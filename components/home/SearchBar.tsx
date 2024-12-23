import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={[styles.searchBar, { backgroundColor: currentColors.background_02 }]}>
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

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 50,
    margin: 16,
  },
  searchInput: {
    marginLeft: 10,
  },
});

export default SearchBar;
