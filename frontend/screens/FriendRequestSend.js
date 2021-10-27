import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import AddFriend from '../components/AddFriend';

//the function that will be rendered
const FriendRequestSend = ({ navigation, route }) => {

    console.log(route.params, 'FRIEND REQ SEND');
    return (
        <View style={styles.container}>
            <AddFriend style={styles.addfriend}/>
        </View>
    );
}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

    addfriend: {

    }

});

//eporting the funtion that will be rendered
export default FriendRequestSend;