
import React from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import {decode, encode} from 'base-64'
import { REACT_NATIVE_CC_APP_ID } from 'react-native-dotenv'

import AppNavigator from './navigation/AppNavigator';
import FlashMessage from "react-native-flash-message";

export default function App() {
  if (!global.btoa) {
    global.btoa = encode;
  }
  
  if (!global.atob) {
    global.atob = decode;
  }
  CometChat.init(REACT_NATIVE_CC_APP_ID)
    return (
      <React.Fragment>
        <AppNavigator />
        <FlashMessage duration={800} />
      </React.Fragment>
    );
}
