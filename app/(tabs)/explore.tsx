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
import { useFavourites } from '../../contexts/FavouritesContext';
import { useRouter } from 'expo-router';

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

  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const router = useRouter();

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
    <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: currentColors.background_02, padding: 10 },
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
        <View style={{ height: 10 }} />
        <View style={styles.addIconContainer}>
          <TouchableOpacity
            style={[styles.addIcon, { backgroundColor: currentColors.lightBlue }]}
            onPress={() =>
              isFavourite(item.id)
                ? removeFromFavourites(item.id)
                : addToFavourites(item)
            }
          >
            <Ionicons
              name={isFavourite(item.id) ? 'heart' : 'add'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentColors.background_01,
        paddingTop: 40,
      }}
    >
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
            style={{ marginRight: 12 }}
          >
            <Ionicons name="search" size={24} color={currentColors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {isSearchVisible && (
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
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={20} color={currentColors.grey} />
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={searchedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={[
          styles.listContainer,
          { paddingVertical: 10, marginBottom: 60 }, // Reduced paddingVertical
        ]}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false} // Added to remove scrollbar
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
            <Text
              style={[
                styles.modalTitle,
                { color: currentColors.text, fontSize: 22 },
              ]}
            >
              Filters
            </Text>

            <Text
              style={[
                styles.modalText,
                { color: currentColors.text, textAlign: 'left' },
              ]}
            >
              Price Range
            </Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: currentColors.text,
                    borderColor: currentColors.grey,
                    borderRadius: 60,
                  },
                ]}
                placeholder="Min Price"
                placeholderTextColor={Colors.grey}
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
                    borderRadius: 60,
                  },
                ]}
                placeholder="Max Price"
                placeholderTextColor={Colors.grey}
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            <Text
              style={[
                styles.modalText,
                { color: currentColors.text, textAlign: 'left' },
              ]}
            >
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
    borderRadius: 20, // Increased border radius
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '90%', // Reduced width
    height: 130, // Reduced height
    borderRadius: 10,
    resizeMode: 'cover',
    margin: 10, // Added margin for padding effect
  },
  name: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.light.text,
  },
  price: {
    fontSize: 14,
    marginTop: 5,
    color: Colors.grey,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 50,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  searchButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: -10, // Moved down
    right: -10, // Moved to the right
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: Colors.lightBlue,
  },
  addIcon: {
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
  },
});
