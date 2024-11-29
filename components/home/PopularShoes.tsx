import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import sampleData from '../../assets/sample.json';
import { Colors } from '../../themes/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const PopularShoes = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const router = useRouter();

  return (
    <View>
      <View style={styles.textRow}>
        <Text style={[styles.text01, { color: currentColors.text }]}>
          Popular Shoes
        </Text>
        <Text style={[styles.text02, { color: currentColors.lightBlue }]}>
          see all
        </Text>
      </View>
      <ScrollView
        horizontal
        style={styles.productContainer}
        showsHorizontalScrollIndicator={false}
      >
        {sampleData.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => router.push(`/${product.id}`)}
          >
            <View key={product.id} style={styles.productItem}>
              <View
                style={[
                  styles.productContent,
                  { backgroundColor: currentColors.background_02 },
                ]}
              >
                <Image
                  source={{ uri: product.mainImage }}
                  style={styles.productImage}
                />
                <Text
                  style={[
                    styles.bestSeller,
                    { color: currentColors.lightBlue },
                  ]}
                >
                  BEST SELLER
                </Text>
                <Text
                  style={[styles.productName, { color: currentColors.text }]}
                >
                  {product.name
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')
                    .substring(0, 15)}
                </Text>
                <Text
                  style={[styles.productPrice, { color: currentColors.grey }]}
                >
                  ${product.price}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addIcon,
                    { backgroundColor: currentColors.lightBlue },
                  ]}
                >
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
  },
  text01: {
    fontSize: 17,
  },
  text02: {
    fontSize: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
  },
  productItem: {
    marginRight: 10,
    marginVertical: 10,
    marginHorizontal: 3,
    width: 150,
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productContent: {
    borderRadius: 10,
    padding: 10,
    height: '100%',
    position: 'relative',
  },
  bestSeller: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productName: {
    marginTop: 2,
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  addIcon: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
  },
});

export default PopularShoes;
