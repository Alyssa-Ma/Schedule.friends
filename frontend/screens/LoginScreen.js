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

            <View style={[styles.inputBox, {backgroundColor:'#D7A4FF'}]}>
                <TextInput
                    style={styles.input}
                    activeUnderlineColor='white'
                    label="Username"
                    placeholder = 'Enter Username'
                    placeholderTextColor = '#ffffff'
                    onChangeText = {(val) => setUserName(val)}
                />
            </View>

            <View style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    activeUnderlineColor='white'
                    label="Password"
                    placeholder = 'Enter Password'
                    placeholderTextColor = '#ffffff'
                    onChangeText = {(val) => setUserPassword(val)}
                />
            </View>

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        marginVertical: 15,
        fontSize: 21,
        color:'#68B0D8',
        fontWeight: '900'
    },
    inputBox: {
        width:350, 
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25,
        height:55, 
        paddingHorizontal: 16,
        fontSize: 16, 
        marginVertical: 10,
        overflow: 'hidden'
    },
    input: {
        backgroundColor: 'transparent',
        margin: -6,
        overflow: 'hidden'
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
