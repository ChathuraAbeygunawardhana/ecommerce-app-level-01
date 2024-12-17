import { View } from 'react-native';
import { OnboardingTextSection } from './OnboardingTextSection';
import { OnboardingButtonSection } from './OnboardingButtonSection';
import { useOnboardingAnimations } from './hooks/useOnboardingAnimations';
import { OnboardingImages } from './OnboardingImages';
import { styles } from './OnboardingStyles';
import React from 'react';

export const OnboardingContent = () => {
  const { buttonText, animations, handlePress } = useOnboardingAnimations();
  const {
    slideAnim,
    slideInAnim,
    slideInAnim2,
    textAnim,
    textAnim2,
    textAnim3,
  } = animations;

  return (
    <>
      <View style={styles.titleContainer}>
        <OnboardingImages
          slideAnim={slideAnim}
          slideInAnim={slideInAnim}
          slideInAnim2={slideInAnim2}
        />
        <View style={styles.textSpacing} />
        <OnboardingTextSection textAnim={textAnim} sectionNumber={1} />
        <OnboardingTextSection textAnim={textAnim2} sectionNumber={2} />
        <OnboardingTextSection textAnim={textAnim3} sectionNumber={3} />
      </View>
      <OnboardingButtonSection
        buttonText={buttonText}
        handlePress={handlePress}
      />
    </>
  );
};
