import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoView from '../screens/InfoView';
import GuideView from '../screens/GuideView';
import DeveloperView from '../screens/DeveloperView';
import FaqView from '../screens/FaqView';

const Stack = createNativeStackNavigator();

const InfoStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InfoView" 
        component={InfoView}
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
        name="GuideView"
        component={GuideView}
        options={{
          headerShown: false
      }}
      />
      <Stack.Screen
        name="DeveloperView"
        component={DeveloperView}
        options={{
          headerShown: false
      }}
      />
      <Stack.Screen
        name="FaqView"
        component={FaqView}
        options={{
          headerShown: false
      }}
      />
    </Stack.Navigator>
  )
}

export default InfoStack;
