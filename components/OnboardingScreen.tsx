import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { useFonts } from 'expo-font';

const OnboardingScreen = () => {
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const [fontsLoaded] = useFonts({
    Airbnb: require('../assets/fonts/Airbnb.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!isOnboardingVisible) return null;

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/wNkMpdK/Onboard-1-3.png' }}
      style={styles.backgroundImage}
    >
      <View style={styles.onboardingContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: 'https://i.ibb.co/tbpRpT5/Digital-Sketches-prev-ui.png',
            }}
            style={styles.headerImage}
            id="shoe"
          />
          <Text
            style={[
              styles.onboardingTitle,
              { fontFamily: 'Airbnb', marginBottom: 5 },
            ]}
            id="title"
          >
            Start Your
          </Text>
          <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
            Journey With Us
          </Text>
          <Text
            style={[styles.subtitle, { marginBottom: 10 }]}
            id="subtitle"
          >
            Smart Gorgeous & Fashionable
          </Text>
          <Text style={styles.subtitle}>Collection</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.onboardingButton,
              { backgroundColor: currentColors.lightBlue },
            ]}
            onPress={() => setIsOnboardingVisible(false)}
          >
            <Text style={styles.onboardingButtonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    marginTop: 200, // moved higher by reducing marginTop from 250 to 200
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  onboardingButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  onboardingButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  onboardingTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: -2,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginTop: 0,
  },
  headerImage: {
    width: '100%',
    height: 250, // increased from 200 to 250
    resizeMode: 'contain',
    bottom: 140,
  },
});

export default OnboardingScreen;
