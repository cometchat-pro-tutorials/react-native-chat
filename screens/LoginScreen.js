import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Responsive from 'react-native-lightweight-responsive';
import { Header } from 'react-navigation-stack';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { showMessage } from "react-native-flash-message";
import { TextField } from 'react-native-material-textfield';
import { REACT_NATIVE_CC_API_KEY } from 'react-native-dotenv'
import { ScrollView } from 'react-native-gesture-handler';


export default class ChatScreen extends React.Component {

  state = {
    username: '',
    isLoading: false,
  };

  
  handleLogin = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    })
    let { username } = this.state;
    CometChat.login(username, REACT_NATIVE_CC_API_KEY).then(
      User => {
        showMessage({
          message: "Login Successful",
          type: "success",
        });
        this.setState({ username: '', isLoading: false });
        this.props.navigation.navigate('Chat', User);
      },
      error => {
        showMessage({
          message: "Login failed. Please try again",
          type: "danger",
        });
        this.setState({
          isLoading: false
        })
      }
    );
  };

  resetLogin() {
    this.setState({
      isLoading: false
    })
  }

  render(){
    let { username, isLoading } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
        keyboardVerticalOffset={Header.HEIGHT + 25}>
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.blueHeaderText}>
            Log In
          </Text>
          <TextField
            label='Username'
            value={username}
            onChangeText={ (username) => this.setState({ username }) }
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleLogin} style={[styles.loginButton, {opacity: isLoading? .5: 1 }]} disabled={isLoading}>
              <Text style={styles.loginText}>{isLoading? "Loading.." : "LOG IN"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}></View>
        </View>
          </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const textFont = Platform.OS  === 'ios'? 'San Francisco': 'Roboto';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-end",
    paddingTop: Responsive.height(20),
    marginHorizontal: Responsive.width(30)
  },
  blueHeaderText: {
    marginVertical: Responsive.height(20),
    fontSize: 28,
    color: '#1B47DB',
    lineHeight: 32,
    fontWeight: 'bold',
    fontFamily: textFont,
  },
  buttonContainer: {
    paddingTop: Responsive.height(80),
    paddingBottom: Responsive.height(10),
    alignItems: 'center',
  },
  loginButton: {
    paddingVertical: Responsive.height(10),
	  backgroundColor: '#1B47DB',
    borderRadius: 5,
    width: '100%',
    shadowOffset: {
      width: 0,
      height: Responsive.height(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 4,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: textFont,
  },
});


