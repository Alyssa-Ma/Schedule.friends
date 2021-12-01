import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple, Switch } from 'react-native-paper';
import SettingsComponent from '../components/SettingsComponent';

const SettingsView = ({ navigation }) => {
    const context = useContext(UserContext);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }
    const settingsOptions=[
        {title: 'Dark Theme', subTitle: 'Toggle between light and dark theme.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: 'Insert another setting here idk.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: 'Insert another setting here idk.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: 'Insert another setting here idk.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: 'Insert another setting here idk.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: 'Insert another setting here idk.', onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: null, onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: null, onPress: () => {}},
        {title: 'Setting Placeholder', subTitle: null, onPress: () => {}},
    ];
    return <SettingsComponent settingsOptions={settingsOptions}/>;

  }
  
export default SettingsView;
  

    