import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserListHeader from './UserListHeader';

const FriendListItem = ({ navigation, route, user, bgColor }) => {

    return (
        
        <TouchableOpacity 
            style={[styles.friendItem, {backgroundColor: bgColor}]}
            onPress={() => navigation.push('FriendProfileView', {
                friend: user})}>
            <UserListHeader user={user} textColor={bgColor} bgColor='white'/>
            <View style={styles.accountIcon}>
                <Icon
                    name="account-details"
                    size={45}
                    color="white"
                />
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 40 / 2,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
    },

    accountIcon: {
        alignSelf: 'flex-end',
        marginBottom: -15
    }
})

export default FriendListItem;
