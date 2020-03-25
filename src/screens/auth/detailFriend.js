import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import {db} from '../../config/config';
import styles from '../../styles/styles';

export default class DetailFriend extends Component {
static navigationOption = {
  header: "Detail Friend"
}


  state = {
    items: [],
  };
  componentDidMount() {
    this.detailProfile();
  }
  detailProfile() {
    const userId = this.props.navigation.state.params;
    db.ref('/user/' + userId).on('value', snapshot => {
      const data = snapshot.val();
      this.setState({items: data});
      console.log(snapshot.val());
    });
  }

  render() {
  
    return (
      <>
        <View style={styles.container}>
          <Text>Profile</Text>
          <Image
              style={{width: 100, borderRadius: 100, height: 100}}
              source={require('../../styles/darth.png')}
            />
 
          <Text style={styles.nameProfile}>{this.state.items.name}</Text>
          <Text style={styles.textProfile}>{this.state.items.email}</Text>

        </View>
      </>
    );
  }
}
