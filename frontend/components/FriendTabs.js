import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendRequestView from '../screens/FriendRequestView';

const Drawer = createDrawerNavigator();

const FriendTabs = ({navigation, route}) => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Send a Friend Request" 
                component={FriendRequestSend}
                options={{
                    headerShown: false
                }}
            />
            <Drawer.Screen 
                name="Friend Requests" 
                component={FriendRequestView}
                options={{
                    headerShown: false
                }}
            />
        </Drawer.Navigator>
    )
}

export default FriendTabs