import React, { Component } from 'react';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';

class MapScreen extends Component {
    componentDidMount(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,

        })
        .then (location => {
            console.log(location)

        })
        .catch(error => {
            console.warn(error, ' Get Location Error')
        })
    }
    render() {
        return (
            <MapView
            style={{ flex: 1, width: window.width }} //window pake Dimensions
            region={{
                latitude: -6.6210828,
                longitude:  106.8185388,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421 
            }} >
            <MapView.Marker
            coordinate={{
                latitude: -6.6210828,
                longitude:  106.8185388,
            }}
            title="Lokasi"
            description="Hello" />
            </MapView>
        )
    }
}

export default MapScreen;

