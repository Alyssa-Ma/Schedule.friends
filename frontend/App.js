import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import brokenImage from './assets/brokenImage.png'
import { BASE_URL } from "@env";
import { Provider as PaperProvider, Snackbar } from 'react-native-paper';
  
import UserContext from './context/UserContext';
import SnackBarContext from './context/SnackBarContext';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeDrawer from './components/HomeDrawer';

import CustomDefaultTheme from './themes/customDefault';
import CustomDarkTheme from './themes/customDark';

const Stack = createNativeStackNavigator();

const App = ({ navigation, route }) => {

  // User Context State
  const [user, setUser] = React.useState({});
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  //Snackbar Notification State
  const [snackVisible, setSnackVisible] = React.useState(false);
  const [statusText, setStatusText] = React.useState("")
  const toggleSnackBar = () => setSnackVisible(!snackVisible);
  const onDismissSnackBar = () => setSnackVisible(false);
  const trimJSONResponse = (string) => {
    string = string.replace(/[{"},\[\]]/gm, '');
    string = string.replace(/[.]/gm, "\n");
    return string;
  }


  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;   
  // listens to isDarkTheme state again, had some weird delay/refresh problems when 
  // rendering from user context.

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
        setIsDarkTheme(jsonResponse.dark_mode)
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
    setIsDarkTheme(!isDarkTheme);
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
        setStatusText(`${response.status} Error: ${trimJSONResponse(JSON.stringify(jsonResponse))}`);
        toggleSnackBar();
      }
    } catch(error) {
      setStatusText(`${error}`);
      toggleSnackBar();
    } 

  }

  // Checks profile_image to see if it's a broken image, replace it with static assest
  React.useEffect(() => {
    const checkImage = async () => {
      if (fetch(`${user.profile_image}`).then((response) => {return response.status}) !== 200) {
        const userBuffer = {...user}
        userBuffer.profile_image = Image.resolveAssetSource(brokenImage).uri;
        setUser(userBuffer);
      }
    }
    if (user.profile_image)
      checkImage();
  }, [user.profile_image])

  return (
    <PaperProvider theme={theme}>
      <SnackBarContext.Provider value={{
        snackVisible: snackVisible,
        setSnackVisible: setSnackVisible,
        statusText: statusText,
        setStatusText: setStatusText,
        toggleSnackBar: toggleSnackBar,
        onDismissSnackBar: onDismissSnackBar,
        trimJSONResponse: trimJSONResponse
      }}>
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
                  //surface is text color
                  //onSurface is background
                  //accent is label text color
                  theme={{
                    colors: {
                      surface: isDarkTheme 
                        ? CustomDarkTheme.colors.text 
                        : CustomDefaultTheme.colors.text,
                      onSurface: isDarkTheme 
                        ? CustomDarkTheme.colors.fourthColor 
                        : CustomDefaultTheme.colors.fifthColor,
                      accent: isDarkTheme 
                        ? CustomDarkTheme.colors.text 
                        : CustomDefaultTheme.colors.text,
                    }
                  }}
              >{statusText}</Snackbar>
          </NavigationContainer>
        </UserContext.Provider>
      </SnackBarContext.Provider>
    </PaperProvider>
  )
}

export default App;
