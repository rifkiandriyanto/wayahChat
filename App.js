import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/home/home';
import LoginScreen from './src/screens/auth/login';
import AuthLoadingScreen from './src/screens/auth/loading';
import RegisterScreen from './src/screens/auth/register'
// import AppNavigator from './src/navigations/mainNavigator'
import MessageScreen from './src/screens/message';
import ProfileScreen from './src/screens/auth/profile'

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Message: MessageScreen,
  Profile: ProfileScreen
})

const AuthStack = createStackNavigator ({
  Register: RegisterScreen,
  Login: LoginScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)