import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import TimePickerInput from './TimePickerInput';

const DaysRadioButton = (props) => {
    const [isSelected, setSelected] = useState(props.selectedDays[props.index][props.day]);
    return (
        <View style={styles.daysRadio}>
            <Text>{props.day}</Text>
            <RadioButton 
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => {
                    setSelected(!isSelected);
                    let selectedDaysBuffer = [...props.selectedDays];
                    const day_key = Object.keys(selectedDaysBuffer[props.index])
                    selectedDaysBuffer[props.index][day_key[0]] = !isSelected;
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
        const postResponse = await fetch("http://10.0.2.2:8000/api/sf_users/7/schedule/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //This needs to be brought down from props
                'Authorization': 'Token 0df1021e8c4228c8aa97be8c9bf867c4f41067b4'
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

const AddSchedule = (props) => {
    const [courseName, setcourseName] = useState(props.courseName);
    const [courseNumber, setCourseNumber] = useState(props.courseNumber);
    const [startHour, setStartHour] = useState(props.startHour);
    const [startMin, setStartMin] = useState(props.startMin);
    const [endHour, setEndHour] = useState(props.endHour);
    const [endMin, setEndMin] = useState(props.endMin);
    const [selectedDays, setSelectedDays] = useState(
        [{SUN: false}, {MON: false}, {TUE: false}, {WED: false},
         {THU: false}, {FRI: false}, {SAT: false}]);
    
    useEffect(() => {
        let iterator = props.selectedDays.values();
        let propsDay = iterator.next().value;
        console.log(propsDay)
        let selectedDaysBuffer = selectedDays.map(day => {
            if (propsDay in day && !propsDay.done) {
                const newDay = {[propsDay]: true};
                propsDay = iterator.next().value;
                return newDay;
            }
                return day;
        });
        console.log(selectedDaysBuffer);
        setSelectedDays(selectedDaysBuffer);
    }, []);


    return (
        <View>
            <TextInput 
                mode="outlined"
                label="Course Name"
                value={courseName}
                onChangeText={text => setcourseName(text)}
            />
            <TextInput 
                mode="outlined"
                label="Course Number"
                value={courseNumber}
                onChangeText={text => setCourseNumber(text)}
            />
            <View style={styles.daysRadioBar}>
                <DaysRadioButton index={0} day="SUN" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={1} day="MON" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={2} day="TUE" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={3} day="WED" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={4} day="THU" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={5} day="FRI" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
                <DaysRadioButton index={6} day="SAT" selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
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
