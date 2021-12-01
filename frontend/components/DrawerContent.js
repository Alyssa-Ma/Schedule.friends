import React from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserListHeader from './UserListHeader';
import {Drawer, Text, TouchableRipple, Switch, Avatar, Title, Caption} from 'react-native-paper';

const DrawerContent = (props) => {
    return(
        <View styles={styles.drawerContainer}>
             <Avatar.Text
                
                label={`${props.user.first_name.charAt(0).toUpperCase()}${props.user.last_name.charAt(0).toUpperCase()}`}
                size={55}
                color='turquoise'
                backgroundColor='white'
                />
        </View>
    )
}

const styles = StyleSheet.create({

    drawerContainer: {
        flex: 1,
        backgroundColor: 'black'
    },

})

export default DrawerContent;