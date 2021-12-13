import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import UserListHeader from './UserListHeader';
const FriendRequestItem = ({friendRequest,  displayOptions, rejectFriend, acceptFriend, index, bgColor, colors}) => {
    return (
        <TouchableOpacity style={[styles.friendRequest, {backgroundColor: bgColor}]}>
            {
                displayOptions === "from_user"
                ? (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.to_user_data}  textColor={bgColor} bgColor='white'/>
                        <IconButton 
                            icon='close-circle-outline' 
                            size={40} color='#900' 
                            onPress={() => rejectFriend(friendRequest.id)} 
                            style={[styles.button]}/>
                                                                                                                     
                    </View>
                )
                : (
                    <View style={styles.itemView}>
                        <UserListHeader user={friendRequest.from_user_data} textColor={bgColor} bgColor='white'/>
                        <IconButton 
                            icon='close-circle-outline' 
                            size={40} 
                            color='#900' 
                            onPress={() => rejectFriend(friendRequest.id)} 
                            style={[styles.button]}/>
                        <IconButton 
                            icon='check-circle-outline' 
                            size={40} 
                            color='#37ba0f'
                            onPress={() => acceptFriend(friendRequest.id)} 
                            style={[styles.button]}/>
                                                                                                                                   
                    </View>
                )
            }
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    friendRequest : {
        padding: 15,
        borderRadius: 20,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: -10
    }
    
})
export default FriendRequestItem;
