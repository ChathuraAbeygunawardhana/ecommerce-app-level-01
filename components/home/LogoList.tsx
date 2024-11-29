import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LogoItem from './LogoItem';

interface LogoListProps {
  logos: Array<{ name: string; uri: string }>;
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
        <LogoItem
          key={logo.name}
          logo={logo}
          isSelected={selectedLogo === logo.name}
          onSelect={() => setSelectedLogo(logo.name)}
          backgroundColor={currentColors.lightBlue}
        />
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
});

export default LogoList;
