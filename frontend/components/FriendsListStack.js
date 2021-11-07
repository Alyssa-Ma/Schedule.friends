import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsListView from '../screens/FriendsListView';
import FriendProfileView from '../screens/FriendProfileView';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen 
          name="FriendProfileView" 
          component={FriendProfileView}
          options={{
              headerShown: false
          }}
      />
    </Stack.Navigator>
  )
}

export default FriendsListStack;
