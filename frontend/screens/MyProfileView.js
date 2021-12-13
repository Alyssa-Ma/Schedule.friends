import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfo from '../components/UserInfo';
import { Dimensions } from 'react-native';



const MyProfileView = ({ navigation }) => {
  const context = useContext(UserContext);
  
  const { colors } = useTheme(); //THEME

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.backgroundColor}]}>
      <View style = {[styles.userCard, {backgroundColor:colors.secondColor}]}>
        <UserInfo user={context.user}/>
        <View
          style={{
            marginTop: -15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}
        />
        <View>
          <TouchableRipple 
            style={[styles.button, {backgroundColor:colors.firstColor}]} 
            borderless={true} 
            onPress={() => navigation.push('EditMyProfileView', {user: context.user})}>
            <View style={[styles.buttonLayout]}>
              <Icon name="person" size={25} color='white'/>
              <Text style={[styles.buttonText, {color: 'white'}]}>Edit My Profile</Text>
            </View>
          </TouchableRipple>
        </View>
        <View>
          <TouchableRipple 
            style={[styles.button, {backgroundColor:colors.thirdColor}]} 
            borderless={true} 
            onPress={() => navigation.navigate('LogOut')}>
            <View style={[styles.buttonLayout]}>
              <Icon name="logout" size={25} color='white'/>
              <Text style={[styles.buttonText, {color: 'white'}]}>Logout</Text>
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
  userCard: {
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    width: '90%',
    borderRadius: 25
  },
  button: {
    flexDirection: 'row',
    width:310, 
    height:50,
    borderRadius: 20,
    marginVertical: 5,
    marginTop: 20,
  },
  buttonLayout: {
    flexDirection: 'row',
    top: 10,
    left: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
  },
});
