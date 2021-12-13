import React from 'react';
import { View } from 'react-native';
import { Headline, Subheading, Text, useTheme } from 'react-native-paper'
import UserInfo from './UserInfo';

const EventInfo = ({navigation, route, event}) => {
    const parseTime = (stringObj) => {
        let returnString = '';
        if (parseInt(stringObj.slice(0, 2)) < 10)
        returnString = returnString.concat('', stringObj.slice(1, 2))
        else if (parseInt(stringObj.slice(0, 2)) > 12)
        returnString = returnString.concat('', parseInt(stringObj.slice(0, 2)) % 12)
        else
        returnString = returnString.concat('', stringObj.slice(0, 2))
        
        returnString = returnString.concat('', `${stringObj.slice(2)}`);
        
        if (parseInt(stringObj.slice(0, 2)) > 12)
        returnString = returnString.concat(' ', 'PM');
        else
        returnString = returnString.concat(' ', 'AM');
        
        return returnString;
        
    }

    const startTime = parseTime(event.timeStart);
    const endTime = parseTime(event.timeEnd);
    
    return (
        <View backgroundColor={event.color} style={{padding:30, paddingTop: 10, borderRadius: 15}}>
            <View 
                style={{marginLeft: 0}}
            >
                <UserInfo user={{
                    first_name: event.firstName,
                    last_name: event.lastName,
                    username: event.summary,
                    email: event.email,
                    profile_image: event.profile_image}}/>
            </View>
            <View style={{padding: 0, paddingTop: 0}}>
                <Headline numberOfLines={1}>{event.courseName}</Headline>
                <Subheading numberOfLines={1}>{event.courseNumber}</Subheading>
                <Text>Days: {event.days}</Text>
                <Text>Start: {startTime}</Text>
                <Text>End: {endTime}</Text>
            </View>
        </View>
    )
}

export default EventInfo;
