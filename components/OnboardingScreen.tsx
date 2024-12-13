import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
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

  const [buttonText, setButtonText] = useState('Get started');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(500)).current;
  const slideInAnim2 = useRef(new Animated.Value(500)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const textAnim2 = useRef(new Animated.Value(500)).current;
  const textAnim3 = useRef(new Animated.Value(500)).current;

  const handlePress = () => {
    if (buttonText === 'Get started') {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -500,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideInAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: -500,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim2, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setButtonText('Next');
      });
    } else if (buttonText === 'Next') {
      Animated.parallel([
        Animated.timing(slideInAnim, {
          toValue: -500,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideInAnim2, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim2, {
          toValue: -500,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim3, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setButtonText('Finish');
      });
    } else {
      setIsOnboardingVisible(false);
    }
  };

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
          <View style={styles.imageContainer}>
            <Animated.Image
              source={{
                uri: 'https://i.ibb.co/tbpRpT5/Digital-Sketches-prev-ui.png',
              }}
              style={[
                styles.headerImage,
                { transform: [{ translateX: slideAnim }] },
              ]}
              id="img01"
            />
            <Animated.Image
              source={{
                uri: 'https://i.ibb.co/JvX0D93/Group-285-1.png',
              }}
              style={[
                styles.newHeaderImage,
                { transform: [{ translateX: slideInAnim }] },
              ]}
              id="img02"
            />
            <Animated.Image
              source={{
                uri: 'https://i.ibb.co/JrZf6Fg/Spring-prev-ui-1.png',
              }}
              style={[
                styles.newHeaderImage,
                { transform: [{ translateX: slideInAnim2 }] },
              ]}
              id="img03"
            />
          </View>
          <View style={styles.textSpacing} />
          <Animated.View
            style={[
              styles.textContainer,
              { transform: [{ translateX: textAnim }] },
            ]}
          >
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
            <Text style={[styles.subtitle, { marginBottom: 10 }]} id="subtitle">
              Smart Gorgeous & Fashionable
            </Text>
            <Text style={styles.subtitle}>Collection</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.textContainer,
              { transform: [{ translateX: textAnim2 }] },
            ]}
          >
            <Text
              style={[
                styles.onboardingTitle,
                { fontFamily: 'Airbnb', marginBottom: 5 },
              ]}
              id="title2"
            >
              Follow Latest
            </Text>
            <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
              Style Shoes
            </Text>
            <Text
              style={[styles.subtitle, { marginBottom: 10 }]}
              id="subtitle2"
            >
              We have an amazing collection
            </Text>
            <Text style={styles.subtitle}>that will amaze you</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.textContainer,
              { transform: [{ translateX: textAnim3 }] },
            ]}
          >
            <Text
              style={[
                styles.onboardingTitle,
                { fontFamily: 'Airbnb', marginBottom: 5 },
              ]}
              id="title3"
            >
              New Summer
            </Text>
            <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
              Collection
            </Text>
            <Text
              style={[styles.subtitle, { marginBottom: 10 }]}
              id="subtitle3"
            >
              Check out the latest trendy shoes
            </Text>
            <Text style={styles.subtitle}>by our store</Text>
          </Animated.View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.onboardingButton,
              { backgroundColor: currentColors.lightBlue },
            ]}
            onPress={handlePress}
          >
            <Text style={styles.onboardingButtonText}>{buttonText}</Text>
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
    marginTop: 200,
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
    position: 'absolute',
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    bottom: 140,
  },
  newHeaderImage: {
    position: 'absolute',
    width: '140%',
    height: 350,
    resizeMode: 'contain',
    bottom: 20,
    left: -85,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-start',
    bottom: 20,
    paddingLeft: 20,
    paddingBottom: 40,
  },
  textSpacing: {
    height: 250,
  },
});

export default OnboardingScreen;
