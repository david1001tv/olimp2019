import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Map.sass';


import checkpointCompleted from '../../../../img/map/checkpoint-completed.png';
import finishCompleted from '../../../../img/map/finish-completed.png';
import flagCompleted from '../../../../img/map/flag-completed.png';

import checkpointAvailable from '../../../../img/map/checkpoint-available.png';
import finishAvailable from '../../../../img/map/finish-available.png';
import flagAvailable from '../../../../img/map/flag-available.png';

import checkpointUnavailable from '../../../../img/map/checkpoint-unavailable.png';
import finishUnavailable from '../../../../img/map/finish-unavailable.png';
import flagUnavailable from '../../../../img/map/flag-unavailable.png';


let checkpointTypes = {
    checkpoint: {
        width: '3.5%',
        height: '3.7%',
        image: {
            completed: checkpointCompleted,
            available: checkpointAvailable,
            unavailable: checkpointUnavailable,
        }
    },
    finish: {
        width: '5%',
        height: '8%',
        image: {
            completed: finishCompleted,
            available: finishAvailable,
            unavailable: finishUnavailable,
        }
    },
    flag: {
        width: '6.979%',
        height: '12.222%',
        image: {
            completed: flagCompleted,
            available: flagAvailable,
            unavailable: flagUnavailable,
        }
    }
};

class Checkpoint extends React.Component {
    render() {
        const {
            type,
            status,
            top,
            left,
            onClick,
            state,
            popoverText
        } = this.props;

        let cursor;
        let pointerEvents;
        if (status === 'unavailable') {
            cursor = 'default';
            pointerEvents = 'none';
        } else {
            cursor = 'pointer';
            pointerEvents = 'all';
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    left,
                    top,
                    width: checkpointTypes[type].width,
                    height: checkpointTypes[type].height,
                    backgroundSize: 'cover',
                    backgroundImage: `url(${checkpointTypes[type].image[status]})`,
                    cursor,
                    pointerEvents
                }}
                onClick={() => onClick(state, status)}
                ref="target"
                className="map-quests__checkpoint"
            >
                {
                    popoverText ?
                        <div className="map-quests__checkpoint-popover">{popoverText}</div>
                        :
                        null
                }
            </div>
        );
    }
};

Checkpoint.propTypes = {
    type: PropTypes.string,
    status: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    onClick: PropTypes.func,
    state: PropTypes.string,
    popoverText: PropTypes.string
};

export default Checkpoint;

export const COMPLETED = 'completed';
export const AVAILABLE = 'available';
export const UNAVAILABLE = 'unavailable';

export const CHECKPOINT = 'checkpoint';
export const FINISH = 'finish';
export const FLAG = 'flag';

