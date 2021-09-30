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


//**********Import the screens here********
import ReactNativeHome from './screens/ReactNativeHome';
import HelloWorld from './screens/HelloWorld';
import FriendRequestView from './screens/FriendRequestView';
import CombinedScheduleView from './screens/CombinedScheduleView';

const Stack = createNativeStackNavigator();
//App function that will be what is rendered to phone
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CombinedView">
        <Stack.Screen name="CombinedView" component={CombinedScheduleView}/>
        <Stack.Screen name="Hello World" component={HelloWorld}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}


export default App;
