import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import UserContext from '../context/UserContext';
import { Title, Caption, Text, TouchableRipple, useTheme, Button } from 'react-native-paper';

const DeveloperView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const { colors } = useTheme();
    return(
        <ScrollView style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            <View>
                <Text style={styles.title}>Developer Information</Text>
                <Text style={styles.subtitle}>This is the page to go to if you want to learn more about our developers!</Text>
                <Text style={styles.text}>Alyssa Ma</Text>
                <Text style={[styles.tabText, {color: styles.colors}]}
                    onPress={() => Linking.openURL('https://github.com/Alyssa-Ma')}>
                    GitHub
                </Text>
                <Text style={styles.text}>Henry Cevallos</Text>                    
                <Text style={[styles.tabText, {color: styles.colors}]}
                    onPress={() => Linking.openURL('https://github.com/Henry-Cevallos')}>
                    GitHub
                </Text>
                <Text style={styles.text}>Henry Baum</Text>
                <Text style={[styles.tabText, {color: styles.colors}]}
                    onPress={() => Linking.openURL('https://github.com/goferboy')}>
                    GitHub
                </Text>
                <Text style={styles.text}>David Dejesus</Text> 
                <Text style={[styles.tabText, {color: styles.colors}]}
                    onPress={() => Linking.openURL('https://github.com/ddejesus-1919')}>
                    GitHub
                </Text>                   
                <Text style={styles.text}>Kobe Dejesus</Text>
                <Text style={[styles.tabText, {color: styles.colors}]}
                    onPress={() => Linking.openURL('https://github.com/kobedejesus87')}>
                    GitHub
                </Text>     
                <Button onPress={() => navigation.pop()} mode='contained'>Go Back</Button>
            </View>
        </ScrollView>
    )
}

export default DeveloperView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
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