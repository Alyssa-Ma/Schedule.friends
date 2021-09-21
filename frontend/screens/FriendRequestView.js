import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import FriendRequest from '../components/FriendRequest';
import Header from '../components/Header';
const FriendRequestView = () => {

    const [items, setItems] = useState([
        {id: 1, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men'},
        {id: 2, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men'},
        {id: 3, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men'}
    ])


    return (
        <View style={styles.container}>
            <Header title='Friend Requests'/>
            
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },
    text: {
        color: 'darkslateblue',
        fontSize: 30,
    },
});
export default FriendRequestView;