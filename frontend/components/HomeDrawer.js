import React, {useState, useEffect, useContext} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import FriendTabs from './FriendTabs';
import FriendRequestView from '../screens/FriendRequestView';
import FriendRequestSend from '../screens/FriendRequestSend';
import CommonTimeText from '../screens/CommonTimeText';
import MyScheduleStack from './MyScheduleStack';
import CombinedScheduleStack from './CombinedScheduleStack';
import UserContext from '../context/UserContext';
import LogOut from './LogOut';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation, route}) => {
  const context = useContext(UserContext);
  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case 'ScheduleListView':
        return 'My Schedule';
      case 'EditClassView':
        return 'Edit Course';
      case 'AddScheduleView':
        return 'Add Course';
      default:
        return 'My Schedule';
    }
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        title: 'Schedule.Friends',
        drawerType: 'slide',
      }}
    >
      <Drawer.Screen 
        name="HomePage" 
        component={CombinedScheduleStack}
        options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: 'darkslateblue'},
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: 'white',
              }
        }}
      />
      <Drawer.Screen 
          name="MySchedule" 
          component={MyScheduleStack} 
          options={({route}) => ({
            title: "My Schedule",
            headerTitle: getHeaderTitle(route),
            headerStyle: {
              backgroundColor: 'darkslateblue'},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white'
            }
          })}
      />
      <Drawer.Screen 
          name="CommonTimeText" 
          component={CommonTimeText}
          options={{
              title: `Who's Free Now`,
              headerStyle: {
                backgroundColor: 'darkslateblue'},
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: 'white',
              }
          }}
      />
      <Drawer.Screen 
          name="FriendRequestView" 
          component={FriendRequestView} 
          options={{
              title: 'Friend Requests',
              headerStyle: {
                backgroundColor: 'darkslateblue'},
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: 'white',
              }
          }}
      />
      <Drawer.Screen 
          name="SendFriendRequest" 
          component={FriendRequestSend} 
          options={{
              title: 'Send a Friend Request',
              headerStyle: {
                backgroundColor: 'darkslateblue'},
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: 'white',
              }
          }}
      />

      <Drawer.Screen
          name="Friends"
          component={FriendTabs}
          options={{
            title: 'Friends',
              headerStyle: {
                backgroundColor: 'darkslateblue'},
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: 'white',
              }
          }}
      />
      <Drawer.Screen 
          name="LogOut"
          component={LogOut} 
          options={{
            title: 'Log Out',
            headerStyle: {
              backgroundColor: 'darkslateblue'},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            }}}
      />
    </Drawer.Navigator>      
  );
}

export default HomeDrawer;
