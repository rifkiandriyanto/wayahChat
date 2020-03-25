import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {db, auth, time} from '../config/config';
import {FlatList} from 'react-native-gesture-handler';

export default class MessageScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const userId = navigation.getParam('uid');
    return {
      headerTitle: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailFriend', userId)}>
          <Text style={{fontSize: 17}}>
            {navigation.getParam('name', null)}
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.navigation.getParam('name'),
      uid: props.navigation.getParam('uid'),
      textMessage: '',
      messageList: '',
    };
  }

  componentDidMount() {
    db.ref('/messages/')
      .child(`/${auth.currentUser.uid}/`)
      .child(`/${this.state.uid}/`)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = (
        await db
          .ref('/messages/')
          .child(`/${auth.currentUser.uid}/`)
          .child(`/${this.state.uid}/`)
          .push()
      ).key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: time,
        from: auth.currentUser.uid,
      };
      updates[
        'messages/' + auth.currentUser.uid + '/' + this.state.uid + '/' + msgId
      ] = message;
      updates[
        'messages/' + this.state.uid + '/' + auth.currentUser.uid + '/' + msgId
      ] = message;
      db.ref().update(updates);
      this.setState({textMessage: ''});
    }
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '' + d.getMonth() + '' + result;
    }
    return result;
  };

  renderRow = ({item}) => {
    return (
      
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          alignSelf:
            item.from === auth.currentUser.uid ? 'flex-end' : 'flex-start',
          backgroundColor:
            item.from === auth.currentUser.uid ? '#b6caff' : '#99b09b',
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 13, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <>
      <View style={{backgroundColor:'#e3fae6', flex:1}}>
        <FlatList
          style={{padding: 10, height: height * 0.8}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{
            flexDirection: 'row',
          }}>
            
        
            <TextInput
            style={styles.inputChat}
            value={this.state.textMessage}
            placeholder="Type a message"
            onChangeText={this.handleChange('textMessage')}
          />

          <TouchableOpacity
            onPress={this.sendMessage}
            style={{paddingBottom: 10, marginLeft: 5}}>
            <Icon
              name="ios-send"
              style={{marginLeft: 10, fontSize: 35, color: '#b6caff'}}></Icon>
          </TouchableOpacity>
         
    
         
        </View>
        </View>
      </>
    );
  }
}
