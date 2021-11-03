import React, {useState} from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleTimes = ({time, index}) => {
    return (
        <Text style={styles.times}> {time[index]}</Text>
    )
}


const TextViewCard = ({item}) => {

    const imgSource = {uri: 'https://randomuser.me/api/portraits/men/1.jpg'};

    return (
        <View style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Image source={imgSource} style={styles.profilePic}/>
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
        width: 75,
        height: 75,
        borderRadius: 75/2,
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