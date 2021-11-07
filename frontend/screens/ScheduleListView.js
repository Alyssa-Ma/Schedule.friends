import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CourseItem from '../components/CourseItem';
import { Button } from 'react-native-paper'
import UserContext from '../context/UserContext';

const ScheduleListView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    return( 
        <View style={styles.container}>
            <Button icon="plus" mode="contained" onPress={()=>navigation.push('AddScheduleView')}>Add Course To Schedule</Button>
            <FlatList data={context.user.schedule}
            keyExtractor={course => course.id}
            renderItem={({item}) => <CourseItem item={item} navigation={navigation}/>} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
    }
});

export default ScheduleListView;
