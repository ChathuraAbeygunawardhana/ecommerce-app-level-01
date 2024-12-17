import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

interface OnboardingImagesProps {
  slideAnim: Animated.Value;
  slideInAnim: Animated.Value;
  slideInAnim2: Animated.Value;
}

export const OnboardingImages: React.FC<OnboardingImagesProps> = ({
  slideAnim,
  slideInAnim,
  slideInAnim2,
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
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
});
