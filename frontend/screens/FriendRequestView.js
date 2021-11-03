import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import FriendRequest from '../components/FriendRequest';
import {BASE_URL} from "@env";
import Header from '../components/Header';
import UserContext from '../context/UserContext';

const FriendRequestView = ({ navigation, route }) => {

    //Sets the state items arr with dummy values
    const context = useContext(UserContext);
    const [items, setItems] = useState();

    useEffect(() => {

        async function getInfo(){

            try{
                let response = await fetch(`${BASE_URL}/${context.user.id}`, {
                    method: 'GET', // or 'PUT'
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                    },
                });

                response = await response.json();
                const friend_reqs = response.friend_requests;
                
                let friend_items = [];
                for(const id of friend_reqs){

                    response = await fetch(`${BASE_URL}/friend_requests/${id}`, {
                        method: 'GET', // or 'PUT'
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    response = await response.json();
                    
                    let friend_info = await fetch(`${BASE_URL}/${response.from_user}`, {
                        method: 'GET', // or 'PUT'
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    friend_info = await friend_info.json();
                    
                    const friend = {
                        id: response.id,
                        from_user: response.from_user,
                        f_name: friend_info.first_name,
                        l_name: friend_info.last_name
                    };

                friend_items.push(friend);    
            }

            setItems(friend_items);
            //console.log(items);
            

            }catch(error){
                console.log(error);
            }
        }
    
        getInfo();

    }, []);

    
    //reject using PATCH and DELETE request. remove from list
    const rejectFriend = (id) => {

        console.log(`Rejected Friend`);
        fetch(`${BASE_URL}/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${route.params.token}`
            },
            body: JSON.stringify({
              pending: false,
              accepted: false
            }),
        })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log('error: ', err))
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }

    //accept using PATCH and DELETE request. remove from list
    const acceptFriend = (id) => {

        console.log(`Accepted Friend`);
        fetch(`${BASE_URL}/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${route.params.token}`
            },
            body: JSON.stringify({
              pending: false,
              accepted: true
            }),
        })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log('error: ', err))

        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }
    return (
        <View style={styles.container}>
            {
                items === undefined || items.length === 0
                ? <Text>No incoming Friend Requests</Text>
                : <FlatList data={items} renderItem={({item}) => <FriendRequest item={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />
            }
            
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

export default FriendRequestView;
