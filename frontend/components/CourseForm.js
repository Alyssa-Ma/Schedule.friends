import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text, useTheme} from 'react-native-paper';
import TimePickerInput from './TimePickerInput';

const DaysRadioButton = (props) => {
    const [isSelected, setSelected] = useState(false);
    const { colors } = useTheme();

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

    const submitToParent = () => {
        let trimSelectedDays = [];
        selectedDays.forEach(day => {
            day_key = Object.keys(day);
            if (day[day_key[0]] === true)
                trimSelectedDays.push(day_key[0]);
        })

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

    return (
        <View>
            <TextInput 
                mode="outlined"
                label="Course Name"
                value={courseName}
                onChangeText={text => setcourseName(text)}
                
                underlineColor='#D7A4FF'
                activeUndelineColor='#D7A4FF'
                activeOutlineColor='#D7A4FF'
                outlineColor='#D7A4FF'        //HARDCODED TEXT COLOR
                selectionColor='#D7A4FF'
                theme={{
                    colors: {
                      primary: '#D7A4FF',
                      underlineColor: '#D7A4FF',
                      
                    }
                }}
                style={styles.courseInfoInput}
            />
            <TextInput 
                mode="outlined"
                label="Course Number"
                value={courseNumber}
                onChangeText={text => setCourseNumber(text)}

                underlineColor='#5CDBD5'
                activeUndelineColor='#5CDBD5'
                activeOutlineColor='#5CDBD5'
                outlineColor='#5CDBD5'        //HARDCODED TEXT COLOR
                selectionColor='#5CDBD5'
                theme={{
                    colors: {
                      primary: '#5CDBD5',
                      underlineColor: '#5CDBD5',
                      
                    }
                }}
                style={styles.courseInfoInput}
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
                <Button icon="check" loading={props.loadingButton} onPress={submitToParent} mode="contained" style={{ backgroundColor: '#D7A4FF'}}>Submit</Button>
                <Button icon="cancel" onPress={() => {props.navigation.pop()}} mode="contained" style={{ backgroundColor: '#5CDBD5'}}>Cancel</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30,
        
    },
    daysRadioBar: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    daysRadio: {
        flexDirection: "column",
        alignItems: "center"
    },

    courseInfoInput: {
        marginTop: 30,
        
    }
})


export default CourseForm;
