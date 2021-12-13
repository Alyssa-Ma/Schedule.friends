import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const FaqView = ({navigation, route}) => {
    const { colors } = useTheme();
    return(
        <ScrollView style={{backgroundColor: colors.backgroundColor}}>
            <View style={styles.container}>
                <Text style={styles.title}>FAQ</Text>
                <Text style={styles.subtitle}>Frequently Asked Questions</Text>
                <Text style={styles.text}>
                    Q: How do I update my profile after initial creation?
                </Text>
                <Text style={styles.tabText}>
                    A: Go to 'My Profile' in the side drawer, and there will be a button to edit your profile there.
                    It will have similar fields to the initial signup form.
                </Text>
                <Text style={styles.text}>
                    Q: How do I choose which friends to show on my homepage?
                </Text>
                <Text style={styles.tabText}>
                    A: Go to 'Home' in the side drawer. There will be a button to select friends at the bottom of the screen.
                </Text>
                <Text style={styles.text}>
                    Q: How do I edit my class after I've already created it?
                </Text>
                <Text style={styles.tabText}>
                    A: Tap on the class you want to edit. This will open the 'Edit Course' form where you can edit the details of that class.
                </Text>
                <Text style={styles.text}>
                    Q: What does the 'Who's Free Now' tab do?
                </Text>
                <Text style={styles.tabText}>
                    A: This tab will show you who is currently free on your friends list. If no one is currently free, it will not display anything.
                </Text>
                <Text style={styles.text}>
                    Q: What does the 'Who's Free Now' tab do?
                </Text>
                <Text style={styles.tabText}>
                    A: This tab will show you who is currently free on your friends list. If no one is currently free, it will not display anything.
                </Text>
                <Text style={styles.text}>
                    Q: How do I logout?
                </Text>
                <Text style={styles.tabText}>
                    A: You can logout in both the side drawer and in 'My Profile.'
                </Text>
                <TouchableOpacity onPress={() => navigation.pop()} style={[styles.button, {backgroundColor: colors.backgroundCardColors[2]}]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default FaqView;

const styles = StyleSheet.create({
    button:{
        borderRadius: 20, 
        width: 350, 
        marginVertical: 10,
        paddingVertical: 12,    
    },
    buttonText: {
        fontSize: 18, 
        fontWeight:"900",
        color:'white',
        textAlign: 'center'
    },
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontWeight: 'bold',
    },
    tabText: {
        textAlign: 'justify',
        fontSize: 16,
        marginLeft: 40,
        marginRight: 20,
        marginBottom: 10,
    }
});
