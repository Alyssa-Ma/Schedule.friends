import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

const TimePickerInput = (props) => {
    //Helper function that converts and returns a date object into a HH:MM string
    const timeToString = (hour, min) => {
        let dateObj = new Date(0, 0, 0, hour, min);
        return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    const [visible, setVisible] = useState(false);
    const [timeString, setTimeString] = useState(timeToString(props.hour, props.min));
    const { colors } = useTheme();
    
    const onDismiss = useCallback(() => {
      setVisible(false)
    }, [setVisible]);

    const onConfirm = useCallback(
        ({ hours, minutes }) => {
          setVisible(false);
          props.setHour(hours.toString().padStart(2, '0'));
          props.setMin(minutes.toString().padStart(2, '0'));
          setTimeString(timeToString(hours, minutes));
        },
        [setVisible]
    );
    
    return (
        <View style={styles.inputTime}>
            <Text style={{fontSize: 17}}>
                {props.label}:
            </Text>
            <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={props.hour} 
                minutes={props.min} 
                label="Select time"
                cancelLabel="Cancel"
                confirmLabel="Ok"
                animationType="fade"
                locale={'en'}
            />
            <Button 
                icon="clock"
                mode="contained"
                onPress={()=> setVisible(true)}
                style={{
                    backgroundColor: colors.secondColor,
                    width: 120,
                }}
                contentStyle={{justifyContent: "space-between"}}
                labelStyle={{
                    color: 'white'
                }}
            >
                {timeString}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 35
    },

});

export default TimePickerInput;
