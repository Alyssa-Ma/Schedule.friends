import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleListView from '../screens/ScheduleListView';
import EditClassView from '../screens/EditClassView';

const Stack = createNativeStackNavigator();

//Basically serves like a 'routes' page. Allows for stack nav on the edit pages
const MyScheduleStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ScheduleListView" 
                component={ScheduleListView}
                options={{
                    title: 'Edit My Schedule',
                    headerShown: false
                }}
            />
            {/* <Stack.Screen 
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
            /> */}
       </Stack.Navigator>
    )

}

export default MyScheduleStack;
