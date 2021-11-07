import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import FriendListItem from '../components/FriendListItem';
import LoadingIndicator from '../components/LoadingIndicator';

// console.log("headerheight");
const FriendsListView = () => {

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

    //reject using DELETE request. remove from list
    const deleteFriend = async (id) => {

        console.log(`deleted Friend`);
        try{
            let response = await fetch(`${BASE_URL}/${context.user.id}/remove/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${context.user.token}`
                },
            });

            response = await response.json();
        }
        catch (error){
            console.error(error);
        }
        //needs to set userContext
        setFriends(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }

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
                        renderItem={({item}) => <FriendListItem item={item} deleteFriend={deleteFriend}/>} 
                    />)
            }
        </View>
    )
}

export default FriendsListView;
