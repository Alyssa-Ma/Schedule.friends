import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import UserContext from '../context/UserContext';

const CourseItem = ({navigation, item, bgColor}) => {
    const context = useContext(UserContext);

    const convertTo12Hr = (time) => {
        const timeParts = time.split(':');
        const amOrpm = parseInt(timeParts[0]) >= 12 ? 'PM' : 'AM';
        let hours = (parseInt(timeParts[0]) % 12) || 12;
        hours = (parseInt(hours) < 10) ? + hours : hours;
        return `${hours}:${timeParts[1]} ${amOrpm}`;
    }

    const clickedItem = (item) => {

        const starttimesplit = item.time_start.split(':', 2);
        const endtimesplit = item.time_end.split(':', 2);
        stime = starttimesplit;
        etime = endtimesplit;
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

    return (
        <TouchableOpacity
            disabled={item.owner !== context.user.id}
            onPress={ (item.owner === context.user.id)
                        ? () => clickedItem(item)
                        : () => {}} 
            style={[(item.owner === context.user.id) 
                    ? styles.userView 
                    : styles.friendView,
                    {backgroundColor: bgColor}]}>
            <View style={[styles.courseInfoRow]}>

                <View >
                    <Text style={[styles.classTitle]} ellipsizeMode='tail' numberOfLines={1}>{item.course_name}</Text>
                    <Text style={{color:"white"}}>{item.course_number}</Text>
                </View>
                <View style={[styles.dayTimeCol]}>

                    <Text numberOfLines={1} style={[styles.timeFont]}>
                    {
                        item.day_name.map( (day, index) =>
                            {
                                if(index === item.day_name.length-1)
                                    return day;
                                
                                return day + ' ';
                            }
                        )
                    }
                    </Text>

                    <Text style={[styles.timeFont]}>
                        {convertTo12Hr(item.time_start)}
                        {' - '}
                        {convertTo12Hr(item.time_end)}
                    </Text>

                </View>
            
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    userView : {
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        
        marginTop: 15,
        padding: 15,
        width: 350,
        alignSelf: 'center',
        width: 350,
        borderRadius: 40 / 2,
        flex: 1
    },
    friendView : {
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        
        paddingHorizontal: 20,
        width: 350,
        alignSelf: 'center',
        width: 350,
        borderRadius: 40 / 2,
        flex: 1
    },
    courseInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
    },

    dayTimeCol: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        maxWidth: 140
    },

    classTitle: {
        fontSize: 20,
        color: 'white',
        maxWidth: 180
    },

    timeFont: {
        fontSize: 15,
        color: 'white',
    },

    
    

    
})
export default CourseItem;
