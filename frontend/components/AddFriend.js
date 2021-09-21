import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

//Header function. Uses the prop title that has been passed
const AddFriend = ({title}) => {

    const [text, setText] = useState('');

    const onChange = textValue => {

        //console.log(textValue);
        setText(textValue);
    }
    const onPressBtn = () => {
        console.log(text);
        //Alert.alert('Added', 'Sent a request', {text: 'OK'});
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