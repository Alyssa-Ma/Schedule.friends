import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const Header = (props) => {
    return (
        <View>
            <Text>{props.text}</Text>
            <Divider/>
        </View>
    )
}

export default Header;
