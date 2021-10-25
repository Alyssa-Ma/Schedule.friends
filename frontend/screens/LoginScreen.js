import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TextInput, 
        TouchableOpacity,
        Alert} from 'react-native';
import EditSchedule from '../components/EditSchedule';



const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("blank");
    const [userPassword, setUserPassword] = useState("blank");

    const logInCall = async () => {

        try{
            let response = await fetch('http://10.0.2.2:8000/api/sf_users/login/', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": userEmail,
                "password": userPassword
            }),
            });

            if(response.status >= 400){
                Alert.alert(
                    "Invalid Log In",
                    "The username and/or password is incorrect",
                  );
                return; 
            }

            response = await response.json();
            console.log(response);
            navigation.navigate('Home', {response});
            
        } catch(error){
            console.error(error);
        }   
    }

    return (

        <View style={styles.container}>

            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />

            <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
              style={{width: 300, height: 300}} />

            <View>
                <Text style={styles.logoText}> Welcome to Schedule.Friends </Text> 
            </View>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'enter email' 
                onChangeText = {(val) => setUserEmail(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'enter password' 
                onChangeText = {(val) => setUserPassword(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TouchableOpacity onPress={logInCall} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
  

            <View style={styles.newSignUpText}>
                <Text style ={styles.newSignUpText}> New to Schedule.Friends?</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: 'blue'}}> Create an account! </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>email: {userEmail}</Text>
                <Text>password: {userPassword}</Text>
            </View>

        </View>
    
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        marginVertical: 15,
        fontSize:18,
        color:'white'
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
        fontSize: 16, 
        fontWeight:"500",
        color:'white',
        textAlign: 'center'
    },
    newSignUpText:{
       
        alignItems: 'center',
        justifyContent: 'center',
        color:'white',
        flexDirection: 'row',
        paddingHorizontal: 8

    },
    signUpText:{
        color: '#5176A8',
        fontSize: 16,

    },

})