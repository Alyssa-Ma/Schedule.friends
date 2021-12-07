import React from 'react';
import { View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserInfo = ({ navigation, route, user}) => {
    return (
        <View>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Text 
                        size = {90} 
                        backgroundColor = 'white'
                        color='turquoise'
                        label = {user.first_name.charAt(0)+user.last_name.charAt(0)}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={styles.title, {marginTop:10, marginBottom: 5}}>
                            {user.first_name}{' '}
                            {user.last_name}
                        </Title>
                        <Caption style={styles.caption}>{user.username}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email" color='white' size={20} />
                    <Text style={{marginLeft:20}}>{user.email}</Text>
                </View>
            </View>
        </View>
    )
}

export default UserInfo;

const styles = StyleSheet.create({
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
      marginBottom: 10
    }
});
