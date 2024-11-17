import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useRouter } from 'expo-router';
import sampleData from '../../assets/sample.json';
import { useFavourites } from '@/contexts/FavouritesContext';

type Product = {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
};
import { ModalContext, TabBarContext } from './_layout';
import useProductFilter from '../../hooks/useProductFilter';
import { Ionicons } from '@expo/vector-icons';
import useProductSearch from '../../hooks/useProductSearch';

const nikeBlackLogo = 'https://i.ibb.co/vHp5FV7/nikeblacklogo.png';
const nikeWhiteLogo = 'https://i.ibb.co/C17pnkw/nikewhitelogo.png';
const pumaBlackLogo = 'https://i.ibb.co/HT5F046/pumablacklogo.png';
const pumaWhiteLogo = 'https://i.ibb.co/wzVBnzj/pumawhitelogo.png';

type FilterCriteria = {
  brand?: string;
  color?: string;
  priceRange?: [number, number];
};

const Home = () => {
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      mainImage: string;
      price: string;
      colour: string;
      description: string;
    }[]
  >([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    color: '',
  });
  const { filteredProducts, getUniqueColors } = useProductFilter(
    data,
    filterCriteria
  );
  const uniqueColors = getUniqueColors();
  const router = useRouter();
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const { setTabBarVisible } = useContext(TabBarContext);
  const lastOffset = useRef(0);
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { searchedProducts } = useProductSearch(filteredProducts, searchTerm);
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  const applyFilters = () => {
    const priceRange: [number, number] | undefined =
      minPrice && maxPrice
        ? [parseFloat(minPrice), parseFloat(maxPrice)]
        : undefined;
    setFilterCriteria({ brand, color, priceRange });
    setModalVisible(false);
  };

  const clearFilters = () => {
    setBrand('');
    setColor('');
    setMinPrice('');
    setMaxPrice('');
    setFilterCriteria({});
    setModalVisible(false);
  };

  const toggleBrand = (selectedBrand: string) => {
    setBrand((prevBrand) => (prevBrand === selectedBrand ? '' : selectedBrand));
  };

  const toggleColor = (selectedColor: string) => {
    setColor((prevColor) => (prevColor === selectedColor ? '' : selectedColor));
  };

  const toggleFavorite = (item: Product) => {
    if (favourites.some((fav) => fav.id === item.id)) {
      removeFromFavourites(item.id);
    } else {
      addToFavourites(item);
    }
  };

  useEffect(() => {
    setData(sampleData);
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      mainImage: string;
      price: string;
      colour: string;
      description: string;
    };
  }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() =>
        router.push({ pathname: `/(tabs)/[id]`, params: { id: item.id } })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={
              favourites.some((fav) => fav.id === item.id)
                ? 'heart'
                : 'heart-outline'
            }
            size={24}
            color={
              favourites.some((fav) => fav.id === item.id) ? 'black' : 'black'
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
    </Pressable>
  );

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 60) / uniqueColors.length - 5;

  const handleSearch = () => {};

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > lastOffset.current && currentOffset > 0) {
      setTabBarVisible(false);
    } else {
      setTabBarVisible(true);
    }
    lastOffset.current = currentOffset;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          onPress={searchTerm ? clearSearch : handleSearch}
          style={styles.searchButton}
        >
          <Ionicons
            name={searchTerm ? 'close' : 'search'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {searchedProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="gray" />
          <Text style={styles.noProductsText}>No products to show</Text>
        </View>
      ) : (
        <FlatList
          data={searchedProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Filter Products</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.brandButton,
                  brand === 'Nike' && styles.selectedBrandButton,
                  { flex: 1 },
                ]}
                onPress={() => toggleBrand('Nike')}
              >
                <Image
                  source={{
                    uri: brand === 'Nike' ? nikeWhiteLogo : nikeBlackLogo,
                  }}
                  style={styles.brandImage}
                />
                <Text
                  style={[
                    styles.brandButtonText,
                    brand === 'Nike' && styles.selectedBrandButtonText,
                  ]}
                >
                  Nike
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.brandButton,
                  brand === 'Puma' && styles.selectedBrandButton,
                  { flex: 1 },
                ]}
                onPress={() => toggleBrand('Puma')}
              >
                <Image
                  source={{
                    uri: brand === 'Puma' ? pumaWhiteLogo : pumaBlackLogo,
                  }}
                  style={styles.brandImage}
                />
                <Text
                  style={[
                    styles.brandButtonText,
                    brand === 'Puma' && styles.selectedBrandButtonText,
                  ]}
                >
                  Puma
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spacing} />
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Min Price"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={styles.input}
                placeholder="Max Price"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>
            <View style={styles.spacing} />
            <View style={styles.row}>
              {uniqueColors.map((colorOption) => (
                <TouchableOpacity
                  key={colorOption}
                  style={[
                    styles.colorButton,
                    color === colorOption && styles.selectedColorButton,
                    { width: buttonWidth },
                  ]}
                  onPress={() => toggleColor(colorOption)}
                >
                  <Text
                    style={[
                      styles.colorButtonText,
                      color === colorOption && styles.selectedColorButtonText,
                    ]}
                  >
                    {colorOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.largeSpacing} />
            <View style={[styles.row, styles.buttonContainer]}>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={applyFilters}
              >
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={clearFilters}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 30) / 2;

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
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
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorButton: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedColorButton: {
    backgroundColor: 'black',
  },
  colorButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedColorButtonText: {
    color: 'white',
    fontSize: 12,
  },
  brandImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  spacing: {
    height: 10,
  },
  largeSpacing: {
    height: 20,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    marginTop: 10,
    fontSize: 18,
    color: 'gray',
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
    backgroundColor: 'white',
  },
  searchButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
