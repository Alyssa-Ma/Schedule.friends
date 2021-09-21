/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';


//**********Import the screens here********
import ReactNativeHome from './screens/ReactNativeHome';
import HelloWorld from './screens/HelloWorld';
import FriendRequestView from './screens/FriendRequestView';
import FriendRequestSend from './screens/FriendRequestSend';
import CommonTimeText from './screens/CommonTimeText';

//App function that will be what is rendered to phone
const App = () =>{ 

  //return which screen you want to see rendered********

  //return <ReactNativeHome />;
  //return <HelloWorld />;
  //return <FriendRequestView />;
  //return <FriendRequestSend />;
  return <CommonTimeText />;

};


export default App;
