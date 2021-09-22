import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';

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
