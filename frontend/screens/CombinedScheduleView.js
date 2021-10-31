import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button, Dimensions, TouchableOpacity } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
let { width } = Dimensions.get('window');
import UserContext from '../context/UserContext';

const CombinedScheduleView = ({navigation, route}) => {
  const context = useContext(UserContext);
  console.log(`${context.user.username} is in CombinedScheduleView.js`);
  const [events, setEvents] = useState([
    {
      start: '2021-10-06 22:30:00',
      end: '2021-10-06 23:30:00',
      title: 'Some Event 1',
      summary: 'yep test',
      color: 'red',
    },
    {
      start: '2021-10-07 00:30:00',
      end: '2021-10-07 01:30:00',
      title: 'Some Event 2',
      summary: 'another one',
      color: 'blue',
    },
    {
      start: '2021-10-07 00:30:00',
      end: '2021-10-07 02:20:00',
      title: 'Overlapping Event',
      summary: 'hello',
    },
    {
      start: '2021-10-08 00:30:00',
      end: '2021-10-08 01:30:00',
      title: 'Some Event 2',
      summary: 'another one',
      color: 'blue',
    },
    {
      start: '2021-10-08 00:30:00',
      end: '2021-10-08 02:20:00',
      title: 'Overlapping Event',
      summary: 'hello',
    },
    {
      start: '2021-10-08 00:30:00',
      end: '2021-10-08 01:30:00',
      title: 'Some Event 2',
      summary: 'another one',
      color: 'blue',
    },
    {
      start: '2021-10-08 00:30:00',
      end: '2021-10-08 02:20:00',
      title: 'Overlapping Event',
      summary: 'hello',
    }
  ]);

  //nav on tap
  const _eventTapped = (event) => {

    console.log('system 32 deleted', 'H4CK3D');
    navigation.navigate('EditClass');
  }

  return (
    
    <View style={{ flex: 1, marginTop: 20 }}>
      
      <EventCalendar
        
        eventTapped={_eventTapped}
        events={events}
        width={width}
        initDate={'2021-10-07'}
        scrollToFirst
        upperCaseHeader
        uppercase
        scrollToFirst={false}
      />
    </View>
  );
  
}

export default CombinedScheduleView;
  /** 
    const data = [
        {id: 'a', title: 'CSCI 499',},
        {id: 'b', title: 'CSCI 39545',},
        {id: 'c', title: 'CSCI 39758',},
      ];
    const numColumns = 2;
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );
    
    const CombinedScheduleView = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
      
    //whichever screen has the navigation button for stack, must have naviation as a param in their function
  const CombinedScheduleView = ({ navigation }) => {
      return (
        <View style={styles.item}>
          <Text>CombinedScreen gone lol</Text>
        </View>
      );
    }
*/
//Style Sheet
/** 
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffb3bb', 
        marginTop: 100,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },

});
*/
