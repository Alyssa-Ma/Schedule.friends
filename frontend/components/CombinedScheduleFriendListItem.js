import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Checkbox, Button, Paragraph, Dialog, Portal, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import UserListHeader from './UserListHeader';

const CombinedScheduleFriendListItem = ({ navigation, route, user }) => {

    return (

        <View>
            <Checkbox.Item label={user.username}/>
        </View>
       
    )
}

const styles = StyleSheet.create({

    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#5cdbd5',         //STATIC BACKGROUND
        borderBottomWidth: 1,
        borderColor: '#ccc',
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

export default CombinedScheduleFriendListItem;
