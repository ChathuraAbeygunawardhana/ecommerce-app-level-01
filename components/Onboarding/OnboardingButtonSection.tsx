import { View } from 'react-native';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';
import { OnboardingButton } from './OnboardingButton';
import { styles } from './OnboardingStyles';

export const OnboardingButtonSection = ({ buttonText, handlePress }: { buttonText: string, handlePress: () => boolean }) => {
  const { setIsOnboardingVisible } = useOnboarding();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const onButtonPress = () => {
    const isFinished = handlePress();
    if (isFinished) {
      setIsOnboardingVisible(false);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <OnboardingButton
        buttonText={buttonText}
        onPress={onButtonPress}
        backgroundColor={currentColors.lightBlue}
      />
    </View>
  );
};
