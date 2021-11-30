import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Checkbox, Button, Paragraph, Dialog, Portal, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import UserListHeader from './UserListHeader';

const CombinedScheduleFriendListItem = ({ navigation, route, user, selectedUsersListener, init, index, color }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (init)
            setChecked(true);
    }, [])
    return (
        <View>
            <Checkbox.Item
                color={color}
                label={user.username}
                status={checked ? 'checked': 'unchecked'}
                onPress={() => setChecked(selectedUsersListener(index))}
            />
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
