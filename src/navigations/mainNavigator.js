// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import Loading from './loading';
// import Map from '../screens/map';
// import LoginScreen from '../screens/auth/login';
// import RegisterScreen from '../screens/auth/register';
// import HomeScreen from '../screens/home/home';
// import Message from  '../screens/message'

// const AppStack = createStackNavigator({
//   Apps: {
//     screen: HomeScreen,
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4f4f4',
//         elevation: 0,
//         height: 35,
//       },
//     },
//   },
//   Message,
//   Map,
// });

// const AuthStack = createStackNavigator({
//   Register: RegisterScreen,
//   Login: LoginScreen,
// });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: Loading,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'Loading',
//     },
//   ),
// );
