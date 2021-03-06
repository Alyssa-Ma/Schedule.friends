import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import {Drawer, Text, TouchableRipple, Switch, Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native';
import UserContext from '../context/UserContext';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
const DrawerContent = (props) => {
    const { toggleTheme } = useContext(UserContext);
    const paperTheme = useTheme();
    const { colors } = useTheme();

    return(
        <View styles={styles.drawerContainer}>
            
                <View style={styles.topSection}>
                    <View style={styles.userInfoSection}>

                        {
                            props.user.profile_image === null
                                ? (<Avatar.Text
                                    label={`${props.user.first_name.charAt(0).toUpperCase()}${props.user.last_name.charAt(0).toUpperCase()}`}
                                    size={80}
                                    color='white'
                                    backgroundColor={colors.secondColor}
                                    style={styles.avatar}
                                    />)
                                : (<Avatar.Image
                                    source={{
                                        uri: props.user.profile_image,
                                    }}
                                    size={80}
                                    style={styles.avatar}
                                />)
                        }
                        
                        <Title numberOfLines={2} style={{alignSelf: 'center'}}>{`${props.user.first_name} ${props.user.last_name}`}</Title>
                        <Caption numberOfLines={1} style={{alignSelf: 'center'}}>{`@${props.user.username}`}</Caption>
                    </View>

                    <Drawer.Section style={styles.drawerContent}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'HomePage'
                                    ? colors.secondColor
                                    : color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate("HomePage")}}
                        />
                    
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="calendar-account-outline" 
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'MySchedule'
                                    ? colors.secondColor
                                    : color}
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
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'CommonTimeText'
                                    ? colors.secondColor
                                    : color}
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
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'Friends'
                                    ? colors.secondColor
                                    : color}
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
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'MyProfile'
                                    ? colors.secondColor
                                    : color}
                                size={size}
                                />
                            )}
                            label='My Profile'
                            onPress={() => {props.navigation.navigate("MyProfile")}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="information-outline" 
                                color={
                                    getFocusedRouteNameFromRoute(props.route) === 'Info'
                                    ? colors.secondColor
                                    : color}
                                size={size}
                                />
                            )}
                            label='Info'
                            onPress={() => {props.navigation.navigate("Info")}}
                        />
                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme(props.user.id, props.user.token)}}>
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
