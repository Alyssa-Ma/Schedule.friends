import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import TextViewCard from '../components/TextViewCard';
import Header from '../components/Header';

const CommonTimeText = () => {

    //Sets the state items arr with dummy values
    const [items, setItems] = useState([
        {id: 1, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men/1.jpg'},
        {id: 2, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/women/64.jpg'},
        {id: 3, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men/7.jpg'}
    ])


    return (
        <View style={styles.container}>
            <Header title={`Who's free today`}/>
            <FlatList data={items} renderItem={({item}) => <TextViewCard item={item} />} />
        </View>
    )

}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

});

export default CommonTimeText;