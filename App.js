import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigations/mainNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  console.disableYellowBox = true;
  return <AppNavigator />;
};

export default App;

