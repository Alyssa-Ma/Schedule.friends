import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleListView from '../screens/ScheduleListView';
import EditClassView from '../screens/EditClassView';
import AddScheduleView from '../screens/AddScheduleView';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const MyScheduleStack = ({navigation}) => {
  useEffect(() => {
    console.log(navigation.getState())
  }, [])
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
        navigationOptions={{
          drawerLockMode: 'locked-closed'
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
