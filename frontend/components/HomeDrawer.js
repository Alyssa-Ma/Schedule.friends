import React, {useState, useEffect, useContext} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import FriendTabs from './FriendTabs';
import CommonTimeText from '../screens/CommonTimeText';
import MyScheduleStack from './MyScheduleStack';
import CombinedScheduleStack from './CombinedScheduleStack';
import UserContext from '../context/UserContext';
import LogOut from './LogOut';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import MyProfileStack from './MyProfileStack';
import InfoStack from './InfoStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation, route}) => {
  const context = useContext(UserContext);


  const getScheduleHeaderTitle = (route) => {
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

  const getFriendsHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case 'FriendListStack':
        return 'Friend List';
      case 'IncomingFriendRequestsView':
        return 'Incoming Requests';
        case 'OutgoingFriendRequestsView':
          return 'Outgoing Requests';
      case 'FriendRequestSend':
        return 'Find Friends';
      default:
        return 'Friend List';
    }
  }

  const getProfileHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case 'MyProfileView':
        return 'My Profile';
      case 'EditMyProfileView':
        return 'Edit Profile';
      default:
        return 'My Profile';
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
            headerTitle: getScheduleHeaderTitle(route),
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
          name="Friends"
          component={FriendTabs}
          options={({route}) => ({
            title: 'My Friends',
            headerTitle: getFriendsHeaderTitle(route),
            headerStyle: {
              backgroundColor: 'darkslateblue'},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            }
          })}
      />

      <Drawer.Screen 
          name="MyProfile" 
          component={MyProfileStack} 
          options={({route}) => ({
            title: "My Profile",
            headerTitle: getProfileHeaderTitle(route),
            headerStyle: {
              backgroundColor: 'darkslateblue'},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white'
            }
          })}
      />

      <Drawer.Screen
        name="Info"
        component={InfoStack}
        options={{
          title: 'Info',
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
