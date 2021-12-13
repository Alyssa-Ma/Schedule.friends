import React, {useState, useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import UserContext from '../context/UserContext';
import analogousLogo from '../logo/analogousLogo.png';

const LoginScreen = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const logo = Image.resolveAssetSource(analogousLogo).uri;
    const { colors } = useTheme();
    const [userNameLock, setUserNameLock] = useState(true);
    const [userPasswordLock, setUserPasswordLock] = useState(true);

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
                    error={!userNameLock && userName.length <= 0}
                    style={styles.input}
                    activeUnderlineColor='white'
                    theme={{
                        colors: {
                            text: 'white',
                            placeholder: 'white',
                            error: colors.error
                        }
                    }}
                    label="Username"
                    placeholder = 'Enter Username'
                    onBlur={() => setUserNameLock(false)}
                    onChangeText = {(val) => setUserName(val)}
                />
            </View>

            <View style={[styles.inputBox, {backgroundColor:'#9E8DFF'}]}>
                <TextInput
                    error={!userPasswordLock && userPassword.length <= 0}
                    style={styles.input}
                    secureTextEntry={true}
                    activeUnderlineColor='white'
                    label="Password"
                    theme={{
                        colors: {
                            text: 'white',
                            placeholder: 'white',
                            error: colors.error
                        }
                    }}
                    placeholder = 'Enter Password'
                    onBlur={() => setUserPasswordLock(false)}
                    onChangeText = {(val) => setUserPassword(val)}
                />
            </View>

            <TouchableOpacity
                disabled={userName.length <= 0 || userPassword.length <= 0} 
                onPress={async () => {await context.fetchUserToken(userName, userPassword)}}
                style={styles.button}>
                <View>
                    <Text style={[styles.buttonText,]}>Login</Text>
                    <View style={[
                            styles.shade, 
                            {left: 0, top: -14, width: "100%", height: 200,
                            opacity: userName.length <= 0 || userPassword.length <= 0 ? .4 : 0}]} />
                </View>
            </TouchableOpacity>  

            <View style={styles.bottomRow}>
                <Text style ={[styles.bottomText, {color:'#68B0D8'}]}> New to Schedule.Friends?</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.bottomText, {color:'#4CD2CC'}]}> Create an account! </Text>
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
        borderRadius: 20,
        height: 55, 
        paddingHorizontal: 16,
        fontSize: 16, 
        marginVertical: 10,
        overflow: 'hidden'
    },
    input: {
        backgroundColor: 'transparent',
        margin: -6,
        overflow: 'hidden',
    },
    button:{
        backgroundColor:'#53C2FF',
        borderRadius: 20, 
        width:350, 
        marginVertical: 10,
        paddingVertical: 12,
        overflow: 'hidden',
    },
    buttonLayout: {
        flexDirection: 'row',
        top: 11,
        left: 18,
    },
    shade: {
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        backgroundColor: 'black', 
        width: "100%",
        height: "100%"
    },
    buttonText: {
        fontSize: 18, 
        fontWeight:"900",
        textAlign: 'center',
        color: 'white'
    },
    bottomRow:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    bottomText:{
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 8,
    },
})
