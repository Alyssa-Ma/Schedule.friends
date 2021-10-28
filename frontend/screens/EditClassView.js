import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import EditClass from '../components/EditClass';
import Header from '../components/Header';

const EditClassView = ({ navigation, item, route }) => {

    const { itemId, 
        courseName, 
        courseNumber,
        timeStart, 
        timeEnd, 
        dayName,
        starthr,
        startmin,
        endhr,
        endmin 
        } = route.params;

    return (
        <View style={styles.container}>
            <EditClass itemId = {itemId}/>
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

export default EditClassView;
