
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '@/themes/Colors';

interface LogoItemProps {
  logo: {
    name: string;
    uri: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  backgroundColor: string;
}

const LogoItem: React.FC<LogoItemProps> = ({
  logo,
  isSelected,
  onSelect,
  backgroundColor,
}) => (
  <TouchableOpacity onPress={onSelect}>
    <View
      style={[
        styles.logoItem,
        isSelected && {
          backgroundColor,
          borderRadius: 20,
        },
      ]}
    >
      <Image source={{ uri: logo.uri }} style={styles.logo} />
      {isSelected && (
        <Text style={[styles.logoText, { color: Colors.white }]}>
        {logo.name}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  logoText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
});

export default LogoItem;