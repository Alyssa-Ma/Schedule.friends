import React, {useState, useContext} from 'react';
import {View, Alert, Text, StyleSheet, StatusBar, Image, TextInput, 
        TouchableOpacity} from 'react-native';
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
       
        if((fname=="")||!(nameRegex.test(fname)))
        {
            Alert.alert("please enter a valid first name.");
            
        }
        else if ((lname=="")||!(nameRegex.test(lname)))
        {
            Alert.alert("please enter a valid last name.");
        }
        else if ((uname=="")||!(usernameRegex.test(uname)))
        {
            Alert.alert("please enter a valid username.");
        }
        else if ((em=="")||!(simpleEmailRegex.test(em)))
        {
            Alert.alert("please enter a valid email.");
        }
        else if ((pword=="")||!(passwordRegex.test(pword)))
        {
            Alert.alert("please enter a valid password.");
        }
        else 
        {
            InsertData();
            Alert.alert("USER REGISTERED");
            navigation.navigate('Home');
        }

    }

    const InsertData = async () => {
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
                schedule:schedule
            })
        })
        .then(resp => resp.json())
        .then(data => {
            context.setUser(data);
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
                placeholder = 'First name' 
                onChangeText = {(val) => setFirstName(val)}
                placeholderTextColor = '#ADC9C6'/>

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

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Password' 
                onChangeText = {(val) => setPassword(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress = {() => forumCheck()}
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
})
