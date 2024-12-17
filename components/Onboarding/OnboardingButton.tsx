import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface OnboardingButtonProps {
  buttonText: string;
  onPress: () => void;
  backgroundColor: string;
}

export const OnboardingButton = ({ buttonText, onPress, backgroundColor }: OnboardingButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.onboardingButton, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.onboardingButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  onboardingButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  onboardingButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
