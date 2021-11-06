import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendListItem = ({ item, deleteFriend }) => {

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const delFriend = async (id) => {
        setVisible(false);
        await deleteFriend(id);
    }

    return (
        
        <TouchableOpacity style={styles.friendRequest}>
            <View style={styles.itemView}>
                <Avatar.Text
                        label={`${item.first_name.charAt(0).toUpperCase()}${item.last_name.charAt(0).toUpperCase()}`}
                        size={55}
                        />
                <View style={styles.textInfo}>
                    <Title style={styles.name}>{item.first_name} {item.last_name}</Title>
                    <Caption>{item.username}</Caption>
                </View>
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
            </View>
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
