import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './Map.sass';
import ProgressManager from '~etc/ProgressManager';
import {
    COMPLETED,
    AVAILABLE,
    UNAVAILABLE,
} from '~etc/ProgressManager';

import checkpointCompleted from '~img/map/checkpoint-completed.png';
import finishCompleted from '~img/map/finish-completed.png';
import flagCompleted from '~img/map/flag-completed.png';

import checkpointAvailable from '~img/map/checkpoint-available.png';
import finishAvailable from '~img/map/finish-available.png';
import flagAvailable from '~img/map/flag-available.png';

import checkpointUnavailable from '~img/map/checkpoint-unavailable.png';
import finishUnavailable from '~img/map/finish-unavailable.png';
import flagUnavailable from '~img/map/flag-unavailable.png';

export const CHECKPOINT = 'checkpoint';
export const FINISH = 'finish';
export const FLAG = 'flag';

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
    @autobind
    handleClick() {
        const {state, status} = this.props;
        this.props.onClick(state, status);
    }
    
    render() {
        const {
            type,
            top,
            left,
            state,
            popoverText,
            onClick
        } = this.props;

        let cursor;
        let pointerEvents;
        let status = ProgressManager.getStatus(state);
        let isClickable = status === AVAILABLE || (type === CHECKPOINT && status === COMPLETED);

        if (isClickable) {
            cursor = 'pointer';
            pointerEvents = 'all';
        } else {
            cursor = 'default';
            pointerEvents = 'none';
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
    // status: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    onClick: PropTypes.func,
    state: PropTypes.string,
    popoverText: PropTypes.string
};

export default Checkpoint;

