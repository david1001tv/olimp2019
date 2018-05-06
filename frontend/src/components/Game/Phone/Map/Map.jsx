import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

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
        onSelect: PropTypes.func,
        isCloseable: PropTypes.bool
    };

    @autobind
    handleClick(key, status) {
        console.log(key, status);
        let isReplaying = status === COMPLETED;
        this.props.onSelect(key, isReplaying);
    }

    render() {
        return (
            <div className="map-quests">
                {
                    this.props.isCloseable && (
                        <div
                            className="arrow-button"
                            onClick={this.props.onClose}
                        />
                    )
                }
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
                    state="Intro"
                    onClick={this.handleClick}
                    popoverText="Етап 1"
                />
                <Checkpoint
                    left="10.3125%"
                    top="34.35185%"
                    type={CHECKPOINT}
                    state="Docs"
                    onClick={this.handleClick}
                    popoverText="Збір документів"
                />
                <Checkpoint
                    left="16.35416667%"
                    top="38.05555556%"
                    type={CHECKPOINT}
                    state="Scanner"
                    onClick={this.handleClick}
                    popoverText="Скани документів"
                />
                <Checkpoint
                    left="23.48958333%"
                    top="45.27777778%"
                    type={CHECKPOINT}
                    state="Browser"
                    onClick={this.handleClick}
                    popoverText="Реєстрація"
                />
                <Checkpoint
                    left="35%"
                    top="40.09259%"
                    type={FLAG}
                    state="GrannyBad"
                    onClick={this.handleClick}
                    popoverText="Етап 2"
                />
                <Checkpoint
                    left="35.625%"
                    top="57.59259%"
                    type={CHECKPOINT}
                    state="Cross"
                    onClick={this.handleClick}
                    popoverText="Прохідна"
                />
                <Checkpoint
                    left="39.0625%"
                    top="66.2963%"
                    type={CHECKPOINT}
                    state="WaterAlyoshin"
                    onClick={this.handleClick}
                    popoverText="Приймальна комісія"
                />
                <Checkpoint
                    left="44.5%"
                    top="71.7%"
                    type={CHECKPOINT}
                    state="Translate"
                    onClick={this.handleClick}
                    popoverText="Переклад"
                />
                <Checkpoint
                    left="51.6%"
                    top="70.8%"
                    type={CHECKPOINT}
                    state="Proffs"
                    onClick={this.handleClick}
                    popoverText="Знайомство"
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
