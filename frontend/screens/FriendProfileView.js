import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import UserContext from '../context/UserContext';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator, useTheme } from 'react-native-paper';

import UserInfo from '../components/UserInfo';
import CourseItem from '../components/CourseItem';

import { BASE_URL } from "@env";

const FriendProfileView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const { friend } = route.params;
    const [loadingButton, setLoadingButton] = useState(false);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const { colors } = useTheme();
    const deleteFriend = async () => {
        setLoadingButton(true);
        try {
            let response = await fetch(`${BASE_URL}/${context.user.id}/remove/${friend.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                },
            });
            if (response.status === 200) {
                let jsonResponse = await response.json();
                let tempUser = { ...context.user }
                tempUser.friend_list.splice(tempUser.friend_list.findIndex((element) => element === friend.id), 1);
                context.setUser(tempUser);
                console.log(`Unadded ${friend.username}!`);
                navigation.pop();
            }
            else {
                console.log(`Error from server status ${response.status}`)
            }
        }
        catch (error) {
            console.error(error);
        }
        setLoadingButton(false);
    }

    return (

        <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundColor }]}>

            <View style={[styles.friendCard, { backgroundColor: colors.firstColor }]}>

                <View style={{marginLeft: 20}}>
                    <UserInfo user={friend} color={colors.firstColor} bgColor={colors.firstColor}/>
                </View>
                <View style={styles.buttonRow}>
                    <Button icon="account-remove" color={colors.thirdColor} labelStyle={{ color: 'white' }} onPress={() => showDialog()} mode="contained">Unfriend</Button>
                    <Button icon="arrow-left-circle" color={colors.secondColor} labelStyle={{ color: 'white' }} onPress={() => navigation.pop()} mode="contained">Go Back</Button>
                </View>

                <Portal>
                    {
                        loadingButton
                            ? (
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Content>
                                        <ActivityIndicator animating={loadingButton} size={100} />
                                    </Dialog.Content>
                                </Dialog>
                            )
                            : (
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title>Are You Sure?</Dialog.Title>
                                    <Dialog.Content>
                                        <Paragraph>Pressing 'Yes' will remove {friend.first_name} {friend.last_name} from your friends list. This cannot be undone.</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={hideDialog}>Cancel</Button>
                                        <Button onPress={deleteFriend}>Yes</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            )
                    }
                </Portal>
                <View style={styles.listWrapper}>
                    <FlatList data={friend.schedule}
                        keyExtractor={course => course.id}
                        renderItem={({ item }) => <CourseItem item={item} navigation={navigation} />} />
                </View>

            </View>
        </SafeAreaView>

    );
}

export default FriendProfileView;

const styles = StyleSheet.create({

    friendCard: {
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 50 / 2
    },
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    listWrapper: {
        marginTop: 10,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    listItemText: {
        color: '#777777',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
