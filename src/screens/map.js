import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {db, auth} from '../config/config';
import {TouchableOpacity, Image} from 'react-native';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Friend Location',
    headerTitleStyle: {
      color: '#b6caff',
    },
    headerStyle: {backgroundColor: '#324191'},
    headerRight: (
      <TouchableOpacity>
        <Image style={{width: 32, height: 32}} />
      </TouchableOpacity>
    ),
  };

  state = {
    user: [],
  };

  componentDidMount() {
    this.userLocation();
  }

  userLocation() {
    db.ref('/user').on('value', snapshot => {
      const current_user = auth.currentUser.uid;
      const data = snapshot.val();
      const user = Object.values(data);
      this.setState({
        user: user,
      });
    });
  }

  render() {
    const marker = this.state.user.map(item => (
      <MapView.Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.name}
        description="Iam Here"
      />
    ));
    return (
      <>
        <MapView
          style={{flex: 1, width: window.width}} //window pake Dimensions
          region={{
            latitude: -6.6210828,
            longitude: 106.8185388,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {marker}
        </MapView>
      </>
    );
  }
}
