import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import {Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import InfoComponent from '../components/InfoComponent';

const InfoView = ({ navigation, route }) => {
    const context = useContext(UserContext);
    const [modalVisible, setModalVisible] = React.useState(null);

    const settingsOptions=[
        {title: 'Guide', subTitle: 'Learn how to use Schedule.Friends', onPress: () => navigation.navigate('GuideView')},
        {title: 'Mission', subTitle: 'Learn about our mission.', onPress: () => {}},
        {title: 'Developers', subTitle: 'Get information regarding the developers of the app.', onPress: () => {}},
        {title: 'FAQ', subTitle: 'Frequently Asked Questions.', onPress: () => {}},
    ];
    return <InfoComponent settingsOptions={settingsOptions}/>;
  }
  
export default InfoView;
  

    