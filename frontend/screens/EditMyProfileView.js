import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, Keyboard} from 'react-native';
import UserContext from '../context/UserContext';
import {Text, TextInput, TouchableRipple, useTheme, ActivityIndicator, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {BASE_URL} from "@env";
import SnackBarContext from '../context/SnackBarContext';


const EditMyProfileView = ({ navigation, route }) => {

    const context = useContext(UserContext);
    const snackBarContext = useContext(SnackBarContext);

    const [fName, setFName] = useState(context.user.first_name);
    const [lName, setLName] = useState(context.user.last_name);
    const [userName, setUsername] = useState(context.user.username);
    const [email, setEmail] = useState(context.user.email);
    const [profileImage, setProfileImage] = useState(context.user.profile_image);
    const [validForm, setValidForm] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    //Function Thats Chooses Photo From Phone's Library
    const choosPhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(image => {
            setProfileImage(image.path);
        }).catch(error => {
            snackBarContext.setStatusText(`Unable to set image: ${error}`);
            snackBarContext.toggleSnackBar();
        });
    }

    // HELPER TEXT CHECKER FUNCS - Copied from SignUpScreen.js
    
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

    // Returns true if username does not only contain alphanumeric, -, _, @, +, and . and if over 15 character
    const unameValid = () => {
        const usernameRegex = /^[0-9a-zA-Z-_@+.]{4,15}$/;
        return !(usernameRegex.test(userName)) && userName.length > 0;
    };

    // Returns true if email is not valid name@host.ext
    const emailValid = () => {
        const simpleEmailRegex = /\S+@\S+\.\S+/; 
        return !(simpleEmailRegex.test(email)) && email.length > 0;
    };

    useEffect(() => {
        if (
            !(fName.length === 0) &&
            !(lName.length === 0) &&
            !fnameValid() &&
            !lnameValid() &&
            !(userName.length === 0) &&
            !unameValid() &&
            !(email.length === 0) &&
            !emailValid()
        ) {
            setValidForm(true);
        }
        else{
            setValidForm(false);
        }
    })
    
    //PATCH API CALL   
    const submitPatch = async () => {
        setLoadingButton(true);

        //Form Data Creation/Update for User
        const userData = new FormData();
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

        try {
            const response = await fetch(`${BASE_URL}/${context.user.id}`, {
                method:"PATCH",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${context.user.token}`
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
                snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
                snackBarContext.toggleSnackBar();

            }
        } catch(error) {
            setLoadingButton(false);
            snackBarContext.setStatusText(`${error}`);
            snackBarContext.toggleSnackBar();
        }
    }
    
    const { colors } = useTheme();

    return (    
        <ScrollView style={{styles: styles.container, backgroundColor: colors.backgroundColor}}>
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={choosPhotoFromLibrary}>
                        <View style={[styles.profileIcon, {backgroundColor: colors.secondColor}]}>
                            <Image
                                source={{uri: profileImage}}
                                style={{height:'100%', width:'100%'}}
                            />
                            <View style={[styles.shade, {opacity: profileImage ? .15 : 0,}]} />
                            <Icon 
                                style={{opacity: 1, position: "absolute"}}
                                name="camera-plus-outline" 
                                size={40} 
                                color='white'/>
                        </View>
                    </TouchableOpacity>
                    {
                        profileImage
                        ?
                            <Button 
                                icon="camera-off"
                                onPress={() => setProfileImage(null)}
                                theme={{colors: {primary: colors.secondColor}}}
                                >Remove Image
                            </Button>
                        : null
                    }
                    <Text 
                        numberOfLines={3} 
                        style = {[styles.fnamelname, {color:colors.text, marginTop: profileImage ? 0 : 10}]}>
                        {context.user.first_name + " " + context.user.last_name}
                    </Text>
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="account-edit" size={30} color={colors.secondColor} />
                    <TextInput
                        mode="outlined"
                        label="First Name"
                        error={fnameValid() || (fName.length === 0)}
                        value={fName}
                        placeholderTextColor = {colors.secondColor}
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                        theme={{
                            colors: {
                                placeholder: colors.secondColor,
                                text: colors.text,
                                primary: colors.text,
                            }
                        }}
                    />      
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="account-edit" size={30} color={colors.secondColor} />
                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        error={lnameValid() || (lName.length === 0)}
                        value={lName}
                        placeholderTextColor = {colors.secondColor}
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                        theme={{
                            colors: {
                                placeholder: colors.secondColor,
                                text: colors.text,
                                primary: colors.text,
                            }
                        }}
                    />
                </View>
     
                <View style={styles.inputfieldRow}>
                    <Icon name="email" size={30} color={colors.secondColor} />
                        <TextInput
                            mode="outlined"
                            label="E-Mail"
                            error={emailValid() || (email.length === 0)}
                            value={email}
                            placeholderTextColor = {colors.firstColor}
                            onChangeText = {(val) => setEmail(val)}
                            autoCorrect={false}
                            style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                            theme={{
                                colors: {
                                    placeholder: colors.secondColor,
                                    text: colors.text,
                                    primary: colors.text,
                                }
                            }}
                        />  
                </View>

                <View style={styles.inputfieldRow}>
                    <Icon name="badge-account" size={30} color={colors.secondColor} />
                        <TextInput
                            mode="outlined"
                            label="Username"
                            error={unameValid() || (userName.length === 0)}
                            value={userName}
                            placeholderTextColor = {colors.thirdColor}
                            onChangeText = {(val) => setUsername(val)}
                            autoCorrect={false}
                            style={[styles.textInputField, {backgroundColor: colors.backgroundColor}]}
                            theme={{
                                colors: {
                                    placeholder: colors.secondColor,
                                    text: colors.text,
                                    primary: colors.text,
                                }
                            }}
                        />  
                </View>

                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    <TouchableRipple
                        disabled={!validForm}
                        style={[styles.button,{backgroundColor:colors.firstColor}]}
                        borderless={true} 
                        onPress={submitPatch}
                    >
                        <View style={styles.buttonLayout}>
                            {
                                loadingButton
                                ? <ActivityIndicator style={{top: -11}} size={25} animating={loadingButton} color='white'/>
                                : <Icon name="check" size={25} color='white'/>
                            }
                            <Text style={[styles.buttonText, {color: 'white'}]}>Submit</Text>
                            <View style={[
                                styles.shade, 
                                styles.button, 
                                {left: -19, top: -21, width: 200,
                                opacity: validForm ? 0 : .3}]} />
                        </View>
                    </TouchableRipple>

                    <TouchableRipple 
                        style={[styles.button,{backgroundColor:colors.fourthColor}]}
                        borderless={true} 
                        onPress={() => {navigation.pop();}}
                    >
                        <View style={styles.buttonLayout}>
                            <Icon name="cancel" size={25} color='white'/>
                            <Text style={[styles.buttonText, {color: 'white'}]}>Cancel</Text>
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
        flex: 1,
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
    shade: {
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
        paddingHorizontal: 10
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
    button: {
        flexDirection: 'row',
        height:50,
        width: 140,
        borderRadius: 20,
        marginVertical: 5,
        marginTop: 10,
        overflow: "hidden",
    },
    buttonLayout: {
        flexDirection: 'row',
        top: 11,
        left: 18,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 20,
      },
  });
