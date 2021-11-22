import React from 'react';
import { View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from "@env";

let {media_url} = "http://192.168.1.71:8000";

const UserInfo = ({ navigation, route, user}) => {

    console.log(user.image);
    return (
        <View>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    
                    {/*}
                    <Avatar.Text 
                        size = {90} 
                        backgroundColor = 'turquoise'
                        label = {user.first_name.charAt(0)+user.last_name.charAt(0)}
                    />

                    */}
                    {/*`${media_url}/media/pimages/default.jpg`*/}
                    <Avatar.Image
                        source={{
                            uri: "http://192.168.1.71:8000/media/pimages/default.jpg",
                        }}
                        size={80}
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
                    <Icon name="email" size={20} />
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
