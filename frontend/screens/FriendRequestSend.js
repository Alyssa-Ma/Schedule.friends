import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AddFriend from '../components/AddFriend';
import SearchList from '../components/SearchList';
import UserContext from '../context/UserContext';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/native';

//the function that will be rendered
const FriendRequestSend = ({ navigation, route }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [incomingFriendReq, setIncomingFriendReq] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const context = useContext(UserContext);

    useFocusEffect(
        React.useCallback(() => {
            console.log('Entering Screen')

            const getInfo = async() =>{
                try{

                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_to_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    response = await response.json();
                    
                    let incomingFriend = [];
                    for(const req of response){
                        incomingFriend.push(req.from_user);
                    }

                    setIncomingFriendReq(incomingFriend);
                }
                catch(error){
                    console.error(error);
                }
            }

            getInfo();

            return () => {
                console.log("leaving screen!");
            };
        // Import that it's [], otherwise useFocusEffect may trigger endlessly while focused.
        }, [])
    )
    return (
        <View>
            <Searchbar
                placeholder="Enter a username"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {
                searchQuery.length >= 2
                    ? <SearchList query={searchQuery} incFriends={incomingFriendReq}/>
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