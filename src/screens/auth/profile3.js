import React, {useReducer} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import db from '../../config/config';
import user from '../../config/config';
import styles from '../../styles/styles';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    name: user.name,
    image: user.image ? {uri: user.image} : require('../../styles/darth.png'),
  };
  handleChange = key => val => {
    this.setState({key: val});
  };

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please valid User name');
    } else if (user.name !== this.state.name) {
      user.name = this.state.name;
      this.updateUser();
    }
  };

  changeImage = () => {
    const options = {
      quality: 0.7,
      allowEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        console.log(error);
      } else if (!response.didCancel) {
        this.setState(
          {
            upload: true,
            imageSource: {uri: response.uri},
          },
          this.uploadFile,
        );
      }
    });
  };

  updateUser = () => {
    db.ref('user')
      .child(`/${this.state.uid}/`)
      .set(user);
    useReducer.name = this.state.name;
    Alert.alert('Success', 'Name changed success');
  };

  updateUserImage = imageUrl => {
    user.image = imageUrl;
    this.setState({upload: false, imageSource: {uri: imageUri}});
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('error upload on xml'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.changeImage}>
          {this.state.upload ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image
              style={{width: 100, borderRadius: 100, height: 100}}
              source={this.state.imageSource}
            />
          )}
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>{user.uid}</Text>
        <TextInput
          style={styles.input}
          values={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnText}> Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
