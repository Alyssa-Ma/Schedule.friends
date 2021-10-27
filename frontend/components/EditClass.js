import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import TimePickerInput from './TimePickerInput';
import {BASE_URL} from "@env";

const DaysRadioButton = (props) => {
    const [isSelected, setSelected] = useState(false)
    return (
        <View style={styles.daysRadio}>
            <Text>{props.day}</Text>
            <RadioButton 
                value="props.day"
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => {
                    setSelected(!isSelected);
                    selectedDaysBuffer = [...props.selectedDays];
                    day_key = Object.keys(selectedDaysBuffer[props.pos])
                    selectedDaysBuffer[props.pos][day_key[0]] = !isSelected;
                    console.log(selectedDaysBuffer);
                    props.setSelectedDays(selectedDaysBuffer);
                }}
            />
        </View>
    )
}

const handleSubmit = async (sentState) => {
    let selectedDays = [];
    sentState.selectedDays.forEach(day => {
        day_key = Object.keys(day);
        if (day[day_key[0]] === true)
            selectedDays.push(day_key[0]);
    })

    try {
        //Fetch URL should be an dotenv variable
        const postResponse = await fetch(`${BASE_URL}/5/schedule/${sentState.cid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                //This needs to be brought down from props
                'Authorization': 'Token 238265686177126531075cce6d566edb398cd32d'
            },
            body: JSON.stringify({
                "course_name": `${sentState.courseName}`,
                "course_number": `${sentState.courseNumber}`,
                "time_start": `${sentState.startHour}:${sentState.startMin}`,
                "time_end": `${sentState.endHour}:${sentState.endMin}`,
                "day_name": selectedDays
            })
        });
        const jsonPostResponse = await postResponse.json();
        console.log(jsonPostResponse);
    }
    catch(error) {
        console.log(error);
    }
}

const deleteCourse = (sentState) => {
    //schedule data for user 5
    fetch(`${BASE_URL}/5/schedule/${sentState.cid}`, {
        method:"DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 238265686177126531075cce6d566edb398cd32d'
        },

    })

    //.then(resp => resp.json())
    .then(data => {
        //navigation.navigate("EditScheduleView")
    })
    .catch(error => console.log("Error"))

}

const EditClass = (props) => {
    const cid = props.itemId;
    const [courseName, setcourseName] = useState("");
    const [courseNumber, setCourseNumber] = useState("");
    const [startHour, setStartHour] = useState(0);
    const [startMin, setStartMin] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMin, setEndMin] = useState(0);
    const [selectedDays, setSelectedDays] = useState(
        [{SUN: false}, {MON: false}, {TUE: false}, {WED: false},
         {THU: false}, {FRI: false}, {SAT: false}]
    );
    return (
        <View>
            <TextInput 
                mode="outlined"
                label="Course Name"
                onChangeText={text => setcourseName(text)}
            />
            <TextInput 
                mode="outlined"
                label="Course Number"
                onChangeText={text => setCourseNumber(text)}
            />
            <View style={styles.daysRadioBar}>
                <DaysRadioButton pos={0} day="Sun" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={1} day="Mon" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={2} day="Tue" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={3} day="Wed" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={4} day="Thu" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={5} day="Fri" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton pos={6} day="Sat" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
            </View>
            <TimePickerInput
                label="Start Time"
                hour={startHour}
                min={startMin}
                setHour={setStartHour}
                setMin={setStartMin}
            />
            <TimePickerInput
                label="End Time"
                hour={endHour}
                min={endMin}
                setHour={setEndHour}
                setMin={setEndMin}
            /> 
            <View style={styles.buttons}>
                <Button icon="check" onPress={() => handleSubmit({
                    courseName: courseName,
                    courseNumber: courseNumber,
                    startHour: startHour,
                    startMin: startMin,
                    endHour: endHour,
                    endMin: endMin,
                    selectedDays: selectedDays,
                    cid: cid
                })} mode="contained">EDIT CLASS</Button>

                <Button icon="cancel" mode="contained" onPress={() => deleteCourse({cid:cid})} >
                    DELETE CLASS
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    daysRadioBar: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    daysRadio: {
        flexDirection: "column",
        alignItems: "center"
    }
})


export default EditClass;
