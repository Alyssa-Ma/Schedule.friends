import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple, Switch } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const SettingsComponent = ({settingsOptions}) => {
    const context = useContext(UserContext);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <ScrollView style={styles.container}>
            {settingsOptions.map(({title, subtitle, onPress}, index) => (
              <TouchableOpacity key={title}>
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{title}</Text>
                  {subtitle && <Text>{subtitle}</Text>}
                </View>
                <View style={styles.section}>
                </View>
              </TouchableOpacity>
            ))}
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
        </ScrollView>
    );
};

export default SettingsComponent;

const styles = StyleSheet.create({
    titleText: {

    },
    titleSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
    section: {
      height: 0.5,
      backgroundColor: '#808080',
    },
    container: {
      flex: 1,
    },
});