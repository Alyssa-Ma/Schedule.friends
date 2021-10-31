import React, {useContext, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CombinedScheduleView from '../screens/CombinedScheduleView';
import EditClassView from '../screens/EditClassView';
import UserContext from '../context/UserContext';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const CombinedScheduleStack = ({navigation, route}) => {
  const context = useContext(UserContext);
  console.log(`CombinedScheduleStack.js: ${context.user.username}`)
  //console.log(user, 'STATE HOME STACK');
  return (
      <Stack.Navigator>
          <Stack.Screen 
              name="Home" 
              component={CombinedScheduleView}
              options={{
                  title: 'Home',
                  headerStyle: {
                    backgroundColor: 'darkslateblue'},
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: 'white',
                  }
              }}
          />
          <Stack.Screen 
              name="EditClass" 
              component={EditClassView}
              options={{
                  title: 'Edit Class',
                  headerStyle: {
                    backgroundColor: 'darkslateblue'},
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: 'white',
                  }
              }}
          />
      </Stack.Navigator>
  )

}

export default CombinedScheduleStack;
