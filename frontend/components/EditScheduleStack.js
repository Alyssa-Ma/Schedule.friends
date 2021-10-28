import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditScheduleView from '../screens/EditScheduleView';
import EditClassView from '../screens/EditClassView';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const EditScheduleStack = ({navigation, route}) => {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="EditScheduleView" 
                component={EditScheduleView}
                options={{
                    title: 'Edit My Schedule',
                    headerStyle: {
                      backgroundColor: 'darkslateblue'},
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: 'white',
                    }
                }}
                initialParams={route.params}
            />
            <Stack.Screen 
                name="EditClassView" 
                component={EditClassView}
                options={{
                    title: 'Edit My Class',
                    headerStyle: {
                      backgroundColor: 'darkslateblue'},
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: 'white',
                    }
                }}
                initialParams={route.params}
            />
       </Stack.Navigator>
    )

}

export default EditScheduleStack;
