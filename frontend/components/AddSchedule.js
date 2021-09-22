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
            ></RadioButton>
        </View>
    )
}

const AddSchedule = () => {
    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible])
  
    const onConfirm = React.useCallback(
      ({ hours, minutes }) => {
        setVisible(false);
        console.log({ hours, minutes });
      },
      [setVisible]
    );

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
            <View>
                <TimePickerModal
                    visible={visible}
                    onDismiss={onDismiss}
                    onConfirm={onConfirm}
                    hours={12} // default: current hours
                    minutes={14} // default: current minutes
                    label="Select time" // optional, default 'Select time'
                    cancelLabel="Cancel" // optional, default: 'Cancel'
                    confirmLabel="Ok" // optional, default: 'Ok'
                    animationType="fade" // optional, default is 'none'
                    locale={'en'} // optional, default is automically detected by your system
                />
                <Button onPress={()=> setVisible(true)}>
                    Pick time
                </Button>
            </View>
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
    }
})


export default AddSchedule;
