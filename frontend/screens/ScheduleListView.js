import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import CourseItem from '../components/CourseItem';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';


const ScheduleListView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    //DAY RAIDO BUTTON START ------
    const [checked, setChecked] = useState();
    const [targetData, setTargetData] = useState();

    const [data, setData] = useState(context.user.schedule);

    useEffect(() => {
      console.log("Schedule List View useEffect()")
    }, [context.user.schedule])

    // useEffect(() => {
    //     //schedule data for user 1
    //     // fetch(`${BASE_URL}/5/schedule/`,{
    //     //     method: 'GET', // or 'PUT'
    //     //     headers: {
    //     //     'Content-Type': 'application/json',
    //     //     'Authorization': `Token ${route.params.token}`
    //     //     },
    //     // })

    //     // .then(resp => resp.json())

    //     // .then(

    //         setData(
              
    //           data.sort(function(a,b){

    //             if(a.time_start.toLowerCase() < b.time_start.toLowerCase()){
    //               return -1;
    //             }

    //             if(a.time_start.toLowerCase() < b.time_start.toLowerCase()){
    //               return -1;
    //             }

    //             return 0;
                
    //           })
              
    //           );



    //         console.log(data);
    //     //.catch(error => console.log("Error"));
    // }, [context.user.schedule])


    //DATA FILTER TEST LINES START

    //const tueCourses = data.filter(x => x.day_name === 'TUE');
   

    //DATA FILTER TEST LINES END



    return(
    
            <View style={styles.container}>
                <FlatList data={context.user.schedule}
                keyExtractor={course => course.id}
                renderItem={({item}) => <CourseItem item={item} navigation={navigation}/>} />
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





export default ScheduleListView;
