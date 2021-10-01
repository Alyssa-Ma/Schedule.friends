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


//**********Import the screens here********
import ReactNativeHome from './screens/ReactNativeHome';
import HelloWorld from './screens/HelloWorld';
import FriendRequestView from './screens/FriendRequestView';
import CombinedScheduleView from './screens/CombinedScheduleView';

//stack navigator
const Stack = createNativeStackNavigator();
//tab navigator
const Tab = createBottomTabNavigator();

/**
 * Stack Navigator stuff
 * <Stack.Navigator initialRouteName="CombinedView">
            <Stack.Screen name="CombinedView" component={CombinedScheduleView}/>
            <Stack.Screen name="Hello World" component={HelloWorld}/>
          </Stack.Navigator>
 */
//App function that will be what is rendered to phone

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CombinedScheduleView}/>
        <Tab.Screen name="idk" component={HelloWorld}/>
          
      </Tab.Navigator>
    </NavigationContainer>
  );

}


export default App;
