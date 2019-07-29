import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home'



export default createAppContainer(createSwitchNavigator(
  {
    Splash: SplashScreen,
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Splash',
  }
));