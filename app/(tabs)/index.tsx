import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../../themes/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts/OnboardingContext';
import OnboardingScreen from '../../components/OnboardingScreen';
import SearchBar from '../../components/home/SearchBar';
import PopularShoes from '../../components/home/PopularShoes';
import NewArrivals from '../../components/home/NewArrivals';
import LogoList from '../../components/home/LogoList';
import { logos } from '@/constants/logos';
import Header from '@/components/home/Header';

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLogo, setSelectedLogo] = React.useState('Nike');
  const { theme, toggleTheme } = useTheme();
  const currentColors = { ...Colors[theme as 'light' | 'dark'], theme };
  const router = useRouter();
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();

  if (isOnboardingVisible) {
    return <OnboardingScreen />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentColors.background_01 },
      ]}
    >
      <Header toggleTheme={toggleTheme} currentColors={currentColors} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View>
        <LogoList
          logos={logos}
          selectedLogo={selectedLogo}
          setSelectedLogo={setSelectedLogo}
          currentColors={currentColors}
        />
        <PopularShoes />
        <NewArrivals />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
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
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconBackground: {
    padding: 15,
    borderRadius: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 50,
    margin: 16,
  },
  searchInput: {
    marginLeft: 10,
  },
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
  selectedLogoItem: {
    borderRadius: 70,
    paddingHorizontal: 10,
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
  newViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  onboardingButton: {
    padding: 15,
    borderRadius: 10,
  },
  onboardingButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
