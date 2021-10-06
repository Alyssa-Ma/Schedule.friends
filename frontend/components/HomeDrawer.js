import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AddScheduleView from '../screens/AddScheduleView'
import CombinedScheduleView from '../screens/CombinedScheduleView';
import FriendRequestView from '../screens/FriendRequestView';
import FriendRequestSend from '../screens/FriendRequestSend';
import CommonTimeText from '../screens/CommonTimeText';
import EditScheduleStack from './EditScheduleStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation}) => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="HomePage" component={CombinedScheduleView}/>
            <Drawer.Screen name="EditScheduleNav" component={EditScheduleStack} options={{ headerShown: false }}/>
            <Drawer.Screen name="AddSchedule" component={AddScheduleView} />
            <Drawer.Screen name="CommonTimeText" component={CommonTimeText} />
            <Drawer.Screen name="FriendRequestView" component={FriendRequestView} />
            <Drawer.Screen name="SendFriendRequest" component={FriendRequestSend} />
          </Drawer.Navigator>
        
    );

}

export default HomeDrawer;
