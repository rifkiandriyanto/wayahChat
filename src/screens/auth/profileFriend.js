import React, {Component} from 'react';
import {Text} from 'react-native';
import {db} from '../../config/config';

export default class FriendProfile extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    this.detailProfile();
  }
  detailProfile() {
    const userId = this.props.navigation.state.params;
    db.ref('/user/' + userId).on('value', snapshot => {
      console.log(snapshot.val());
    });
  }

  render() {
    const userId = this.props.navigation.state.params;
    console.log('userId', userId);
    return (
      <>
        <Text>Friend Details</Text>
      </>
    );
  }
}
