import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from "@env";


const MyProfileView = ({ navigation }) => {

    const context = useContext(UserContext);
    //const [data, setData] = useState([]);

    const editProfilePressHandler = () => {
      
      navigation.navigate('EditMyProfileView', {
        con: context.user
      
      })

      console.log("Edit MY Profile Pressed");

    }

    const LogoutPressHandler = () => {
      navigation.navigate('LogOut');
      
      console.log("LogOut Pressed");
    }

    return (
        
        <SafeAreaView style={styles.container}>

            {/*//////////////USER INFO////////////////*/}
            <View style = {styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>

                    <Avatar.Text 
                        size = {90} 
                        backgroundColor = 'turquoise'
                       label = {context.user.first_name.charAt(0)+context.user.last_name.charAt(0)}

                    />

                    <View style={{marginLeft: 20}}>

                        <Title style={styles.title, {marginTop:10, marginBottom: 5,}}>
                            {context.user.first_name}{' '}
                            {context.user.last_name}
                        </Title>
                        <Caption style={styles.caption}>{context.user.username}</Caption>
               
                    </View>
                </View>


            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name = "email" size={20} />
                    <Text style={{marginLeft:20}}>{context.user.email}</Text>
                </View>

            </View>

            <View
            style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            }}
            />


            {/*////////////// TOUCHABLES //////////*/}

            <View style={styles.listWrapper}>
                <TouchableRipple onPress={() => editProfilePressHandler() }>
                    <View style={styles.listItem}>

                        <Icon name="person" size={25} color='darkslateblue'  />
                        <Text style={styles.listItemText}>Edit My Profile</Text>

                    </View>

                </TouchableRipple>

                <TouchableRipple onPress={() => LogoutPressHandler()}>
                    <View style={styles.listItem}>

                        <Icon name="logout" size={25} color='darkslateblue'  />
                        <Text style={styles.listItemText}>Logout</Text>

                    </View>

                </TouchableRipple>



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
  

 /*
    useEffect(() => {

      fetch(`${BASE_URL}/${context.user.id}`, {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${context.user.token}`
        },
      })

      .then(resp => resp.json())
      .then(data => {
          setData(data)
          console.log(data)
      })
      .catch(error => console.log("Error"))
  }, [context.user])

  */