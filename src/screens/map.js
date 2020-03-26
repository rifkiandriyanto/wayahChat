import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {db, auth} from '../config/config';

export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'User Location',
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
    const marker = this.state.user.map((item) =>  <MapView.Marker
    coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
    }}
    title={item.name}
    description="Iam Here" />
    ) 
    return (
        <>
        <MapView
            style={{ flex: 1, width: window.width }} //window pake Dimensions
            region={{
              latitude: -6.1750,
              longitude: 106.8283,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421 
          }} >
            {marker}
         </MapView>
         </>
    );
  }
}
