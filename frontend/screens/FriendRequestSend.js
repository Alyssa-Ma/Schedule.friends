import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AddFriend from '../components/AddFriend';
import SearchList from '../components/SearchList';
//the function that will be rendered
const FriendRequestSend = ({ navigation, route }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View>
            <Searchbar
                placeholder="Enter a username"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {
                searchQuery.length > 3
                    ? <SearchList usernames={searchQuery}/>
                    : <Text> No users match that username</Text>
            }

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