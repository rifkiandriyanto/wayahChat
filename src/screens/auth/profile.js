import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/styles';
import {auth, db} from '../../config/config';

class ProfilScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onLogout = async () => {
    auth.signOut().then(res => console.warn('oke'));
  };

  render() {
    return (
      <>
        <View style={{marginVertical: 200, alignItems: 'center'}}>
          <Text>Profile</Text>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
          <Text>{auth.currentUser.displayName}</Text>
          <TouchableOpacity onPress={this.onLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default ProfilScreen
