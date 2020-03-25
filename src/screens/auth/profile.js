import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from '../../styles/styles';
import {auth, db} from '../../config/config';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    imageSource: require('../../styles/darth.png'),
    upload: false,
  };

  onLogout = async () => {
    auth.signOut().then(response => console.warn('Logout'));
  };

  changePhoto = () => {
    const options = {
      quality: 0.5,
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

  updateUserPhoto = async imageUrl => {
    const userId = auth.currentUser.uid;
    auth.currentUser.photo = imageUrl;
    await db
      .ref('/user/' + userId)
      .child('photo')
      .set(imageUrl);
    Alert.alert('Succsess', 'Photo updated successfull');
    this.setState({upload: false, imageSource: {uri: imageUrl}});
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    firebase
      .storage()
      .ref(`profilePhotos/${auth.currentUser.uid}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateUserPhoto(url))
      .catch(error => {
        this.setState({
          upload: false,
          imageSource: require('../../styles/darth.png'),
        });
        Alert(error, 'Failed to update photo');
      });
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('Failed to update photo'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text> profile </Text>
        <TouchableOpacity onPress={this.changePhoto}>
          {this.state.upload ? (
            <ActivityIndicator size="large" />
          ) : (
            <Image
              style={styles.imageProfile}
              source={this.state.imageSource}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
