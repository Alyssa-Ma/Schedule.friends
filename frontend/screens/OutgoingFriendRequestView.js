// import React, {useState, useEffect, useContext} from 'react';
// import { View, Text, StyleSheet, FlatList} from 'react-native';
// import FriendRequestItem from '../components/FriendRequestItem';
// import FriendListItem from '../components/FriendListItem';
// import {BASE_URL} from "@env";
// import UserContext from '../context/UserContext';
// import { useFocusEffect } from '@react-navigation/native';
// import LoadingIndicator from '../components/LoadingIndicator';

// const OutgoingFriendRequestView = ({ navigation, route }) => {

//     //Sets the state items arr with dummy values
//     const context = useContext(UserContext);
//     const [friends, setFriends] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useFocusEffect(
//         React.useCallback(() => {
//             setLoading(true);
//             console.log("entered screen!");

//             async function getInfo(){
//                 try{
//                     let response = await fetch(`${BASE_URL}/${context.user.id}/fr_from_user`, {
//                         method: 'GET', 
//                         headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Token ${context.user.token}`
//                         },
//                     });
//                     response = await response.json();
                    
//                     const friend_reqs = response;
                    
//                     let friendItemsData = [];
//                     for(const req of friend_reqs){
                        
//                         let friend_info = await fetch(`${BASE_URL}/${req.from_user}`, {
//                             method: 'GET', 
//                             headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Token ${context.user.token}`
//                             },
//                         });
//                         const friendData = await friend_info.json();
    
//                     friendItemsData.push(friendData);    
//                 }
    
//                 setFriends(friendItemsData);
                
//                 }catch(error){
//                     console.log(error);
//                 }
//                 setLoading(false);
//             }
//             getInfo();

//             return () => {
//                 console.log("leaving screen!");
//                 setLoading(false);
//             };
//         // Import that it's [], otherwise useFocusEffect may trigger endlessly while focused.
//         }, [])
//     )
    
//     //reject using PATCH and DELETE request. remove from list
//     const rejectFriend = async (id) => {

//         console.log(`Rejected Friend`);
//         try{
//             let response = await fetch(`${BASE_URL}/friend_requests/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Token ${context.user.token}`
//                 },
//                 body: JSON.stringify({
//                   pending: false,
//                   accepted: false
//                 }),
//             });

//             response = await response.json();
//             console.log(response);
//         }
//         catch(error){
//             console.error(error);
//         }
//         setItems(prevItems => {
//             return prevItems.filter(item => item.id != id);
//         });
//     }

//     //accept using PATCH and DELETE request. remove from list
//     const acceptFriend = async (id) => {

//         console.log(`Accepted Friend`, id);

        
//         try{
//             let response = await fetch(`${BASE_URL}/friend_requests/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Token ${context.user.token}`
//                 },
//                 body: JSON.stringify({
//                   pending: false,
//                   accepted: true
//                 }),
//             });
//             response = await response.json();
//             console.log(response);
//         }
//         catch(error){
//             console.error(error);
//         }
        
        

//         setItems(prevItems => {
//             return prevItems.filter(item => item.id != id);
//         });

//     }
//     return (
//         <View style={styles.container}>
//             {
//                 loading
//                 ?   <LoadingIndicator isLoading={loading} />
//                 :   (friends === undefined || friends.length === 0
//                     ? <Text>No outgoing Friend Requests</Text>
//                     // : <FlatList data={items} renderItem={({item}) => <FriendRequestItem item={item} rejectFriend={rejectFriend} acceptFriend={acceptFriend}/>} />)
//                     : <Text>TBA</Text>)
//             }
            
//         </View>
//     )

// }

// //Style Sheet
// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         paddingTop: 0,
//     },

// });

// export default OutgoingFriendRequestView;
