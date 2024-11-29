
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../themes/Colors';
import { useTheme } from '../../../contexts/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={styles.textRow}>
      <Text style={[styles.text01, { color: currentColors.text }]}>
        New Arrivals
      </Text>
      <Text style={[styles.text02, { color: currentColors.lightBlue }]}>
        see all
      </Text>
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
});

export default Header;