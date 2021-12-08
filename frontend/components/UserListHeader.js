import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';

const UserListHeader = ({ navigation, route, user, textColor, bgColor}) => {
    return (
        <View style={styles.itemView}>
            <Avatar.Text
                label={`${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`}
                size={55}
                color={textColor || 'blue'}     //default bad colors to see if any other things use this
                backgroundColor={bgColor || 'black'}
                />
            <View style={styles.textInfo}>
                <Title style={styles.name}>{user.first_name} {user.last_name}</Title>
                <Caption style={styles.username}>{user.username}</Caption>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    name: {
        fontSize: 21,
        color: 'white'
    },

    username: {
        fontSize: 15,
        color: 'white'
    },  

    itemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textInfo: {
        paddingLeft: 15,
        
    }

})

export default UserListHeader;
