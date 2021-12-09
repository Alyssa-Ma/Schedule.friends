import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
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
            <Image source={{uri: logo}}
              style={{width: 275, height: 325}}
              resizeMode="stretch" />

            <View>
                <Text style={styles.logoText}> Welcome to Schedule.Friends </Text> 
            </View>

            <TextInput style={styles.inputBox1} 
                underlineColor='transparent'
                activeUnderlineColor='white'
                label="Username"
                placeholder = 'Enter username' 
                onChangeText = {(val) => setUserName(val)}
                placeholderTextColor = '#ffffff'/>

            <TextInput secureTextEntry={true} style={styles.inputBox2} 
                underlineColor = 'rgba(0,0,0,0)'  
                activeUnderlineColor ='black'
                label="Password"
                placeholder = 'Enter password'                
                onChangeText = {(val) => setUserPassword(val)}
                placeholderTextColor = '#ADC9C6'/>

            <TouchableOpacity onPress={async () => await context.fetchUserToken(userName, userPassword)} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>  

            <View style={styles.newSignUpText}>
                <Text style ={styles.newSignUpText}> New to Schedule.Friends?</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.createAnAccountText}> Create an account! </Text>
                </TouchableOpacity>
            </View>
        </View>
    
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        marginVertical: 15,
        fontSize: 21,
        color:'#68B0D8',
        fontWeight: '900'
    },
    inputBox1: {
        width:350, 
        backgroundColor:'#D7A4FF',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        height:55,
        paddingHorizontal: 16, 
        fontSize: 16, 
        marginVertical: 10,
        
    },
    inputBox2: {
        width:350, 
        backgroundColor:'#9E8DFF',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        height:55,
        paddingHorizontal: 16, 
        paddingHorizontal: 16, 
        fontSize: 16, 
        color: 'white',
        marginVertical: 10,
    },
    button:{
        backgroundColor:'#53C2FF',
        borderRadius: 20, 
        width:350, 
        marginVertical: 10,
        paddingVertical: 12,
        
    },
    buttonText: {
        fontSize: 18, 
        fontWeight:"900",
        color:'white',
        textAlign: 'center'
    },
    newSignUpText:{
        alignItems: 'center',
        justifyContent: 'center',
        color:'#68B0D8',
        flexDirection: 'row',
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: '500'
    },
    createAnAccountText:{
        alignItems: 'center',
        justifyContent: 'center',
        color:'#4CD2CC',
        flexDirection: 'row',
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: '500'
    },
    
})
