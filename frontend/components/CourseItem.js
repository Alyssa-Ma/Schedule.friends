import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import {Card} from 'react-native-paper';
import UserContext from '../context/UserContext';

const CourseItem = ({navigation, item}) => {
    const context = useContext(UserContext);

    console.log(item.course_name);
    const clickedItem = (item) => {

        const starttimesplit = item.time_start.split(':', 2);
        const endtimesplit = item.time_end.split(':', 2);

        stime = starttimesplit;
        etime = endtimesplit;
        //console.log(stime[0], ":", stime[1]);
        //console.log(etime[0], ":", etime[1]);

        navigation.push('EditClassView', {
            itemId:item.id, 
            courseName: item.course_name,
            courseNumber: item.course_number,
            timeStart: item.time_start,
            timeEnd: item.time_end,
            dayName: item.day_name,
            starthr:stime[0],
            startmin:stime[1],
            endhr:etime[0],
            endmin:etime[1]

        })
    }

    //const [shr, setshr] = useState([]);




    //const test = "12:31";
    //const res = test.split(':', 2);
   // console.log("yut");

    return (
        <TouchableOpacity onPress={ () => clickedItem(item)} style={styles.Block}>
            <View>
                <Text style={styles.classTitle}>{item.course_name}{' '}{item.course_number}</Text>
                <Text style={styles.timeFont}>
                {'Days: '}
                {item.day_name[0]}{' '}
                {item.day_name[1]}{' '}
                {item.day_name[2]}{' '}
                {item.day_name[3]}{' '}
                {item.day_name[4]}{' '}
                {item.day_name[5]}{' '}
                {item.day_name[6]}
                </Text>

                <Text style={styles.timeFont}>
                    {'Time: '}
                    {item.time_start}{'  -  '}
                    {item.time_end}
                </Text>
            
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
export default CourseItem;
