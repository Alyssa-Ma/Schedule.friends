import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import Header from '../components/Header';

const AddScheduleView = ({ navigation }) => {

    const handleSubmit = async (completedForm) => {
        try {
            //Fetch URL should be an dotenv variable
            const postResponse = await fetch("http://10.0.2.2:8000/api/sf_users/7/schedule/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //This needs to be brought down from props
                    'Authorization': 'Token 0df1021e8c4228c8aa97be8c9bf867c4f41067b4'
                },
                body: completedForm
            });
            const jsonPostResponse = await postResponse.json();
            console.log(jsonPostResponse);
            navigation.pop();
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <CourseForm
                courseName = {""}
                courseNumber = {""}
                startHour = {0}
                startMin = {0}
                endHour = {0}
                endMin = {0}
                selectedDays = {[]}
                handleSubmit = {handleSubmit}
                navigation = {navigation}
            />
        </View>
    )

}

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 0,
    },

});

export default AddScheduleView;
