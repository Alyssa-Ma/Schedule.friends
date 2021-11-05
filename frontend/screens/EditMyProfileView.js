import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, Alert} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TextInput, TouchableRipple, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BASE_URL} from "@env";

const EditMyProfileView = ({ navigation, route }) => {

    
    const {con} = route.params;

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    //const [uname, setUname] = useState();
    //const [data, setData] = useState([]);
    //const { username, firstName, lastName } = route.params;

    const forumCheck = () => {

        //firstname + lastname regex to check if inputed names follow correct syntax. only allows letters.
        var nameRegex = /^[A-Za-z]+$/;
       
        if((fName=="")||!(nameRegex.test(fName)))
        {
            Alert.alert("please enter a valid first name.");
            
        }
        else if ((lName=="")||!(nameRegex.test(lName)))
        {
            Alert.alert("please enter a valid last name.");
        }
        else 
        {
            confirmPressHandle();
        }

    }
    
        const confirmPressHandle = () => {


        
          fetch(`${BASE_URL}/${con.id}`, {
              method:"PATCH",
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${con.token}`
              
              },
              body: JSON.stringify({
                  "first_name": fName,
                  "last_name": lName
              })
        
            })
       
            .then(data => {
            })
            .catch(error => console.log("Error"));


            
            navigation.navigate('MyProfileView',{ 

            
            con: con.first_name = fName,
            con: con.last_name = lName,
            

            })


        }
    
   

    const cancelPressHandle = () => {

        navigation.pop();
        
    }


    return (
        
        <View syle={styles.container}> 

            <View style={{margin: 20}}>

                <View style={{alignItems: 'center'}}>

                    <TouchableOpacity onPress={() => {}}>

                        <View style={styles.icon}>
                        
                        <Avatar.Text 
                        size = {100} 
                        backgroundColor = 'turquoise'
                        label=
                        {con.first_name.charAt(0)+con.last_name.charAt(0)}
                        />

                        </View>

                    </TouchableOpacity>

                    <Text style = {styles.fnamelname}>
                        {con.first_name + " " + con.last_name}
                    </Text>

                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
     

                <View style={styles.buttons}>
                <Button icon="check"  onPress={() => forumCheck() } mode="contained">Confirm</Button>
                </View>
                <View style={styles.buttons}>
                <Button icon="cancel" onPress={() => cancelPressHandle()} mode="contained">Cancel</Button>
                </View>
            



            </View>


        </View>
    
    );
}

export default EditMyProfileView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputfields: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: 0,
      paddingLeft: 10,
      height: 35,
      color: '#05375a',
      marginLeft: 10,
    },
    icon: {
       height: 100,
       width: 100,
       borderRadius:15,
       justifyContent: 'center',
       alignItems: 'center',
    },
    fnamelname: {
        marginTop:10,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10

    },

    buttons: {
        marginTop: 5,
        marginBottom: 5

    },

  });

    /*
    const forumCheck = () => {

        
        console.log("Did I navigate?");
        navigation.pop();
        

        const fname = firstName;
        const lname = lastName;
        const uname = username;  

        //firstname + lastname regex to check if inputed names follow correct syntax. only allows letters.
        var nameRegex = /^[A-Za-z]+$/;

        //username regex to check if inputed usernames follow correct syntax. only allows letters and numbers. 
        var usernameRegex = /^[0-9a-zA-Z]+$/;

        //password regex to check if inputed passwords follow correct syntax. only allows 6-20 chars which contain at least one numeric digit, 
        //one upercase letter and one lowercase letter 
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
       
        if((fname=="")||!(nameRegex.test(fname)))
        {
            Alert.alert("please enter a valid first name.");
            
        }
        else if ((lname=="")||!(nameRegex.test(lname)))
        {
            Alert.alert("please enter a valid last name.");
        }
        else if ((uname=="")||!(usernameRegex.test(uname)))
        {
            Alert.alert("please enter a valid username.");
        }
        else 
        {
            confirmPressHandle();
        }
        */
  