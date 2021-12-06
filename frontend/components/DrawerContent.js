import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserListHeader from './UserListHeader';
import {Drawer, Text, TouchableRipple, Switch, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native';
import UserContext from '../context/UserContext';
const DrawerContent = (props) => {

    //console.log(props.navigation.navigate)

    const { toggleTheme } = useContext(UserContext);

    const paperTheme = useTheme();
    const { colors } = useTheme();

    return(
        <View styles={styles.drawerContainer}>
            
                <View style={styles.topSection}>
                    <View style={styles.userInfoSection}>
                        <Avatar.Text
                            
                            label={`${props.user.first_name.charAt(0).toUpperCase()}${props.user.last_name.charAt(0).toUpperCase()}`}
                            size={55}
                            color='white'
                            backgroundColor='turquoise'
                            style={styles.avatar}
                        />
                        <Title style={{alignSelf: 'center'}}>{`${props.user.first_name} ${props.user.last_name}`}</Title>
                        <Caption style={{alignSelf: 'center'}}>{`@${props.user.username}`}</Caption>
                    </View>

                    <Drawer.Section style={styles.drawerContent}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label='Home'
                            onPress={() => {props.navigation.navigate("HomePage")}}
                        />
                    
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label='My Schedule'
                            onPress={() => {props.navigation.navigate("MySchedule")}}
                        />
                    
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="account-clock-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={`Who's Free now`}
                            onPress={() => {props.navigation.navigate("CommonTimeText")}}
                        />
                   
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label='My Friends'
                            onPress={() => {props.navigation.navigate("Friends")}}
                        />
                   
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="badge-account-horizontal-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label='My Profile'
                            onPress={() => {props.navigation.navigate("MyProfile")}}
                        />
                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            
            <Drawer.Section style={styles.bottomSection}>
                <DrawerItem
                        icon={({color, size}) => (
                            <Icon 
                            name="exit-to-app" 
                            color={color}
                            size={size}
                            />
                        )}
                        label='Log Out'
                        onPress={() => {props.navigation.navigate("LogOut")}}
                />
            </Drawer.Section>
            
        </View>
    )
}

const styles = StyleSheet.create({

    drawerContainer: {
        flex: 1,
    },

    avatar: {
        alignSelf: 'center',
        marginTop: 20
    },
    userInfoSection: {
    },
    topSection: {
    },
    bottomSection: {    //WANT TO DO: Get log out to stick to bottom of drawer
        
    },
    drawerContent: {

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})

export default DrawerContent;