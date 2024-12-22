import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface AddToCartButtonProps {
  onPress: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addToCartButton} onPress={onPress}>
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: Colors.lightBlue,
    marginHorizontal: 14,
    marginBottom: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 65,
    left: 1,
    right: 1,
    borderRadius: 10,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddToCartButton;
