import 'react-native-gesture-handler';
import {useState, createContext} from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {BASE_URL} from "@env";
import UserContext from './context/UserContext';

//**********Import the screens here********

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';
import AddScheduleView from './screens/AddScheduleView';
import { Alert } from 'react-native';

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

  const [user, setUser] = useState({});

  const fetchUserToken = async (usernameInput, passwordInput) => {
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
      if (response.status === 200) {
        setUser(jsonResponse);
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
  
  //for developmental purpose, autologins to henryB
  React.useEffect(() => {
    fetchUserToken("henryB", "Test01");
  }, [])

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      fetchUserToken: fetchUserToken
    }}>
      <NavigationContainer>
        {
          Object.keys(user).length
          ? (
            <HomeDrawer/>
          )
          : (
            <Stack.Navigator>
              <Stack.Group>
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
              </Stack.Group>
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </UserContext.Provider>
  )
}

export default App;

//original state rendering
{/* <NavigationContainer>
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
</NavigationContainer> */}
