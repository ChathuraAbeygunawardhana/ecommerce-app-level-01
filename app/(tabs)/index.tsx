import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import sampleData from '../../assets/sample.json';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts/OnboardingContext';
import OnboardingScreen from '../../components/OnboardingScreen';

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLogo, setSelectedLogo] = React.useState('Nike');
  const { theme, toggleTheme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const router = useRouter();
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();

  const logos = [
    { name: 'Nike', uri: 'https://i.ibb.co/27gF6n7/NikeLogo.png' },
    { name: 'Puma', uri: 'https://i.ibb.co/4V6MFGf/PumaLogo.png' },
    {
      name: 'Under Armour',
      uri: 'https://i.ibb.co/yF5wdQ4/Under-Armour-Logo.png',
    },
    { name: 'Converse', uri: 'https://i.ibb.co/WDQLZmS/Converse-Logo.png' },
    { name: 'Adidas', uri: 'https://i.ibb.co/Y7nWm7X/Adidas-Logo.png' },
  ];

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBackground} onPress={toggleTheme}>
          <Ionicons
            name={theme === 'light' ? 'moon' : 'sunny'}
            size={24}
            color={currentColors.text}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text
            style={[styles.storeLocationText, { color: currentColors.grey }]}
          >
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
        <TouchableOpacity style={styles.iconBackground}>
          <Feather name="shopping-bag" size={24} color={currentColors.text} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.searchBar,
          { backgroundColor: currentColors.background_02 },
        ]}
      >
        <Ionicons name="search" size={20} color={currentColors.grey} />
        <TextInput
          style={[styles.searchInput, { color: currentColors.text }]}
          placeholder="Looking for shoes"
          placeholderTextColor={currentColors.grey}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View>
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
                  <Text
                    style={[
                      styles.logoText,
                      { color: Colors.white },
                    ]}
                  >
                    {logo.name}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
            <TouchableOpacity key={product.id} onPress={() => router.push(`/${product.id}`)}>
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
