import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProductDetailsScreen from './ProductDetailsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}
