import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import TextViewCard from '../components/TextViewCard';
import Header from '../components/Header';

const CommonTimeText = ({ navigation }) => {

    //Sets the state items arr with dummy values
    const [items, setItems] = useState([
        {id: 1, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men/1.jpg', times: ['11:00am-12:00pm', '2:00pm-3:30pm', '4:00pm-5:00pm']},
        {id: 2, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/women/64.jpg', times: ['1:00pm-2:00pm', '3:30pm-4:10pm']},
        {id: 3, name: 'FName LName', picture: 'https://randomuser.me/api/portraits/men/7.jpg', times: ['2:00pm-3:30pm']}
    ])


    return (
        <View style={styles.container}>
            <FlatList data={items} style={styles.outerCard} renderItem={({item}) => <TextViewCard item={item} />} />
        </View>
    )

}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

    outerCard: {
        
    }

});

export default CommonTimeText;