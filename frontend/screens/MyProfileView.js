import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfo from '../components/UserInfo';
import { Dimensions } from 'react-native';

const MyProfileView = ({ navigation }) => {
  const context = useContext(UserContext);

  const editProfilePressHandler = () => {
    navigation.push('EditMyProfileView', {
      user: context.user
    })
    console.log("Edit MY Profile Pressed");
  }
  const LogoutPressHandler = () => {
    navigation.navigate('LogOut');
  }
  
  return (

    <SafeAreaView style={styles.container}>
      <View style = {styles.BackgroundBox1}>
      <UserInfo user={context.user}/>
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
        }}
      />
      <View style={styles.listWrapper}>
        <TouchableRipple style={styles.inputBox1} onPress={() => editProfilePressHandler() }>
          <View style={styles.listItem1}>
            <Icon name="person" size={25} color='white'/>
            <Text style={styles.listItemText}>Edit My Profile</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple style={styles.inputBox2} onPress={() => LogoutPressHandler()}>
          <View style={styles.listItem2}>
            <Icon name="logout" size={25} color='white'/>
            <Text style={styles.listItemText}>Logout</Text>
          </View>
        </TouchableRipple>
        
      </View>
      </View>
    </SafeAreaView>
  );
}

export default MyProfileView;

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
    listItem1: {
      flexDirection: 'row',
      top: 10,
      left:10,

    },
    listItem2: {
      flexDirection: 'row',
      top:10,
      left:10,

    },
    listItemText: {
      color: 'white',
      marginLeft: 10,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 27,
    },
    BackgroundBox1: {
      backgroundColor:'#D7A4FF',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20, 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20, 
      fontSize: 16, 
      color: 'white',    
      marginTop: 25,
      marginLeft:33, 
      width:350, 
      height: 350,
  },
  inputBox1: {
    flexDirection: 'row',
    width:310, 
    height:50,
    backgroundColor:'#9E8DFF',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 25, 
},
inputBox2: {
  flexDirection: 'row',
  width:310, 
  height:50,
  backgroundColor:'#4CD2CC',
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20, 
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderRadius: 25, 
  top:15,

  
},
  

});

