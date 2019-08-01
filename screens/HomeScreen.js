import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';

import { showMessage } from "react-native-flash-message";
import { TextField } from 'react-native-material-textfield';
import { REACT_NATIVE_CC_API_KEY } from 'react-native-dotenv'

export default class HomeScreen extends React.Component {

  state = {
    username: '',
    isLoading: false,
  };

  handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://prodocs.cometchat.com/reference#createuser'
    );
  }

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
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={styles.container}>
  
          <View style={styles.getStartedContainer}>  
            <Text style={styles.blueHeaderText}>
              Connect with people around the world
            </Text>
  
            <View style={styles.welcomeContainer}>
              <Image
                source={require('../assets/images/illustration-home.png')}
                style={styles.welcomeImage}
              />
            </View>
  
            
            <Text style={styles.helpText}>
              Welcome to React Native CometChat App. Login with the username "superhero1" or "superhero2" to test this app. 
              To create your own user, visit our <Text style={{color: '#2e78b7'}} onPress={this.handleHelpPress}>documentation</Text>
            </Text>
  
            <TextField
              label='Username'
              value={username}
              onChangeText={ (username) => this.setState({ username }) }
            />
    
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleLogin} style={[styles.loginButton, {opacity: isLoading? .5: 1 }]} disabled={isLoading}>
              <Text style={styles.loginText}>{isLoading? "Loading.." : "LOG IN"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        </KeyboardAvoidingView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    justifyContent: "flex-end",
  },
  getStartedContainer: {
    marginTop: 50,
    marginHorizontal: 50,
  },
  blueHeaderText: {
    fontSize: 28,
    color: '#1B47DB',
    lineHeight: 32,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 180,
    height: 160,
    resizeMode: 'contain',
    marginTop: 5,
  },
  helpText: {
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginButton: {
    paddingVertical: 10,
	  backgroundColor: '#1B47DB',
    borderRadius: 5,
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
