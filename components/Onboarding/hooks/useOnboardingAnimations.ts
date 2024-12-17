import { useState, useRef } from 'react';
import { Animated } from 'react-native';

export const useOnboardingAnimations = () => {
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
    }

    return buttonText === 'Finish';
  };

  return {
    buttonText,
    animations: {
      slideAnim,
      slideInAnim,
      slideInAnim2,
      textAnim,
      textAnim2,
      textAnim3,
    },
    handlePress,
  };
};
