import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TimePickerInput = (props) => {
    //Helper function that converts and returns a date object into a HH:MM string
    const timeToString = (hour, min) => {
        let dateObj = new Date(0, 0, 0, hour, min);
        return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
    };

    const [visible, setVisible] = useState(false);
    const [timeString, setTimeString] = useState(timeToString(props.hour, props.min));
    const { colors } = useTheme(); //THEME

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
                <Text style={{
                        color: props.label === "Start Time" ? colors.firstColor : colors.fifthColor //bad background colors here. Must match wiith below
                    }}
                >
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
                    icon={({color, size}) => (
                        <Icon 
                        name="clock" 
                        color={'white'}
                        size={size}
                        />
                    )}
                    mode="contained"
                    onPress={()=> setVisible(true)}
                    color='black'   //Changing to white changes to black for some reason 
                    style={{
                        backgroundColor: props.label === "Start Time" ? colors.firstColor : colors.fifthColor,      //bad background colors here
                    
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
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20
    },

});

export default TimePickerInput;
