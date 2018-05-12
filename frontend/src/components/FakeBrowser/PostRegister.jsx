import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{lat: 47.095447, lng: 37.541188}}

    >
        <MarkerWithLabel
            position={{lat: 47.095447, lng: 37.541188}}
            labelAnchor={new google.maps.Point(60, 150)}
            labelStyle={{
                backgroundColor: 'white',
                fontFamily: 'Neucha',
                fontSize: '18px',
                padding: '16px',
                boxShadow: '3px 3px 3px #aaa',
                borderRadius: '2px'
            }}
        >
            <div>Приймальна комісія ПДТУ</div>
        </MarkerWithLabel>
    </GoogleMap>
));

class PostRegister extends Component {
    render() {
        return (
            <div>
                <h1>
                    Вітаємо! Ви успішно зареєструвались
                </h1>
                <h2>
                    Очікуйте на повідомлення про зарахування
                </h2>
                <h2>
                    Розташування приймальної комісії показано на мапі:
                </h2>
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `400px`, width: "70%", margin: "0 auto"}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PostRegister;
