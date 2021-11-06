import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import FriendRequestSend from '../screens/FriendRequestSend';
import FriendRequestView from '../screens/FriendRequestView';

const Drawer = createDrawerNavigator();

const FriendTabs = ({navigation, route}) => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Send a Friend Request" component={FriendRequestSend} />
            <Drawer.Screen name="Friend Requests" component={FriendRequestView} />
        </Drawer.Navigator>
    )
}

export default FriendTabs