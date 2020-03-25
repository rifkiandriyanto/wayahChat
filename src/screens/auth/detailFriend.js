import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {db} from '../../config/config';

export default class DetailFriend extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    this.detailProfile();
  }
  detailProfile() {
    const userId = this.props.navigation.state.params;
    db.ref('/user/' + userId).on('value', snapshot => {
      const data = snapshot.val();
      const users = Object.values(data);
      this.setState({users});
      console.log(snapshot.val());
      console.log(users.email)
    });
  }

  render() {
    return (
      <>
        <View style={{marginVertical: 200, alignItems: 'center'}}>
          <Text>Profile</Text>
 
          {/* <Text>{this.state.users.name}</Text> */}

        </View>
      </>
    );
  }
}
