import React, {useState, useContext} from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { Title, useTheme} from 'react-native-paper'
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
    const { colors } = useTheme();  //THEME

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
                                snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(friendReqData))}`);
                                snackBarContext.toggleSnackBar();
                                setLoading(false);
                            }   
                        }
                        setFriendRequests(friendReqData);
                        setLoading(false);
                    }
                    else {
                        snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(response.json()))}`);
                        snackBarContext.toggleSnackBar();
                        setLoading(false);
                    }
                }catch(error){
                    snackBarContext.setStatusText(`${error}`);
                    snackBarContext.toggleSnackBar();
                    setLoading(false);
                }
            }
            getIncomingFR();
            return () => {
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
                snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                snackBarContext.toggleSnackBar();
            }
        }
        catch(error){
            snackBarContext.setStatusText(`${error}`);
            snackBarContext.toggleSnackBar();
        }
    }

    //accept using PATCH and DELETE request. remove from list
    const acceptFriend = async (id) => {
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
            let jsonResponse = await response.json();
            if (response.status === 200){
                setFriendRequests(prevItems => {
                    return prevItems.filter(item => item.id != id);
                });
            }
            else {
                snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                snackBarContext.toggleSnackBar();
            }
        }
        catch(error){
            snackBarContext.setStatusText(`${error}`);
            snackBarContext.toggleSnackBar();
        }
        
    }
    
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (friendRequests === undefined || friendRequests.length === 0
                    ? (
                        <View style={styles.noRequests}>
                            <Icon name="account-group" size={100} color={colors.firstColor}/>
                            <Title >No Incoming Friend Requests</Title>
                        </View>

                    )
                    : <FlatList 
                        data={friendRequests}
                        keyExtractor={friendRequest => friendRequest.id} 
                        renderItem={({item, index}) => <FriendRequestItem friendRequest={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend} index={index} bgColor={colors.backgroundCardColors[index % colors.backgroundCardColors.length]} colors={colors}/>} />)
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
