import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

//Header function. Uses the prop title that has been passed
const AddFriend = ({title}) => {

    const [text, setText] = useState('');

    const onChange = textValue => {

        //console.log(textValue);
        setText(textValue);
    }
    const onPressBtn = async () => {
        
        //manipulate data here
        const data = {
            "from_user": 1,
            "to_user": 3
        };

        //actual POST
        /*
            //swap url with actual server when deployed
            fetch('http://127.0.0.1:8000/api/sf_users/friend_requests/', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              }).then( response => response.json())
              .then( data => {
                  console.log(data);
              })
              .catch( error => {
                  console.log(error);
              })
        */
        
        try {
            const resonse = await fetch('http://10.0.2.2:8000/api/sf_users/');
            console.log('why');
            const json = await resonse.json();
            console.log(json);
        } catch(error) {
            console.log(error);
        }
        

        
    }
   
    return (
        <View style={styles.container}>
            <TextInput placeholder="Add Email" style={styles.input} onChangeText={onChange}/>

            <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
                <Text style={styles.btnText}> Send Request</Text>
            </TouchableOpacity>

        </View>
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