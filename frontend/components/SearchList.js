import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import AddFriend from './AddFriend';

const SearchList = ({query, incFriends}) => {

    const [items, setItems] = useState([]);

    const context = useContext(UserContext);

    //gets the usernames that correlate to the query
    useEffect(() => {
        
        const getInfo = async () => {
            
            try{
                let response =  await fetch(`${BASE_URL}/?query=${query}`, {
                    method: 'GET', // or 'PUT'
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                    },
                });
                jsonResponse = await response.json();
                if (response.status === 200)
                {
                    let users = [];
                    for(const user of jsonResponse){
    
                        const userStatus = user.friend_list.includes(context.user.id) 
                            ? 'FRIEND'
                            :   (incFriends.includes(user.id)
                                ? 'PENDING'
                                : (user.id === context.user.id
                                    ? 'SAME'
                                    : 'NONE'));
    
                        const userInfo = {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            status: userStatus,
                            username: user.username
                        }
    
                        users.push(userInfo);
                    }
                    setItems(users);
                }
                else {
                    console.log(`Error from sever: ${response.status}`)
                }
                
            }
            catch(error){
                console.error(error);
            }
        }

        getInfo();

    }, [query])

    //renders each user found in AddFriend
    return (
        <FlatList data={items} renderItem={({item}) => <AddFriend item={item}/>} />
    )
}

export default SearchList;