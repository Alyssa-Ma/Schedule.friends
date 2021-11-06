import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsListView from '../screens/FriendsListView';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const FriendsListStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="FriendsListView" 
            component={FriendsListView}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
  )
}

export default FriendsListStack;