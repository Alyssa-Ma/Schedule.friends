import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleListView from '../screens/ScheduleListView';
import EditClassView from '../screens/EditClassView';
import AddScheduleView from '../screens/AddScheduleView';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const Stack = createNativeStackNavigator();

const MyScheduleStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ScheduleListView" 
        component={ScheduleListView}
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen 
        name="EditClassView" 
        component={EditClassView}
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen 
        name="AddScheduleView" 
        component={AddScheduleView}
        options={{
            headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default MyScheduleStack;
