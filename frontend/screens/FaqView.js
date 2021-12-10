import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
import UserContext from '../context/UserContext';
import { Title, Caption, Text, TouchableRipple, useTheme, Button } from 'react-native-paper';

const FaqView = ({navigation, route}) => {
    const context = useContext(UserContext);
    const { colors } = useTheme();
    return(
        <ScrollView style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
            <View>
                <Text style={styles.title}>FAQ</Text>
                <Text style={styles.subtitle}>This would be where our FAQs would be...</Text>
                <Text style={styles.tabText}>IF WE HAD ANY!!</Text>
                <Button onPress={() => navigation.pop()} mode='contained'>Go Back</Button>
            </View>
        </ScrollView>
    )
}

export default FaqView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    text: {
        textAlign: 'justify',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    tabText: {
        textAlign: 'justify',
        fontSize: 16,
        marginLeft: 40,
        marginRight: 20,
        marginBottom: 10,
    }
});