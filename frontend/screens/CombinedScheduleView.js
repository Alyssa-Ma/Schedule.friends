import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, StyleSheet, FlatList } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
const { width, height } = Dimensions.get('window');
import UserContext from '../context/UserContext';
import LoadingIndicator from '../components/LoadingIndicator';
import {BASE_URL} from "@env";
import { Button, Modal, Dialog, Portal, Text, IconButton, useTheme } from 'react-native-paper'
import CombinedScheduleFriendListItem from '../components/CombinedScheduleFriendListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventInfo from '../components/EventInfo';
import SnackBarContext from '../context/SnackBarContext';

const CombinedScheduleView = ({navigation, route}) => {
    
  const getDateString = (dateObj) => {
    return dateObj.toLocaleDateString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
  }
    
  const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { colors } = useTheme();
  const bufferSpace = 3;
  const maxUsers = 5;
  const context = useContext(UserContext);
  const snackBarContext = useContext(SnackBarContext)
  const [events, setEvents] = useState([]);
  // friendList is used to help compare friend_list updates after context.user updates
  const [friendList, setFriendList] = useState(context.user.friend_list);
  const [friendEvents, setFriendEvents] = useState([]);
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
   
  const onRefresh = async () => {
    setRefresh(true);
    fetchUser().then(() => {createEvents()});
    setRefresh(false);
  }
  const showDialog = () => {
    setDialogVisible(true);
  }
  const hideDialog = () => {
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
        profile_image: user.profile_image
      }
    });
    return events;
  }

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${context.user.id}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${context.user.token}`
        },
      });
      const jsonResponse = await response.json();
      if (response.status === 200) {
        jsonResponse['token'] = context.user.token;
        context.setUser(jsonResponse)
        // Checks to see if friend_list has changed
        if (JSON.stringify(friendList) !== JSON.stringify(jsonResponse.friend_list)) {
          setFriendList(jsonResponse.friend_list)
        }
      }
      else {
        snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
        snackBarContext.toggleSnackBar();
      }
    } catch(error) {
      snackBarContext.setStatusText(`${error}`);
      snackBarContext.toggleSnackBar();
    }
    setLoading(false);
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
          jsonResponse['color'] = colors.backgroundCardColors[(i+colors.backgroundCardColors.length+1) % colors.backgroundCardColors.length]
          friendData.push(jsonResponse);
        }
        else {
          snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
          snackBarContext.toggleSnackBar();
          break;
        }
      } catch(error) {
        snackBarContext.setStatusText(`${error}`);
        snackBarContext.toggleSnackBar();
        break;
      }
    }
    setFriendEvents(friendData);
    setLoading(false);
    return friendData;
  }
  
  const createEvents = async () => {
    let latest = {value: latestHour};
    let earliest = {value: earliestHour};
    let eventsBuffer = createEventsFromArray(context.user, colors.backgroundCardColors[0], earliest, latest);
    for (let i = 0; i < selectedUsers.length; i++) {
      let friendSchedule = createEventsFromArray(friendEvents[selectedUsers[i]], friendEvents[selectedUsers[i]].color, earliest, latest);
      friendSchedule.forEach((course) => eventsBuffer.push(course));
    }
    setEarliestHour(earliest.value);
    setLatestHour(latest.value);
    setEvents(eventsBuffer);
  }
  
  //Runs when component is first rendered, friend_list changes, or theme changes
  //This will select up to the first maxUsers of friend_list
  useEffect(() => {
    fetchFriends().then((friendData) => {
      let selection = [];
      //Select up to maxUsers
      for (let i = 0; i < maxUsers && i < friendData.length; i++) {
        selection.push(i)
      }
      setSelectedUsers(selection);
    })
  }, [friendList, colors])

  //Creates events whenever focus date changes, dialog box is triggered
  useEffect(() => {
    if (!dialogVisible)
      createEvents();
  }, [focusDate, dialogVisible, selectedUsers]);
  
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
    usersBuffer.push(index);
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
    
    <View style={{ flex: 1 }}>
      {
        loading
        ? <LoadingIndicator isLoading={loading} />
        : 
          <View style={{ flex: 1}}>
            <EventCalendar
              headerStyle={{
                backgroundColor: colors.calHeaderBackground, 
                borderColor: colors.calHeaderBorderColor,
                headerText: {
                  color: colors.text
                },
                event: {
                  borderColor: colors.eventBorderColor
                }}}
              headerIconLeft={<IconButton color={colors.calIconColor} icon="arrow-left"/>}
              headerIconRight={<IconButton color={colors.calIconColor} icon="arrow-right"/>}
              colorProps={colors}
              initDate={focusDate}
              events={events}
              noEventsRender={
                <View style={styles.noEvent}>
                  <Icon name="calendar-remove" size={180} color={colors.secondColor} />
                  <Text style={{fontSize: 35, color: colors.secondColor}}>No Events For Today</Text>
                </View>
              }
              eventTapped={onEventTapped}
              formatHeader={'ddd MMM D YYYY'}
              width={width}
              dateChanged={changeFocus}
              scrollToFirst={true}
              size={1}
              start={earliestHour}
              end={latestHour}
              virtualizedListProps={{
                scrollEnabled: false,
                showVerticalScrollIndicator: false,
                showsHorizontalScrollIndicator: false
              }}
              refreshingForDayView={refresh}
              onRefreshForDayView={onRefresh}
            />
            <Portal>
            <Dialog style={{backgroundColor: colors.backgroundColor}} visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Dialog.Title>Max Friends: {maxUsers}</Dialog.Title>
                <Dialog.ScrollArea>
                  <View style={{height: height / 2}}>
                    <FlatList 
                      data={friendEvents}
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
                <Button color={colors.dialogButton} dark={true} mode="contained" onPress={hideDialog}>OK</Button>
              </Dialog.Actions>
            </Dialog>
            </Portal>
            <View style={{alignItems: 'center'}}>
              <Button
                style={{width: width + 20}}
                mode='contained'
                icon="account-multiple-check" 
                onPress={() => showDialog() } 
                color={colors.secondColor} 
                labelStyle={{color: 'white'}}>
                Select Friends
              </Button>
            </View>
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
    paddingHorizontal: 40
  },
  noEvent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height - 200
  }
})

export default CombinedScheduleView;
