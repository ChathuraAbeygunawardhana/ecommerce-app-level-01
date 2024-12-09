import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

const OnboardingScreen = () => {
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  if (!isOnboardingVisible) return null;

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/wNkMpdK/Onboard-1-3.png' }}
      style={styles.backgroundImage}
    >
      <View style={styles.onboardingContainer}>
        <TouchableOpacity
          style={[styles.onboardingButton, { backgroundColor: currentColors.lightBlue }]}
          onPress={() => setIsOnboardingVisible(false)}
        >
          <Text style={styles.onboardingButtonText}>get started</Text>
        </TouchableOpacity>
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
    alignItems: 'flex-end',
    padding: 20,
  },
  onboardingButton: {
    padding: 15,
    borderRadius: 20,
  },
  onboardingButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default OnboardingScreen;