import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import TextViewCard from '../components/TextViewCard';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
// Needed to check route name
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

const CommonTimeText = ({ navigation, route }) => {

    //Sets the state 
    const context = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const convertToDay = (day) => {
        if(day === 1){
            return "MON";
        } else if(day === 2){
            return "TUE";
        } else if(day === 3){
            return "WED";
        } else if(day === 4){
            return "THU";
        } else if(day === 5){
            return "FRI";
        } else if(day === 6){
            return "SAT";
        }
        return "SUN"
    }

    const getTimeAsMin = (time) => {
        const timeParts = time.split(":");
        const timeInMinutes = (parseInt(timeParts[0] * 60)) + parseInt(timeParts[1]);

        return timeInMinutes;
    }

    const convertTo12Hr = (time) => {
        const timeParts = time.split(':');
        const amOrpm = parseInt(timeParts[0]) >= 12 ? 'PM' : 'AM';
        const hours = (parseInt(timeParts[0]) % 12) || 12;
        return `${hours} : ${timeParts[1]} ${amOrpm}`;
    }

    const getFreeTime = (times_arr, curr_time) => {
        if(times_arr.length <= 1){
            return [];
        }

        let free_time = [];
        for(let i = 0; i < times_arr.length-1; i++){
            const start_time = times_arr[i][1];
            const end_time = times_arr[i+1][0];
            
            if(end_time > curr_time){
                free_time.push([start_time, end_time]);
            }
            
        }
        return free_time;
    }

    const filterSchedule = (schedule, day) => {
        
        return  schedule.filter(course => course.day_name.includes(day));
    }

    const getMinutesOfSchedule = (schedule) => {
        let schedule_times = [];
        for( const course of schedule){
            const end_time = getTimeAsMin(course.time_end);
            const start_time = getTimeAsMin(course.time_start);
            schedule_times.push([start_time, end_time]);
        }
        
        schedule_times.sort(sortFunction);
        return schedule_times;
    }

    const sortFunction = (a, b) =>{
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    // I still don't get what this function does
    const getCommonFreeTime = (my_schedule, friend_schedule) => {
        
       return friend_schedule;
    }

    const convertToTime = (schedule) => {
        
        let schedule_times = [];
        for(let i = 0; i < schedule.length; i++){
            let times = schedule[i];
            let minutes = times[0]%60;
            if(minutes === 0){
                minutes = "00"
            }
            let start_time = `${(times[0]-(times[0]%60))/60}:${minutes}`;
            start_time = convertTo12Hr(start_time);

            minutes = times[1]%60;
            if(minutes === 0){
                minutes = "00"
            }
            let end_time = `${(times[1]-(times[1]%60))/60}:${minutes}`;
            end_time = convertTo12Hr(end_time);
            schedule_times.push(`${start_time} - ${end_time}`);
        }
        return schedule_times;
    }

    // Because a user's friend_list can change outside of the user's control, such as if another friend
    // accepts their request, or someone defriends them, there can be times where the user's frontend
    // is behind what's on the backend. So even if we had useEffect listening to context.user.friend_list,
    // it would rerender only if the user requested a friend request. So we were back at the problem where
    // this component needed to render whenever a user views it.

    // Fortunately, there's this
    // https://reactnavigation.org/docs/use-focus-effect/
    // A hook specifically designed to trigger whenever this screen is focused. Now the fetch call will be
    // made everytime a user switches to this view (NOTE: clicking on the 'Who's Free Now' when the screen is
    // already in focused will not trigger it).
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            console.log("entered screen!");
            async function getInfo(){
                try{
                    let response = await fetch(`${BASE_URL}/${context.user.id}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                        },
                    });
                    response = await response.json();
                    
                    //We technically have our schedule from context now, but whatever
                    //we already have to make the call to get an updated friend list
                    let my_schedule = response.schedule;
                    let my_friends = response.friend_list;
                    
                    // Since a user's friend list can change based on other user's actions
                    // (such as accepting incoming requests or removing a friend),
                    // we'll take this as an opportunity to update our friend_list from
                    // the backend
                    if (context.user.friend_list !== my_friends) {
                        let userTemp = {...context.user};
                        userTemp.friend_list = my_friends;
                        context.setUser(userTemp)
                    }
                    
                    let curr_day = new Date().getDay();
                    const curr_hour = new Date().getHours();
                    const curr_min = new Date().getMinutes();
                    let curr_time = `${curr_hour}:${curr_min}`;
    
                    
                    curr_time = getTimeAsMin(curr_time);    //change curr time into an int 
                    curr_day = convertToDay(curr_day);  //change int into "MON" etc..
    
                    my_schedule = filterSchedule(my_schedule, curr_day); //filter classes for today only
                    let my_time_free = getMinutesOfSchedule(my_schedule, curr_time);
    
                    my_schedule = my_time_free;
                    my_time_free = getFreeTime(my_time_free);
    
                    
                    let friends = [];
                    for(const id of my_friends){
                        
                        try{
                            response = await fetch(`${BASE_URL}/${id}`, {
                                method: 'GET', 
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${context.user.token}`
                                },
                            });
                            response = await response.json();
    
                        } catch (error){
                            console.error(error);
                        }
    
                        let friend_schedule = filterSchedule(response.schedule, curr_day);
    
                        if(friend_schedule.length <= 1){
                            continue;
                        }
                        friend_schedule = getMinutesOfSchedule(friend_schedule);
                        friend_schedule = getFreeTime(friend_schedule, curr_time);

                        if(friend_schedule.length === 0){
                            continue;
                        }
                        friend_schedule = getCommonFreeTime(my_time_free, friend_schedule);
                        friend_schedule = convertToTime(friend_schedule);

                        const friend = {
                            id: response.id,
                            schedule: friend_schedule,
                            f_name: response.first_name,
                            l_name: response.last_name
                        };
        
                        friends.push(friend);    
                    }
                    setItems(friends);
                    setLoading(false);
                }catch(error){
                    console.error(error);
                }
            }
            getInfo();
           
            // This is the cleanup function for useCallback.
            // It can return nothing, but is needed to run properly (I think)
            return () => {
                console.log("leaving screen!");
            };
        }, [])
    )
    
    return (
        <View style={styles.container}>
            {   
                loading
                ?  <LoadingIndicator isLoading={loading} />
                :  context.user.friend_list.length === 0
                    ? <Text>No Friends, Add Some!</Text>
                    : (items === undefined || items.length === 0
                        ? <Text>No one is free now</Text>
                        : <FlatList data={items} style={styles.outerCard} renderItem={({item}) => <TextViewCard item={item} />} />)
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

    outerCard: {
        
    }

});

export default CommonTimeText;
