import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserListHeader from './UserListHeader';
import UserContext from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddFriend = ({item}) => {

    const context = useContext(UserContext);
    const [buttonStatus, setButtonStatus] = useState(item.status === 'NONE' ? false : true)
    const [buttonInfo, setButtonInfo] = useState(item.status);
    const [loading, setLoading] = useState(false)
    //sends the friend request
    const sendRequest = async (id) => {   
        try {
            setLoading(true);
            let postResponse = await fetch(`${BASE_URL}/friend_requests/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify({
                    from_user: context.user.id,
                    to_user: id
                }),
            });
            let jsonResponse = await postResponse.json();
            if (postResponse.status === 201) {        
                setLoading(false);
                setButtonStatus(true);
                setButtonInfo('PENDING');
                item.status = 'PENDING';
            }
            else {
                console.log(`Error from server: ${postResponse.status}`);
                setLoading(false);
            }
        }
        catch(error) {
            console.log(error);
        }
        
    }
   

    //Lists the user as a list item
    //renders a button that reflects the status of the user's friend status in correlation to the curr user
    return (
        <TouchableOpacity style={styles.friendRequest}>
            <View style={styles.itemView}>
                <UserListHeader user={item} />
                {
                    buttonInfo === 'SAME'
                    ? <React.Fragment/>
                    :  (
                        <Button 
                            mode='contained'
                            loading={loading} 
                            onPress={() => sendRequest(item.id)}
                            disabled={buttonStatus}
                        >
                            <Icon 
                                name={
                                    buttonInfo === 'NONE'
                                    ? ('account-plus')
                                    : buttonInfo === 'PENDING'
                                        ? ('account-clock')
                                        : 'account-heart'
                                }
                                size={30}
                            />    
                        </Button>
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
        