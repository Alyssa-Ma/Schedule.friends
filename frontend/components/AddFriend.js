import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';

const AddFriend = ({item}) => {

    const context = useContext(UserContext);

   

    const sendRequest = async (id) => {
        
        item.friend_status = 'FRIEND';
        const data = {
            from_user: context.user.id,   //CURRENT USER
            to_user: id
        }
        try {
            let postResponse = await fetch(`${BASE_URL}/friend_requests/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //This needs to be brought down from props
                    'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify(data),
            });
            postResponse = await postResponse.json();
            console.log(postResponse);
        }
        catch(error) {
            console.log(error);
        }
          

    }
   
    const imgSource = {uri: 'https://randomuser.me/api/portraits/men/1.jpg'};

    return (
        <TouchableOpacity style={styles.friendRequest}>
            <View style={styles.itemView}>
                <Image source={imgSource} style={styles.profilePic}/>
                <Text style={styles.name}>@{item.username}</Text>

                {
                    item.friend_status === 'NONE'
                    ? <Button mode='contained'  onPress={() => sendRequest(item.id)}> Send Request</Button>
                    : (item.friend_status === 'PENDING'
                        ? <Button mode='contained' disabled='true'> Pending</Button>
                        : <Button mode='contained' disabled='true'> Friended</Button>
                        )
                }
                
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({

    friendRequest : {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        
    },

    profilePic: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
    },

    name: {
        fontSize: 20,
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    
})

export default AddFriend;





/*
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    
                    <Dialog.Title>Friend Request Sent!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Friend request sent to {text}! They will see it in their friend requests!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
*/


/*

            //actual POST. Create the friend request
            //swap url with actual server when deployed
            fetch(`${BASE_URL}/friend_requests/`, {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify(data),
            })
            .then( response => response.json())
            .then( data => {
                console.log(data);     
            })
            .catch( error => {
                console.log(error);
            })

            */

            //showDialog();
        