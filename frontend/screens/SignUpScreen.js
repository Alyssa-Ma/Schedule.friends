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
    const onChangeFText = first_name => setFirstName(first_name);
    const onChangeLText = last_name => setLastName(last_name);
    const onChangeUText = username => setUserName(username);
    const onChangeEText = email => setEmail(email);
    const onChangePText = password => setPassword(password);
    const onChangeCTest = confPassword => setConfPassword(confPassword);
    
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

    // Returns true if username does not only contain alphanumeric, -, _, @, +, and . and if over 20 character
    const unameValid = () => {
        const usernameRegex = /^[0-9a-zA-Z-_@+.]{1,20}$/;
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
        return !(password === confPassword) && confPassword.length >= 6;
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
            insertData();
    }

    const insertData = async () => {
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
            
                <TextInput style={[styles.inputBox, {marginTop: 50}, {backgroundColor:'#D7A4FF'}]} 
                    label="First Name"
                    underlineColor = 'transparent'
                    placeholder = 'Enter your first name'
                    onChangeText = {(val) => setFirstName(val), first_name => onChangeFText(first_name)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    />
                <HelperText type="error" visible={fnameValid()} style={styles.error}>
                    Error: Only letters are allowed
                </HelperText>
                <TextInput style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]} 
                    underlineColor = 'rgba(0,0,0,0)' 
                    label="Last Name"
                    placeholder = 'Enter your last name' 
                    onChangeText = {(val) => setLastName(val), last_name => onChangeLText(last_name)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    />
                <HelperText type="error" visible={lnameValid()} style={styles.error}>
                    Error: Only letters are allowed
                </HelperText>

                <TextInput style={[styles.inputBox, {backgroundColor:'#7DD1FF'}]} 
                    underlineColor = 'rgba(0,0,0,0)' 
                    label="Username"
                    placeholder = 'Enter your username. Letters and numbers only' 
                    onChangeText = {(val) => setUserName(val), username => onChangeUText(username)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    />        
                <HelperText type="error" visible={unameValid()} style={styles.error}>
                    Error: Only letters and numbers are allowed
                </HelperText>

                <TextInput style={[styles.inputBox, {backgroundColor:'#68B0D8'}]} 
                    underlineColor = 'rgba(0,0,0,0)' 
                    label="Email"
                    placeholder = 'Enter a valid email' 
                    onChangeText = {(val) => setEmail(val), email => onChangeEText(email)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    /> 
                <HelperText type="error" visible={emailValid()} style={styles.error}>
                    Error: Invalid email
                </HelperText>    

                <TextInput secureTextEntry={true} style={[styles.inputBox, {backgroundColor:'#5CDBD5'}]} 
                    underlineColor = 'rgba(0,0,0,0)'
                    label="Password"
                    placeholder = 'Enter a valid password' 
                    onChangeText = {(val) => setPassword(val), password => onChangePText(password)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    />
                <HelperText type="error" visible={passwordValid()} style={styles.error}>
                    Error: Invalid password. Password must be 6-20 characters with at least one number, one uppercase letter, and one lowercase letter.
                </HelperText>

                <TextInput secureTextEntry={true} style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]} 
                    underlineColor = 'rgba(0,0,0,0)'
                    label="Password Confirmation"
                    placeholder = 'Enter a valid password' 
                    onChangeText = {confPassword => onChangeCTest(confPassword)}
                    theme={{
                        colors: {
                            text: 'white',
                        }
                    }}
                    />
                <HelperText type="error" visible={confPasswordValid()} style={styles.error}>
                    Passwords do not match.
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
        width:350, 
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16, 
        fontSize: 16, 
        color: 'white',
        height: 55
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
        color: '#4CD2CC',
        fontSize: 14,
        fontWeight: 'bold'
    },

})
