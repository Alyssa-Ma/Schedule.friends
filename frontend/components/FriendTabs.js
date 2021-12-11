import React, {useContext} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendsListStack from './FriendsListStack';
import IncomingFriendRequestView from '../screens/IncomingFriendRequestView';
import OutgoingFriendRequestView from '../screens/OutgoingFriendRequestView'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import UserContext from '../context/UserContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';
const Tab = createMaterialBottomTabNavigator();
//const size = 30;

const FriendTabs = ({navigation, route}) => {
    const { colors } = useTheme();
    const { toggleTheme } = useContext(UserContext);
    return (
        <Tab.Navigator initialRouteName="ViewFriends"
            activeColor="#ffffff"
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
                ],
            }}>
            <Tab.Screen 
                name="FriendListStack"
                component={FriendsListStack}
                options={{
                    tabBarColor: colors.backgroundCardColors[0],
                    headerShown: false,
                    tabBarLabel: 'Friend List',
                    tabBarIcon: ({focused}) => (
                        <Icon name="account-group" color={focused ? colors.focusedColor : colors.unfocusedColor} size={26} tab/>
                    )
                }}
            />
            <Tab.Screen 
                name="IncomingFriendRequestsView" 
                component={IncomingFriendRequestView}
                options={{
                    tabBarColor: colors.backgroundCardColors[1],
                    headerShown: false,
                    tabBarLabel: 'Incoming Requests',
                    tabBarIcon: ({focused}) => (
                        <Icon name="account-arrow-left" color={focused ? colors.focusedColor : colors.unfocusedColor} size={26} tab/>
                    )
                }}
            />
            <Tab.Screen 
                name="OutgoingFriendRequestsView" 
                component={OutgoingFriendRequestView}
                options={{
                    tabBarColor: colors.backgroundCardColors[2],
                    headerShown: false,
                    tabBarLabel: 'Outgoing Requests',
                    tabBarIcon: ({focused}) => (
                        <Icon name="account-arrow-right" color={focused ? colors.focusedColor : colors.unfocusedColor} size={26} tab/>
                    )
                }}
            />
            <Tab.Screen 
                name="FriendRequestSend" 
                component={FriendRequestSend}
                options={{
                    tabBarColor: colors.backgroundCardColors[3],
                    headerShown: false,
                    tabBarLabel: 'Find Friends',
                    tabBarIcon: ({focused}) => (
                        <Icon name="account-search" color={focused ? colors.focusedColor : colors.unfocusedColor} size={26} tab/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs
