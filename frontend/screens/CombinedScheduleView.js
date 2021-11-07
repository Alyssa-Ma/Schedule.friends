import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
let { width } = Dimensions.get('window');
import UserContext from '../context/UserContext';

const CombinedScheduleView = ({navigation, route}) => {
  
  // const getWeekdayString = (dateObj) => {
  //   return dateObj.toLocaleDateString('en-CA', {weekday: 'short'}).substring(0, 3).toUpperCase();
  // }

  const getDateString = (dateObj) => {
    return dateObj.toLocaleDateString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
  }
  
  const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [weekdayIndex, setWeekdayIndex] = useState(new Date().getDay());
  const [focusDate, setFocusDate] = useState(getDateString(new Date()));

  useEffect(() => {
    let eventsBuffer = context.user.schedule.filter(course => course.day_name.includes(WEEKDAYS[weekdayIndex]));
    eventsBuffer = eventsBuffer.map((course) => {
        return {
          start: `${focusDate} ${course.time_start}:00`,
          end: `${focusDate} ${course.time_end}:00`,
          title: `${course.course_number} - ${course.course_name}`,
          summary: `${context.user.username}`
        }
    });
    setEvents(eventsBuffer);
  }, [context.user['schedule'], focusDate]);
  
  // nav on tap
  // const _eventTapped = (event) => {
  //   console.log(event);
  // }

  const changeFocus = (dateString) => {
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
      
      <EventCalendar
        
        // eventTapped={_eventTapped}
        events={events}
        width={width}
        dateChanged={changeFocus}
        scrollToFirst={true}
        />
    </View>
  );
  
}

export default CombinedScheduleView;
