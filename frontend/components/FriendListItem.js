import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import UserListHeader from './UserListHeader';

const FriendListItem = ({ navigation, route, user }) => {

    return (
        
        <TouchableOpacity style={styles.friendItem}
            onPress={() => navigation.push('FriendProfileView', {
                friend: user})}>
            <UserListHeader user={user} />
            <View style={styles.accountIcon}>
                <Icon
                    
                    name="account-details"
                    size={45}
                    color="#6200EE"
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
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40 / 2,
        width: 350,
        alignSelf: 'center',
        marginTop: 15
    },

    accountIcon: {
        alignSelf: 'flex-end'
    }
})

export default FriendListItem;
