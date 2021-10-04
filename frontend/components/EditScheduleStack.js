import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditScheduleView from '../screens/EditScheduleView';
import EditClassView from '../screens/EditClassView';

const Stack = createNativeStackNavigator();

const EditScheduleStack = ({navigation}) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="EditScheduleView" component={EditScheduleView} />
            <Stack.Screen name="EditClass" component={EditClassView} />
       </Stack.Navigator>
    )

}

export default EditScheduleStack;
