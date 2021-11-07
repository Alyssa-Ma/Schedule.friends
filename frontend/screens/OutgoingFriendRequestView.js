import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { Title } from 'react-native-paper'
import FriendRequestItem from '../components/FriendRequestItem';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_from_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });

                    if (response.status === 200) {
                        const friendReqData = await response.json();
                        
                        for(const friendRequest of friendReqData){
                            
                            let response = await fetch(`${BASE_URL}/${friendRequest.to_user}`, {
                                method: 'GET', 
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${context.user.token}`
                                },
                            });
                            if (response.status === 200) {
                                friendRequest['to_user_data'] = await response.json();
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
                setFriendRequests(prevItems => {
                    return prevItems.filter(item => item.id != id);
                });
            }
            else {
                console.log(`Error from server: ${response.status}`)
            }
        }
        catch(error){
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (friendRequests === undefined || friendRequests.length === 0
                    ? (
                        <View style={styles.noRequests}>
                            <Icon name="account-group" size={100} color="#6200EE"/>
                            <Title >No Incoming Friend Requests</Title>
                        </View>

                    )
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

    noRequests: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
    }
});

export default IncomingFriendRequestView;
