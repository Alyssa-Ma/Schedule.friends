import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text } from 'react-native-paper';

const InfoComponent = ({settingsOptions, navigation, bgColor}) => {
    return (
      <View style={[styles.container, {backgroundColor: bgColor}]}> 
            {settingsOptions.map(({title, subTitle, navName, onPress}, index) => (
              <TouchableOpacity key={title} 
                onPress={() => {
                  if(navName != '')
                    navigation.push(navName)
                }}>
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{title}</Text>
                  {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
                </View>
                <View style={styles.section}>
                </View>
              </TouchableOpacity>
            ))}
      
      </View>
    );
};

export default InfoComponent;

const styles = StyleSheet.create({
    subTitleText: {
      fontSize: 15,
      opacity: 0.6,
      paddingTop: 5,
    },
    titleText: {
      fontSize: 17,
    },
    titleSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
    section: {
      height: 0.5,
      opacity: 0.5,
    },
    container: {
      flex: 1,
    },
});
