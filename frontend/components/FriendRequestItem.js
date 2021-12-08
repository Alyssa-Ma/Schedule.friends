import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserListHeader from './UserListHeader';
const FriendRequestItem = ({friendRequest,  displayOptions, rejectFriend, acceptFriend, index, bgColor, colors}) => {
    return (
        <TouchableOpacity style={[styles.friendRequest, {backgroundColor: bgColor}]}>
            {
                displayOptions === "from_user"
                ? (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.to_user_data}  textColor={bgColor} bgColor='white'/>
                        <Icon name='cancel' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)} style={[styles.button, {backgroundColor: colors.firstColor}]}/>
                                                                                                                     <>{/*Need to change these colors to something that stands out*/}</>
                    </View>
                )
                : (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.from_user_data} textColor={bgColor} bgColor='white'/>
                        <Icon name='close' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)} style={[styles.button, {backgroundColor: colors.firstColor}]}/>
                        <Icon name='check' size={30} color='#37ba0f'onPress={() => acceptFriend(friendRequest.id)} style={[styles.button, {backgroundColor: colors.firstColor}]}/>
                                                                                                                                    <>{/*Need to change these colors to something that stands out*/}</>
                    </View>
                )
            }
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({

    friendRequest : {
        padding: 15,
        
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40 / 2,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    button: {
        borderRadius: 50 / 2,
        borderWidth: 1,
        alignSelf: 'flex-end',
        marginBottom: -10
    }
    
})
export default FriendRequestItem;
