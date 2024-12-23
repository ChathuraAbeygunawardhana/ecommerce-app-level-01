import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import sampleData from '../../assets/sample.json';
import useProductSearch from '../../hooks/useProductSearch';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavourites } from '../../contexts/FavouritesContext';
import { useRouter } from 'expo-router';
import Header from '../../components/explore/Header';
import SearchBar from '../../components/explore/SearchBar';
import ProductItem from '../../components/explore/ProductItem';
import FilterModal from '../../components/explore/FilterModal';

const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 10;
const itemWidth = (width - gap * (numColumns + 1)) / numColumns;

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(sampleData);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { searchedProducts } = useProductSearch(filteredProducts, searchQuery);
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const router = useRouter();

  const brands = ['Nike', 'Adidas', 'PUMA', 'NB'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const applyFilters = () => {
    const filtered = sampleData.filter((product) => {
      const productBrand = product.name.split(' ')[0];
      return selectedBrands.length > 0
        ? selectedBrands.includes(productBrand)
        : true;
    });
    setFilteredProducts(filtered);
    setModalVisible(false);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(sampleData);
    setModalVisible(false);
  };

  const renderItem = ({ item }: any) => (
    <ProductItem item={item} onPress={() => router.push(`/${item.id}`)} />
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentColors.background_01,
        paddingTop: 40,
      }}
    >
      <Header
        onBackPress={() => {}}
        onFilterPress={() => setModalVisible(true)}
        onSearchPress={() => setIsSearchVisible(!isSearchVisible)}
        isSearchVisible={isSearchVisible}
      />
      {isSearchVisible && (
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <FlatList
        data={searchedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={[
          styles.listContainer,
          { paddingVertical: 10, marginBottom: 60 },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
