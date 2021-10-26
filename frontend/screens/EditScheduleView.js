import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import EditSchedule from '../components/EditSchedule';
import EditClassView from './EditClassView';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const EditScheduleView = ({ navigation }) => {

    //DAY RAIDO BUTTON START ------
    const [checked, setChecked] = useState();
    const [targetData, setTargetData] = useState();

    const [data, setData] = useState([]);

    useEffect(() => {
        //schedule data for user 1
        fetch('http://192.168.1.71:8000/api/sf_users/5/schedule/', {
        method:"GET",
        headers: {

            'Content-Type': 'application/json',
            'Authorization': 'Token 238265686177126531075cce6d566edb398cd32d'

            },

        })

        .then(resp => resp.json())

        .then(data => {

            setData(
              
              data.sort(function(a,b){

                if(a.time_start.toLowerCase() < b.time_start.toLowerCase()){
                  return -1;
                }

                if(a.time_start.toLowerCase() < b.time_start.toLowerCase()){
                  return -1;
                }

                return 0;
                
              })
              
              );



            console.log(data);
        })
        .catch(error => console.log("Error"));
    }, [])


    //DATA FILTER TEST LINES START

    //const tueCourses = data.filter(x => x.day_name === 'TUE');
   

    //DATA FILTER TEST LINES END



    return(
    
            <View style={styles.container}>
                <FlatList data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => <EditSchedule item={item} navigation={navigation}/>} />
            </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
    },

    daysRadioBar: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    daysRadio: {
        flexDirection: "column",
        alignItems: "center"
    },

});





export default EditScheduleView;