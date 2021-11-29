import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, ScrollView, FlatList} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
const { width, height } = Dimensions.get('window');
import UserContext from '../context/UserContext';
import LoadingIndicator from '../components/LoadingIndicator';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/core';
import { Button, Portal, Dialog, Paragraph, Checkbox } from 'react-native-paper'
import FriendListItem from '../components/FriendListItem';
import CombinedScheduleFriendListItem from '../components/CombinedScheduleFriendListItem';

const CombinedScheduleView = ({navigation, route}) => {
  // const getWeekdayString = (dateObj) => {
    //   return dateObj.toLocaleDateString('en-CA', {weekday: 'short'}).substring(0, 3).toUpperCase();
    // }
    
    const getDateString = (dateObj) => {
      return dateObj.toLocaleDateString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
    }
    
  const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const colors = ["#d4f48d", "#f4b18d", "#bc90dd", "#99b8e8" ];
  const bufferSpace = 3;
  const maxUsers = 6;
  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [weekdayIndex, setWeekdayIndex] = useState(new Date().getDay());
  const [focusDate, setFocusDate] = useState(getDateString(new Date()));
  const [loading, setLoading] = useState(false);
  const [earliestHour, setEarliestHour] = useState(24);
  const [latestHour, setLatestHour] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  const [selectedUsers, setSelectedUsers] = useState(new Array(0));

  const createEventsFromArray = (user, colorIndex, earliest, latest) => {
    console.log(user.schedule)
    let events = user.schedule.filter(course => course.day_name.includes(WEEKDAYS[weekdayIndex]));
    events = events.map((course) => {
      if (Number(course.time_start.slice(0, 2)) <= earliest.value)
        earliest.value = (Math.max(0, Number(course.time_start.slice(0, 2)) - bufferSpace));
      if (Number(course.time_end.slice(0, 2)) >= latest.value)
        latest.value = (Math.min(24, Number(course.time_end.slice(0, 2)) + bufferSpace));
      return {
        start: `${focusDate} ${course.time_start}:00`,
        end: `${focusDate} ${course.time_end}:00`,
        title: `${course.course_number} - ${course.course_name}`,
        summary: `${user.username}`,
        color: colors[colorIndex]
      }
    });
    return events;
  }

  const fetchFriends = async () => {
    setLoading(true);
    let friendData = [];
    for (let i = 0; i < context.user.friend_list.length; i++) {
      try {
        const response = await fetch(`${BASE_URL}/${context.user.friend_list[i]}`, {
          method: 'GET', 
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${context.user.token}`
          },
        });
        const jsonResponse = await response.json();
        if (response.status === 200) {
          friendData.push(jsonResponse);
        }
        else {
          console.log(`Error from server ${response.status}`);
          break;
        }
      } catch(error) {
        console.log(error);
        break;
      }
    }
    setFriendList(friendData);
    setLoading(false);
  }

  const createEvents = async () => {
    let latest = {value: latestHour};
    let earliest = {value: earliestHour};
    let eventsBuffer = createEventsFromArray(context.user, 0, earliest, latest);
    for (let i = 0; i < selectedUsers.length; i++) {
      let friendSchedule = createEventsFromArray(friendList[friendList.findIndex(e => e.id === selectedUsers[i])], i+1, earliest, latest);
      friendSchedule.forEach((course) => eventsBuffer.push(course));
    }
    setEarliestHour(earliest.value);
    setLatestHour(latest.value);
    setEvents(eventsBuffer);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchFriends();
      let selection = [];
      for (let i = 0; i < maxUsers; i++) {
        selection.push(friendList[i].id)
      }
      setSelectedUsers(selection);
      return () => {

      }
    },[])
  )

  const selectedUsersListener = (id) => {
    if (selectedUsers.includes(id)) {
      let usersBuffer = [...selectedUsers];
      usersBuffer.splice(usersBuffer.findIndex(e => e === id), 1);
      console.log(usersBuffer.length)
      setSelectedUsers(usersBuffer);
      return false;
    }
    if (selectedUsers.length === maxUsers) {
      return false;
    }
    let usersBuffer = [...selectedUsers];
    usersBuffer.push(id)
    setSelectedUsers(usersBuffer);
    return true;
  }

  useEffect(() => {
    //Select the first 6 friends in the friend list
    createEvents();
  }, [focusDate, context.user, friendList, selectedUsers]);
  
  // const _eventTapped = (event) => {
  //   console.log(event);
  // }

  const changeFocus = (dateString) => {
    setLatestHour(0);
    setEarliestHour(24);
    // means we went forward
    if (dateString > focusDate)
      setWeekdayIndex((weekdayIndex + 8) % 7);
    // means we went backwards
    else if (dateString < focusDate)
      setWeekdayIndex((weekdayIndex + 6) % 7);
    setFocusDate(dateString);
  }
  return (
    
    <View style={{ flex: 1}}>
      {
        loading
        ? <LoadingIndicator isLoading={loading} />
        : 
          <View style={{ flex: 1}}>
            <EventCalendar
              initDate={focusDate}
              eventTapped={() => {}}
              events={events}
              formatHeader={'dddd'}
              width={width}
              dateChanged={changeFocus}
              scrollToFirst={true}
              size={1}
              // start={earliestHour}
              // end={latestHour}
              start={7}
              end={24}
              virtualizedListProps={{
                scrollEnabled: false
              }}
            />
            <Portal>
              <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                <Dialog.Title>TEST</Dialog.Title>
                    <Dialog.Content>
                      <Dialog.ScrollArea>
                        <View style={{height: height / 2}}>
                    <FlatList 
                        data={friendList}
                        keyExtractor={friend => friend.id}
                        renderItem={({item}) => <CombinedScheduleFriendListItem init={selectedUsers.includes(item.id)} selectedUsersListener={selectedUsersListener} user={item} navigation={navigation}/>} 
                    />
                    </View>
                    </Dialog.ScrollArea>
                    </Dialog.Content>

                <Dialog.Actions>
                  <Button onPress={hideDialog}>Dismiss</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Button onPress={() => showDialog()}>menu here</Button>
          </View>
      }
    </View>
  );
  
}

export default CombinedScheduleView;
