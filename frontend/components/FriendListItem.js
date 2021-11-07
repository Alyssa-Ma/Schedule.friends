import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import UserListHeader from './UserListHeader';

const FriendListItem = ({ navigation, route, item, deleteFriend }) => {

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    // const [focusedView, setFocusedView] = useState(getFocusedRouteNameFromRoute(route))
    const delFriend = async (id) => {
        setVisible(false);
        await deleteFriend(id);
    }
    console.log(route)
    return (
        
        <TouchableOpacity style={styles.friendRequest}>
            <UserListHeader user={item} />
                {/* <Icon name='close' size={30} color='#900' onPress={showDialog} />

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Are You Sure?</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Pressing Yes will remove {item.f_name} {item.l_name} from your friends list.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button onPress={() => delFriend(item.id)}>Yes</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal> */}
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({

    friendRequest: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ccc',

    },

    // profilePic: {
    //     width: 75,
    //     height: 75,
    //     borderRadius: 75 / 2,
    // },

    name: {
        fontSize: 20,
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textInfo: {
        paddingLeft: 15
    }

})

export default FriendListItem;
