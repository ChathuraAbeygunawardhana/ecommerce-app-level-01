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

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLogo, setSelectedLogo] = React.useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBackground}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.storeLocationText}>Store location</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={18} color={Colors.orange} />
            <Text style={styles.locationText}> Colombo , Sri Lanka</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconBackground}>
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.light.grey} />
        <TextInput
          style={styles.searchInput}
          placeholder="Looking for shoes"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView horizontal style={styles.logoContainer}>
        {logos.map((logo) => (
          <TouchableOpacity
            key={logo.name}
            onPress={() => setSelectedLogo(logo.name)}
          >
            <View
              style={[
                styles.logoItem,
                selectedLogo === logo.name && styles.selectedLogoItem,
              ]}
            >
              <Image source={{ uri: logo.uri }} style={styles.logo} />
              {selectedLogo === logo.name && (
                <Text style={styles.logoText}>{logo.name}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background_01,
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
    backgroundColor: Colors.light.background_02,
    padding: 15,
    borderRadius: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background_02,
    padding: 13,
    borderRadius: 50,
    margin: 16,
  },
  searchInput: {
    marginLeft: 10,
    color: 'black',
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 10,
    paddingHorizontal: 16,
  },
  logoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    borderRadius: 10,
  },
  selectedLogoItem: {
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  logoText: {
    marginLeft: 10,
    color: Colors.light.background_02,
  },
});
