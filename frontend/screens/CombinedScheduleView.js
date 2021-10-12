import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button, Dimensions } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
let { width } = Dimensions.get('window');

export default class CombinedScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
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
        },
      ],
    };
  }

  //popup on tap
  _eventTapped(event) {
    alert(JSON.stringify(event));
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
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
}
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