import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Header function. Uses the prop title that has been passed
const Header = ({title}) => {

    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
};

//Default title of the header if no props were passed
Header.defaultProps = {
    title: 'Schedule.Friends'
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 15,
        backgroundColor: 'darkslateblue',
    },

    text : {
        color: '#fff',
        fontSize: 23,
        textAlign: 'center',
    },
})
export default Header;
