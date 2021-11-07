import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';

const LoginScreen = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const [userName, setUserName] = useState("blank");
    const [userPassword, setUserPassword] = useState("blank");

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
                placeholder = 'enter username' 
                onChangeText = {(val) => setUserName(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TextInput secureTextEntry={true} style={styles.inputBox} 
                //underlineColorAndroid='#ADC9C6' 
                placeholder = 'enter password'                
                onChangeText = {(val) => setUserPassword(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TouchableOpacity onPress={async () => await context.fetchUserToken(userName, userPassword)} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>  

            <View style={styles.newSignUpText}>
                <Text style ={styles.newSignUpText}> New to Schedule.Friends?</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: 'blue'}}> Create an account! </Text>
                </TouchableOpacity>
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
