import { useFonts } from 'expo-font';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegistrationScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <RegisterScreen />
    // <LoginScreen />
  );
};
