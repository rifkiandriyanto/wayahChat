import React, { Component } from 'react';
import MapView from 'react-native-maps';

class Map extends Component {
    render() {
        return (
            <MapView
                style={{ flex: 1, width: window.width }} //window pake Dimensions
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} >
                <MapView.Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Lokasi"
                    description="Hello" />
            </MapView>
        )
    }
}

export default Map;

