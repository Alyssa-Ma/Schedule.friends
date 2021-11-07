import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { Title } from 'react-native-paper'
import FriendRequestItem from '../components/FriendRequestItem';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

const IncomingFriendRequestView = ({ navigation, route }) => {

    //Sets the state items arr with dummy values
    const context = useContext(UserContext);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            async function getIncomingFR(){
                setLoading(true);
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_to_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });

                    if (response.status === 200) {
                        const friendReqData = await response.json();
                        for(const friendRequest of friendReqData){
                            
                            let response = await fetch(`${BASE_URL}/${friendRequest.from_user}`, {
                                method: 'GET', 
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${context.user.token}`
                                },
                            });
                            if (response.status === 200) {
                                friendRequest['from_user_data'] = await response.json();
                            }
                            else {
                                console.log(`Error from server ${response.status}`);
                                setLoading(false);
                            }   
                        }
                        setFriendRequests(friendReqData);
                        setLoading(false);
                    }
                    else {
                        console.log(`Error from server ${response.status}`);
                        setLoading(false);
                    }
                }catch(error){
                    console.log(error);
                    setLoading(false);
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
            let jsonResponse = await response.json();
            if (response.status === 200){
                getIncomingFR();
            }
            else {

            }
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
                :   (friendData === undefined || friendData.length === 0
                    ? <Title>No incoming Friend Requests</Title>
                    : <FlatList 
                        data={friendRequests}
                        keyExtractor={friendRequest => friendRequest.id} 
                        renderItem={({item}) => <FriendRequestItem friendRequest={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />)
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
