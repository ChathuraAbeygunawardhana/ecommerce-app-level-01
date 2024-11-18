import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const nikeBlackLogo = 'https://i.ibb.co/vHp5FV7/nikeblacklogo.png';
const nikeWhiteLogo = 'https://i.ibb.co/C17pnkw/nikewhitelogo.png';
const pumaBlackLogo = 'https://i.ibb.co/HT5F046/pumablacklogo.png';
const pumaWhiteLogo = 'https://i.ibb.co/wzVBnzj/pumawhitelogo.png';

interface FilterModalProps {
  uniqueColors: string[];
  brand: string;
  setBrand: (brand: string) => void;
  color: string;
  setColor: (color: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  uniqueColors,
  brand,
  setBrand,
  color,
  setColor,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilters,
  clearFilters,
}) => (
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
          ]}
          onPress={() => setBrand('Puma')}
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
      <View style={styles.colorContainer}>
        {uniqueColors.map((colorOption) => (
          <TouchableOpacity
            key={colorOption}
            style={[
              styles.colorButton,
              color === colorOption && styles.selectedColorButton,
            ]}
            onPress={() => setColor(colorOption)}
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
        <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearFilters}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default FilterModal;

const styles = StyleSheet.create({
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
    borderRadius: 5,
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
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  colorButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedColorButton: {
    backgroundColor: 'black',
  },
  colorButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedColorButtonText: {
    color: 'white',
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
    fontWeight: 'bold',
  },
  brandImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
