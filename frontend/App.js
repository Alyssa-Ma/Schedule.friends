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

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';

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

const Stack = createNativeStackNavigator();

function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Home" component={HomeDrawer} options={{ headerShown: false }}/>
          </Stack.Navigator>
      </NavigationContainer>
  
  );

}

export default App;
