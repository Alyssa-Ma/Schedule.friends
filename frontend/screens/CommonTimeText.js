import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import TextViewCard from '../components/TextViewCard';
import Header from '../components/Header';

const CommonTimeText = ({ navigation }) => {

    //Sets the state items arr with dummy values
    const [items, setItems] = useState([]);
    const [userID, setUserID] = useState(1);    //hard coded curr user

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

    const getFreeTime = (times_arr) => {
        if(times_arr.length <= 1){
            return [];
        }

        let free_time = [];
        for(let i = 0; i < times_arr.length-1; i++){
            const start_time = times_arr[i][1];
            const end_time = times_arr[i+1][0];
            free_time.push([start_time, end_time]);
        }
        return free_time;
    }

    const filterSchedule = (schedule, day) => {
        
        return  schedule.filter(course => course.day_name.includes(day));
    }

    const getMinutesOfSchedule = (schedule, curr_time) => {
        let free_times = [];
        for( const course of schedule){
            const end_time = getTimeAsMin(course.time_end);
            if(end_time >= curr_time){
                const start_time = getTimeAsMin(course.time_start);
                free_times.push([start_time, end_time]);
            }
        }
        
        free_times.sort(sortFunction);
        return free_times;
    }

    const sortFunction = (a, b) =>{
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

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
            const start_time = `${(times[0]-(times[0]%60))/60}:${minutes}`;

            minutes = times[1]%60;
            if(minutes === 0){
                minutes = "00"
            }
            const end_time = `${(times[1]-(times[1]%60))/60}:${minutes}`;
            schedule_times.push(`${start_time} - ${end_time}`);
        }
        return schedule_times;
    }

    useEffect(() => {

        async function getInfo(){

            try{
                let response = await fetch(`http://10.0.2.2:8000/api/sf_users/${userID}`);  //gets current user's schedule
                response = await response.json();
                let my_schedule = response.schedule;
                let my_friends = response.friend_list;

                let curr_day = new Date().getDay();
                const curr_hour = new Date().getHours();
                const curr_min = new Date().getMinutes();
                let curr_time = `${curr_hour}:${curr_min}`;

                //curr_time = 0;
                curr_time = getTimeAsMin(curr_time);    //change curr time into an int 
                curr_day = convertToDay(curr_day);  //change int into "MON" etc..

                my_schedule = filterSchedule(my_schedule, curr_day); //filter classes for today only
                let my_time_free = getMinutesOfSchedule(my_schedule, curr_time);

                my_schedule = my_time_free;
                my_time_free = getFreeTime(my_time_free);

                
                
                let friends = [];
                for(const id of my_friends){
                    
                    response = await fetch(`http://10.0.2.2:8000/api/sf_users/${id}`);
                    response = await response.json();
                    let friend_schedule = filterSchedule(response.schedule, curr_day);
                    if(friend_schedule.length === 0){
                        continue;
                    }
                    friend_schedule = getMinutesOfSchedule(friend_schedule, curr_time);
                    friend_schedule = getFreeTime(friend_schedule);
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
                console.log(items);
            }catch(error){
                console.error(error);
            }
        }
    
        getInfo();

    }, []);


    return (
        <View style={styles.container}>
            <FlatList data={items} style={styles.outerCard} renderItem={({item}) => <TextViewCard item={item} />} />
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