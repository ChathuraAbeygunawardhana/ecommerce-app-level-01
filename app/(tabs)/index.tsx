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
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import sampleData from '../../assets/sample.json';
import { ModalContext } from './_layout';
import useProductFilter from '../../hooks/useProductFilter';

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

  const toggleBrand = (selectedBrand: string) => {
    setBrand((prevBrand) => (prevBrand === selectedBrand ? '' : selectedBrand));
  };

  const toggleColor = (selectedColor: string) => {
    setColor((prevColor) => (prevColor === selectedColor ? '' : selectedColor));
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
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
    </Pressable>
  );

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 60) / uniqueColors.length - 5;

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
                    { width: buttonWidth }, // Set dynamic width
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
    padding: 10,
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
    elevation: 5, // Add elevation for Android shadow
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
});
