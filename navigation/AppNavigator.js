import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';


export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      Login: LoginScreen,
      Chat: ChatScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  )
);
