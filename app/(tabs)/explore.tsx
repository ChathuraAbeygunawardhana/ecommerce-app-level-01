import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import sampleData from '../../assets/sample.json';
import useProductSearch from '../../hooks/useProductSearch';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

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
  const currentBackgroundColor =
    theme === 'light'
      ? Colors.light.background_01
      : currentColors.background_02;
  const currentSpecialGrey =
    theme === 'light' ? Colors.light.specialGrey : Colors.dark.specialGrey;

  const brands = ['Nike', 'Adidas', 'PUMA', 'NB'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
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
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: currentColors.background_02 },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
      </View>
      <Text style={[styles.name, { color: currentColors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.price, { color: currentColors.grey }]}>
        ${item.price}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: currentColors.background_01, paddingTop: 40 }}>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: currentColors.background_01 },
        ]}
      >
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={currentColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: currentColors.text }]}>
          Explore
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="sliders" size={24} color={currentColors.text} />
          </TouchableOpacity>
          <View style={{ width: 10 }} /> 
          <TouchableOpacity
            onPress={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Ionicons name="search" size={24} color={currentColors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                color: currentColors.text,
                backgroundColor: currentColors.background_02,
              },
            ]}
            placeholder="Search products..."
            placeholderTextColor={currentColors.grey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <FlatList
        data={searchedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={[
          styles.listContainer,
          { paddingVertical: 20, marginBottom: 60 },
        ]}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.bottomSheet,
              { backgroundColor: currentColors.background_02 },
            ]}
          >
            <Text style={[styles.modalTitle, { color: currentColors.text, fontSize: 22 }]}>
              Filters
            </Text>

            <Text style={[styles.modalText, { color: currentColors.text, textAlign: 'left' }]}>
              Price Range
            </Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: currentColors.text,
                    borderColor: currentColors.grey,
                    borderRadius: 60, // Updated border radius
                  },
                ]}
                placeholder="Min Price"
                placeholderTextColor={Colors.grey} // Updated color
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    color: currentColors.text,
                    borderColor: currentColors.grey,
                    borderRadius: 60, // Updated border radius
                  },
                ]}
                placeholder="Max Price"
                placeholderTextColor={Colors.grey} // Updated color
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            <Text style={[styles.modalText, { color: currentColors.text, textAlign: 'left' }]}>
              Brands
            </Text>
            <View style={styles.brandContainer}>
              {brands.map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.brandButton,
                    {
                      borderRadius: 60,
                      backgroundColor: currentSpecialGrey,
                      borderWidth: 0,
                    },
                    selectedBrands.includes(brand) && {
                      backgroundColor: Colors.lightBlue,
                    },
                  ]}
                  onPress={() => toggleBrand(brand)}
                >
                  <Text
                    style={[
                      styles.brandButtonText,
                      { color: Colors.grey },
                      selectedBrands.includes(brand) && { color: Colors.white },
                    ]}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.clearButton,
                  {
                    backgroundColor: currentColors.lightBlue,
                    borderRadius: 60,
                  },
                ]}
                onPress={clearFilters}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.applyButton,
                  {
                    backgroundColor: currentColors.lightBlue,
                    borderRadius: 60,
                  },
                ]}
                onPress={applyFilters}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  listContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: itemWidth,
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#fff', // This will be overridden by the dynamic color
    borderRadius: 20, // Increased border radius
    // Removed shadow properties
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: 'black',
  },
  clearButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  brandButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
  },
  selectedBrandButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  brandButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedBrandButtonText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
