
import React from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import {decode, encode} from 'base-64'

import AppNavigator from './navigation/AppNavigator';
import config from './config';
import FlashMessage from "react-native-flash-message";

export default function App() {
  if (!global.btoa) {
    global.btoa = encode;
  }
  
  if (!global.atob) {
    global.atob = decode;
  }
  CometChat.init(config.appID)
    return (
      <React.Fragment>
        <AppNavigator />
        <FlashMessage duration={800} />
      </React.Fragment>
    );
}
