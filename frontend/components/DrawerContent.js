import React from 'react';
import {View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserListHeader from './UserListHeader';
import {Drawer, Text, TouchableRipple, Switch, Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DrawerContent = (props) => {
    return(
        <View styles={styles.drawerContainer}>
            
                <View>
                    <View style={styles.userInfo}>
                        <Avatar.Text
                            
                            label={`${props.user.first_name.charAt(0).toUpperCase()}${props.user.last_name.charAt(0).toUpperCase()}`}
                            size={55}
                            color='white'
                            backgroundColor='turquoise'
                            style={styles.avatar}
                        />
                    </View>

                    <Drawer.Section style={styles.drawerContent}>
                        <DrawerItem
                            icon={() => (
                                <Icon 
                                name="home-outline" 
                                color='black'
                                size={20}
                                />
                            )}
                            label='Home'
                            onPress={() => {}}
                        />
                    </Drawer.Section>
                </View>
            
            <Drawer.Section style={styles.bottomSection}>
                <DrawerItem
                        icon={() => (
                            <Icon 
                            name="exit-to-app" 
                            color='black'
                            size={20}
                            />
                        )}
                        label='Log Out'
                        onPress={() => {}}
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
    userInfo: {

    },
    bottomSection: {

    },
    drawerContent: {

    }

})

export default DrawerContent;