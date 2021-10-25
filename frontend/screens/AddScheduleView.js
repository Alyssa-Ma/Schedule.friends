import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import Header from '../components/Header';

const AddScheduleView = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <CourseForm
                courseName = {""}
                courseNumber = {""}
                startHour = {0}
                startMin = {0}
                endHour = {0}
                endMin = {0}
                selectedDays = {[]}
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
