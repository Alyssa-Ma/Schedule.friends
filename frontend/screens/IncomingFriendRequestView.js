import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import FriendRequestItem from '../components/FriendRequestItem';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

const IncomingFriendRequestView = ({ navigation, route }) => {

    //Sets the state items arr with dummy values
    const context = useContext(UserContext);
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            console.log("entered screen!");

            async function getIncomingFR(){
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_to_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    const friend_reqs = await response.json();
                    
                    let friend_items = [];
                    for(const req of friend_reqs){
                        
                        let friend_info = await fetch(`${BASE_URL}/${req.from_user}`, {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${context.user.token}`
                            },
                        });
                        friendData = await friend_info.json();
    
                    friend_items.push(friendData);    
                }
    
                setItems(friend_items);
                setLoading(false);
                
                }catch(error){
                    console.log(error);
                    setLoading(true);
                }
            }
        
            getIncomingFR();

            return () => {
                console.log("leaving screen!");
            };
        }, [])
    )
    
    //reject using PATCH and DELETE request. remove from list
    const rejectFriend = async (id) => {

        console.log(`Rejected Friend`);
        try{
            let response = await fetch(`${BASE_URL}/friend_requests/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify({
                  pending: false,
                  accepted: false
                }),
            });

            response = await response.json();
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }

    //accept using PATCH and DELETE request. remove from list
    const acceptFriend = async (id) => {

        console.log(`Accepted Friend`, id);

        
        try{
            let response = await fetch(`${BASE_URL}/friend_requests/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify({
                  pending: false,
                  accepted: true
                }),
            });
            response = await response.json();
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
        
        

        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });

    }
    return (
        <View style={styles.container}>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (items === undefined || items.length === 0
                    ? <Text>No incoming Friend Requests</Text>
                    : <FlatList data={items} renderItem={({item}) => <FriendRequestItem item={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />)
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

export default IncomingFriendRequestView;
