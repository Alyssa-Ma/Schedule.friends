import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, StyleSheet, ScrollView, FlatList, RefreshControl} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
const { width, height } = Dimensions.get('window');
import UserContext from '../context/UserContext';
import LoadingIndicator from '../components/LoadingIndicator';
import {BASE_URL} from "@env";
import { useFocusEffect } from '@react-navigation/core';
import { Button, Modal, Dialog, Text, Portal, Paragraph, Checkbox } from 'react-native-paper'
import CombinedScheduleFriendListItem from '../components/CombinedScheduleFriendListItem';
import EventInfo from '../components/EventInfo';

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
  const maxUsers = 5;
  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [weekdayIndex, setWeekdayIndex] = useState(new Date().getDay());
  const [focusDate, setFocusDate] = useState(getDateString(new Date()));
  const [loading, setLoading] = useState(false);
  const [earliestHour, setEarliestHour] = useState(24);
  const [latestHour, setLatestHour] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Array(0));
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTarget, setModalTarget] = useState({});
  const onRefresh = () => {
    setRefresh(true);
    fetchFriends();
    setRefresh(false);
  }
  const showDialog = () => {
    setDialogVisible(true);
  }
  const hideDialog = () => {
    createEvents();
    setDialogVisible(false);
  }
  const showModal = () => {
    setModalVisible(true);
  }
  const hideModal = () => {
    setModalVisible(false);
  }

  const createEventsFromArray = (user, color, earliest, latest) => {
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
        color: color,
        //extra data for event passing
        firstName: `${user.first_name}`,
        lastName: `${user.last_name}`,
        email: `${user.email}`,
        courseName: `${course.course_name}`,
        courseNumber: `${course.course_number}`,
        days: `${course.day_name}`,
        timeStart: `${course.time_start}`,
        timeEnd: `${course.time_end}`,
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
          jsonResponse['color'] = colors[(i+colors.length+1) % colors.length]
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
  
  const createEvents = () => {
    let latest = {value: latestHour};
    let earliest = {value: earliestHour};
    let eventsBuffer = createEventsFromArray(context.user, colors[0], earliest, latest);
    for (let i = 0; i < selectedUsers.length; i++) {
      let friendSchedule = createEventsFromArray(friendList[selectedUsers[i]], friendList[selectedUsers[i]].color, earliest, latest);
      friendSchedule.forEach((course) => eventsBuffer.push(course));
    }
    setEarliestHour(earliest.value);
    setLatestHour(latest.value);
    setEvents(eventsBuffer);
  }
  
  //Runs when component is first rendered only
  useEffect(() => {
    fetchFriends().then(() => {
      let selection = [];
      //Select up to maxUsers
      for (let i = 0; i < maxUsers && friendList.length; i++) {
        selection.push(i)
      }
      setSelectedUsers(selection);
    })
  }, [])

  //Creates events whenever date or selected users change
  useEffect(() => {
    if (!dialogVisible)
      createEvents();
  }, [focusDate, selectedUsers]);
  
  const selectedUsersListener = (index) => {
    if (selectedUsers.includes(index)) {
      let usersBuffer = [...selectedUsers];
      usersBuffer.splice(usersBuffer.indexOf(index), 1);
      setSelectedUsers(usersBuffer);
      return false;
    }
    if (selectedUsers.length === maxUsers) {
      return false;
    }
    let usersBuffer = [...selectedUsers];
    usersBuffer.push(index)
    setSelectedUsers(usersBuffer);
    return true;
  }
  
  const onEventTapped = (event) => {
    setModalTarget(event);
    showModal();
  }

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
              eventTapped={onEventTapped}
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
              refreshingForDayView={refresh}
              onRefreshForDayView={onRefresh}
            />
            <Portal>
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Dialog.Title>Max Friends: {maxUsers}</Dialog.Title>
                <Dialog.ScrollArea>
                  <View style={{height: height / 2}}>
                    <FlatList 
                    //refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                      data={friendList}
                      keyExtractor={(item) => item.id}
                      renderItem={({item, index}) => 
                        <CombinedScheduleFriendListItem 
                          index={index} 
                          init={selectedUsers.includes(index)} 
                          selectedUsersListener={selectedUsersListener} 
                          color={item.color}
                          user={item} 
                          navigation={navigation}/>} 
                    />
                  </View>
                </Dialog.ScrollArea>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>OK</Button>
              </Dialog.Actions>
            </Dialog>
            </Portal>
            <Button mode='contained' onPress={() => showDialog()}>Select Friends</Button>
            <Portal>
              <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                  <EventInfo event={modalTarget}/>
              </Modal>
            </Portal>
          </View>
      }
    </View>
  );
  
}

const styles = StyleSheet.create({
  modalStyle: {
    padding:40
  }
})

export default CombinedScheduleView;
