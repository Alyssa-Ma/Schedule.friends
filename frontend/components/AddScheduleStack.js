import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScheduleView from '../screens/AddScheduleView';

const Stack = createNativeStackNavigator();

const AddScheduleStack = ({navigation}) => {
    navigation.push(AddScheduleView);
    // return (
    //     <Stack.Navigator>
    //         <Stack.Screen 
    //             name="AddScheduleView" 
    //             component={AddScheduleView}
    //             options={{
    //                 title: 'Add Course To Schedule',
    //                 headerStyle: {
    //                   backgroundColor: 'darkslateblue'},
    //                 headerTitleAlign: 'center',
    //                 headerTitleStyle: {
    //                   color: 'white',
    //                 }
    //             }}
    //         />
    //     </Stack.Navigator>
    // )
    return(null)
};

export default AddScheduleStack;
