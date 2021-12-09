import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendsListStack from './FriendsListStack';
import IncomingFriendRequestView from '../screens/IncomingFriendRequestView';
import OutgoingFriendRequestView from '../screens/OutgoingFriendRequestView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import UserContext from '../context/UserContext';
const Tab = createBottomTabNavigator();
const size = 30;

const FriendTabs = ({navigation, route}) => {
    const { colors } = useTheme();
    const { toggleTheme } = useContext(UserContext);
    return (
        <Tab.Navigator initialRouteName="ViewFriends"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        backgroundColor: colors.drawerBackgroundColor,
                    },
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
                    tabBarActiveTintColor: colors.firstColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-group" color={colors.backgroundCardColors[0]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="IncomingFriendRequestsView" 
                component={IncomingFriendRequestView}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Incoming Requests',
                    tabBarActiveTintColor: colors.secondColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-arrow-left" color={colors.backgroundCardColors[1]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="OutgoingFriendRequestsView" 
                component={OutgoingFriendRequestView}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Outgoing Requests',
                    tabBarActiveTintColor: colors.thirdColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-arrow-right" color={colors.backgroundCardColors[2]} size={size}/>
                    )
                }}
            />
            <Tab.Screen 
                name="FriendRequestSend" 
                component={FriendRequestSend}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Find Friends',
                    tabBarActiveTintColor: colors.fourthColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-search" color={colors.backgroundCardColors[3]} size={size}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs
