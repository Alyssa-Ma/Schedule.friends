import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TextInput, 
        TouchableOpacity} from 'react-native';


const SignUpScreen = () => {
    const [userFirstName, setUserFirstName] = useState('blank');
    const [userLastName, setUserLastName] = useState('blank');
    const [userEmail, setUserEmail] = useState('blank');
    const [userPassword, setUserPassword] = useState('blank');
    
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
                onChangeText = {(val) => setUserFirstName(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TextInput style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'Last name' 
                onChangeText = {(val) => setUserLastName(val)}
                placeholderTextColor = '#ADC9C6'/>

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

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View>
                <Text>First name: {userFirstName}</Text>
                <Text>Last name: {userLastName}</Text>
                <Text>email: {userEmail}</Text>
                <Text>password: {userPassword}</Text>
            </View>
            
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

