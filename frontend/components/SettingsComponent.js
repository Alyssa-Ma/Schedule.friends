import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple, Switch } from 'react-native-paper';

const SettingsComponent = () => {
    const context = useContext(UserContext);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }


    return (
        <View style={styles.container}>
        <TouchableRipple onPress={() => {toggleTheme()}}>
            <View style={styles.listItem}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                    <Switch value={isDarkTheme}></Switch>
                </View>
            </View>
        </TouchableRipple>
        </View>
    );
};

export default SettingsComponent;
