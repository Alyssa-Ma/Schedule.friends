import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileView from '../screens/MyProfileView';
import EditMyProfileView from '../screens/EditMyProfileView';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import LogOut from './LogOut';


const Stack = createNativeStackNavigator();

const MyProfileStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyProfileView" 
        component={MyProfileView}
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen 
        name="EditMyProfileView" 
        component={EditMyProfileView}
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen 
        name="LogOut" 
        component={LogOut}
        options={{
            headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default MyProfileStack;
