import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//**********Import the screens here********
import FriendRequestView from './screens/FriendRequestView';
import CombinedScheduleView from './screens/CombinedScheduleView';
import FriendRequestSend from './screens/FriendRequestSend';
import CommonTimeText from './screens/CommonTimeText';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AddScheduleView from './screens/AddScheduleView';

import EditScheduleStack from './components/EditScheduleStack';//routing component

//stack navigator
//const Stack = createNativeStackNavigator();
//tab navigator
//const Tab = createBottomTabNavigator();

/**
 * Stack Navigator stuff
 * <Stack.Navigator initialRouteName="CombinedView">
            <Stack.Screen name="CombinedView" component={CombinedScheduleView}/>
            <Stack.Screen name="Hello World" component={HelloWorld}/>
          </Stack.Navigator>
 */

/*App function that will be what is rendered to phone
function App() {
  //return which screen you want to see rendered********

  //return <ReactNativeHome />;
  //return <HelloWorld />;
  //return <FriendRequestView />;
  //return <FriendRequestSend />;
  //return <CommonTimeText />;
  //return <EditClassView />;
  //return <EditScheduleView />;
  //return <LoginScreen />;
  //return <SignUpScreen />;
}
*/

const Drawer = createDrawerNavigator();

function App() {
  return (
    <LoginScreen>
      <NavigationContainer>
        
        <Drawer.Navigator initialRouteName="LogIn">
          
          <Drawer.Screen name="LogIn" component={LoginScreen} />
          <Drawer.Screen name="SignUp" component={SignUpScreen} />
          <Drawer.Screen name="EditScheduleNav" component={EditScheduleStack} options={{ headerShown: false }}/>
          <Drawer.Screen name="AddSchedule" component={AddScheduleView} />
          <Drawer.Screen name="CommonTimeText" component={CommonTimeText} />
          <Drawer.Screen name="FriendRequestView" component={FriendRequestView} />
          <Drawer.Screen name="SendFriendRequest" component={FriendRequestSend} />
          
        </Drawer.Navigator>
      </NavigationContainer>
    </LoginScreen>
  );

}

export default App;
