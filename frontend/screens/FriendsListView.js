import React, {useContext, useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { Title, useTheme } from 'react-native-paper'
import FriendListItem from '../components/FriendListItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SnackBarContext from '../context/SnackBarContext';

const FriendsListView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext)
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            const getInfo = async() => {
                
                try {
                    let response = await fetch(`${BASE_URL}/${context.user.id}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });

                    const jsonResponse = await response.json();

                    if (response.status === 200) {

                        // Updates friend list if backend is different than context
                        if (context.user.friend_list.toString() !== jsonResponse.friend_list.toString()) {
                            let userTemp = {...context.user};
                            userTemp.friend_list = jsonResponse.friend_list;
                            context.setUser(userTemp)
                        }

                        //begin getting info from friend_list
                        let friendListData = [];
                        for(const id of jsonResponse.friend_list){
                            let friendFetch = await fetch(`${BASE_URL}/${id}`, {
                                method: 'GET', 
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${context.user.token}`
                                },
                            });
                            const friendData = await friendFetch.json();
                            if (friendFetch.status === 200)
                                friendListData.push(friendData);
                            else {
                                snackBarContext.setStatusText(`${friendFetch.status} Error: ${trimJSONResponse(JSON.stringify(friendData))}`);
                                snackBarContext.toggleSnackBar();
                            }    
                        }
                        setFriends(friendListData);
                        setLoading(false);
                    }
                    else {
                        snackBarContext.setStatusText(`${response.status} Error: ${trimJSONResponse(JSON.stringify(jsonResponse))}`);
                        snackBarContext.toggleSnackBar();
                        setLoading(false);
                    }
                }
                catch(error){
                    snackBarContext.setStatusText(`${error}`);
                    snackBarContext.toggleSnackBar();
                    setLoading(false);
                }
            }
            getInfo();
            return () => {
            };
        }, [])
    )   

    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (friends === undefined || friends.length === 0)
                    ? (
                        <View style={styles.noFriends}>
                            <Icon name="account-group" size={100} color={colors.firstColor}/>
                            <Title>Friend list is empty, find some friends!</Title>
                        </View>
                    )
                    : (
                        <FlatList 
                            data={friends}
                            keyExtractor={friend => friend.id}
                            renderItem={({item, index}) => <FriendListItem user={item} navigation={navigation} index={index} bgColor={colors.backgroundCardColors[index % colors.backgroundCardColors.length]}/>}
                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    noFriends: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
    }
});


export default FriendsListView;
