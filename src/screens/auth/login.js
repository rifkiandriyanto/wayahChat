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
import {auth} from '../../config/config';
import styles from '../../styles/styles';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      email: '',
      password: '',
      latitude: null,
      longitude: null,
      errorMessage: null,
      visible: false,
      Onprosess: false,
    };
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

  handleLogin = () => {
    const {email, password} = this.state;
    if (email.length < 6) {
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
      auth
        .signInWithEmailAndPassword(email, password)
        .then(async data => {
          console.log(data);
        })
        .catch(error => console.log(error.message));
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#f4f4f4"></StatusBar>
        <ScrollView>
          <Image
            style={{margintop: 20, width: 250, height: 250}}
            source={require('../../styles/logo.png')}
          />

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <KeyboardAvoidingView behavior="padding" enabled>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}></TextInput>
              </KeyboardAvoidingView>
            </View>

            <View style={{marginTop: 32}}>
              <KeyboardAvoidingView behavior="padding" enabled>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}></TextInput>
              </KeyboardAvoidingView>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 32}}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{color: '#414959', fontSize: 13}}>
              New User WayahChat App?{' '}
              <Text style={{fontWeight: 'bold', color: '#000000'}}>
                Sign up
              </Text>
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
