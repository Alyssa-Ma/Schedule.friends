import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import UserContext from '../context/UserContext';
import analogousLogo from '../logo/analogousLogo.png';

const LoginScreen = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const [userName, setUserName] = useState("blank");
    const [userPassword, setUserPassword] = useState("blank");
    const logo = Image.resolveAssetSource(analogousLogo).uri;

    return (
        
        <View style={styles.container}>

            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
                />

            <Image source={{uri: logo}}
              style={{width: 300, height: 350}}
              resizeMode="stretch" />

            <View>
                <Text style={styles.logoText}> Welcome to Schedule.Friends </Text> 
            </View>

            <TextInput style={styles.inputBox1} 
                //underlineColorAndroid='#ADC9C6' 
                label="Username"
                placeholder = 'enter username' 
                onChangeText = {(val) => setUserName(val)}
                placeholderTextColor = '#fffff'/>

            <TextInput secureTextEntry={true} style={styles.inputBox2} 
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        marginVertical: 15,
        fontSize:18,
        color:'white'
    },
    inputBox1: {
        width:300, 
        backgroundColor:'#D7A4FF',
        borderRadius: 25, 
        paddingHorizontal: 16, 
        fontSize: 16, 
        color: 'black',
        marginVertical: 10,
        
    },
    inputBox2: {
        width:300, 
        backgroundColor:'#9E8DFF',
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
