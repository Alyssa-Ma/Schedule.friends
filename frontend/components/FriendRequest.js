import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendRequest = ({item, rejectFriend, acceptFriend}) => {

    //console.log(item);
    const imgSource = {uri: 'https://randomuser.me/api/portraits/men/1.jpg'};

    return (
        <TouchableOpacity style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Image source={imgSource} style={styles.profilePic}/>
                <Text style={styles.name}>{item.f_name} {item.l_name}</Text>
                <Icon name='close' size={30} color='#900' onPress={() => rejectFriend(item.id)}/>
                <Icon name='check' size={30} color='#37ba0f'onPress={() => acceptFriend(item.id)}/>
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
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    
})
export default FriendRequest;