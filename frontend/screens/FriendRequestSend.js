import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


//the function that will be rendered
const FriendRequestSend = () => {
    return (
        <View style={styles.container}>
            <Header title='Send a Friend Request'/>
        </View>
    );
}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

});

//eporting the funtion that will be rendered
export default FriendRequestSend;