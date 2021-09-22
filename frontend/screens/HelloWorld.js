import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


//the function that will be rendered
const HelloWorld = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'darkslateblue',
        fontSize: 30,
    },
});

//eporting the funtion that will be rendered
export default HelloWorld;