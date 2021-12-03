import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendsListStack from './FriendsListStack';
import IncomingFriendRequestView from '../screens/IncomingFriendRequestView';
import OutgoingFriendRequestView from '../screens/OutgoingFriendRequestView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const color = ['#D7A4FF', '#9E8DFF', '#7DD1FF', '#68B0D8', '#5CDBD5'];
const size = 30;

const FriendTabs = ({navigation, route}) => {

    return (
        <Tab.Navigator initialRouteName="ViewFriends"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}>
            <Tab.Screen 
                name="FriendListStack"
                component={FriendsListStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Friend List',
                    tabBarActiveTintColor: color,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-group" color={color[0]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="IncomingFriendRequestsView" 
                component={IncomingFriendRequestView}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Incoming Requests',
                    tabBarActiveTintColor: color,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-arrow-left" color={color[1]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="OutgoingFriendRequestsView" 
                component={OutgoingFriendRequestView}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Outgoing Requests',
                    tabBarActiveTintColor: color,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-arrow-right" color={color[2]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="FriendRequestSend" 
                component={FriendRequestSend}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Find Friends',
                    tabBarActiveTintColor: color,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-search" color={color[3]} size={size}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs
