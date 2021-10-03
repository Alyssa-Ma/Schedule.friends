import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import EditSchedule from '../components/EditSchedule';
import EditClassView from './EditClassView';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



const EditScheduleView = ({ navigation }) => {

    const [Classes, setClasses] = useState([
        {id:'1', classTitle: 'MATH 10100' , startTime: '9:00 AM', endTime: '11:00AM' },
        {id:'2', classTitle: 'CSCI 49900' , startTime: '2:00 PM', endTime: '3:25 PM' },
        {id:'3', classTitle: 'CSCI 39541' , startTime: '4:00 PM', endTime: '5:00 PM' },
        {id:'4', classTitle: 'ENG 20100' , startTime: '4:00 PM', endTime: '5:00 PM' },
        {id:'5', classTitle: 'CLA 10100' , startTime: '4:00 PM', endTime: '5:00 PM' },
      
    ]);


    return(
    
            <View style={styles.container}>
                <Header title='Edit My Schedule'/>
                <FlatList data={Classes} renderItem={({item}) => <EditSchedule item={item} navigation={navigation}/>} />
            </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
    },

});





export default EditScheduleView;