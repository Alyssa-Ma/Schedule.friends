import React, {useState, useContext} from 'react';
import { View, Alert, Text, StyleSheet, StatusBar,
        TouchableOpacity } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import {BASE_URL} from "@env";
import UserContext from '../context/UserContext';

const SignUpScreen = ({ navigation }) => {
    const context = useContext(UserContext);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [schedule, setSchedule] = useState([]);
    const onChangeFText = first_name => setFirstName(first_name);
    const onChangeLText = last_name => setLastName(last_name);
    const onChangeUText = username => setUserName(username);
    const onChangeEText = email => setEmail(email);
    const onChangePText = password => setPassword(password);
    
    // HELPER TEXT CHECKER FUNCS
    const fnameValid = () => {
        var nameRegex = /^[A-Za-z]+$/;
        return !(nameRegex.test(first_name));
    };

    const lnameValid = () => {
        var nameRegex = /^[A-Za-z]+$/;
        return !(nameRegex.test(last_name));
    };

    const unameValid = () => {
        var usernameRegex = /^[0-9a-zA-Z]+$/;
        return !(usernameRegex.test(username));
    };

    const emailValid = () => {
        var simpleEmailRegex = /\S+@\S+\.\S+/; 
        return !(simpleEmailRegex.test(email));
    }

    const passwordValid = () => {
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return !(passwordRegex.test(password));
    }
    const forumCheck = () => {
        const fname = first_name;
        const lname = last_name;
        const uname = username; 
        const em = email; 
        const pword = password;
        
        //firstname + lastname regex to check if inputed names follow correct syntax. only allows letters.
        var nameRegex = /^[A-Za-z]+$/;

        //username regex to check if inputed usernames follow correct syntax. only allows letters and numbers. 
        var usernameRegex = /^[0-9a-zA-Z]+$/;

        //email regex to check if inputed emails follow correct syntax. (something@something.something)
        var simpleEmailRegex = /\S+@\S+\.\S+/;  

        //password regex to check if inputed passwords follow correct syntax. only allows 6-20 chars which contain at least one numeric digit, 
        //one upercase letter and one lowercase letter 
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        //separated and added some new alerts to help out user(right now doesn't tell why user created an error)
        //first name alerts
        if (fname=="")
        {
            //errors{"fname"} = "Please enter your username.";
            Alert.alert("Please enter a first name.");
            errors = "Please enter a first name.";
            console.log(errors);
        }
        //both fname and last name use nameregex
        else if (!(nameRegex.test(fname)) || !(nameRegex.test(lname)))
        {
            Alert.alert("Only alphabetical characters are accepted for first ane last names.");
        }
        //last name alerts
        else if (lname=="")
        {
            Alert.alert("Please enter a last name.");
        }
        else if (uname=="")
        {
            Alert.alert("Please enter a username.");
        }
        //weird error: alerts will get cut off on the second line
        else if (!(usernameRegex.test(uname)))
        {
            Alert.alert("Username can only contain letters and numbers.");
        }
        else if ((em=="")||!(simpleEmailRegex.test(em)))
        {
            Alert.alert("Please enter a valid email.");
        }
        else if ((pword==""))
        {
            Alert.alert("Please enter a password.");
        }
        else if (!(passwordRegex.test(pword)))
        {
            Alert.alert("Password is invalid.");
        }
        else 
        {
            insertData();
        }
    }

    const insertData = async () => {
        await fetch(`${BASE_URL}/create`, {
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
        .then(resp => resp.json())
        .then(data => {
            context.setUser(data);
            context.setIsSignedIn(true);
            Alert.alert("USER REGISTERED");
        })
        .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>

            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />

            <View>
                <Text style={styles.logoText}> Create an account </Text> 
            </View>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                label="First Name"
                placeholder = 'Enter your first name'
                onChangeText = {(val) => setFirstName(val), first_name => onChangeFText(first_name)}
                value={first_name}
                //stylesheet doesn't work for colors for react native paper, change it here
                theme={{
                    colors: {
                        //placeholder: 'purple',
                        text: 'white',
                        //primary: 'white',
                        underlineColor: 'transparent'
                    }
                }}/>
            <HelperText type="error" visible={fnameValid()} style={styles.error}>
                Error: Only letters are allowed
            </HelperText>
            
            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                label="Last Name"
                placeholder = 'Enter your last name' 
                onChangeText = {(val) => setLastName(val), last_name => onChangeLText(last_name)}
                theme={{
                    colors: {
                        //placeholder: 'purple',
                        text: 'white',
                        //primary: 'white',
                        underlineColor: 'transparent'
                    }
                }}/>
            <HelperText type="error" visible={lnameValid()} style={styles.error}>
                Error: Only letters are allowed
            </HelperText>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                label="Username"
                placeholder = 'Enter your username. Letters and numbers only' 
                onChangeText = {(val) => setUserName(val), username => onChangeUText(username)}
                theme={{
                    colors: {
                        //placeholder: 'purple',
                        text: 'white',
                        //primary: 'white',
                        underlineColor: 'transparent'
                    }
                }}/>        
            <HelperText type="error" visible={unameValid()} style={styles.error}>
                Error: Only letters and numbers are allowed
            </HelperText>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                label="Email"
                placeholder = 'Enter a valid email' 
                onChangeText = {(val) => setEmail(val), email => onChangeEText(email)}
                theme={{
                    colors: {
                        //placeholder: 'purple',
                        text: 'white',
                        //primary: 'white',
                        underlineColor: 'transparent'
                    }
                }}/> 
            <HelperText type="error" visible={emailValid()} style={styles.error}>
                Error: Invalid email
            </HelperText>    

            <TextInput secureTextEntry={true} style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                label="Password"
                placeholder = 'Enter a valid password' 
                onChangeText = {(val) => setPassword(val), password => onChangePText(password)}
                theme={{
                    colors: {
                        //placeholder: 'purple',
                        text: 'white',
                        //primary: 'white',
                        underlineColor: 'transparent'
                    }
                }}/>
            <HelperText type="error" visible={passwordValid()} style={styles.error}>
                Error: Invalid password. Password must be 6-20 characters with at least one number, one uppercase letter, and one lowercase letter.
            </HelperText>   
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress = {() => { forumCheck()}}
                >Register</Text>
            </TouchableOpacity>
        </View>
    );
};

//eporting the funtion that will be rendered
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 3, 
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText: {
        marginVertical: 15,
        fontSize:18,
        color:'white',
        
    },

    inputBox: {
        width:300, 
        backgroundColor:'#5176A8',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 16, 
        fontSize: 16, 
        color: 'white',
        
        marginVertical: 5,
    },
    
    button:{
        backgroundColor:'#007169',
        borderRadius: 25, 
        width:300, 
        marginVertical: 10,
        paddingVertical: 12,

    },
    buttonText: {
        fontSize: 15, 
        fontWeight:"500",
        color:'white',
        textAlign: 'center'
    },

    text: {
        color: 'white',
        
    },
    
    error: {
        color: 'red',
        fontSize: 13,
    },

})
