import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BASE_URL} from "@env";
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditMyProfileView = ({ navigation, route }) => {

    const context = useContext(UserContext);
    
    const {user} = route.params;

    const [fName, setFName] = useState(user.first_name);
    const [lName, setLName] = useState(user.last_name);
    const [userName, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const [loadingButton, setLoadingButton] = useState(false);

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
    
        const confirmPressHandle = async () => {
            setLoadingButton(true);
            try {
                const response = await fetch(`${BASE_URL}/${user.id}`, {
                    method:"PATCH",
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`
                    
                    },
                    body: JSON.stringify({
                        "first_name": fName,
                        "last_name": lName,
                        "email": email,
                        "username": userName
                    })
                })
                
                const jsonResponse = await response.json();
                if (response.status === 200) {
                    setLoadingButton(false);
                    context.setUser(jsonResponse);
                    navigation.pop();
                }
                else {
                    setLoadingButton(false);
                    console.log(`Server Error ${response.status}`)
                }
            } catch(error) {
                console.log(error)
            }
            setLoadingButton(false);
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
                                backgroundColor = '#D7A4FF'
                                label=
                                {user.first_name.charAt(0)+user.last_name.charAt(0)}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.fnamelname}>
                        {user.first_name + " " + user.last_name}
                    </Text>
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} color='#9E8DFF' />
                    <TextInput
                        mode="outlined"
                        label="First Name"
                        value={fName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setFName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                        theme={{
                            colors: {
                                placeholder: '#9E8DFF',
                                text: '#9E8DFF',
                                //primary: 'white',
                                underlineColor: 'transparent'
                            }
                        }}/>
                        
                </View>

                <View style={styles.inputfields}>
                <FontAwesome name="user-o" size={30} color='#7DD1FF'/>
                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        value={lName}
                        placeholderTextColor = "#666666"
                        onChangeText = {(val) => setLName(val)}
                        autoCorrect={false}
                        style={styles.textInput}
                        theme={{
                            colors: {
                                placeholder: '#7DD1FF',
                                text: '#7DD1FF',
                                //primary: 'white',
                                underlineColor: 'transparent'
                            }
                    }}/>
                
                </View>
     
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} color='#68B0D8'/>
                        <TextInput
                            mode="outlined"
                            label="E-Mail"
                            value={email}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setEmail(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                            theme={{
                                colors: {
                                    placeholder: '#68B0D8',
                                    text: '#68B0D8',
                                    //primary: 'white',
                                    underlineColor: 'transparent'
                                }
                        }}/>
                        
                </View>
                <View style={styles.inputfields}>
                    <FontAwesome name="user-o" size={30} color='#5CDBD5' />
                        <TextInput
                            mode="outlined"
                            label="Username"
                            value={userName}
                            placeholderTextColor = "#666666"
                            onChangeText = {(val) => setUsername(val)}
                            autoCorrect={false}
                            style={styles.textInput}
                            theme={{
                                colors: {
                                    placeholder: '#5CDBD5',
                                    text: '#5CDBD5',
                                    //primary: 'white',
                                    underlineColor: 'transparent'
                                }
                            }}/>
                        
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={styles.confirmBox} onPress={() => forumCheck()}>
                        <View style={styles.listItem1}>
                            <Icon name="check" size={25} color='white'/>
                            <Text style={styles.listItemText}>Confirm</Text>
                        </View>
                    </TouchableRipple>
                </View>

                <View style={styles.listWrapper}>
                    <TouchableRipple style={styles.cancelBox} onPress={() => cancelPressHandle()}>
                        <View style={styles.listItem1}>
                            <Icon name="cancel" size={25} color='white'/>
                            <Text style={styles.listItemText}>Cancel</Text>
                        </View>
                    </TouchableRipple>
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
        marginBottom: 10,
        color:'#D7A4FF'
    },
    listItemText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 27,
    },
    listWrapper: {
        marginTop: 10,
    },
    confirmBox: {
        flexDirection: 'row',
        width:370, 
        height:50,
        backgroundColor:'#9E8DFF',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        
    },
    cancelBox: {
        flexDirection: 'row',
        width:370, 
        height:50,
        backgroundColor:'#5CDBD5',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 25, 
        top:5,
    },
    listItem1: {
        flexDirection: 'row',
        top: 10,
        left:10,
        
    },

  });
