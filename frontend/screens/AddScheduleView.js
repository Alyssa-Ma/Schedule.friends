import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import { useTheme } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import SnackBarContext from '../context/SnackBarContext';

const AddScheduleView = ({ navigation }) => {
    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext)
    const [returnedJSON, setReturnedJSON] = useState({});

    const [loadingButton, setLoadingButton] = useState(false);
    
    const { colors }= useTheme();

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
                const jsonResponse = await postResponse.json();
                
                //this means the server accepted the post request
                if (postResponse.status === 201) {
                    //returns the json for state handling
                    let userCopy = {...context.user};
                    userCopy.schedule.push(jsonResponse);
                    context.setUser(userCopy)
                    snackBarContext.setStatusText(`Course Sucessfully Added!`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButton(false)
                    navigation.pop();
                }
                else { // something went wrong on the server end
                    snackBarContext.setStatusText(`${postResponse.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButton(false)
                }
            }
            catch(error) {
                snackBarContext.setStatusText(`${error}`);
                snackBarContext.toggleSnackBar();
                setLoadingButton(false)
            }
        }
        if (loadingButton) {
            handleSubmit(returnedJSON);
        }
    }, [loadingButton])

    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
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
