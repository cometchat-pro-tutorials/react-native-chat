import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';


export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
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
