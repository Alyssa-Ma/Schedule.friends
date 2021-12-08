import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import { Avatar, Title, Caption, Text, TouchableRipple, Switch, Modal, Portal, Button, Provider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const InfoComponent = ({settingsOptions, navigation, bgColor}) => {
    const context = useContext(UserContext);

    return (
      <View style={[styles.container, {backgroundColor: bgColor}]}> 
            {settingsOptions.map(({title, subTitle, navName, onPress}, index) => (
              <TouchableOpacity key={title} 
                onPress={() => {
                  
                  if(navName != '')
                    navigation.push(navName)
                  
                  else console.log('H4CK3D');
                }}>
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{title}</Text>
                  {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
                </View>
                <View style={styles.section}>
                </View>
              </TouchableOpacity>
            ))}
      
      </View>
    );
};

export default InfoComponent;

const styles = StyleSheet.create({
    subTitleText: {
      fontSize: 15,
      opacity: 0.6,
      paddingTop: 5,
    },
    titleText: {
      fontSize: 17,
    },
    titleSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
    section: {
      height: 0.5,
      //backgroundColor: '#000000',
      opacity: 0.5,
    },
    container: {
      flex: 1,
      
     // backgroundColor: '#ffffff',
    },
});