import { StyleSheet, View, FlatList, Modal, Dimensions } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import sampleData from '../../assets/sample.json';
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
    <ProductItem
      item={{ ...item, price: parseFloat(item.price) }}
      onPress={() =>
        router.push({ pathname: `/(tabs)/[id]`, params: { id: item.id } })
      }
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
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
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
