import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import user from './user';
import styles from '../../styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    name: user.name,
    imageSource: user.image
      ? {uri: user.image}
      : require('../../styles/darth.png'),
    upload: false,
  };
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (user.name !== this.state.name) {
      user.name = this.state.name;
      this.updateUser();
    }
  };
  _logOut = async () => {
    await AsyncStorage.clear();
    await firebase.auth().signOut;
    this.props.navigation.navigate('Auth');
  };
  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
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
    firebase
      .database()
      .ref('user')
      .child(user.email)
      .set(user);
    Alert.alert('Success', 'succesfull.');
  };
  updateUserImage = imageUrl => {
    user.image = imageUrl;
    this.updateUser();
    this.setState({upload: false, imageSource: {uri: imageUrl}});
  };
  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    await firebase
      .storage()
      .ref(`profile_pictures/${user.email}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateUserImage(url))
      .catch(error => {
        this.setState({
          upload: false,
          imageSource: require('../../styles/darth.png'),
        });
        Alert.alert(error, 'Error upload image');
      });
  };
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('Error on upload image'));
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
              style={{
                width: 100,
                borderRadius: 100,
                height: 100,
                resizeMode: 'cover',
              }}
              source={this.state.imageSource}
            />
          )}
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>{user.email}</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnText}>Change name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logOut}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
