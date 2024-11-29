import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../themes/Colors';
import { useTheme } from '../../contexts/ThemeContext';

const NewArrivals = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View>
      <View style={styles.textRow}>
        <Text style={[styles.text01, { color: currentColors.text }]}>
          New Arrivals
        </Text>
        <Text style={[styles.text02, { color: currentColors.lightBlue }]}>
          see all
        </Text>
      </View>
      <View
        style={[
          styles.newView,
          styles.newViewMargin,
          { backgroundColor: currentColors.background_02 },
        ]}
      >
        <View style={styles.newViewContent}>
          <View style={styles.newViewTextContainer}>
            <Text
              style={[styles.bestChoice, { color: currentColors.lightBlue }]}
            >
              BEST CHOICE
            </Text>
            <Text
              style={[styles.newViewSubtitle, { color: currentColors.text }]}
            >
              Nike Air Jordan
            </Text>
            <Text
              style={[
                styles.newViewPrice,
                styles.newViewPriceMargin,
                { color: currentColors.grey },
              ]}
            >
              $869.69
            </Text>
          </View>
          <Image
            source={{ uri: 'https://i.ibb.co/XYd8dkY/Frame-294.png' }}
            style={styles.newViewImage}
          />
        </View>
      </View>
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
  newView: {
    borderRadius: 10,
    width: '92%',
    height: 100,
    marginTop: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newViewMargin: {
    marginLeft: '4%',
  },
  newViewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  newViewTextContainer: {
    flex: 1,
  },
  newViewSubtitle: {
    fontSize: 18,
    marginTop: 2,
  },
  newViewPrice: {
    fontSize: 14,
  },
  newViewPriceMargin: {
    marginTop: 10,
  },
  newViewImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  bestChoice: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default NewArrivals;
