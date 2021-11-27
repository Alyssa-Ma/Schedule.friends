import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CourseItem from '../components/CourseItem';
import { Button, FAB } from 'react-native-paper'
import UserContext from '../context/UserContext';

const ScheduleListView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    return( 
        <View style={styles.container}>
            
            <FlatList data={context.user.schedule}
            keyExtractor={course => course.id}
            renderItem={({item, index}) => <CourseItem item={item} navigation={navigation} bgColor={context.bgColors[index % context.bgColors.length]}/>} />

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={()=>navigation.push('AddScheduleView')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#fff",
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
      },
});

export default ScheduleListView;
