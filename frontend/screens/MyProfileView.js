import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { BASE_URL } from "@env";
import UserContext from '../context/UserContext';
import SnackBarContext from '../context/SnackBarContext';
import { Text, Button, TouchableRipple, Dialog, Portal, Paragraph, ActivityIndicator, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfo from '../components/UserInfo';

const MyProfileView = ({ navigation }) => {
  const context = useContext(UserContext);
  const snackBarContext = useContext(SnackBarContext);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  
  const { colors } = useTheme();

  const deleteAccount = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${BASE_URL}/${context.user.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${context.user.token}`
          },
      });
      let jsonResponse = await response.json();
      if (response.status === 200) {
          setLoading(false);
          navigation.navigate('LogOut');
      }
      else {
          snackBarContext.setStatusText(`${response.status} Error: ${snackBarContext.trimJSONResponse(JSON.stringify(jsonResponse))}`);
          snackBarContext.toggleSnackBar();
          setLoading(false);
      }
    }
    catch (error) {
        snackBarContext.setStatusText(`${error}`);
        snackBarContext.toggleSnackBar();
        setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.backgroundColor}]}>
      <View style = {[styles.userCard, {backgroundColor:colors.secondColor}]}>
        <UserInfo user={context.user}/>
        <View
          style={{
            marginTop: -15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}
        />
        <View>
          <TouchableRipple 
            style={[styles.button, {backgroundColor:colors.firstColor}]} 
            borderless={true} 
            onPress={() => navigation.push('EditMyProfileView')}>
            <View style={[styles.buttonLayout]}>
              <Icon name="person" size={25} color='white'/>
              <Text style={[styles.buttonText, {color: 'white'}]}>Edit My Profile</Text>
            </View>
          </TouchableRipple>
        </View>
        <View>
          <TouchableRipple 
            style={[styles.button, {backgroundColor:colors.thirdColor}]} 
            borderless={true} 
            onPress={() => navigation.navigate('LogOut')}>
            <View style={[styles.buttonLayout]}>
              <Icon name="logout" size={25} color='white'/>
              <Text style={[styles.buttonText, {color: 'white'}]}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
        <View>
          <TouchableRipple 
            style={[styles.button, {backgroundColor:colors.error}]} 
            borderless={true} 
            onPress={showDialog}>
            <View style={[styles.buttonLayout]}>
              <Icon name="delete" size={25} color='white'/>
              <Text style={[styles.buttonText, {color: 'white'}]}>Delete Account</Text>
            </View>
          </TouchableRipple>
        </View>
        <Portal>
          {
            loading
            ? (
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Content>
                      <ActivityIndicator animating={loading} size={100} />
                  </Dialog.Content>
                </Dialog>
            )
            : (
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Are You Sure?</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>Pressing 'Yes' will delete your account. This cannot be undone.</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color='white' style={{backgroundColor: colors.firstColor, marginRight: 10}} onPress={hideDialog}>Cancel</Button>
                    <Button color='white' style={{backgroundColor: colors.secondColor}} onPress={deleteAccount}>Yes</Button>
                  </Dialog.Actions>
                </Dialog>
            )
          }
        </Portal>
      </View>
    </SafeAreaView>
  );
}

export default MyProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCard: {
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    width: '90%',
    borderRadius: 25
  },
  button: {
    flexDirection: 'row',
    width:310, 
    height:50,
    borderRadius: 20,
    marginVertical: 5,
    marginTop: 20,
  },
  buttonLayout: {
    flexDirection: 'row',
    top: 10,
    left: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
  },
});
