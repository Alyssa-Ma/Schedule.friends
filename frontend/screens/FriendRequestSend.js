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
                        snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                        snackBarContext.toggleSnackBar();
                    }
                }
                catch(error){
                    snackBarContext.setStatusText(`${error}`);
                    snackBarContext.toggleSnackBar();
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
                placeholderTextColor='white'
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{backgroundColor: colors.searchBar, opacity: 1, marginTop: -2}}
                iconColor='white'
                inputStyle={{color: 'white'}}
            />
            {
                searchQuery.length >= 2
                    ? <SearchList query={searchQuery} pendingRequests={pendingRequests} colors={colors}/>
                    : (
                        <View style={styles.noResults}>
                            <Text style={{color: colors.invertedColor}}> No results found</Text>
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
