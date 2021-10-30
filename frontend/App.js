import 'react-native-gesture-handler';
import {useState, createContext} from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {BASE_URL} from "@env";
import UserContext from './context/UserContext';

//**********Import the screens here********

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';

//stack navigator
//const Stack = createNativeStackNavigator();
//tab navigator
//const Tab = createBottomTabNavigator();

/**
 * Stack Navigator stuff
 * <Stack.Navigator initialRouteName="CombinedView">
            <Stack.Screen name="CombinedView" component={CombinedScheduleView}/>
            <Stack.Screen name="Hello World" component={HelloWorld}/>
          </Stack.Navigator>
 */

/*App function that will be what is rendered to phone
function App() {
  //return which screen you want to see rendered********

  //return <ReactNativeHome />;
  //return <HelloWorld />;
  //return <FriendRequestView />;
  //return <FriendRequestSend />;
  //return <CommonTimeText />;
  //return <EditClassView />;
  //return <EditScheduleView />;
  //return <LoginScreen />;
  //return <SignUpScreen />;
}
*/

const Stack = createNativeStackNavigator();


const App = ({navigation, route}) => {

  const [user, setUser] = useState();

  const fetchToken = async (usernameInput, passwordInput) => {
    console.log(`Begin of fetchToken(): user:${usernameInput} pass: ${passwordInput}`)
    try {
      let response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": `${usernameInput}`,
          "password": `${passwordInput}`
        })
      });
      
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      if (response.status === 200) {
        let token = "Token " + jsonResponse["token"];
        console.log(token)
        let userWithToken = user;
        console.log(userWithToken)
        userWithToken.token = token;
        setUser(userWithToken);
        console.log(user);
      }
      else {
        console.log(JSON.stringify(jsonResponse));
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      fetchToken: fetchToken
    }}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                headerShown: false,
                title: 'Log In',
                headerStyle: {
                  backgroundColor: 'darkslateblue'},
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                }
              }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              options={{
                title: 'Sign Up!',
                headerStyle: {
                  backgroundColor: 'darkslateblue'},
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                }
              }}
              
            />
            <Stack.Screen 
              name="Home" 
              component={HomeDrawer}
              options={{ 
                headerShown: false 
              }}
  
            />
          </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  
  );

}

export default App;
