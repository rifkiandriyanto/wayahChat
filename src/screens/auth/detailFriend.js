import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {db} from '../../config/config';

export default class DetailFriend extends Component {
  state = {
    users: [],
  };

  getDetail() {
    const userId = this.props.navigation.state.params;
    db.ref('/user' + userId).on('value', snapshot => {
      console.log(snapshot.val());
    });
  }

  componentDidMount() {
    this.getDetail();
  }
  //   renderRow = ({users}) => {
  //     return(
  //         <View style={{ margin: 10, flexDirection: 'row' }}>
  //             <Text style={{ padding: 10 }}>Name : {users.name}</Text>
  //         </View>
  //     )
  // }

  render() {
    console.disableYellowBox = true;
    return <View style={{flex: 1, flexDirection: 'column'}}></View>;
  }
}
