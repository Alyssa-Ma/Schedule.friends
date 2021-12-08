import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import SearchList from '../components/SearchList';
import UserContext from '../context/UserContext';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/native';

//the function that will be rendered
const FriendRequestSend = ({ navigation, route }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const context = useContext(UserContext);
    const { colors} = useTheme();   //THEME

    //gets incoming friend requests for the curr user
    useFocusEffect(
        React.useCallback(() => {
            console.log('Entering Screen')
            
            const getInfo = async() =>{
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}/fr_with_user`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    let jsonResponse = await response.json();
                    if (response.status === 200) {
                        setPendingRequests(jsonResponse)
                    }
                    else {
                        console.log(`Error with server ${response.status}`)
                    }

                }
                catch(error){
                    console.error(error);
                }
            }

            getInfo();

            return () => {
                setSearchQuery('');
            }
        }, [])
    )

    /*
        searchbar handles text input
        if the input exceeds 2 chars output findings
    */
    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            <Searchbar
                placeholder="Enter a username"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {
                searchQuery.length >= 2
                    ? <SearchList query={searchQuery} pendingRequests={pendingRequests} colors={colors}/>
                    : (
                        <View style={styles.noResults}>
                            <Text> No results found</Text>
                            <>{/*Have to change color of this text to white in dark. easy when dark is in context*/}</>
                        </View>
                    )
            }
        </View>

    );
}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },
    noResults: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
    }
});

export default FriendRequestSend;
