import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import Header from '../components/Header';

    const DATA = [
        {id: 'a', title: 'First Item',},
        {id: 'b', title: 'Second Item',},
        {id: 'c', title: 'Third Item',},
      ];

    const Item = ({ value }) => (
        <View style={styles.item}>
          <Text style={styles.value}>{value}</Text>
        </View>
    );
    
    const CombinedScheduleView = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    return (
        <View style={styles.container}>
            <Header title='Insert Date Here'/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                </SafeAreaView>
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