import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Responsive from 'react-native-lightweight-responsive';

export default class HomeScreen extends React.Component {

  handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://prodocs.cometchat.com/reference#createuser'
    );
  }

  render(){
    return (
        <View style={styles.container}>
          <Text style={styles.topText}>
            Create an account
          </Text>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.loginButton}>
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const textFont = Platform.OS  === 'ios'? 'San Francisco': 'Roboto';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Responsive.height(40),
    marginHorizontal: Responsive.width(30)
  },
  topText: {
    marginVertical: Responsive.height(15),
    color: '#2D313F',
    fontSize: 14,
    fontFamily: textFont,
  },
  blueHeaderText: {
    marginBottom: Responsive.height(20),
    fontSize: 28,
    color: '#1B47DB',
    lineHeight: 32,
    fontWeight: 'bold',
    fontFamily: textFont,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: Responsive.height(20),
    marginBottom: Responsive.height(10),
  },
  welcomeImage: {
    width: Responsive.width(230),
    height: Responsive.height(215),
    resizeMode: 'contain',
  },
  helpText: {
    marginTop: Responsive.height(20),
    marginBottom: Responsive.height(20),
    color: '#2D313F',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: textFont,
  },
  buttonContainer: {
    marginVertical: Responsive.height(10),
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
