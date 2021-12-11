import React, {useState, useContext} from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';

const SignUpScreen = ({ navigation }) => {
    const context = useContext(UserContext);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [schedule, setSchedule] = useState([]);
    
    // HELPER TEXT CHECKER FUNCS
    
    // Returns true if first_name does not only contain alphabet or is over 150 characters
    const fnameValid = () => {
        const nameRegex = /^[A-Za-z]{1,150}$/;
        return (!(nameRegex.test(first_name)) && first_name.length > 0);
    };

    // Returns true if last_name does not only contain alphabet or is over 150 characters
    const lnameValid = () => {
        const nameRegex = /^[A-Za-z]{1,150}$/;
        return (!(nameRegex.test(last_name)) && last_name.length > 0);
    };

    // Returns true if username does not only contain alphanumeric, -, _, @, +, and . and if over 15 character
    const unameValid = () => {
        const usernameRegex = /^[0-9a-zA-Z-_@+.]{4,15}$/;
        return !(usernameRegex.test(username)) && username.length > 0;
    };

    // Returns true if email is not valid name@host.ext
    const emailValid = () => {
        const simpleEmailRegex = /\S+@\S+\.\S+/; 
        return !(simpleEmailRegex.test(email)) && email.length > 0;
    }

    // Return true if password does not contain at least 6 characters, two which are digits, and one uppercase
    const passwordValid = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return !(passwordRegex.test(password)) && password.length > 0;
    }

    // Returns true if conPassword does not match password and if length is 6 or less
    const confPasswordValid = () => {
        return !(password === confPassword) && confPassword.length <= 6;
    }

    // fourmCheck that runs on Register submit button
    const forumCheck = () => {
        // Checks if first_name is empty
        if (first_name=="") {
            Alert.alert("Please enter a first name.");
        }
        
        // Checks if last name is empty
        else if (last_name=="") {
            Alert.alert("Please enter a last name.");
        }

        // regex check first_name and last_name
        else if ((fnameValid()) || (lnameValid())){
            Alert.alert("Only alphabetical characters are accepted for first ane last names.");
        }

        // Checks if username is empty
        else if (username=="") {
            Alert.alert("Please enter a username.");
        }

        //Checks username length
        else if (username.length > 15 || username.length < 4) {
            Alert.alert("Username must be between 4-15 characters")
        }

        // regex check username
        else if (unameValid()) {
            Alert.alert("Username can only contain alphanumeric, _, @, +, . and - characters.");
        }

        // regex check email
        else if (emailValid()) {
            Alert.alert("Please enter a valid email.");
        }

        // Checks if password is empty
        else if ((password=="")) {
            Alert.alert("Please enter a password.");
        }

        // regex check password
        else if (passwordValid()) {
            Alert.alert("Password is invalid.");
        }

        // Checks if password and confPassword are the same
        else if (password !== confPassword) {
            Alert.alert("Password do not match")
        }

        // All checks are passed, data is sent to backend
        else 
            submitForm();
    }

    const submitForm = async () => {
        try {
            let response =  await fetch(`${BASE_URL}/create`, {
                method:"POST", 
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    first_name:first_name, 
                    last_name:last_name, 
                    username:username, 
                    email:email, 
                    password:password, 
                    schedule:schedule,
                })
            })
            const jsonResponse = await response.json();
            if (response.status === 201) {
                context.setUser(jsonResponse);
                context.setIsSignedIn(true);
            }
            else {
                console.log(JSON.stringify(jsonResponse))
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={[styles.inputBox, {marginTop: 25}, {backgroundColor:'#D7A4FF'}]}>
                    <TextInput
                        error={fnameValid()}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="First Name"
                        placeholder = 'Enter Your First Name'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setFirstName(val)}
                    />
                </View>
                <HelperText type="error" visible={fnameValid()} style={styles.error}>
                    Error: Only letters are allowed
                </HelperText>

                <View style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]}>
                    <TextInput
                        error={lnameValid()}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="Last Name"
                        placeholder = 'Enter Your Last Name'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setLastName(val)}
                    />
                </View>
                <HelperText type="error" visible={lnameValid()} style={styles.error}>
                    Error: Only letters are allowed
                </HelperText>

                <View style={[styles.inputBox, {backgroundColor:'#7DD1FF'}]}>
                    <TextInput
                        error={unameValid()}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="Username"
                        placeholder = 'Enter Your Username'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setUserName(val)}
                    />
                </View>    
                <HelperText type="error" visible={unameValid()} style={styles.error}>
                    Error: Only 4-15 alphanumeric, -, _, @, +, and . characters allowed.
                </HelperText>

                <View style={[styles.inputBox, {backgroundColor:'#68B0D8'}]}>
                    <TextInput
                        error={emailValid()}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="E-Mail"
                        placeholder = 'Enter Your E-Mail'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setEmail(val)}
                    />
                </View>  
                <HelperText type="error" visible={emailValid()} style={styles.error}>
                    Error: Must be in valid e-mail format (name@host.ext)
                </HelperText>    

                <View style={[styles.inputBox, {backgroundColor:'#5CDBD5'}]}>
                    <TextInput
                        error={passwordValid()}
                        secureTextEntry={true}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="Password"
                        placeholder = 'Enter Your Password'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setPassword(val)}
                    />
                </View> 
                <HelperText type="error" visible={passwordValid()} style={styles.error}>
                    Error: Password must be at least 6 characters with at least one number, one uppercase letter, and one lowercase letter.
                </HelperText>

                <View style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]}>
                    <TextInput
                        error={confPasswordValid()}
                        secureTextEntry={true}
                        style={styles.input}
                        activeUnderlineColor='white'
                        label="Password Confirmation"
                        placeholder = 'Enter Your Password Again'
                        placeholderTextColor = '#ffffff'
                        onChangeText = {(val) => setConfPassword(val)}
                    />
                </View> 
                <HelperText type="error" visible={confPasswordValid()} style={styles.error}>
                    Error: Passwords do not match.
                </HelperText> 
                
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}
                    onPress = {() => { forumCheck()}}
                    >Register</Text>
                </TouchableOpacity>
            
            </View>
        </ScrollView>
    );
};

//eporting the funtion that will be rendered
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 3, 
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText: {
        marginTop: 40,
        marginBottom: 15,
        fontSize:18,
        color:'white',
        
    },
    inputBox: {
        width: 350, 
        borderRadius: 20,
        height: 55,
        paddingHorizontal: 16,
        fontSize: 16, 
        color: 'white',
        overflow: 'hidden'
    },
    input: {
        backgroundColor: 'transparent',
        margin: -6,
        overflow: 'hidden'
    },    
    button:{
        backgroundColor:'#53C2FF',
        borderRadius: 15, 
        width:350, 
        marginBottom: 50,
        paddingVertical: 12,

    },
    buttonText: {
        fontSize: 18, 
        fontWeight:"900",
        color:'white',
        textAlign: 'center',
        
    },
    text: {
        color: 'white',  
    },   
    error: {
        width: 350,
        textAlign: 'center',
        color: '#4CD2CC',
        fontSize: 14,
        fontWeight: 'bold'
    },

})
