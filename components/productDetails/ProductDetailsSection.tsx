import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

interface ProductDetailsSectionProps {
  name: string;
  price: number;
  colour: string;
  description: string;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ name, price, colour, description }) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={styles.detailsContainer}>
      <Text style={[styles.name, { color: currentColors.text }]}>
        {name}
      </Text>
      <Text style={[styles.price, { color: currentColors.icon }]}>
        ${price}
      </Text>
      <Text style={[styles.colour, { color: currentColors.icon }]}>
        Color: {colour}
      </Text>
      <Text style={[styles.description, { color: currentColors.text }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    marginTop: -10,
  },
  name: {
    fontFamily: 'Helvetica',
    fontSize: 30,
    marginBottom: 10,
  },
  price: {
    fontFamily: 'Novecentro',
    fontSize: 20,
    marginBottom: 10,
  },
  colour: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default ProductDetailsSection;
