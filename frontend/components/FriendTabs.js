import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendRequestView from '../screens/FriendRequestView';
import FriendsListStack from '../screens/FriendsListView';
const Tab = createBottomTabNavigator();

const FriendTabs = ({navigation, route}) => {

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="FriendListStack" 
                component={FriendsListStack}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="FriendRequestsView" 
                component={FriendRequestView}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="FriendRequestSend" 
                component={FriendRequestSend}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs
