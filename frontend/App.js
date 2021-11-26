import 'react-native-gesture-handler';
import {useState, createContext} from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {BASE_URL} from "@env";
import UserContext from './context/UserContext';
import { Provider as PaperProvider}  from 'react-native-paper';

//**********Import the screens here********

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const App = ({navigation, route}) => {

  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  const fetchUserToken = async (usernameInput, passwordInput) => {
    console.log(`Begin of fetchToken(): user:${usernameInput} pass: ${passwordInput}`);
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
      if (response.status === 200) {
        setUser(jsonResponse);
        setIsSignedIn(true);
        return true;
      }
      else {
        console.log("Error from server in App.js: ", JSON.stringify(jsonResponse));
        Alert.alert("Invalid Log In", "The username and/or password is incorrect",);
      }
    }
    catch(error) {
      console.log("Error from server in App.js: ", error);
    }
    return false;
  }
  
  //for developmental purpose, autologins to HenryB
  // React.useEffect(() => {
  //   fetchUserToken("henryB", "Test01");
  // }, [])

  return (
    <UserContext.Provider value={{
      user: user,
      isSignedIn: isSignedIn,
      setUser: setUser,
      setIsSignedIn: setIsSignedIn,
      fetchUserToken: fetchUserToken
    }}>
      <PaperProvider>
        <NavigationContainer>
          {
            isSignedIn
            ? (
              <Stack.Navigator>
                  <Stack.Screen 
                    name="HomeDrawer" 
                    component={HomeDrawer}
                    options={{
                      headerShown: false,
                    }}
                  />
              {/* <HomeDrawer/> */}
              </Stack.Navigator>
            )
            : (
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
              </Stack.Navigator>
            )
          }
        </NavigationContainer>
      </PaperProvider>
    </UserContext.Provider>
  )
}

export default App;
