import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const TextViewCard = ({item, bgColor}) => {

    const [times, setTimes] = useState(item.schedule);

    const NowTime = () => {
        //renders the first schedule time
        return (
            <View style={styles.now_row}>
                <Text style={[styles.now_upcoming, {color: 'white'}]}>Now:</Text>
                <Text style={[styles.time, {color: 'white'}]}>{times[0]}</Text>
            </View>
        )
    }

    const UpcomingTime = () => {
        //if no times return nothing
        if(times.length < 1)
            return <View></View>
        
        //removes the first time if there is a 'Now'
        let tmp_times = [...times];
        if(item.now)
           tmp_times.splice(0,1);

        //returns the upcoming times section
        return (
            <View style={styles.upcoming_row}>
                <Text style={[styles.now_upcoming, {color: 'white'}]}>Upcoming:</Text>
            
                <View style={styles.upcoming_times_col}>
                    {
                        tmp_times.map( (time, index) => {
                            return (
                                <Text key={index} style={[styles.time, {color: 'white'}]}>{time}</Text>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (

        <View style={[styles.friendTimeCard, {backgroundColor: bgColor}]}>

            <View style={styles.avatar_name_row}>
                {
                    item.profile_image === null
                    ?   (<Avatar.Text 
                            size = {75} 
                            backgroundColor = 'white'
                            color={bgColor}
                            label = {item.f_name.charAt(0).toUpperCase()+item.l_name.charAt(0).toUpperCase()}
                            style = {styles.avatar}
                        />)
                    :   (<Avatar.Image
                            source={{
                                uri: item.profile_image,
                            }}
                            size={75}
                            style = {styles.avatar}
                        />)
                }
                

                <View style={styles.name_col}>
                    <Text style={[styles.name_text, {color: 'white'}]}>{item.f_name}</Text>
                    <Text style={[styles.name_text, {color: 'white'}]}>{item.l_name}</Text>
                </View>
                
            </View>

            {item.now && <NowTime/>}

            <UpcomingTime />

        </View>

    )
}


const styles = StyleSheet.create({

    friendTimeCard: {
        width: 330,
        borderRadius: 50 / 2,
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
        alignItems: 'flex-start',
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
        alignSelf: 'flex-start'
    },

    time: {
        fontSize: 20,
    }
})
export default TextViewCard;