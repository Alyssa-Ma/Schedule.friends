import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CourseItem from '../components/CourseItem';
import { Button, FAB, useTheme} from 'react-native-paper'
import UserContext from '../context/UserContext';

const ScheduleListView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const { colors } = useTheme(); //THEME

    return( 
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            
            <FlatList data={context.user.schedule}
            keyExtractor={course => course.id}
            renderItem={({item, index}) => <CourseItem item={item} navigation={navigation} bgColor={colors.backgroundCardColors[index % colors.backgroundCardColors.length]}/>} />

            <FAB
                style={[styles.fab, {backgroundColor: colors.fabButtonColor}]}
                icon="plus"
                onPress={()=>navigation.push('AddScheduleView')} //Add class 
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
      },
});

export default ScheduleListView;
