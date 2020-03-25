import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {auth, db} from '../../config/config';
import styles from '../../styles/styles'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      name: '',
      email: '',
      password: '',
      uid: '',
      latitude: null,
      longitude: null,
      errorMessage: null,
      loading: false,
      updatesEnabled: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  handleSignUp = async () => {
    const {email, name, password} = this.state;
    if (name.length < 1) {
      ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
    } else if (email.length < 6) {
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      // Action
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
          db.ref('/user/' + userCredentials.user.uid)
            .set({
              name: this.state.name,
              status: 'Online',
              email: this.state.email,
              photo: 'http://photourl.com/photo',
              uid: userCredentials.user.uid,
            })
            .catch(error => console.log(error.message));

          console.log(userCredentials);
          ToastAndroid.show('Success', ToastAndroid.LONG);

          if (userCredentials.user) {
            userCredentials.user
              .updateProfile({
                displayName: this.state.name,
                photoURL: 'http://linkphoto.com',
              })
              .then(s => {
                this.props.navigation.navigate('App');
              });
          }
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
        <ScrollView>
        <Image style={{margintop: 20, width: 250, height: 250}} source={require('../../styles/logo.png')} />

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <KeyboardAvoidingView behavior="padding" enabled>
              <View>
                <Text style={styles.inputTitle}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={name => this.setState({name})}
                  value={this.state.name}
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                />
              </View>
            </KeyboardAvoidingView>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 20}}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{color: '#414959', fontSize: 13}}>
              <Text style={{fontWeight: 'bold', color: '#000000'}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      1,
      800,
    );
    return null;
  }
  return null;
};
