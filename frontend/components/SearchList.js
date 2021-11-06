import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import AddFriend from './AddFriend';

const SearchList = ({query, incFriends}) => {

    const [items, setItems] = useState([]);

    const context = useContext(UserContext);

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
                response = await response.json();
                let users = [];
                for(const user of response){

                    const isFriend = user.friend_list.includes(context.user.id) 
                        ? 'FRIEND'
                        :   (incFriends.includes(user.id)
                            ? 'PENDING'
                            : 'NONE');

                    const userInfo = {
                        id: user.id,
                        f_name: user.first_name,
                        l_name: user.last_name,
                        friend_status: isFriend,
                        username: user.username
                    }

                    users.push(userInfo);
                }
                setItems(users);
                
            }
            catch(error){
                console.error(error);
            }
            

            console.log(items);
        }

        getInfo();

    }, [query])
    return (
        <FlatList data={items} renderItem={({item}) => <AddFriend item={item}/>} />
    )
}

export default SearchList;