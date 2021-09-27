import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleTimes = ({time, index}) => {

    return (
        <Text style={styles.times}> {time[index]}</Text>
    )
}


const TextViewCard = ({item}) => {

    const imgSource = {uri: item.picture};

    return (
        <View style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Image source={imgSource} style={styles.profilePic}/>
                <Text style={styles.name}>{item.name}</Text>
                {
                    item.times.map( (time, index) => {
                        return (
                            <ScheduleTimes time={item.times} index={index} style={styles.schedule}/>
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
        flexDirection: 'row',
        width: 350,
        alignSelf: 'center',
        marginTop: 50,
        shadowColor: '#ccc',
        
    },

    profilePic: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
    },

    name: {
        fontSize: 20,
        color: 'white',
    },

    times:{
        color: 'white',
        backgroundColor: 'brown',
        textAlign: 'center',
        width: 150,
        borderRadius: 50 / 2,
        marginTop: 10,
    },

    schedule: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
    
})
export default TextViewCard;