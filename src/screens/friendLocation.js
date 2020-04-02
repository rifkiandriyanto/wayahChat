import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Text} from 'react-native';
export default class FriendLocation extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {backgroundColor: '#324191'},
      headerTitle: (
        <Text style={{fontWeight: 'bold', fontSize: 18,  color: '#b6caff'}}>
          {navigation.getParam('name')} 's location
        </Text>
      ),
    };
  };

//   static navigationOptions = ({navigation}) => {
//     const userId = navigation.getParam('uid');
//     return {
//       headerStyle: {backgroundColor: '#324191'},
//       headerTitle: (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('DetailFriend', userId)}>
//           <Text style={{fontSize: 17,  color: '#b6caff'}}>
//             {navigation.getParam('name', null)}
//           </Text>
//         </TouchableOpacity>
//       ),
//     };
//   };


  state = {
    user: [],
  };

  render() {
    return (
      <>
        <MapView
          style={{flex: 1, width: window.width}} //window pake Dimensions
          region={{
            latitude: this.props.navigation.getParam('latitude'),
            longitude: this.props.navigation.getParam('longitude'),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.props.navigation.getParam('latitude'),
              longitude: this.props.navigation.getParam('longitude'),
            }}
            title={this.props.navigation.getParam('name')}
            description={this.props.navigation.getParam('status')}
          />
        </MapView>
      </>
    );
  }
}
