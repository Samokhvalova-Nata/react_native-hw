import 'react-native-gesture-handler';
import Toast from "react-native-toast-message";
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import Main from './Components/Main/Main';


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
    <Provider store={store}>
      <Main/>
      <Toast topOffset={40} />
    </Provider>
  );
};
