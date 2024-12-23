import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

interface FilterModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  modalVisible,
  setModalVisible,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedBrands,
  toggleBrand,
  clearFilters,
  applyFilters,
}) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const currentSpecialGrey = theme === 'light' ? Colors.light.specialGrey : Colors.dark.specialGrey;
  const brands = ['Nike', 'Adidas', 'PUMA', 'NB'];

  return (
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
  );
};

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
});

export default FilterModal;
