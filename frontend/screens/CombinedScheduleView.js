import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button} from 'react-native';
import Header from '../components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

  const Stack = createNativeStackNavigator();
  /** 
    const data = [
        {id: 'a', title: 'CSCI 499',},
        {id: 'b', title: 'CSCI 39545',},
        {id: 'c', title: 'CSCI 39758',},
      ];
    const numColumns = 2;
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );
    
    const CombinedScheduleView = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
      */
    function CombinedScheduleView({ navigation }) {
      return (
        <View style={styles.item}>
          <Text>CombinedScreen gone lol</Text>
          <Button title="navigate to hellow" onPress={() => navigation.navigate('Hello World')}/>
        </View>
      );
    }

//Style Sheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },

});

export default CombinedScheduleView;