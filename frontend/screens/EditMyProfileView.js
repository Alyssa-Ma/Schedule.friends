import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Text, TextInput, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {BASE_URL} from "@env";
import {HOST_URL} from "@env";

const EditMyProfileView = ({ navigation, route }) => {

    const context = useContext(UserContext);
    
    const {user} = route.params;

    const [fName, setFName] = useState(user.first_name);
    const [lName, setLName] = useState(user.last_name);
    const [userName, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [ProfileImage, setProfileImage] = useState(user.profile_image);

    /*
    const path = 'https://randomuser.me/api/portraits/lego/1.jpg';
    const filename= path.substring(path.lastIndexOf('/') + 1);
    console.log(filename);
    */

    const userData = new FormData();

    const [loadingButton, setLoadingButton] = useState(false);
    
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

    const createUserData = () => {
        userData.append('first_name', fName);
        userData.append('last_name', lName);
        userData.append('username', userName);
        userData.append('email', email);
        userData.append('profile_image', {
            uri: ProfileImage,
            type: "image/jpeg",
            name: ProfileImage.substring(ProfileImage.lastIndexOf('/') + 1)
         }) 

         confirmPressHandle();

    }
    
    const forumCheck = () => {
        var nameRegex = /^[A-Za-z]+$/;
        if((fName=="")||!(nameRegex.test(fName)))
        {
            Alert.alert("please enter a valid first name.");
            
        }
        else if ((lName=="")||!(nameRegex.test(lName)))
        {
            Alert.alert("please enter a valid last name.");
        }
        else 
        {
            createUserData();
        }
    }
    
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
                }
            } catch(error) {
                console.log(error)
            }
            setLoadingButton(false);
        }
    
    const cancelPressHandle = () => {
        navigation.pop();
        console.log("Cancel button pressed");
    }

    return (
        
        <View syle={styles.container}> 
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {choosPhotoFromLibrary()}}>
                        <View style={styles.icon}>

                        <ImageBackground
                            source={{
                            uri: ProfileImage,
                            }}
                            style={{height:125, width:125}}
                            imageStyle = {{borderRadius: 125/2}}
                        >
                    

                    <View style = {{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Icon name="photo" size={35} color="grey" style={styles.imageIcon}/>


                    </View>

                    </ImageBackground>


                            {/*
                            <Avatar.Text 
                                size = {100} 
                                backgroundColor = 'turquoise'
                                label=
                                {user.first_name.charAt(0)+user.last_name.charAt(0)}
                            />
                            */}

                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.fnamelname}>
                        {user.first_name + " " + user.last_name}
                    </Text>
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} />
                    <TextInput
                        mode="outlined"
                        label="First Name"
                        value={fName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} />
                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        value={lName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
     
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} />
                        <TextInput
                            mode="outlined"
                            label="E-Mail"
                            value={email}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setEmail(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                </View>
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} />
                        <TextInput
                            mode="outlined"
                            label="Username"
                            value={userName}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setUsername(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                </View>
                <View style={styles.buttons}>
                    <Button icon="check" loading={loadingButton} onPress={() => forumCheck() } mode="contained">Confirm</Button>
                </View>
                <View style={styles.buttons}>
                    <Button icon="cancel" onPress={() => cancelPressHandle()} mode="contained">Cancel</Button>
                </View>
            </View>
        </View>
    );
}

export default EditMyProfileView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputfields: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: 0,
      paddingLeft: 10,
      height: 35,
      color: '#05375a',
      marginLeft: 10,
    },
    icon: {
       height: 100,
       width: 100,
       borderRadius:15,
       justifyContent: 'center',
       alignItems: 'center',
    },
    fnamelname: {
        marginTop:10,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10

    },

    buttons: {
        marginTop: 5,
        marginBottom: 5

    },

    imageIcon: {
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10

    },

  });
