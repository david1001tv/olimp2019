import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Map.sass';
import flag from '../../../img/map/flag-completed.png';
import checkpointCompleted from '../../../img/map/checkpoint-completed.png';


let checkpointStyle1 = {
    position: 'absolute',
    left: '3.322917%',
    top: '22.7963%',
    width: '6.979167%',
    height: '12.22222%',
    backgroundSize: 'cover',
    backgroundImage: `url(${flag})`
};

let checkpointStyle2 = {
    position: 'absolute',
    left: '10.3125%',
    top: '34.35185%',
    width: '3.5%',
    height: '3.7%',
    backgroundSize: 'cover',
    backgroundImage: `url(${checkpointCompleted})`
};

class Map extends Component {
    render() {
        return (
            <div className="map">
                <div
                    style={checkpointStyle1}
                />
                <div
                    style={checkpointStyle2}
                />

            </div>
        );
    }
}

export default Map;
