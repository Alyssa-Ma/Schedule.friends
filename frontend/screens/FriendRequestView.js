import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import FriendRequest from '../components/FriendRequest';
import Header from '../components/Header';

const FriendRequestView = ({ navigation }) => {

    //Sets the state items arr with dummy values
    const [items, setItems] = useState();
    const [userID, setUserID] = useState(8);    //hard coded curr user

    useEffect(() => {

        async function getInfo(){

            try{
                let response = await fetch(`http://10.0.2.2:8000/api/sf_users/${userID}`);
                response = await response.json();
                const friend_reqs = response.friend_requests;
                
                let friend_items = [];
                for(const id of friend_reqs){

                    response = await fetch(`http://10.0.2.2:8000/api/sf_users/friend_requests/${id}`);
                    response = await response.json();
                    
                    let friend_info = await fetch(`http://10.0.2.2:8000/api/sf_users/${response.from_user}`);
                    friend_info = await friend_info.json();
                    
                    const friend = {
                        id: response.id,
                        from_user: response.from_user,
                        f_name: friend_info.first_name,
                        l_name: friend_info.last_name
                    };

                friend_items.push(friend);    
            }

            setItems(friend_items);
            //console.log(items);
            

            }catch(error){
                console.log(error);
            }
        }
    
        getInfo();

    }, []);

    
    //reject using PATCH and DELETE request. remove from list
    const rejectFriend = (id) => {

        console.log(`Rejected Friend`);
        fetch(`http://10.0.2.2:8000/api/sf_users/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pending: false,
              accepted: false
            }),
        })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log('error: ', err))
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }

    //accept using PATCH and DELETE request. remove from list
    const acceptFriend = (id) => {

        console.log(`Accepted Friend`);
        fetch(`http://10.0.2.2:8000/api/sf_users/friend_requests/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pending: false,
              accepted: true
            }),
        })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log('error: ', err))

        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        });
    }
    return (
        <View style={styles.container}>
            <FlatList data={items} renderItem={({item}) => <FriendRequest item={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />
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

export default FriendRequestView;