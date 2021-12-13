import React, {useState, useEffect, useContext} from 'react';
import { FlatList } from 'react-native';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import AddFriend from './AddFriend';
import SnackBarContext from '../context/SnackBarContext';

const SearchList = ({query, pendingRequests, colors}) => {

    const [items, setItems] = useState([]);

    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext);

    //gets the usernames that correlate to the query
    useEffect(() => {
        
        const getInfo = async () => {
            
            try{
                let response =  await fetch(`${BASE_URL}/?query=${query}`, {
                    method: 'GET', // or 'PUT'
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                    },
                });
                jsonResponse = await response.json();
                if (response.status === 200)
                {
                    let users = [];
                    for(const queryUser of jsonResponse){
                        let pending = !pendingRequests.every(request => {
                            if ((request.to_user === context.user.id && request.from_user === queryUser.id)
                                || request.from_user === context.user.id && request.to_user === queryUser.id) {
                                return false;
                            }
                            return true;
                        })
                        const queryUserStatus = queryUser.friend_list.includes(context.user.id) 
                            ? 'FRIEND'
                            :   (queryUser.id === context.user.id
                                ? 'SAME'
                                : (pending
                                    ? 'PENDING'
                                    : 'NONE'));

                        const userInfo = {
                            id: queryUser.id,
                            first_name: queryUser.first_name,
                            last_name: queryUser.last_name,
                            status: queryUserStatus,
                            username: queryUser.username
                        }
                            users.push(userInfo);
                    }
                    setItems(users);
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
    }, [query])

    //renders each user found in AddFriend
    return (
        <FlatList 
            keyboardShouldPersistTaps='always' 
            data={items} 
            renderItem={({item, index}) => <AddFriend item={item} index={index} bgColor={colors.backgroundCardColors[index % colors.backgroundCardColors.length]}/>} />
    )
}

export default SearchList;
