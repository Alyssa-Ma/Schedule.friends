import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsView from '../screens/SettingsView';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const Stack = createNativeStackNavigator();

const SettingsStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SettingsView" 
        component={SettingsView}
        options={{
            headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default SettingsStack;
