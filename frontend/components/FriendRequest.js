import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FriendRequest = ({item}) => {

    const imgSource = {uri: item.picture};

    return (
        <TouchableOpacity style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Image source={imgSource} style={styles.profilePic}/>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    friendRequest : {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },

    profilePic: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
    },

    name: {
        fontSize: 20,
    }
    
})
export default FriendRequest;