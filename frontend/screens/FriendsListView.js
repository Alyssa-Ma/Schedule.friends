import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import FriendListItem from '../components/FriendListItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { Button } from 'react-native-paper';

const FriendsListView = ({navigation, route}) => {

    const context = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {

            setLoading(true);
            const getInfo = async() => {
                
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    response = await response.json();
                    
                    if (context.user.friend_list !== response.friend_list) {
                        let userTemp = {...context.user};
                        userTemp.friend_list = response.friend_list;
                        context.setUser(userTemp)
                    }

                    let friendListData = [];
                    for(const id of response.friend_list){

                        let friendFetch = await fetch(`${BASE_URL}/${id}`, {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${context.user.token}`
                            },
                        });
                        const friendData = await friendFetch.json();
    
                        friendListData.push(friendData);    
                    }

                    setFriends(friendListData);
                    setLoading(false);
                }
                catch(error){
                    console.error(error);
                }
            }

            getInfo();

            return () => {
                console.log("leaving screen!");
            };
        }, [])
    )   

    return (
        <View>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (friends === undefined || friends.length === 0
                    ? <Text>No Friends</Text>
                    : <FlatList 
                        data={friends}
                        keyExtractor={friend => friend.id}
                        renderItem={({item}) => <FriendListItem user={item} navigation={navigation}/>} 
                    />)
            }
        </View>
    )
}

export default FriendsListView;
