import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, RadioButton, Text, useTheme } from 'react-native-paper';
import TimePickerInput from './TimePickerInput';

const DaysRadioButton = (props) => {
    const [isSelected, setSelected] = useState(false);
    const { colors } = useTheme(); //THEME

    useEffect(() => {
        setSelected(props.selectedDays[props.index][props.day]);
    })
    return (
        <View style={styles.daysRadio}>
            <Text>{props.day}</Text>
            <RadioButton 
                status={isSelected ? 'checked' : 'unchecked'}
                color={colors.radioButtonColor}
                onPress={() => {
                    setSelected(!isSelected);
                    let selectedDaysBuffer = [...props.selectedDays];
                    const day_key = Object.keys(selectedDaysBuffer[props.index])
                    selectedDaysBuffer[props.index][day_key[0]] = !isSelected;
                    props.setSelectedDays(selectedDaysBuffer);
                }}
            />
        </View>
    )
}

const CourseForm = (props) => {
    const [courseName, setcourseName] = useState(props.courseName);
    const [courseNumber, setCourseNumber] = useState(props.courseNumber);
    const [startHour, setStartHour] = useState(props.startHour);
    const [startMin, setStartMin] = useState(props.startMin);
    const [endHour, setEndHour] = useState(props.endHour);
    const [endMin, setEndMin] = useState(props.endMin);
    const [selectedDays, setSelectedDays] = useState(
        [{SUN: false}, {MON: false}, {TUE: false}, {WED: false},
         {THU: false}, {FRI: false}, {SAT: false}]);

    const { colors } = useTheme();
    
    useEffect(() => {
        let iterator = props.selectedDays.values();
        let propsDay = iterator.next().value;
        let selectedDaysBuffer = selectedDays.map(day => {
            if (propsDay in day) {
                const newDay = {[propsDay]: true};
                propsDay = iterator.next().value;
                return newDay;
            }
                return day;
        });
        setSelectedDays(selectedDaysBuffer);
    }, []);

    const submitToParent = (trimSelectedDays) => {
        const returnJSON = JSON.stringify({
            "course_name": `${courseName}`,
            "course_number": `${courseNumber}`,
            "time_start": `${startHour}:${startMin}`,
            "time_end": `${endHour}:${endMin}`,
            "day_name": trimSelectedDays
        })

        props.setReturnedJSON(returnJSON);
        props.setLoadingButton(!props.loadingButton);
    }

    const inputValidation = () => {
        // Trims selected radio days
        let trimSelectedDays = [];
        selectedDays.forEach(day => {
            day_key = Object.keys(day);
            if (day[day_key[0]] === true)
                trimSelectedDays.push(day_key[0]);
        })

        // TextInput validators check for blank entries
        if(courseName.length == 0)
            Alert.alert("Please enter a course name");
        else if(courseNumber.length == 0)
            Alert.alert("Please enter a course number");
        
        // Makes sure at least one day is selected
        else if (trimSelectedDays.length === 0)
            Alert.alert("Please select at least one day")
        
        // Checks timepicker in case it picks out-of-bound values
        else if (parseInt(startHour) < 0 || parseInt(startHour) > 23)
            Alert.alert("Start hour is not a valid (0-23)")
        else if (parseInt(endHour) < 0 || parseInt(endHour) > 23)
            Alert.alert("End hour is not a valid (0-23)")
        else if (parseInt(startMin) < 0 || parseInt(startMin) > 59)
            Alert.alert("Start minute is not a valid (0-59)")
        else if (parseInt(endMin) < 0 || parseInt(endMin) > 59)
            Alert.alert("End minute is not a valid (0-59)")

        // Checks to make sure start time is not set after end time
        else if ((parseInt(startHour) > parseInt(endHour)) ||
                 (parseInt(startHour) === parseInt(endHour) && parseInt(startMin) >= parseInt(endMin)))
            Alert.alert("Start time must be before end time")
        
        // else {
        //     submitToParent(trimSelectedDays);
        // }
    }

    return (
        <View style={{marginHorizontal: 30}}>
            <View style={[styles.inputBox, {backgroundColor: colors.secondColor, marginTop: 20}]}>
                <TextInput 
                    label="Course Name"
                    value={courseName}
                    onChangeText={text => setcourseName(text)}
                    style={[styles.input]}
                />
            </View>
            
            <View style={[styles.inputBox,  {backgroundColor: colors.thirdColor}]}>
                <TextInput   
                    label="Course Number"
                    value={courseNumber}
                    onChangeText={text => setCourseNumber(text)}
                    style={styles.input}
                />
            </View>

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
                <Button
                    mode="contained"  
                    icon="check"
                    color='black' //because contained mode does inverse of color, black = white
                    loading={props.loadingButton} 
                    onPress={inputValidation}
                    style={{ backgroundColor: colors.secondColor}}
                    >Submit
                </Button>
                <Button 
                    mode="contained" 
                    icon="cancel" 
                    color='black' //because contained mode does inverse of color, black = white
                    onPress={() => {props.navigation.pop()}} 
                    style={{ backgroundColor: colors.secondColor}}
                    >Cancel
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        width: 350, 
        borderRadius: 20,
        height: 55,
        paddingHorizontal: 16,
        fontSize: 16, 
        color: 'white',
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'transparent',
        margin: -6,
        overflow: 'hidden'
    },  
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30,
        marginHorizontal: -25
        
    },
    daysRadioBar: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    daysRadio: {
        flexDirection: "column",
        alignItems: "center"
    },

    courseInfoInput: {
        width:350, 
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        height:55,
        paddingHorizontal: 16, 
        fontSize: 16, 
        marginVertical: 10,
        alignSelf: 'center'
        
    }
})


export default CourseForm;
