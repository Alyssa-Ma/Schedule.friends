import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CombinedScheduleView from '../screens/CombinedScheduleView';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const LoginStack = ({navigation}) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="CombinedScheduleView" component={CombinedScheduleView} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
       </Stack.Navigator>
    );

}

export default LoginStack;
