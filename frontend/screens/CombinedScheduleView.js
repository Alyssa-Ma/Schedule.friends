import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import Header from '../components/Header';

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
    return (
        <View style={styles.container}>
            <Header title='Insert Date Here'/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
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