import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import { Snackbar } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';

const AddScheduleView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    
    const [returnedJSON, setReturnedJSON] = useState({});

    const [loadingButton, setLoadingButton] = useState(false);
    
    const [snackVisible, setSnackVisible] = useState(false);
    const [statusText, setStatusText] = useState("");
    const toggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

    //useEffect that monitors loadingButton state
    useEffect(() => {
        const handleSubmit = async (completedForm) => {
            try {
                //Fetch URL should be an dotenv variable
                const postResponse = await fetch(`${BASE_URL}/${context.user.id}/schedule/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //This needs to be brought down from props
                        'Authorization': `Token ${context.user.token}`
                    },
                    body: completedForm
                });
                //this means the server accepted the post request
                const jsonResponse = await postResponse.json();
    
                if (postResponse.status === 201) {
                    //returns the json for state handling
                    console.log(context.user.schedule)
                    let userCopy = context.user;
                    console.log("User copy", userCopy)
                    userCopy.schedule.push(jsonResponse);
                    context.setUser(userCopy)
                    setStatusText(`Course Sucessfully Added!`);
                    //toggleSnackBar();
                    //navigation.pop();
                    navigation.navigate('Home');
                }
                else { // something went wrong on the server end
                    trimJSON = JSON.stringify(jsonResponse);
                    trimJSON = trimJSON.replace(/[{"},\[\]]/gm, '');
                    trimJSON = trimJSON.replace(/[.]/gm, "\n");
                    console.log(trimJSON);
                    setStatusText(`Error ${postResponse.status}: ${trimJSON}`);
                    //toggleSnackBar();
                }
            }
            catch(error) {
                console.log(error);
            }
            setLoadingButton(!setLoadingButton)
        }
        console.log(loadingButton);
        if (loadingButton) {
            handleSubmit(returnedJSON);
        }
    }, [loadingButton])


        
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
                    setReturnedJSON = {setReturnedJSON}
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
