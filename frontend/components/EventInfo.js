import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, ScrollView, FlatList, RefreshControl} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
const { width, height } = Dimensions.get('window');
import UserContext from '../context/UserContext';
import LoadingIndicator from '../components/LoadingIndicator';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/core';
import { Button, Portal, Dialog, Paragraph, Checkbox, Text } from 'react-native-paper'
import CombinedScheduleFriendListItem from '../components/CombinedScheduleFriendListItem';
import UserInfo from './UserInfo';

const EventInfo = ({navigation, route, event}) => {

    return (
        <View backgroundColor={event.color}>
            <UserInfo user={{
                first_name: event.firstName,
                last_name: event.lastName,
                username: event.summary,
                email: event.email}}/>
        </View>
    )
}

export default EventInfo;
