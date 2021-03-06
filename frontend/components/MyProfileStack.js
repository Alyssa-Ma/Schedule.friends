import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileView from '../screens/MyProfileView';
import EditMyProfileView from '../screens/EditMyProfileView';

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
    </Stack.Navigator>
  )
}

export default MyProfileStack;
