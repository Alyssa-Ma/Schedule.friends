import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendRequestView from '../screens/FriendRequestView';
import ViewFriends from '../screens/ViewFriends';
const Tab = createBottomTabNavigator();

const FriendTabs = ({navigation, route}) => {

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="ViewFriends" 
                component={ViewFriends}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Friend Requests" 
                component={FriendRequestView}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Send a Friend Request" 
                component={FriendRequestSend}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs