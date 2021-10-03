import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import EditScheduleView from './EditScheduleView';
import EditClassView from './EditClassView';

const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();

const EditScheduleStack = ({navigation}) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="EditScheduleView" component={EditScheduleView} />
            <Stack.Screen name="EditClass" component={EditClassView} />
       </Stack.Navigator>
    )

}

export default EditScheduleStack;
