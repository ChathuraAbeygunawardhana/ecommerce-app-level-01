import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/themes/Colors';

interface LocationSectionProps {
  currentColors: {
    grey: string;
    text: string;
  };
}

const LocationSection: React.FC<LocationSectionProps> = ({ currentColors }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles.storeLocationText, { color: currentColors.grey }]}>
        Store location
      </Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={18} color={Colors.orange} />
        <Text style={[styles.locationText, { color: currentColors.text }]}>
          {' '}
          Colombo , Sri Lanka
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
  storeLocationText: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LocationSection;
