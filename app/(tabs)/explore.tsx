import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from '../../constants/Colors';

export default function TabTwoScreen() {
  let [fontsLoaded] = useFonts({
    Helvetica: require('../../assets/fonts/Helvetica.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text style={{ fontFamily: 'Helvetica', color: Colors.light.text }}>
      This is the title that's being tested
    </Text>
  );
}
