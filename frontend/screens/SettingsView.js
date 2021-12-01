import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';

const SettingsView = ({ navigation }) => {
    const context = useContext(UserContext);
    
    return (
      <Text>
          Dark Theme
      </Text>
    );
  }
  
  export default SettingsView;
  
  const styles = StyleSheet.create({
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
    