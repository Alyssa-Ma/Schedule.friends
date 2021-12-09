import React from 'react';
import { View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserInfo = ({ navigation, route, user, bgColor}) => {
    return (
        <View>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <View style = {{right:35}}>
                {
                    user.profile_image == 'null'
                    ? (<Avatar.Text 
                            size = {75} 
                            backgroundColor = 'white'
                            color={bgColor || 'red'} 
                            label = {user.first_name.charAt(0).toUpperCase()+user.last_name.charAt(0).toUpperCase()}
                        />)
                    : (<Avatar.Image
                        source={{
                            uri: user.profile_image,
                        }}
                        size={80}
                       />)
                }
                
                    
                
                    </View>
                    
                    <View style={{marginLeft: 20}}>
                        <Title style={{right:35, top:10, color:'white', fontSize:25}}>
                            {user.first_name}{' '}
                            {user.last_name}
                        </Title>
                        <Caption style={{right:35, top:10, color:'white', fontSize:15}}>{user.username}</Caption>
                    </View>
                </View>
            </View>

            
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email" size={20} color='white' />
                    <Text style={{marginLeft:20, color:'white', right:10}}>{user.email}</Text>
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
      marginBottom: 10,
      right: 0
    },
});
