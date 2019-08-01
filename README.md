# React Native Group Chat App With CometChat PRO

This sample app shows how to build a React Native chat application using CometChat Pro SDK. 

SCREENSHOTS

![Login](screenshot/screenshot_1.png)
![Chat Interface](screenshot/screenshot_2.png)

Jump straight into the code or read the accompanying step-by-step guide here on our blog.

## Technology

This demo uses:

* React Native
* CometChat Pro React Native SDK

## Running the demo locally

* Download the repository [here](https://github.com/cometchat-pro-tutorials/react-native-chat/archive/master.zip) or run `git clone https://github.com/cometchat-pro-tutorials/react-native-chat.git`
* In the `react-native-chat` directory, run `npm install`
* You need to sign up for CometChat PRO and create your application first
* Create an ApiKey. You can use auth-only permission for this application
* Create a Group from the dashboard
* Create a `.env` file in the root folder of the project and paste the following content in it:

```
REACT_NATIVE_CC_APP_ID= YOUR_APP_ID
REACT_NATIVE_CC_API_KEY= YOUR_API_KEY
REACT_NATIVE_CC_GUID= YOUR_GROUP_GUID
```

Replace `YOUR_API_KEY`, `YOUR_APP_ID` and `YOUR_GROUP_GUID` with your API KEY, APP ID and GUID as obtained from your CometChat dashboard.
* run `expo start`
* Install Expo app on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)/ [iOS](https://apps.apple.com/app/apple-store/id982107779) device and scan the barcode

## Useful links

* [📚Tutorial](https://prodocs.cometchat.com/docs)

## Other examples

* [ReactJS Chat app](https://github.com/cometchat-pro/javascript-reactjs-chat-app)
