import React, {Component} from 'react';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {db, auth} from '../config/config';



export default class MapScreen extends Component {
    state = {
        user: [],
      };

  componentDidMount() {
    this.getLocaction();
    //     GetLocation.getCurrentPosition({
    //         enableHighAccuracy: true,
    //         timeout: 30000,

    //     })
    //     .then (location => {
    //         console.log(location)

    //     })
    //     .catch(error => {
    //         console.warn(error, ' Get Location Error')
    //     })
  }

  getLocaction() {
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
