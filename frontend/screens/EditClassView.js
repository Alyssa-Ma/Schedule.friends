import React, {useEffect, useState, useContext} from 'react';
import { View, StyleSheet} from 'react-native';
import CourseForm from '../components/CourseForm';
import { Button, useTheme} from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import SnackBarContext from '../context/SnackBarContext';

const EditClassView = ({ navigation, item, route }) => {
    const { itemId, 
        courseName, 
        courseNumber,
        dayName,
        starthr,
        startmin,
        endhr,
        endmin 
        } = route.params;
    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext);

    const [returnedJSON, setReturnedJSON] = useState({});

    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButtonDelete, setLoadingButtonDelete] = useState(false);

    const { colors } = useTheme();   //THEME

    //useEffect that monitors loadingButton state
    useEffect(() => {
        const handleSubmit = async (completedForm) => {
            try {
                //Fetch URL should be an dotenv variable with some sort of prop for user id
                const patchResponse = await fetch(`${BASE_URL}/${context.user.id}/schedule/${itemId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${context.user.token}`
                    },
                    body: completedForm
                });
                const jsonResponse = await patchResponse.json();
                //this means the server accepted the patch request
                if (patchResponse.status === 200) {
                    //returns the json for state handling
                    let tempUser = {...context.user};
                    tempUser.schedule[tempUser.schedule.findIndex(course => {if(course.id === jsonResponse.id) return true;})] = jsonResponse;
                    context.setUser(tempUser);
                    snackBarContext.setStatusText(`Course Sucessfully Edited!`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButton(!loadingButton);
                    navigation.pop();
                }
                else { // something went wrong on the server end
                    snackBarContext.setStatusText(`${patchResponse.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButton(!loadingButton);
                }
            }
            catch(error) {
                snackBarContext.setStatusText(`Error ${error}`);
                snackBarContext.toggleSnackBar();
                setLoadingButton(!loadingButton);
            }
        }
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
                    let tempUser = {...context.user};
                    tempUser.schedule.splice(tempUser.schedule.findIndex(course => {if(course.id === jsonResponse.id) return true;}), 1);
                    context.setUser(tempUser);
                    snackBarContext.setStatusText(`Course Sucessfully Deleted!`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButton(!loadingButton);
                    navigation.pop();
                }
                else {
                    snackBarContext.setStatusText(`${deleteResponse.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                    snackBarContext.toggleSnackBar();
                    setLoadingButtonDelete(!loadingButtonDelete);
                }
            }
            catch(error) {
                snackBarContext.setStatusText(`${error}`);
                snackBarContext.toggleSnackBar();
                setLoadingButtonDelete(!loadingButtonDelete);
            }
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
                <Button 
                    icon="delete" 
                    style={[styles.deleteButton, {backgroundColor: colors.error}]} 
                    color='black'
                    loading={loadingButtonDelete}
                    mode="contained" 
                    onPress={() => {setLoadingButtonDelete(!loadingButtonDelete)}} 
                    >DELETE CLASS
                </Button>
            </View>
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
