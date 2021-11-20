import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';



const TextViewCard = ({item}) => {

    const [times, setTimes] = useState(item.schedule);
    const [trigger, setTrigger] = useState(false);
    const NowTime = ({trigger}) => {
        
        //renders the first schedule time
        trigger=true;
        return (
            <View style={styles.now_row}>
                <Text style={styles.now_upcoming}>Now:</Text>
                <Text style={styles.time}>{times[0]}</Text>
            </View>
        )
    }

    const UpcomingTime = () => {
        //if no times return nothing
        if(times.length < 1)
            return <View></View>
        
        //removes the first time if there is a 'Now'
        let tmp_times = [...times];
        if(trigger)
           tmp_times.splice(0,1);

        //returns the upcoming times section
        return (
            <View style={styles.upcoming_row}>
                <Text style={styles.now_upcoming}>Upcoming:</Text>
            
                <View style={styles.upcoming_times_col}>
                    {
                        tmp_times.map( (time, index) => {
                            return (
                                <Text key={index} style={styles.time}>{time}</Text>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (

        <View style={styles.friendTimeCard}>

            <View style={styles.avatar_name_row}>
                <Avatar.Text 
                            size = {75} 
                            backgroundColor = 'turquoise'
                            label = {item.f_name.charAt(0).toUpperCase()+item.l_name.charAt(0).toUpperCase()}
                            style = {styles.avatar}
                />

                <View style={styles.name_col}>
                    <Text style={styles.name_text}>{item.f_name}</Text>
                    <Text style={styles.name_text}>{item.l_name}</Text>
                </View>
                
            </View>

            {item.now &&<NowTime trigger={trigger}/>}

            <UpcomingTime />

        </View>

        /*
        
        <View style={styles.friendRequest}>
            <View style={styles.itemView}>

                <Avatar.Text 
                        size = {80} 
                        backgroundColor = 'turquoise'
                        label = {item.f_name.charAt(0).toUpperCase()+item.l_name.charAt(0).toUpperCase()}
                        style={styles.profilePic}
                />
                <Text style={styles.name}>{item.f_name} {item.l_name}</Text>
                {
                    item.schedule.map( (time, index) => {
                        return (
                            <ScheduleTimes time={item.schedule} index={index} style={styles.schedule} key={index}/>
                        )
                    })
                }
                
            </View>
        </View>

        */
    )
}


const styles = StyleSheet.create({

    friendTimeCard: {
        width: 330,
        borderRadius: 50 / 2,
        backgroundColor: 'darkslateblue',
        alignSelf: 'center',
        marginTop: 50,
        flex: 1,
        paddingBottom: 10
    },

    avatar_name_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
        marginTop: 10,
    },

    now_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        marginRight: 10
    },

    upcoming_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'flex-start'
    },

    name_col: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
        
    },

    upcoming_times_col: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginRight: 10

    },

    name_text: {
        fontSize: 30,
    },

    avatar: {
        marginLeft: 40
       
    },    

    now_upcoming: {

        fontSize: 25,
        marginLeft: 15,
    },

    time: {
        fontSize: 20,
    }
})
export default TextViewCard;