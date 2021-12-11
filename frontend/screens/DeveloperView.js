import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import UserContext from '../context/UserContext';
import { Title, Caption, Text, TouchableRipple, useTheme, Button } from 'react-native-paper';

const DeveloperView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const { colors } = useTheme();
    return(
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={styles.container}>
                <Text style={styles.title}>Developer Information</Text>
                <Text style={styles.text}>Alyssa Ma - <Text style={[styles.tabText, {color: colors.firstColor}]}
                    onPress={() => Linking.openURL('https://github.com/Alyssa-Ma')}>
                    GitHub
                    </Text>
                </Text>

                <Text style={styles.text}>Henry Cevallos - <Text style={[styles.tabText, {color: colors.secondColor}]}
                    onPress={() => Linking.openURL('https://github.com/Henry-Cevallos')}>
                    GitHub
                    </Text>
                </Text>                    

                <Text style={styles.text}>Henry Baum - <Text style={[styles.tabText, {color: colors.thirdColor}]}
                    onPress={() => Linking.openURL('https://github.com/goferboy')}>
                    GitHub
                    </Text>
                </Text>

                <Text style={styles.text}>David Dejesus - <Text style={[styles.tabText, {color: colors.fourthColor}]}
                    onPress={() => Linking.openURL('https://github.com/ddejesus-1919')}>
                    GitHub
                    </Text> 
                </Text> 
                  
                <Text style={styles.text}>Kobe Dejesus - <Text style={[styles.tabText, {color: colors.fifthColor}]}
                    onPress={() => Linking.openURL('https://github.com/kobedejesus87')}>
                    GitHub
                    </Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.pop()} style={[styles.button, {backgroundColor: colors.backgroundCardColors[1]}]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default DeveloperView;

const styles = StyleSheet.create({
    button:{
        borderRadius: 20, 
        width: 350, 
        marginVertical: 10,
        paddingVertical: 12,    
    },
    buttonText: {
        fontSize: 18, 
        fontWeight:"900",
        color:'white',
        textAlign: 'center'
    },
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    tabText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 40,
        marginRight: 20,
        marginBottom: 10,
    }
});