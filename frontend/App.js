import 'react-native-gesture-handler';
import { useState } from 'react';
import * as React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BASE_URL } from "@env";
import { Provider as PaperProvider, 
  DarkTheme as PaperDarkTheme, 
  DefaultTheme as PaperDefaultTheme,
  Snackbar } from 'react-native-paper';
  
import UserContext from './context/UserContext';
import SnackBarContext from './context/SnackBarContext';
//**********Import the screens here********

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const App = ({ navigation, route }) => {

  // User Context State
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  //Snackbar Notification State
  const [snackVisible, setSnackVisible] = useState(false);
  const [statusText, setStatusText] = useState("")
  const toggleSnackBar = () => setSnackVisible(!snackVisible);
  const onDismissSnackBar = () => setSnackVisible(false);
  const trimJSONResponse = (string) => {
    string = string.replace(/[{"},\[\]]/gm, '');
    string = string.replace(/[.]/gm, "\n");
    return string;
  }

  //Default 'Light mode'
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
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
      accent: '#7DD1FF',
      firstColor: '#D7A4FF',
      secondColor: '#9E8DFF',
      thirdColor: '#7DD1FF',
      fourthColor: '#68B0D8',
      fifthColor: '#5CDBD5',
      // for TimePickerModal
      surface: '#EEEDFF',
      primary: '#6C59FF',
      placeholder: 'black',
      error: '#C40031'
      focusedColor: '#ffffff',
      unfocusedColor: '#696580',
      searchBar: '#D7A4FF'
    }
  }

  //Dark Mode
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      backgroundColor: '#493e81',
      text: '#ffffff',
      primary: '#7464CC',
      accent: '#7DD1FF',
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
      // for TimePickerModal
      surface: '#2a2349',
      primary: '#7464CC',
      placeholder: 'white',
      error: '#FF6D6D'
      focusedColor: '#ffffff',
      unfocusedColor: '#404040',
      searchBar: '#927EFF'
    }
  }
  const theme = user.dark_mode ? CustomDarkTheme : CustomDefaultTheme;   //uses dark_mode from context

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
        setStatusText(`${response.status} Error: ${trimJSONResponse(JSON.stringify(jsonResponse))}`);
        toggleSnackBar();
      }
    }
    catch (error) {
      setStatusText(`${error}`);
      toggleSnackBar();
    }
    return false;
  }

  //Changes the theme in both context and database
  const toggleTheme = async (id, token) => { 
    setIsDarkTheme( isDarkTheme => !isDarkTheme);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
          method:"PATCH",
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
          
          },

          body: JSON.stringify({"dark_mode": isDarkTheme})
      
      })
      
      const jsonResponse = await response.json();
      if (response.status === 200) {
          setUser(jsonResponse);
      }
      else {
          console.error(`Server Error ${response.status}`)
          Alert.alert(`Server Error`);
      }
    } catch(error) {
        console.error(error)
    } 

  }

  //for developmental purpose, autologins to HenryB
  React.useEffect(() => {
   fetchUserToken("henryB", "Test401");
  }, [])

  return (

    <PaperProvider theme={theme}>
      <UserContext.Provider value={{
        user: user,
        isSignedIn: isSignedIn,
        setUser: setUser,
        setIsSignedIn: setIsSignedIn,
        fetchUserToken: fetchUserToken,
        isDarkTheme: isDarkTheme,
        setIsDarkTheme: setIsDarkTheme,
        toggleTheme: toggleTheme
      }}>
          <SnackBarContext.Provider value={{
            snackVisible: snackVisible,
            setSnackVisible: setSnackVisible,
            statusText: statusText,
            setStatusText: setStatusText,
            toggleSnackBar: toggleSnackBar,
            onDismissSnackBar: onDismissSnackBar,
            trimJSONResponse: trimJSONResponse
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
            <Snackbar 
                  visible={snackVisible}
                  onDismiss={onDismissSnackBar}
                  action={{
                      label: 'OK',
                      onPress: onDismissSnackBar
                  }}
              >{statusText}</Snackbar>
          </NavigationContainer>
        </SnackBarContext.Provider>
      </UserContext.Provider>
    </PaperProvider>
  )
}

export default App;
