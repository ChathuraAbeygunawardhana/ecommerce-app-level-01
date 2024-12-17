import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { useFonts } from 'expo-font';
import { useOnboardingAnimations } from './Onboarding/hooks/useOnboardingAnimations';
import { OnboardingImages } from './Onboarding/OnboardingImages';
import { OnboardingTexts } from './Onboarding/OnboardingTexts';
import { OnboardingButton } from './Onboarding/OnboardingButton';

const OnboardingScreen = () => {
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const [fontsLoaded] = useFonts({
    Airbnb: require('../assets/fonts/Airbnb.otf'),
  });

  const { buttonText, animations, handlePress } = useOnboardingAnimations();
  const { slideAnim, slideInAnim, slideInAnim2, textAnim, textAnim2, textAnim3 } = animations;

  const onButtonPress = () => {
    const isFinished = handlePress();
    if (isFinished) {
      setIsOnboardingVisible(false);
    }
  };

  if (!fontsLoaded || !isOnboardingVisible) return null;

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/wNkMpdK/Onboard-1-3.png' }}
      style={styles.backgroundImage}
    >
      <View style={styles.onboardingContainer}>
        <View style={styles.titleContainer}>
          <OnboardingImages
            slideAnim={slideAnim}
            slideInAnim={slideInAnim}
            slideInAnim2={slideInAnim2}
          />
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
              {OnboardingTexts.section1.title1}
            </Text>
            <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
              {OnboardingTexts.section1.title2}
            </Text>
            <Text style={[styles.subtitle, { marginBottom: 10 }]} id="subtitle">
              {OnboardingTexts.section1.subtitle1}
            </Text>
            <Text style={styles.subtitle}>{OnboardingTexts.section1.subtitle2}</Text>
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
              {OnboardingTexts.section2.title1}
            </Text>
            <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
              {OnboardingTexts.section2.title2}
            </Text>
            <Text
              style={[styles.subtitle, { marginBottom: 10 }]}
              id="subtitle2"
            >
              {OnboardingTexts.section2.subtitle1}
            </Text>
            <Text style={styles.subtitle}>{OnboardingTexts.section2.subtitle2}</Text>
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
              {OnboardingTexts.section3.title1}
            </Text>
            <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
              {OnboardingTexts.section3.title2}
            </Text>
            <Text
              style={[styles.subtitle, { marginBottom: 10 }]}
              id="subtitle3"
            >
              {OnboardingTexts.section3.subtitle1}
            </Text>
            <Text style={styles.subtitle}>{OnboardingTexts.section3.subtitle2}</Text>
          </Animated.View>
        </View>
        <View style={styles.buttonContainer}>
          <OnboardingButton
            buttonText={buttonText}
            onPress={onButtonPress}
            backgroundColor={currentColors.lightBlue}
          />
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
