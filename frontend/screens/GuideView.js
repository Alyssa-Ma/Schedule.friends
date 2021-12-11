import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import UserContext from '../context/UserContext';
import { Title, Caption, Text, TouchableRipple, useTheme, Button } from 'react-native-paper';

const GuideView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const { colors } = useTheme();
    return(
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={styles.container}>
                <Text style={styles.title}>Guide</Text>
                <Text style={styles.subtitle}>This is the page to go to if you want to learn about how to use Schedule.Friends!</Text>
                <Text style={styles.text}>1. First, create your schedule in 'My Schedule'</Text>
                <Text style={styles.tabText}>a. In 'My Schedule,' you can add your classes to create your schedule.</Text>
                <Text style={styles.text}>2. Now that you have created your schedule, let's add some friends!</Text>                                        
                <Text style={styles.tabText}>a. In the 'My Friends' tab, you can view your friends, sent requests, received requests, and search for friends.</Text>
                <Text style={styles.tabText}>b. Go and search for your friends here! When you send a request, you must wait for them to accept it before you can view their schedule.</Text>
                <Text style={styles.text}>3. Once your friend accepts your friend request, you can view their schedule with yours on the homepage.</Text>
                <Text style={styles.tabText}>a. You can also see a consolidated view of when your friends are free in the 'Who's Free Now' tab.</Text>
                <Text style={styles.text}>4. If you want to edit your profile information, go to the 'My Profile' tab and check out the options there!</Text>                    
                <Text style={styles.text}>And that's the main gist of Schedule.Friends! Go out and add your friends to make scheduling easier!</Text>                    
                <TouchableOpacity onPress={() => navigation.pop()} style={[styles.button, {backgroundColor: colors.backgroundCardColors[0]}]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default GuideView;

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