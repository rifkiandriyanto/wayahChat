import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import {db, auth} from '../../config/config';
import styles from '../../styles/styles';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'conversation',
  };
  state = {
    user: [],
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    db.ref('/user').on('value', snapshot => {
      const current_user = snapshot.val();
      const data = snapshot.val();
      const user = Object.values(data);
      const result = user.filter(user => user.id !== current_user);
      this.setState({
        user: result,
      });
    });
  }

  onLogout = async () => {
    auth.signOut().then(response => console.warn('logout'));
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Message', item)}
        style={{padding: 10, borderBottomColor: 'info', borderBottomWidth: 1}}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    console.log.disableYellowBox = true;
    return (
      <>
        <View>
          <FlatList
            data={this.state.users}
            renderItem={this.renderRow}
            keyExtractor={item => {
              item.uid;
            }}
          />
        </View>
        <TouchableOpacity onPress={this.onLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </>
    );
  }
}

export default HomeScreen;
