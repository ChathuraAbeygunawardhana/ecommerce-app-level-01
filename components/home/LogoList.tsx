import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/themes/Colors';

interface Logo {
  name: string;
  uri: string;
}

interface LogoListProps {
  logos: Logo[];
  selectedLogo: string;
  setSelectedLogo: (logo: string) => void;
  currentColors: {
    lightBlue: string;
    [key: string]: string;
  };
}

const LogoList: React.FC<LogoListProps> = ({
  logos,
  selectedLogo,
  setSelectedLogo,
  currentColors,
}) => {
  return (
    <ScrollView
      horizontal
      style={styles.logoContainer}
      showsHorizontalScrollIndicator={false}
    >
      {logos.map((logo) => (
        <TouchableOpacity
          key={logo.name}
          onPress={() => setSelectedLogo(logo.name)}
        >
          <View
            style={[
              styles.logoItem,
              selectedLogo === logo.name && {
                backgroundColor: currentColors.lightBlue,
                borderRadius: 20,
              },
            ]}
          >
            <Image source={{ uri: logo.uri }} style={styles.logo} />
            {selectedLogo === logo.name && (
              <Text style={[styles.logoText, { color: Colors.white }]}>
                {logo.name}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
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

export default LogoList;
