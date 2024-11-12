import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function TabTwoScreen() {
  let [fontsLoaded] = useFonts({
    Helvetica: require('../../assets/fonts/Helvetica.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text style={{ fontFamily: 'Helvetica' }}>
      This is the title that's being tested
    </Text>
  );
}
