import React, {Component} from 'react';
import {Text, Image} from 'react-native';
import {db} from '../../config/config';
import {View} from 'native-base';
import styles from '../../styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FriendProfile extends Component {
  static navigationOptions = {
    title: null,
    headerTitleStyle: {
      color: '#b6caff'
    },
    headerStyle: {backgroundColor: '#324191'},
    headerRight: (
      <TouchableOpacity>
        <Image style={{width: 32, height: 32}} />
      </TouchableOpacity>
    ),
  };

  state = {
    users: [],
    imageSource: require('../../styles/darth.png'),
  };
  componentDidMount() {
    this.getDetails();
  }
  getDetails() {
    const id = this.props.navigation.state.params;
    db.ref('/user/' + id).on('value', snapshot => {
      const user = snapshot.val();
      this.setState({
        users: user,
      });
    });
  }

  render() {
    return (
      <>
      <View style={styles.container}>
      <Image
          style={{width: 200, borderRadius: 460, height: 200, marginTop: 0}}
          source={{uri: `${this.state.users.photo}`}}
          source={this.state.imageSource === '' ? {uri: `${this.state.users.photo}`} : this.state.imageSource}
        />
        <View style={{backgroundColor: '#e3fae6', marginLeft: 2}}>
          <View style={{alignItems: 'center', }}>
            <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 40}}>
              {this.state.users.name}
            </Text>
          </View>

          <View style={{backgroundColor: '#e3fae6',}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'grey',
                marginBottom: 5,
                marginLeft: 5,
              }}>
              {this.state.users.name} 's location :
            </Text>
            <View>
              <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('FriendLocation', this.state.users)
              }>
              <Image
                style={{width: 300, height: 200}}
                source={require('../../styles/map.jpeg')}
              />
            </TouchableOpacity>

            </View>
            
          </View>
        </View>
      </View>
        
      </>
    );
  }
}
