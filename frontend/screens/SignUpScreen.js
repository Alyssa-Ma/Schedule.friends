import React, {useState, useContext} from 'react';
import { View, Alert, Text, StyleSheet, StatusBar, Image,
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
    const onChangeText = first_name => setFirstName(first_name);

    const fnameValid = () => {
        var nameRegex = /^[A-Za-z]+$/;
        return !(nameRegex.test(first_name));
    };
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

    const updateErrors = () => {
        if(errors != "")
        {
            console.log("errors exist");
            return(
                <Text>error wow</Text>
            );
        }
        else{
            console.log("no errors");
            return(
                <Text>noerre</Text>
            ); 
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
                label="testlabel"
                placeholder = 'First name'
                onChangeText = {(val) => setFirstName(val), first_name => onChangeText(first_name)}
                value={first_name}
                placeholderTextColor = '#ADC9C6'/>
            <HelperText type="error" visible={fnameValid()}>
                Error: Only letters are allowed
            </HelperText>
            
            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Last name' 
                onChangeText = {(val) => setLastName(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Username' 
                onChangeText = {(val) => setUserName(val)}
                placeholderTextColor = '#ADC9C6'/>        

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Email' 
                onChangeText = {(val) => setEmail(val)}
                placeholderTextColor = '#ADC9C6'/> 
            
            <TextInput secureTextEntry={true} style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Password' 
                onChangeText = {(val) => setPassword(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress = {() => { forumCheck(); updateErrors(); }}
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
        borderRadius: 25, 
        paddingHorizontal: 16, 
        fontSize: 16, 
        color: 'white',
        marginVertical: 10,
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
    
    textDanger: {
        color: 'red',
    },

})
