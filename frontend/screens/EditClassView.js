import React, {useEffect, useState, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import { Button, Snackbar, useTheme} from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const EditClassView = ({ navigation, item, route }) => {
    const { itemId, 
        courseName, 
        courseNumber,
        timeStart, 
        timeEnd, 
        dayName,
        starthr,
        startmin,
        endhr,
        endmin 
        } = route.params;
    const context = useContext(UserContext);
    const [returnedJSON, setReturnedJSON] = useState({});

    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButtonDelete, setLoadingButtonDelete] = useState(false);

    const [snackVisible, setSnackVisible] = useState(false);
    const [statusText, setStatusText] = useState("");

    const { colors } = useTheme();   //THEME

    const toggleSnackBar = () => setSnackVisible(!snackVisible);
    const onDismissSnackBar = () => setSnackVisible(false);

    //useEffect that monitors loadingButton state
    useEffect(() => {
        const handleSubmit = async (completedForm) => {
            try {
                //Fetch URL should be an dotenv variable with some sort of prop for user id
                const patchResponse = await fetch(`${BASE_URL}/${context.user.id}/schedule/${itemId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        //This needs to be brought down from props
                        'Authorization': `Token ${context.user.token}`
                    },
                    body: completedForm
                });
                const jsonResponse = await patchResponse.json();
                //this means the server accepted the patch request
                if (patchResponse.status === 200) {
                    //returns the json for state handling
                    console.log(jsonResponse)
                    let tempUser = {...context.user};
                    tempUser.schedule[tempUser.schedule.findIndex(course => {if(course.id === jsonResponse.id) return true;})] = jsonResponse;
                    context.setUser(tempUser);
                    setStatusText(`Course Sucessfully Editted!`);
                    toggleSnackBar();
                    navigation.pop();
                }
                else { // something went wrong on the server end
                    let trimJSON = JSON.stringify(jsonResponse);
                    trimJSON = trimJSON.replace(/[{"},\[\]]/gm, '');
                    trimJSON = trimJSON.replace(/[.]/gm, "\n");
                    console.log(trimJSON);
                    setStatusText(`Error ${patchResponse.status}: ${trimJSON}`);
                    toggleSnackBar();
                }
            }
            catch(error) {
                console.log(error);
                setStatusText(`Error ${error}`);
                toggleSnackBar();
            }
            setLoadingButton(!loadingButton);
        }
        console.log(loadingButton);
        if (loadingButton) {
            handleSubmit(returnedJSON);
        }
    }, [loadingButton])

    //useEffect that monitors loadingButtonDelete state
    useEffect(() => {
        const deleteCourse = async () => {
            try {
                const deleteResponse = await fetch(`${BASE_URL}/5/schedule/${itemId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                    }
                });
                const jsonResponse = await deleteResponse.json();
                if (deleteResponse.status === 200) {
                    console.log(jsonResponse)
                    let tempUser = {...context.user};
                    tempUser.schedule.splice(tempUser.schedule.findIndex(course => {if(course.id === jsonResponse.id) return true;}), 1);
                    context.setUser(tempUser);
                    setStatusText(`Course Sucessfully Deleted!`);
                    toggleSnackBar();
                    navigation.pop();
                }
                else {
                    let trimJSON = JSON.stringify(jsonResponse);
                    trimJSON = trimJSON.replace(/[{"},\[\]]/gm, '');
                    trimJSON = trimJSON.replace(/[.]/gm, "\n");
                    console.log(trimJSON);
                    setStatusText(`Error ${deleteResponse.status}: ${trimJSON}`);
                    toggleSnackBar();
                }
            }
            catch(error) {
                console.log(error);
                setStatusText(`Error ${error}`);
                toggleSnackBar();
            }
            setLoadingButtonDelete(!loadingButtonDelete);
        }
        if (loadingButtonDelete) {
            deleteCourse();
        }
    }, [loadingButtonDelete])

    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            <CourseForm
                courseName = {courseName}
                courseNumber = {courseNumber}
                startHour = {starthr}
                startMin = {startmin}
                endHour = {endhr}
                endMin = {endmin}
                selectedDays = {dayName}
                setReturnedJSON = {setReturnedJSON}
                navigation = {navigation}
                loadingButton = {loadingButton}
                setLoadingButton = {setLoadingButton}
            />
            <View style={styles.delete}>
                <Button icon="delete" style={styles.deleteButton} color ="red" loading={loadingButtonDelete} mode="contained" onPress={() => {setLoadingButtonDelete(!loadingButtonDelete)}} >
                    DELETE CLASS
                </Button>
            </View>
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
    delete: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    container: {
        flex: 1,
        paddingTop: 0,
    },

    deleteButton: {
        backgroundColor: '#e21d56',
        color: 'white',
        marginTop: 30
    }

});

export default EditClassView;
