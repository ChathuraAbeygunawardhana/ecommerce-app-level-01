
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

const OnboardingScreen = () => {
  const { isOnboardingVisible, setIsOnboardingVisible } = useOnboarding();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  if (!isOnboardingVisible) return null;

  return (
    <View style={[styles.onboardingContainer, { backgroundColor: currentColors.background_01 }]}>
      <Text style={[styles.onboardingText, { color: currentColors.text }]}>nike</Text>
      <TouchableOpacity
        style={[styles.onboardingButton, { backgroundColor: currentColors.lightBlue }]}
        onPress={() => setIsOnboardingVisible(false)}
      >
        <Text style={styles.onboardingButtonText}>get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default OnboardingScreen;