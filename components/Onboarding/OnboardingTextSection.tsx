import { Text, Animated } from 'react-native';
import { OnboardingTexts } from './OnboardingTexts';
import { styles } from './OnboardingStyles';

type OnboardingTextType = {
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
};

type OnboardingTextsType = {
  section1: OnboardingTextType;
  section2: OnboardingTextType;
  section3: OnboardingTextType;
};

export const OnboardingTextSection = ({
  textAnim,
  sectionNumber,
}: {
  textAnim: any;
  sectionNumber: number;
}) => {
  const section: OnboardingTextType =
    OnboardingTexts[`section${sectionNumber}` as keyof OnboardingTextsType];

  return (
    <Animated.View
      style={[styles.textContainer, { transform: [{ translateX: textAnim }] }]}
    >
      <Text
        style={[
          styles.onboardingTitle,
          { fontFamily: 'Airbnb', marginBottom: 5 },
        ]}
        id={`title${sectionNumber > 1 ? sectionNumber : ''}`}
      >
        {section.title1}
      </Text>
      <Text style={[styles.onboardingTitle, { fontFamily: 'Airbnb' }]}>
        {section.title2}
      </Text>
      <Text
        style={[styles.subtitle, { marginBottom: 10 }]}
        id={`subtitle${sectionNumber > 1 ? sectionNumber : ''}`}
      >
        {section.subtitle1}
      </Text>
      <Text style={styles.subtitle}>{section.subtitle2}</Text>
    </Animated.View>
  );
};
