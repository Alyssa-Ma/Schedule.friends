import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditScheduleView from '../screens/EditScheduleView';
import EditClassView from '../screens/EditClassView';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const EditScheduleStack = ({navigation}) => {

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
            />
            <Stack.Screen 
                name="EditClass" 
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
            />
       </Stack.Navigator>
    )

}

export default EditScheduleStack;
