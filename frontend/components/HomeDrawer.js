import React, {useState, useContext} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AddScheduleView from '../screens/AddScheduleView';
import FriendRequestView from '../screens/FriendRequestView';
import FriendRequestSend from '../screens/FriendRequestSend';
import CommonTimeText from '../screens/CommonTimeText';
import MyScheduleStack from './MyScheduleStack';
import CombinedScheduleStack from './CombinedScheduleStack';
import UserContext from '../context/UserContext';

const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation, route}) => {
  const context = useContext(UserContext);
  console.log(`${context.user.username} is logged in in HomeDrawer.js`)
  // const [user, SetUser] = useState(route.params);
  // const [change, SetChange] = useState(true);
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
          />
          <Drawer.Screen 
              name="MySchedule" 
              component={MyScheduleStack} 
              options={{
                title: 'My Schedule',
                headerStyle: {
                  backgroundColor: 'darkslateblue'},
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                }
            }}
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
              onPress={ () => {
                console.log('pressed common time text');
                SetChange(change ? false : true);
              
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
        </Drawer.Navigator>
      
  );

}

export default HomeDrawer;
