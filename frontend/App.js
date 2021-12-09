import 'react-native-gesture-handler';
import { useState, createContext } from 'react';
import { DefaultTheme as NativeDefaultTheme, DarkTheme as NativeDarkTheme } from 'react-native';
import * as React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BASE_URL } from "@env";
import UserContext from './context/UserContext';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, DefaultTheme} from 'react-native-paper';

//**********Import the screens here********

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const App = ({ navigation, route }) => {

  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  //Default 'Light mode'
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    //...NativeDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      //...NativeDarkTheme.colors,
      backgroundColor: '#ffffff',
      text: '#333333',
      invertedColor: 'black',
      backgroundCardColors: ['#D7A4FF', '#9E8DFF', '#7DD1FF', '#68B0D8', '#5CDBD5'],
      fabButtonColor: '#53c3fe',
      radioButtonColor: '#9E8DFF',
      activityIndicatorColor: '#9E8DFF',
      drawerBackgroundColor: '#ffffff',
      dialogButton: '#9E8DFF',
      calHeaderBackground: '#F5F5F6',
      calHeaderBorderColor: '#E6E8F0',
      calIconColor: "#9CA0B8",
      eventBorderColor: '#DDE5FD',
      primary: '#ffffff',
      accent: '#7DD1FF',
      firstColor: '#D7A4FF',
      secondColor: '#9E8DFF',
      thirdColor: '#7DD1FF',
      fourthColor: '#68B0D8',
      fifthColor: '#5CDBD5',
    }
  }

  //Dark Mode
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    //...NativeDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      backgroundColor: '#493e81',
      text: '#ffffff',
      invertedColor: 'white',
      backgroundCardColors: ['#7464CC', '#B8ACFB', '#927EFF', '#696580', '#786CBC'],
      fabButtonColor: '#696580',
      radioButtonColor: '#927EFF',
      activityIndicatorColor: '#B8ACFB',
      drawerBackgroundColor: '#493e81',
      dialogButton: '#7464CC',
      calHeaderBackground: '#6355aa',
      calHeaderBorderColor: '#5448A4',
      calIconColor: '#453a75',
      eventBorderColor: '#453a75',
      firstColor: '#7464CC',
      secondColor: '#927EFF',
      thirdColor: '#B8ACFB',
      fourthColor: '#696580',
      fifthColor: '#786CBC',
    }
  }
 
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const fetchUserToken = async (usernameInput, passwordInput) => {
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
        //may not always be an invalid username or password
        Alert.alert("Invalid Log In", "The username and/or password is incorrect",);
      }
    }
    catch (error) {
      console.log("Error from server in App.js: ", error);
    }
    return false;
  }

  //for developmental purpose, autologins to HenryB
  React.useEffect(() => {
   fetchUserToken("henryB", "Test01");
  }, [])

  return (

    <PaperProvider theme={theme}>
      <UserContext.Provider value={{
        user: user,
        isSignedIn: isSignedIn,
        bgColors: ['#D7A4FF', '#9E8DFF', '#7DD1FF', '#68B0D8', '#5CDBD5'],  //added colors to context
        setUser: setUser,
        setIsSignedIn: setIsSignedIn,
        fetchUserToken: fetchUserToken,
        isDarkTheme: isDarkTheme,
        toggleTheme: () => {    //Added toggle theme
          setIsDarkTheme( isDarkTheme => !isDarkTheme);
        }
      }}>

        <NavigationContainer theme={theme}>
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

                        backgroundColor: '#9E8DFF'
                      },

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
                      title: 'Registration',
                      headerStyle: {

                        backgroundColor: '#9E8DFF'
                      },

                      headerTitleAlign: 'center',
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 22
                      },
                      headerBackButtonStyle: {
                        headerTintColor: '#fffff'
                      }
                    }}
                  />
                </Stack.Navigator>
              )
          }
        </NavigationContainer>
      </UserContext.Provider>
    </PaperProvider>
  )
}

export default App;
