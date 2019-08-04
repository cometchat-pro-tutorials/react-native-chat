import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { Header } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';
import Responsive from 'react-native-lightweight-responsive';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { REACT_NATIVE_CC_GUID } from 'react-native-dotenv'

export default class ChatScreen extends React.Component {

  state = {
    message: '',
    chat: [],
    refresh: false,
    isLoading: true,
  };

  static navigationOptions = {
    title: '#General'
  };

  componentDidMount() {
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(REACT_NATIVE_CC_GUID)
      .setLimit(100)
      .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        this.setState({
          chat: messages.reverse(),
          isLoading: false,
        })
      },
      error => {
        console.log('Message fetching failed with error:', error);
      }
    );

    CometChat.addMessageListener(
      "MESSAGE_LISTENER_KEY",
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          let { chat, refresh } = this.state;
          console.log('Incoming Message Log', {message});
          chat.unshift(message)
          this.setState({
            chat,
            refresh: !refresh
          });
        },
      })
    );
  }

  componentWillUnmount(){
    CometChat.removeMessageListener("MESSAGE_LISTENER_KEY");
  }

  handleSend = () => {
    const { message } = this.state;

    let textMessage = new CometChat.TextMessage(
      REACT_NATIVE_CC_GUID,
      message,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        console.log('Message sent successfully:', message);
      },
      error => {
        console.log('Message sending failed with error:', error);
      }
    );
    this.setState({
      message: '',
    });
  };

  renderChatItem = (chatObject) => {
    const user = this.props.navigation.state.params;
    const { item } = chatObject;
    let isUser = user.uid === item.sender.uid;
    let renderName;
    if (isUser) {
      renderName = null;
    } else {
      renderName = (
        <Text
          style={[
            styles.sender,
            {color: '#000'},
          ]}>
          {item.sender.name}
        </Text>
      );
    }
    return (
      <View key={item.id}
        style={[
          styles.chatItemRow,
          {flexDirection: isUser ? 'row-reverse' : 'row'},
        ]}>
        <Image
          style={[
            styles.avatar,
            isUser ? {marginLeft: 10} : {marginRight: 10},
          ]}
          source={{uri: item.sender.avatar}}
        />
        <View
          style={[
            styles.chatBubble,
            {backgroundColor: isUser ? '#1546DC' : '#FFF'},
          ]}>
          {renderName}
          <Text
            style={[
              styles.message,
              {color: isUser ? '#FFF' : '#2D313F'},
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }

  keyExtractor = (chatObject) => chatObject.id;

  render() {
    let { chat, message, refresh, isLoading } = this.state;
    let chatBox = (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/illustration-empty.png')}
          style={styles.welcomeImage}
        />
        <Text style={styles.connectText}>
          No new message?
        </Text>
        <Text style={styles.helpText}>
          Send your first message below
        </Text>
      </View>
    )
    if(chat.length){
      chatBox = (
        <FlatList 
          data={chat}
          extraData={refresh}
          renderItem={this.renderChatItem} 
          keyExtractor={this.keyExtractor}
          inverted
        />
      )
    }
    else if (isLoading) {
      chatBox = (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.helpText}>
            Loading chat messages..
          </Text>
        </View>
      )
    }

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior='padding'
        keyboardVerticalOffset={Header.HEIGHT + 25}>
        {chatBox}
        <View style={styles.footer}>
          <TextInput
            value={message}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder='Type something'
            onChangeText={text => this.setState({message: text})}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <FontAwesome name='paper-plane' style={styles.send} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const textFont = Platform.OS  === 'ios'? 'San Francisco': 'Roboto';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  chatItemRow: {
    padding: 10,
  },
  avatar: {
    borderRadius: 20,
    width: Responsive.width(40),
    height: Responsive.height(40),
  },
  welcomeImage: {
    width: Responsive.width(180),
    height: Responsive.height(160),
    resizeMode: 'contain',
    marginTop: Responsive.height(10),
  },
  connectText: {
    fontSize: 28,
    color: '#1B47DB',
    lineHeight: 32,
    fontWeight: 'bold',
    fontFamily: textFont,
  },
  helpText: {
    marginVertical: Responsive.height(20),
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: textFont,
  },
  chatBubble: {
    flex: 1,
    maxWidth: Responsive.width(250),
    padding: 8,
    borderRadius: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: textFont,
  },
  sender: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: textFont,
    paddingHorizontal: Responsive.width(20),
  },
  send: {
    alignSelf: 'center',
    color: '#1445DC',
    fontSize: 16,
    padding: 20,
  },
});


