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
        <ScrollView>
            {settingsOptions.map(({title, subtitle, onPress}, index) => (
              <TouchableOpacity key={title}>
                <View>
                  <Text>{title}</Text>
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
    section: {
      height: 0.5,
      backgroundColor: '#808080',
    },
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    listWrapper: {
      marginTop: 10,
    },
    listItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    listItemText: {
      color: '#777777',
      marginLeft: 10,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
});