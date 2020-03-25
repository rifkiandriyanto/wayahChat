import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/styles';
import { Footer, FooterTab, Button, Icon } from 'native-base';
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
        <View style={{marginVertical: 200, alignItems: 'center', flex: 1}}>
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

        <Footer>
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="chatbubbles" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Icon name="navigate" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>

      </>
    );
  }
}

export default ProfilScreen
