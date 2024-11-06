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
  const filteredData = useProductFilter(data, filterCriteria);
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredData}
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
            <View style={styles.brandContainer}>
              <TouchableOpacity
                style={[
                  styles.brandButton,
                  brand === 'Nike' && styles.selectedBrandButton,
                ]}
                onPress={() => setBrand('Nike')}
              >
                <Text style={styles.brandButtonText}>Nike</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.brandButton,
                  brand === 'Puma' && styles.selectedBrandButton,
                ]}
                onPress={() => setBrand('Puma')}
              >
                <Text style={styles.brandButtonText}>Puma</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={color}
              onChangeText={setColor}
            />
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
            <View style={styles.buttonContainer}>
              <Button title="Apply Filters" onPress={applyFilters} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedBrandButton: {
    backgroundColor: '#007BFF',
  },
  brandButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
