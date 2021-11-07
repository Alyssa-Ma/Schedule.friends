import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserListHeader from './UserListHeader';
const FriendRequestItem = ({friendRequest,  displayOptions, rejectFriend, acceptFriend}) => {

    return (
        <TouchableOpacity style={styles.friendRequest}>
            {
                displayOptions === "from_user"
                ? (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.to_user_data} />
                        <Icon name='cancel' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)}/>
                    </View>
                )
                : (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.from_user_data} />
                        <Icon name='close' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)}/>
                        <Icon name='check' size={30} color='#37ba0f'onPress={() => acceptFriend(friendRequest.id)}/>
                    </View>
                )
            }
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

    // profilePic: {
    //     width: 75,
    //     height: 75,
    //     borderRadius: 75/2,
    // },

    name: {
        fontSize: 20,
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    
})
export default FriendRequestItem;
