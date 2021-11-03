import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import FriendRequest from '../components/FriendRequest';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const FriendRequestView = ({ navigation, route }) => {

    //Sets the state items arr with dummy values
    const context = useContext(UserContext);
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            console.log("entered screen!");

            async function getInfo(){
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_to_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    response = await response.json();
                    
                    const friend_reqs = response;
                    
                    let friend_items = [];
                    for(const req of friend_reqs){
                        
                        let friend_info = await fetch(`${BASE_URL}/${req.from_user}`, {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${context.user.token}`
                            },
                        });
                        friend_info = await friend_info.json();
                        
                        const friend = {
                            id: req.id,
                            from_user: req.from_user,
                            f_name: friend_info.first_name,
                            l_name: friend_info.last_name
                        };
    
                    friend_items.push(friend);    
                }
    
                setItems(friend_items);
                setLoading(false);
                
                }catch(error){
                    console.log(error);
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
    const rejectFriend = (id, from_user) => {

        console.log(`Rejected Friend`);
        fetch(`${BASE_URL}/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${context.user.token}`
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
    const acceptFriend = (id, from_user) => {

        console.log(`Accepted Friend`);
        fetch(`${BASE_URL}/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${context.user.token}`
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

        /*
        // Since a user's friend list can change based on other user's actions
        // (such as accepting incoming requests or removing a friend),
        // we'll take this as an opportunity to update our friend_list from
        // the backend
        let userTemp = {...context.user};
        userTemp.friend_list.push(from_user);
        context.setUser(userTemp)
        */
    }
    return (
        <View style={styles.container}>
            {
                loading
                ?   <Text>Loading.....</Text>
                :   (items === undefined || items.length === 0
                    ? <Text>No incoming Friend Requests</Text>
                    : <FlatList data={items} renderItem={({item}) => <FriendRequest item={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />)
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
