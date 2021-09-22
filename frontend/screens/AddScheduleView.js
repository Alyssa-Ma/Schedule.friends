import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import AddSchedule from '../components/AddSchedule';

const AddScheduleView = () => {

    return (
        <View style={styles.container}>
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
