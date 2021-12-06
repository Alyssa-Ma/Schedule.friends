import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';

const GuideView = ({navigation, route}) => {
    return(
        <View>
            <Text>Guide</Text>
            <Text>This is the page to go to if you want to learn about how to use Schedule.Friends!</Text>
            <Text>1. First, create your schedule in 'My Schedule'</Text>
            <Text>a. In 'My Schedule,' you can add your classes to create your schedule.</Text>
            <Text>2. Now that you have created your schedule, let's add some friends!</Text>
            <Text>a. In the 'My Friends' tab, you can view your friends, sent requests, received requests, and search for friends.</Text>
            <Text>b. Go and search for your friends here! When you send a request, you must wait for them to accept it before you can view their schedule.</Text>
            <Text>3. Once your friend accepts your friend request, you can view their schedule with yours on the homepage.</Text>
            <Text>a. You can also see a consolidated view of when your friends are free in the 'Who's Free Now' tab.</Text>
            <Text>4. If you want to edit your profile information, go to the 'My Profile' tab and check out the options there!</Text>
            <Text>And that's the main gist of Schedule.Friends! Go out and add your friends to make scheduling easier!</Text>
        </View>
    )
}

export default GuideView;