import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import UserContext from '../context/UserContext';
import { Avatar, Title, Caption, Text, TouchableRipple, Switch, Modal, Portal, Button, Provider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const SettingsComponent = ({settingsOptions}) => {
    const context = useContext(UserContext);
    const [modalVisibile, setModalVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    return (
      <Provider>
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} >
            <Text>Text ez</Text>
          </Modal>
        </Portal>
        <ScrollView style={styles.container}>
            {settingsOptions.map(({title, subTitle, onPress}, index) => (
              <TouchableOpacity key={title}>
                <View style={styles.titleSection}>
                  <Text style={styles.titleText}>{title}</Text>
                  {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
                </View>
                <View style={styles.section}>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Provider>
    );
};

export default SettingsComponent;

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
      backgroundColor: '#000000',
      opacity: 0.5,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
});