import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
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
    {/*}
                            <Avatar.Text 
                                size = {100} 
                                backgroundColor = '#D7A4FF'
                                label=
                                {user.first_name.charAt(0)+user.last_name.charAt(0)}
                            />
    {*/}
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

                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.fnamelname}>
                        {user.first_name + " " + user.last_name}
                    </Text>
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} color='#9E8DFF' />
                    <TextInput
                        mode="outlined"
                        label="First Name"
                        value={fName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                        theme={{
                            colors: {
                                placeholder: '#9E8DFF',
                                text: '#9E8DFF',
                                //primary: 'white',
                                underlineColor: 'transparent'
                            }
                        }}/>
                        
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} color='#7DD1FF'/>
                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        value={lName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                        theme={{
                            colors: {
                                placeholder: '#7DD1FF',
                                text: '#7DD1FF',
                                //primary: 'white',
                                underlineColor: 'transparent'
                            }
                    }}/>
                
                </View>
     
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} color='#68B0D8'/>
                        <TextInput
                            mode="outlined"
                            label="E-Mail"
                            value={email}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setEmail(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                            theme={{
                                colors: {
                                    placeholder: '#68B0D8',
                                    text: '#68B0D8',
                                    //primary: 'white',
                                    underlineColor: 'transparent'
                                }
                        }}/>
                        
                </View>
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} color='#5CDBD5' />
                        <TextInput
                            mode="outlined"
                            label="Username"
                            value={userName}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setUsername(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                            theme={{
                                colors: {
                                    placeholder: '#5CDBD5',
                                    text: '#5CDBD5',
                                    //primary: 'white',
                                    underlineColor: 'transparent'
                                }
                            }}/>
                        
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={styles.confirmBox} onPress={() => forumCheck()}>
                        <View style={styles.listItem1}>
                            <Icon name="check" size={25} color='white'/>
                            <Text style={styles.listItemText}>Confirm</Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={styles.cancelBox} onPress={() => cancelPressHandle()}>
                        <View style={styles.listItem1}>
                            <Icon name="cancel" size={25} color='white'/>
                            <Text style={styles.listItemText}>Cancel</Text>
                        </View>
                    </TouchableRipple>
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
        marginBottom: 10,
        color:'#D7A4FF'
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
        width:370, 
        height:50,
        backgroundColor:'#9E8DFF',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        
    },
    cancelBox: {
        flexDirection: 'row',
        width:370, 
        height:50,
        backgroundColor:'#5CDBD5',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        top:5,
    },
    listItem1: {
        flexDirection: 'row',
        top: 10,
        left:10,
        
    },

  });