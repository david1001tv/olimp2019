import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Map.sass';
import Checkpoint, {
    AVAILABLE,
    CHECKPOINT,
    COMPLETED,
    FINISH,
    FLAG,
    UNAVAILABLE
} from './Checkpoint';

class Map extends Component {
    static propTypes = {
        onClose: PropTypes.func,
    };

    handleClick(a, b) {
        console.log(a, b);
    }

    render() {
        return (
            <div className="map-quests">
                <div
                    className="arrow-button"
                    onClick={this.props.onClose}
                />
                <div
                    className="map-label map-label--first map-label map-label--active no-select"
                >
                    <h3>Етап 1</h3>
                    <h4>Домашні пригоди</h4>
                </div>
                <Checkpoint
                    left="4.3229%"
                    top="23.7963%"
                    type={FLAG}
                    status={COMPLETED}
                    state="Intro"
                    onClick={this.handleClick}
                />
                <Checkpoint
                    left="10.3125%"
                    top="34.35185%"
                    type={CHECKPOINT}
                    status={COMPLETED}
                    state="Docs"
                    onClick={this.handleClick}
                    popoverText="Збір документів"
                />
                <Checkpoint
                    left="16.35416667%"
                    top="38.05555556%"
                    type={CHECKPOINT}
                    status={AVAILABLE}
                    state="Scanner"
                    onClick={this.handleClick}
                    popoverText="Скани документів"
                />
                <Checkpoint
                    left="23.48958333%"
                    top="45.27777778%"
                    type={CHECKPOINT}
                    status={UNAVAILABLE}
                    state="Register"
                    onClick={this.handleClick}
                    popoverText="Реєстрація"
                />
                <div
                    className="map-label map-label--second map-label map-label--inactive no-select"
                >
                    <h3>Етап 2</h3>
                    <h4>Скрізь терни до зірок</h4>
                </div>

                <div
                    className="map-label map-label--third map-label map-label--inactive no-select"
                >
                    <h3>Етап 3</h3>
                    <h4>Gaudeamus igitur</h4>
                </div>
            </div>
        );
    }
}

export default Map;
