import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendsListStack from './FriendsListStack';
import IncomingFriendRequestView from '../screens/IncomingFriendRequestView';
// import OutgoingFriendRequestView from '../screens/OutgoingFriendRequestView'
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
                name="IncomingFriendRequestsView" 
                component={IncomingFriendRequestView}
                options={{
                    headerShown: false
                }}
            />
            {/* <Tab.Screen 
                name="OutgoingFriendRequestsView" 
                component={OutgoingFriendRequestView}
                options={{
                    headerShown: false
                }}
            /> */}
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
