import { StyleSheet, View, FlatList, Modal, Dimensions } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import sampleData from '../../assets/sample.json';

type Product = {
  id: string;
  name: string;
  mainImage: string;
  price: string;
  colour: string;
  description: string;
};
import { ModalContext } from './_layout';
import useProductFilter from '../../hooks/useProductFilter';
import FilterModal from '@/components/Home/FilterModal';
import ProductItem from '@/components/Home/ProductItem';

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
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { searchedProducts } = useProductSearch(filteredProducts, searchTerm);

  const applyFilters = () => {
    console.log('Applying filters:', { brand, color, minPrice, maxPrice });
    const priceRange: [number, number] | undefined =
      minPrice && maxPrice
        ? [parseFloat(minPrice), parseFloat(maxPrice)]
        : undefined;
    setFilterCriteria({ brand, color, priceRange });
    setModalVisible(false);
  };

  const clearFilters = () => {
    console.log('Clearing filters');
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

  useEffect(() => {
    console.log('Setting data from sampleData');
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
  }) => {
    console.log('Rendering item:', item);
    return (
      <ProductItem
        item={{ ...item, price: parseFloat(item.price) }}
        onPress={() =>
          router.push({ pathname: `/(tabs)/[id]`, params: { id: item.id } })
        }
      />
    );
  };

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 60) / uniqueColors.length - 5;

  const handleSearch = () => {};

  const clearSearch = () => {
    setSearchTerm('');
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
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal closed');
          setModalVisible(!modalVisible);
        }}
      >
        <FilterModal
          uniqueColors={uniqueColors}
          brand={brand}
          setBrand={setBrand}
          color={color}
          setColor={setColor}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
