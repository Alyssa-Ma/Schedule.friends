import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Header from '../components/Header';


const EditClassView = ({ navigation, route }) => {

    console.log(route.params, "EDIT CLASS")
    {/* useStates to update time-slot information in the future*/}
    const [classTitle, setClassTitle] = useState('Math');
    const [day, setDay] = useState('Monday');
    const [startTime, setStartTime] = useState('9:00 AM');
    const [endTime, setEndTime] = useState('11:00 AM');
    const [color, setColor] = useState("Blue");

   return (

        <View style={styles.container}>

    
            <Text>Enter Class Title:</Text>
            <TextInput 
            style={styles.input} 
            onChangeText = {(val) => setClassTitle(val) } />

            <Text>Enter Day:</Text>
            <TextInput 
            style={styles.input} 
            onChangeText = {(val) => setDay(val) } />

        <Text>Enter Start Time:</Text>
            <TextInput 
            style={styles.input} 
            onChangeText = {(val) => setStartTime(val) } />

        <Text>Enter End Time:</Text>
            <TextInput 
            style={styles.input} 
            onChangeText = {(val) => setEndTime(val) } />

        <Text>Select Color:</Text>
            <TextInput 
            style={styles.input} 
            onChangeText = {(val) => setColor(val) } />

            <Text>
                Class Title: {classTitle},
                Day: {day},
                Start Time: {startTime},
                End Time: {endTime},
                Color: {color}
                </Text>    
        </View>
           
    );
}

const styles = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor: '#fff',
     
 },

 input: {
     borderWidth: 1,
     borderColor: '#777',
     padding : 8,
     margin: 10,
     width: 200,

    
    color: '#000',
    ...Platform.select({
      android: {
        height: 35
      }
    })
  }


});

export default EditClassView;