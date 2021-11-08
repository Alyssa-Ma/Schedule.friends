import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleTimes = ({time, index}) => {
    return (
        <Text style={styles.times}> {time[index]}</Text>
    )
}


const TextViewCard = ({item}) => {

    return (
        <View style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Avatar.Text 
                        size = {80} 
                        backgroundColor = 'turquoise'
                        label = {item.f_name.charAt(0)+item.l_name.charAt(0)}
                        style={styles.profilePic}
                />
                <Text style={styles.name}>{item.f_name} {item.l_name}</Text>
                {
                    item.schedule.map( (time, index) => {
                        return (
                            <ScheduleTimes time={item.schedule} index={index} style={styles.schedule} key={index}/>
                        )
                    })
                }
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    friendRequest : {
        padding: 15,
        backgroundColor: 'darkslateblue',
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        alignSelf: 'center',
        width: 250,
        marginTop: 50,
        shadowColor: '#ccc',
        
    },

    profilePic: {
        alignSelf: 'center',
    },

    name: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
    },

    times:{
        color: 'white',
        backgroundColor: 'brown',
        textAlign: 'center',
        width: 175,
        borderRadius: 50 / 2,
        marginTop: 10,
    },

    schedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
    
})
export default TextViewCard;