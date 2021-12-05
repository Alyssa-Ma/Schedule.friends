import React, {useContext, useState} from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { Title, useTheme } from 'react-native-paper'
import FriendListItem from '../components/FriendListItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendsListView = ({navigation, route}) => {

    const context = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

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
                    
                    if (context.user.friend_list !== response.friend_list) {
                        let userTemp = {...context.user};
                        userTemp.friend_list = response.friend_list;
                        context.setUser(userTemp)
                    }

                    let friendListData = [];
                    for(const id of response.friend_list){

                        let friendFetch = await fetch(`${BASE_URL}/${id}`, {
                            method: 'GET', 
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${context.user.token}`
                            },
                        });
                        const friendData = await friendFetch.json();
    
                        friendListData.push(friendData);    
                    }

                    setFriends(friendListData);
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
        }, [])
    )   

    return (
        <View style={styles.container}>
            {
                loading
                ?   <LoadingIndicator isLoading={loading} />
                :   (friends === undefined || friends.length === 0
                    ? (
                        <View style={styles.noFriends}>
                            <Icon name="account-group" size={100} color="#6200EE"/>
                            <Title>Friend list is empty, find some friends!</Title>
                        </View>
                    )
                    : <FlatList 
                        data={friends}
                        keyExtractor={friend => friend.id}
                        renderItem={({item, index}) => <FriendListItem user={item} navigation={navigation} index={index} bgColor={colors.backgroundCardColors[index % colors.backgroundCardColors.length]}/>}
                    />)
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

    noFriends: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
    }
});


export default FriendsListView;
