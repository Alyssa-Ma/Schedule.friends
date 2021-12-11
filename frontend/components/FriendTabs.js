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
                        <Icon name="account-group" color={focused ? "white" : "#808080"} size={26} tab/>
                    )
                    
                }}
            />
            <Tab.Screen 
                name="IncomingFriendRequestsView" 
                component={IncomingFriendRequestView}
                options={{
                    tabBarStyle: [
                        {
                            backgroundColor: colors.backgroundCardColors[1]
                        }
                    ],
                    headerShown: false,
                    tabBarLabel: 'Incoming Requests',
                    //tabBarActiveTintColor: colors.backgroundCardColors[0],
                    
                    tabBarIcon: () => (
                        <Icon name="account-arrow-left" color="#ffffff" size={26}/>
                    )
                }}
            />
            <Tab.Screen 
                name="OutgoingFriendRequestsView" 
                component={OutgoingFriendRequestView}
                options={{
                    tabBarStyle: [
                        {
                            backgroundColor: colors.backgroundCardColors[2]
                        }
                    ],
                    headerShown: false,
                    tabBarLabel: 'Outgoing Requests',
                    //tabBarActiveTintColor: colors.thirdColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-arrow-right" color="#ffffff" size={26}/>
                    )
                }}
            />
            <Tab.Screen 
                name="FriendRequestSend" 
                component={FriendRequestSend}
                options={{
                    tabBarStyle: [
                        {
                            backgroundColor: colors.backgroundCardColors[3]
                        }
                    ],
                    headerShown: false,
                    tabBarLabel: 'Find Friends',
                    tabBarActiveTintColor: colors.fourthColor,
                    tabBarIcon: ({color}) => (
                        <Icon name="account-search" color="#ffffff" size={26}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendTabs
