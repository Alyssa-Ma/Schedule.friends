import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import TimePickerInput from './TimePickerInput';

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

const handleSubmit = (sentState) => {
    let trueDays = [];
    sentState.selectedDays.forEach(day => {
        day_key = Object.keys(day);
        console.log(day_key[0])
        if (day[day_key[0]] === true)
            trueDays.push(day_key[0])
    })
    trueDays.forEach(async dayName => {
        try {
            const postResponse = await fetch("http://10.0.2.2:8000/api/sf_users/6/schedule/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "course_name": `${sentState.courseName}`,
                    "course_number": `${sentState.courseNumber}`,
                    "time_start": `${sentState.startHour}:${sentState.startMin}`,
                    "time_end": `${sentState.endHour}:${sentState.endMin}`,
                    "day_name": `${dayName}`
                })
            });
            const jsonPostResponse = await postResponse.json()
            console.log(jsonPostResponse)
        }
        catch(error) {
            console.log(error)
        }
    })
}

const AddSchedule = () => {
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
                    selectedDays: selectedDays
                })} mode="contained">Submit</Button>
                <Button icon="cancel" mode="contained">Discard</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
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


export default AddSchedule;
