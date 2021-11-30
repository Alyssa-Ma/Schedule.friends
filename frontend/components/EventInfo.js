import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, ScrollView, FlatList, RefreshControl} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
const { width, height } = Dimensions.get('window');
import UserContext from '../context/UserContext';
import LoadingIndicator from '../components/LoadingIndicator';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/core';
import { Headline, Subheading, Text } from 'react-native-paper'
import CombinedScheduleFriendListItem from '../components/CombinedScheduleFriendListItem';
import UserInfo from './UserInfo';
import { stringTypeAnnotation } from '@babel/types';


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
        <View backgroundColor={event.color}>
            <UserInfo user={{
                first_name: event.firstName,
                last_name: event.lastName,
                username: event.summary,
                email: event.email}}/>
            <Headline>{event.courseName}</Headline>
            <Subheading>{event.courseNumber}</Subheading>
            <Text>Days: {event.days}</Text>
            <Text>Start: {startTime}</Text>
            <Text>End: {endTime}</Text>
        </View>
    )
}

export default EventInfo;
