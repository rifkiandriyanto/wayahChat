import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/home/home';
import LoginScreen from './src/screens/auth/login';
import AuthLoadingScreen from './src/screens/auth/loading';
import RegisterScreen from './src/screens/auth/register';
import MessageScreen from './src/screens/message';
import ProfileScreen from './src/screens/auth/profile';
import DetailFriendScreen from './src/screens/auth/detailFriend';
import MapScreen from './src/screens/map'

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Message: MessageScreen,
  Profile: ProfileScreen,
  DetailFriend: DetailFriendScreen,
  Map: MapScreen
});

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
