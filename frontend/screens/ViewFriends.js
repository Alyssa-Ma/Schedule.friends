import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import Friend from '../components/Friend';

const ViewFriends = () => {

    const context = useContext(UserContext);
    const [items, setItems] = useState();
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
                    response = response.friend_list;

                    let friend_list = [];
                    for(const id of response){

                        let friend_info = await fetch(`${BASE_URL}/${id}`, {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${context.user.token}`
                            },
                        });
                        friend_info = await friend_info.json();
                        
                        const friend = {
                            id: friend_info.id,
                            f_name: friend_info.first_name,
                            l_name: friend_info.last_name
                        };
    
                        friend_list.push(friend);    
                    }

                    setItems(friend_list);
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
        // Import that it's [], otherwise useFocusEffect may trigger endlessly while focused.
        }, [])
    )


    //reject using PATCH and DELETE request. remove from list
    const deleteFriend = async (id) => {

        console.log(`deleted Friend`);
        try{
            let response = await fetch(`${BASE_URL}/friend_requests/${context.user.id}/remove/${id}`, {
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
        
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }
    return (
        <View>
            {
                loading
                ?   <Text>Loading.....</Text>
                :   (items === undefined || items.length === 0
                    ? <Text>No incoming Friend Requests</Text>
                    : <FlatList data={items} renderItem={({item}) => <Friend item={item}/>} />)
            }
        </View>
    )
}

export default ViewFriends;