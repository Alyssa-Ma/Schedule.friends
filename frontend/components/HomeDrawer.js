import React, {useState} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AddScheduleView from '../screens/AddScheduleView'
import FriendRequestView from '../screens/FriendRequestView';
import FriendRequestSend from '../screens/FriendRequestSend';
import CommonTimeText from '../screens/CommonTimeText';
import EditScheduleStack from './EditScheduleStack';
import CombinedScheduleStack from './CombinedScheduleStack';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation, route}) => {
  
  const [user, SetUser] = useState(route.params);
  //console.log(user, 'STATE DRAWER');
  return (
      <Drawer.Navigator
          screenOptions={{
              title: 'Schedule.Friends',
              drawerType: 'slide',
              
          }}>

          <Drawer.Screen 
              name="HomePage" 
              component={CombinedScheduleStack}
              options={{
                  title: 'Home',
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: 'darkslateblue'},
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: 'white',
                    }
              }}
              initialParams={user}
          />
          <Drawer.Screen 
              name="EditScheduleNav" 
              component={EditScheduleStack} 
              options={{
                  headerShown: false,
                  title: 'Edit My Schedule',
              }}
              initialParams={user}
          />
          <Drawer.Screen 
              name="AddSchedule" 
              component={AddScheduleView}
              options={{
                  title: 'Add Schedule',
                  headerStyle: {
                    backgroundColor: 'darkslateblue'},
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: 'white',
                  }
              }}
              initialParams={user}
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
              initialParams={user}
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
              initialParams={user}
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
              initialParams={user}
          />
        </Drawer.Navigator>
      
  );

}

export default HomeDrawer;
