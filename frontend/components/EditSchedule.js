import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditSchedule = ({item}) => {


    return (
        <TouchableOpacity onPress={() => Alert.alert( 'Under Construction... Navigates to the Edit Schedule Screen', ) } style={styles.Block}>
            <View>
                <Text style={styles.classTitle}>{item.classTitle}</Text>
                <Text style={styles.timeFont}>{item.startTime}{'  -  '}{item.endTime}</Text>
            
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({

    Block : {
        borderRadius:6,
        elevation: 3,
        backgroundColor: '#bed4f7',
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,


    },

    classTitle: {
        fontSize: 25,
        color: 'black',
    },

    timeFont: {
        fontSize: 15,
        color: 'grey',
    },

    
})
export default EditSchedule;