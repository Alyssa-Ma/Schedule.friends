import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import {Text, TextInput, TouchableRipple, useTheme} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {BASE_URL} from "@env";
import { color } from 'react-native-reanimated';

const EditMyProfileView = ({ navigation, route }) => {

    const context = useContext(UserContext);
    
    const {user} = route.params;

    const [fName, setFName] = useState(user.first_name);
    const [lName, setLName] = useState(user.last_name);
    const [userName, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [profileImage, setProfileImage] = useState(user.profile_image);

    const userData = new FormData();

    const [loadingButton, setLoadingButton] = useState(false);


    //Function Thats Chooses Photo From Phone's Library
    const choosPhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
          }).then(image => {
            console.log(image);
            setProfileImage(image.path);
          })
          .catch(error => console.log("Unable to Load Photo"));
    }

    //Form Data Creation/Update for User
    const createUserData = () => {
        userData.append('first_name', fName);
        userData.append('last_name', lName);
        userData.append('username', userName);
        userData.append('email', email);

        if (profileImage != null) {
            userData.append('profile_image', {
                uri: profileImage,
                type: "image/jpeg",
                name: profileImage.substring(profileImage.lastIndexOf('/') + 1)
             }) 
        } else {
            userData.append('profile_image', "");
        }
        confirmPressHandle();
    }

    const removeProfilePicture = () => {
        setProfileImage(null);
    }

    // HELPER TEXT CHECKER FUNCS
    
    // Returns true if first_name does not only contain alphabet or is over 150 characters
    const fnameValid = () => {
        const nameRegex = /^[A-Za-z]{1,150}$/;
        return (!(nameRegex.test(fName)) && fName.length > 0);
    };

    // Returns true if last_name does not only contain alphabet or is over 150 characters
    const lnameValid = () => {
        const nameRegex = /^[A-Za-z]{1,150}$/;
        return (!(nameRegex.test(lName)) && lName.length > 0);
    };

    // Returns true if username does not only contain alphanumeric, -, _, @, +, and . and if over 20 character
    const unameValid = () => {
        const usernameRegex = /^[0-9a-zA-Z-_@+.]{1,20}$/;
        return !(usernameRegex.test(userName)) && userName.length > 0;
    };

    // Returns true if email is not valid name@host.ext
    const emailValid = () => {
        const simpleEmailRegex = /\S+@\S+\.\S+/; 
        return !(simpleEmailRegex.test(email)) && email.length > 0;
    }

    // fourmCheck that runs on Register submit button
    const forumCheck = () => {
        // Checks if first_name is empty
        if (fName=="") {
            Alert.alert("Please enter a first name.");
        }
        
        // Checks if last name is empty
        else if (lName=="") {
            Alert.alert("Please enter a last name.");
        }

        // regex check first_name and last_name
        else if ((fnameValid()) || (lnameValid())){
            Alert.alert("Only alphabetical characters are accepted for first and last names.");
        }

        // Checks if username is empty
        else if (userName=="") {
            Alert.alert("Please enter a username.");
        }

        // regex check username
        else if (unameValid()) {
            Alert.alert("Username can only contain alphanumeric, _, @, +, . and - characters.");
        }

        // regex check email
        else if (emailValid()) {
            Alert.alert("Please enter a valid email.");
        }

        // All checks are passed, data is sent to backend
        else 
            createUserData();
    }


    //PATCH API CALL   
    const confirmPressHandle = async () => {
        setLoadingButton(true);
        try {
            const response = await fetch(`${BASE_URL}/${user.id}`, {
                method:"PATCH",
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user.token}`
                
                },

                body: userData
            
            })
            
            const jsonResponse = await response.json();
            if (response.status === 200) {
                setLoadingButton(false);
                context.setUser(jsonResponse);
                navigation.pop();
            }
            else {
                setLoadingButton(false);
                console.log(`Server Error ${response.status}`)
                Alert.alert(`Server Error or Username already taken`);
            }
        } catch(error) {
            console.log(error)
        }
        setLoadingButton(false);
    }
    
    //GO BACK TO PROFILE SCRREN WHEN CANCEL IS PRESSED
    const cancelPressHandle = () => {
        navigation.pop();
        console.log("Cancel button pressed");
    }

    const { colors } = useTheme(); //THEME

    return (    
        <ScrollView style={{styles: styles.container, backgroundColor: colors.backgroundColor}}>
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {choosPhotoFromLibrary()}}>
                        <View style={[styles.profileIcon, {backgroundColor: colors.secondColor}]}>
                            <Image
                                source={{uri: profileImage}}
                                style={{height:'100%', width:'100%'}}
                            />
                            <View style={[styles.profileShade, {opacity: profileImage ? .15 : 0,}]} />
                            <Icon style={{opacity: 1, position: "absolute"}}name="camera-plus-outline" size={35} color='white'/>
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={3} style = {[styles.fnamelname, {color:colors.text}]}>
                        {user.first_name + " " + user.last_name}
                    </Text>
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="account-edit" size={30} color={colors.secondColor} />
                    <TextInput
                        mode="outlined"
                        label="First Name"
                        value={fName}
                        placeholderTextColor = {colors.secondColor}
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                        theme={{
                            colors: {
                                placeholder: colors.secondColor,
                                text: colors.text,
                                primary: colors.focusedColor,
                            }
                        }}
                    />      
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="account-edit" size={30} color={colors.secondColor} />
                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        value={lName}
                        placeholderTextColor = {colors.secondColor}
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                        theme={{
                            colors: {
                                placeholder: colors.secondColor,
                                text: colors.text,
                                primary: colors.focusedColor,
                            }
                        }}
                    />
                </View>
     
                <View style={styles.inputfieldRow}>
                    <Icon name="email" size={30} color={colors.secondColor} />
                        <TextInput
                            mode="outlined"
                            label="E-Mail"
                            value={email}
                            placeholderTextColor = {colors.firstColor}
                            onChangeText = {(val) => setEmail(val)}
                            autoCorrect={false}
                            style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                            theme={{
                                colors: {
                                    placeholder: colors.secondColor,
                                    text: colors.text,
                                    primary: colors.focusedColor,
                                }
                            }}
                        />  
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="badge-account" size={30} color={colors.secondColor} />
                        <TextInput
                            mode="outlined"
                            label="Username"
                            value={userName}
                            placeholderTextColor = {colors.thirdColor}
                            onChangeText = {(val) => setUsername(val)}
                            autoCorrect={false}
                            style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                            theme={{
                                colors: {
                                    placeholder: colors.secondColor,
                                    text: colors.text,
                                    primary: colors.focusedColor,
                                }
                            }}
                        />  
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={[styles.confirmBox,{backgroundColor:colors.secondColor}]} onPress={() => removeProfilePicture()}>
                        <View style={styles.listItem1}>
                        <   Icon name="cancel" size={25} color='white'/> 
                            <Icon name="image" size={25} color='white'/>
                            <Text style={styles.listItemText}>Remove Proflie Picture</Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={[styles.cancelBox,{backgroundColor:colors.fifthColor}]} onPress={() => forumCheck()}>
                        <View style={styles.listItem1}>
                            <Icon name="cancel" size={25} color='white'/>
                            <Text style={styles.listItemText}>Submit</Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={[styles.cancelBox,{backgroundColor:colors.firstColor}]} onPress={() => cancelPressHandle()}>
                        <View style={styles.listItem1}>
                            <Icon name="cancel" size={25} color='white'/>  
                            <Text style={styles.listItemText}>Cancel</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        </ScrollView>

    );
    
}

export default EditMyProfileView;

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIcon: {
        height: 125,
        width: 125,
        borderRadius: 62.5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    profileShade: {
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        backgroundColor: 'black', 
        width: "100%",
        height: "100%"
    },
    fnamelname: {
        marginVertical: 10,
        fontSize: 23,
        fontWeight: 'bold',
    },
    inputfieldRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
    },
    textInputField: {
        flex: 1,
        marginTop: 0,
        height: 35,
        marginLeft: 10,
    },
    listItemText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 27,
    },
    listWrapper: {
        marginTop: 10,
    },
    confirmBox: {
        flexDirection: 'row',
        width:360, 
        height:50,
        backgroundColor:'#9E8DFF',
        borderRadius: 20, 
        
    },
    cancelBox: {
        flexDirection: 'row',
        width:360, 
        height:50,
        backgroundColor:'#5CDBD5',
        borderRadius: 20, 
        top:5,
    },

    listItem1: {
        flexDirection: 'row',
        top: 10,
        left:10,
        
    },
  });
