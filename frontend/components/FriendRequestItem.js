import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
                        <Icon name='close-circle-outline' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)} style={[styles.button]}/>
                                                                                                                     
                    </View>
                )
                : (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.from_user_data} textColor={bgColor} bgColor='white'/>
                        <Icon name='close-circle-outline' size={30} color='#900' onPress={() => rejectFriend(friendRequest.id)} style={[styles.button]}/>
                        <Icon name='check-circle-outline' size={30} color='#37ba0f'onPress={() => acceptFriend(friendRequest.id)} style={[styles.button]}/>
                                                                                                                                   
                    </View>
                )
            }
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    friendRequest : {
        padding: 15,
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
        alignSelf: 'flex-end',
        marginBottom: -10
    }
    
})
export default FriendRequestItem;
