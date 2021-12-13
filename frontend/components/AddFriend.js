import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserListHeader from './UserListHeader';
import UserContext from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SnackBarContext from '../context/SnackBarContext';

const AddFriend = ({item, bgColor}) => {
    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext)
    const [buttonStatus, setButtonStatus] = useState(item.status === 'NONE' ? false : true)
    const [buttonInfo, setButtonInfo] = useState(item.status);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();  //THEME

    //sends the friend request
    const sendRequest = async (id) => {   
        try {
            setLoading(true);
            let postResponse = await fetch(`${BASE_URL}/friend_requests/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${context.user.token}`
                },
                body: JSON.stringify({
                    from_user: context.user.id,
                    to_user: id
                }),
            });
            let jsonResponse = await postResponse.json();
            if (postResponse.status === 201) {        
                setLoading(false);
                setButtonStatus(true);
                setButtonInfo('PENDING');
                item.status = 'PENDING';
            }
            else {
                snackBarContext.setStatusText(`${postResponse.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`)
                snackBarContext.toggleSnackBar();
                setLoading(false);
            }
        }
        catch(error) {
            snackBarContext.setStatusText(`${error}`)
            snackBarContext.toggleSnackBar();
            setLoading(false);
        }
        
    }
   

    //Lists the user as a list item
    //renders a button that reflects the status of the user's friend status in correlation to the curr user
    return (
        <TouchableOpacity style={[styles.friendRequest, {backgroundColor: bgColor}]}>
            <View style={styles.itemView}>
                <UserListHeader user={item} textColor={bgColor} bgColor='white'/>
                {
                    buttonInfo === 'SAME'
                    ? <React.Fragment/>
                    :  (
                        <Button 
                            mode='contained'
                            loading={loading} 
                            onPress={() => sendRequest(item.id)}
                            disabled={buttonStatus}
                            style={[styles.addButton, {backgroundColor: colors.fabButtonColor}]} //Need to change to a better color that changes dynamically
                        >
                            <Icon 
                                name={
                                    buttonInfo === 'NONE'
                                    ? ('account-plus')
                                    : buttonInfo === 'PENDING'
                                        ? ('account-clock')
                                        : 'account-heart'
                                }
                                size={30}
                                color='white'
                            />    
                        </Button>
                    )
                }
            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({

    friendRequest : {
        padding: 15,
        borderRadius: 40 / 2,
        width: 350,
        alignSelf: 'center',
        marginTop: 15,
        
    },

    addButton: {
        borderRadius: 50 / 2,
        alignSelf: 'flex-end',
        marginBottom: -10,
        
    },

    name: {
        fontSize: 20,
    },

    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    
})

export default AddFriend;
