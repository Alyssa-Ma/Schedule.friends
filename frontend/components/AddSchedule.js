import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

const DaysRadioButton = (props) => {
    const [isSelected, setSelected] = useState(false)
    return (
        <View style={styles.daysRadio}>
            <Text>{props.day}</Text>
            <RadioButton 
                value="props.day"
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => setSelected(!isSelected)}
            />
        </View>
    )
}

const TimePickerInput = (props) => {
    const [visible, setVisible] = React.useState(false)
    
    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible]);

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
          setVisible(false);
          props.setHour(hours);
          props.setMin(minutes);
        },
        [setVisible]
    );

    return (
        <View style={styles.inputTime}>
            <Text>{props.label}:</Text>
            <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={0} // default: current hours
                minutes={0} // default: current minutes
                label="Select time" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'en'} // optional, default is automically detected by your system
            />
            <Button 
                icon="clock" mode="contained"
                onPress={()=> setVisible(true)}>
                {props.hour}:{props.min}
            </Button>
        </View>
    )
}

const AddSchedule = () => {
    const [startHour, setStartHour] = useState(0);
    const [startMin, setStartMin] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMin, setEndMin] = useState(0);
    
    return (
        <View>
            <TextInput 
                mode="outlined"
                label="Class Name"
            />
            <View style={styles.daysRadioBar}>
                <DaysRadioButton day="Sun"/>
                <DaysRadioButton day="Mon"/>
                <DaysRadioButton day="Tue"/>
                <DaysRadioButton day="Wed"/>
                <DaysRadioButton day="Thu"/>
                <DaysRadioButton day="Fri"/>
                <DaysRadioButton day="Sat"/>
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
                <Button icon="check" mode="contained">Submit</Button>
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
    },
    inputTime: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})


export default AddSchedule;
