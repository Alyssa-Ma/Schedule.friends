import React, { useEffect, useState, createRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, RadioButton, Text, HelperText, useTheme } from 'react-native-paper';
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
    const [courseName, setCourseName] = useState(props.courseName);
    const [courseNumber, setCourseNumber] = useState(props.courseNumber);
    const [startHour, setStartHour] = useState(props.startHour);
    const [startMin, setStartMin] = useState(props.startMin);
    const [endHour, setEndHour] = useState(props.endHour);
    const [endMin, setEndMin] = useState(props.endMin);
    const [selectedDays, setSelectedDays] = useState(
        [{SUN: false}, {MON: false}, {TUE: false}, {WED: false},
         {THU: false}, {FRI: false}, {SAT: false}]);
    const [trimmedSelectedDays, setTrimmedSelectedDays] =  useState([]);

    const { dark, colors } = useTheme();
    
    // TextInput locks, unlock once a user focuses on them
    // Used to prevent error colors showing right as user enters form
    const [courseNameErrorLock, setCourseNameErrorLock] = useState(true);
    const [courseNumberErrorLock, setCourseNumberErrorLock] = useState(true);

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

    useEffect(() => {
        let trimSelectedDays = [];
        selectedDays.forEach(day => {
            day_key = Object.keys(day);
            if (day[day_key[0]] === true)
                trimSelectedDays.push(day_key[0]);
        })
        setTrimmedSelectedDays(trimSelectedDays);
    }, [selectedDays])

    const submitToParent = () => {
        const returnJSON = JSON.stringify({
            "course_name": `${courseName}`,
            "course_number": `${courseNumber}`,
            "time_start": `${startHour}:${startMin}`,
            "time_end": `${endHour}:${endMin}`,
            "day_name": trimmedSelectedDays
        })

        props.setReturnedJSON(returnJSON);
        props.setLoadingButton(!props.loadingButton);
    }

    return (
        <View style={{marginHorizontal: 30}}>
            <View style={[styles.inputBox, {backgroundColor: colors.secondColor, marginTop: 20}]}>
                <TextInput
                    error={!courseNameErrorLock && courseName.length <= 0}
                    theme={
                        {
                            colors: {
                                error: colors.error,
                                placeholder: courseName.length <= 0
                                            ? courseNameErrorLock 
                                                ? 'white'
                                                : dark
                                                    ?'rgba(255,255,255,.4)'
                                                    : 'rgba(0,0,0,.2)'
                                            : 'white', 
                            }
                        }
                    }
                    activeUnderlineColor='white'
                    label="Course Name"
                    placeholder='Ex: Calculus 2'
                    value={courseName}
                    onChangeText={text => {setCourseName(text)}}
                    style={styles.input}
                    onFocus={() => setCourseNameErrorLock(false)}
                />
            </View>
            <View style={[styles.inputBox,  {backgroundColor: colors.thirdColor}]}>
                <TextInput
                    error={!courseNumberErrorLock && courseNumber.length <= 0}
                    theme={
                        {
                            colors: {
                                error: colors.error,
                                placeholder: courseNumber.length <= 0
                                            ? courseNumberErrorLock 
                                                ? 'white'
                                                : dark
                                                    ?'rgba(255,255,255,.4)'
                                                    : 'rgba(0,0,0,.2)'
                                            : 'white', 
                            }
                        }
                    }
                    activeUnderlineColor='white'   
                    label="Course Number"
                    placeholder='Ex: MATH-15500'
                    value={courseNumber}
                    onChangeText={text => setCourseNumber(text)}
                    style={styles.input}
                    onFocus={() => setCourseNumberErrorLock(false)}
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

            <HelperText 
                type='error'
                style={styles.error}
                theme={{color: colors.error}}
                visible={trimmedSelectedDays.length <= 0}
                >Please select at least one day
            </HelperText>
           
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

            <HelperText 
                type='error'
                style={styles.error}
                theme={{color: colors.error}}
                visible={(parseInt(startHour) > parseInt(endHour)) ||
                    (parseInt(startHour) === parseInt(endHour) && parseInt(startMin) >= parseInt(endMin))}
                >Start time must be before end time
            </HelperText>

            <View style={styles.buttons}>   
                <Button
                    disabled={
                        // Course name must not be empty
                        courseName === '' || 
                        // Course number must not be empty
                        courseNumber === '' || 
                        // At least one day selected
                        trimmedSelectedDays.length <= 0 ||
                        // Start time must be before end time
                        (parseInt(startHour) > parseInt(endHour)) ||
                        (parseInt(startHour) === parseInt(endHour) && parseInt(startMin) >= parseInt(endMin))
                    }
                    mode="contained"  
                    icon="check"
                    color='black' //because mode = contained, does inverse of color, black = white
                    loading={props.loadingButton} 
                    onPress={submitToParent}
                    style={{ backgroundColor: colors.secondColor}}
                    >Submit
                </Button>

                <Button 
                    mode="contained" 
                    icon="cancel" 
                    color='black' //because mode = contained, does inverse of color, black = white
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
        marginTop: 10,
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
    error: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
})


export default CourseForm;
