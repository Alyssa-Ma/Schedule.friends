import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import { Snackbar } from 'react-native-paper';
import {BASE_URL} from "@env";
import Header from '../components/Header';

const AddScheduleView = ({ navigation }) => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [snackVisible, setSnackVisible] = useState(false);
    const [statusText, setStatusText] = useState("");

    const toggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

    const handleSubmit = async (completedForm) => {
        console.log(BASE_URL);
        try {
            //Fetch URL should be an dotenv variable
            const postResponse = await fetch(`${BASE_URL}/7/schedule/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //This needs to be brought down from props
                    'Authorization': 'Token 0df1021e8c4228c8aa97be8c9bf867c4f41067b4'
                },
                body: completedForm
            });
            //this means the server accepted the post request
            const jsonResponse = await postResponse.json();

            if (postResponse.status === 201) {
                //returns the json for state handling
                console.log(jsonResponse)
                setStatusText(`Course Sucessfully Added!`);
                toggleSnackBar();
                navigation.pop();
            }
            else { // something went wrong on the server end
                trimJSON = JSON.stringify(jsonResponse);
                trimJSON = trimJSON.replace(/[{"},\[\]]/gm, '');
                trimJSON = trimJSON.replace(/[.]/gm, "\n");
                console.log(trimJSON);
                setStatusText(`Error ${postResponse.status}: ${trimJSON}`);
                toggleSnackBar();
            }
        }
        catch(error) {
            console.log(error);
        }
        setLoadingButton(!setLoadingButton)
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
                    loadingButton = {loadingButton}
                    setLoadingButton = {setLoadingButton}
                />
                <Snackbar 
                    visible={snackVisible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'OK',
                        onPress: onDismissSnackBar
                    }}
                >{statusText}</Snackbar>
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
