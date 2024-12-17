import { View, ImageBackground } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useFonts } from 'expo-font';
import { OnboardingContent } from './OnboardingContent';
import { styles } from './OnboardingStyles';

export const OnboardingContainer = () => {
  const { isOnboardingVisible } = useOnboarding();
  const [fontsLoaded] = useFonts({
    Airbnb: require('../../assets/fonts/Airbnb.otf'),
  });

  if (!fontsLoaded || !isOnboardingVisible) return null;

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/wNkMpdK/Onboard-1-3.png' }}
      style={styles.backgroundImage}
    >
      <View style={styles.onboardingContainer}>
        <OnboardingContent />
      </View>
    </ImageBackground>
  );
};
