import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import AddSchedule from '../components/AddSchedule';
import Header from '../components/Header';

const AddScheduleView = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <AddSchedule
                courseName = {"Capstone"}
                courseNumber = {"CSCI499"}
                startHour = {15}
                startMin = {0}
                endHour = {17}
                endMin = {0}
                selectedDays = {["MON", "WED"]}
            />
        </View>
    )

}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

});

export default AddScheduleView;
