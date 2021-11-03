import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';

const AddFriend = ({title, route}) => {

    const context = useContext(UserContext);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const onChange = textValue => {
        setText(textValue);
    }

    const onPressBtn = async () => {
        
        showDialog();

        //GET friend info based on user input
        let friend_json;
        try {
            const resonse = await fetch(`${BASE_URL}/?query=${text}`, {
                method: 'GET', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${context.user.token}`
                },
            });
            friend_json = await resonse.json();
            
        } catch(error) {
            console.log(error);
        }

        const friend_id = friend_json[0].id;

        const data = {
            from_user: context.user.id,   //CURRENT USER
            to_user: friend_id
        }

        //actual POST. Create the friend request
        //swap url with actual server when deployed
        fetch(`${BASE_URL}/friend_requests/`, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${context.user.token}`
            },
            body: JSON.stringify(data),
        }).then( response => response.json())
        .then( data => {
            console.log(data);
        })
        .catch( error => {
            console.log(error);
        })
         
    }
   
    return (

        <Provider>
        <View style={styles.container}>
            <TextInput placeholder="Enter Username" style={styles.input} onChangeText={onChange}/>
            
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
            
            <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
                <Text style={styles.btnText}> Send Request</Text>
            </TouchableOpacity>

        </View>

        </Provider>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    input: {
        borderWidth: 1,
        width: 240,
        borderColor: '#ccc'
    },

    btn: {
        marginTop: 30,
        backgroundColor: 'darkslateblue',
        height: 40,
        width: 120,
        borderRadius: 40/2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnText: {
        color: '#fff'
    }



})
export default AddFriend;
