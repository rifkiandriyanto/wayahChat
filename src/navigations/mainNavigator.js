import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home/home';
import LoginScreen from '../screens/auth/login';
import AuthLoadingScreen from '../screens/auth/loading';
import RegisterScreen from '../screens/auth/register';
import MessageScreen from '../screens/message';
import ProfileScreen from '../screens/auth/profile';
import DetailFriendScreen from '../screens/auth/detailFriend';
import MapScreen from '../screens/map'

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
)