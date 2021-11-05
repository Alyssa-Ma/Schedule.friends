import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
let { width } = Dimensions.get('window');
import UserContext from '../context/UserContext';

const CombinedScheduleView = ({navigation, route}) => {
  
  const getWeekdayString = (dateObj) => {
    return dateObj.toLocaleDateString([], {weekday: 'short'}).substring(0, 3).toUpperCase();
  }

  const getDateString = (dateObj) => {
    return dateObj.toLocaleDateString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
  }

  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [focusDate, setFocusDate] = useState(getDateString(new Date()));
  const [focusWeekday, setFocusWeekday] = useState(getWeekdayString(new Date()));


  useEffect(() => {
    //   {
//     start: '2021-10-06 22:30:00',
//     end: '2021-10-06 23:30:00',
//     title: 'Some Event 1',
//     summary: 'yep test',
//     color: 'red',
//   },
    //filter through each course of context.user.schedule, and see if day_name contains today's day
    //console.log(new Date().toLocaleDateString([], {weekday: 'short'}).substring(0, 3).toUpperCase());
    let eventsBuffer = context.user.schedule.filter(course => course.day_name.includes(focusWeekday));
    eventsBuffer = eventsBuffer.map((course) => {
        return {
          start: `${focusDate} ${course.time_start}:00`,
          end: `${focusDate} ${course.time_end}:00`,
          title: `${course.course_number} - ${course.course_name}`,
          summary: `${context.user.username}`
        }
    });
    console.log(eventsBuffer)
    setEvents(eventsBuffer);
  }, [focusDate]);
  
  // nav on tap
  const _eventTapped = (event) => {
    console.log(event);
  }
  console.log(focusDate)
  const changeFocus = (dateString) => {
    console.log(`from changeFocus(): ${dateString}`);
    setFocusDate(dateString);
    console.log(`from changeFocus(): ${getWeekdayString(new Date(dateString))}`);
    setFocusWeekday(getWeekdayString(new Date(dateString)));
  }
  return (
    
    <View style={{ flex: 1, marginTop: 20 }}>
      
      <EventCalendar
        
        eventTapped={_eventTapped}
        events={events}
        width={width}
        dateChanged={changeFocus}
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
             
// ([
//   {
//     start: '2021-10-06 22:30:00',
//     end: '2021-10-06 23:30:00',
//     title: 'Some Event 1',
//     summary: 'yep test',
//     color: 'red',
//   },
//   {
//     start: '2021-10-07 00:30:00',
//     end: '2021-10-07 01:30:00',
//     title: 'Some Event 2',
//     summary: 'another one',
//     color: 'blue',
//   },
//   {
//     start: '2021-10-07 00:30:00',
//     end: '2021-10-07 02:20:00',
//     title: 'Overlapping Event',
//     summary: 'hello',
//   },
//   {
//     start: '2021-10-08 00:30:00',
//     end: '2021-10-08 01:30:00',
//     title: 'Some Event 2',
//     summary: 'another one',
//     color: 'blue',
//   },
//   {
//     start: '2021-10-08 00:30:00',
//     end: '2021-10-08 02:20:00',
//     title: 'Overlapping Event',
//     summary: 'hello',
//   },
//   {
//     start: '2021-10-08 00:30:00',
//     end: '2021-10-08 01:30:00',
//     title: 'Some Event 2',
//     summary: 'another one',
//     color: 'blue',
//   },
//   {
//     start: '2021-10-08 00:30:00',
//     end: '2021-10-08 02:20:00',
//     title: 'Overlapping Event',
//     summary: 'hello',
//   }
// ]);
