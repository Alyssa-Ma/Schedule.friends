import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import AddSchedule from '../components/AddSchedule';
import Header from '../components/Header';

const AddScheduleView = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Header text="Add Schedule"/>
            <AddSchedule/>
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
