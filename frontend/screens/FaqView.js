import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import { Title, Caption, Text, TouchableRipple, useTheme, Button } from 'react-native-paper';

const FaqView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const { colors } = useTheme();
    return(
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={styles.container}>
                <Text style={styles.title}>FAQ</Text>
                <Text style={styles.subtitle}>This would be where our FAQs would be...</Text>
                <Text style={styles.tabText}>IF WE HAD ANY!!</Text>
                <TouchableOpacity onPress={() => navigation.pop()} style={[styles.button, {backgroundColor: colors.backgroundCardColors[2]}]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default FaqView;

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
        textAlign: 'justify',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    tabText: {
        textAlign: 'justify',
        fontSize: 16,
        marginLeft: 40,
        marginRight: 20,
        marginBottom: 10,
    }
});