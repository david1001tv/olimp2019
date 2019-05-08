import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {getHistory} from '~api';
import progressManager from '~etc/ProgressManager';

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

    componentDidMount() {
        getHistory().then(history => {
            progressManager.setHistory(history);
            this.forceUpdate();
        });
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
                    className={`map-label map-label--first map-label map-label--${progressManager.getStageStatus(1)} no-select`}
                >
                    <h3>Етап 1</h3>
                    <h4>Домашні пригоди</h4>
                </div>
                <Checkpoint
                    left="4.3229%"
                    top="23.7963%"
                    type={FLAG}
                    state="ThreeInRow"
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
                <div
                    className={`map-label map-label--second map-label map-label--${progressManager.getStageStatus(2)} no-select`}
                >
                    <h3>Етап 2</h3>
                    <h4>Шлях крізь терни до зірок</h4>
                </div>
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
                    popoverText="Комісія"
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
                <Checkpoint
                    left="56.7%"
                    top="65.8%"
                    type={CHECKPOINT}
                    state="Audience"
                    onClick={this.handleClick}
                    popoverText="Співбесіда"
                />
                <Checkpoint
                    left="58.6%"
                    top="57.4%"
                    type={CHECKPOINT}
                    state="Grades"
                    onClick={this.handleClick}
                    popoverText="Оцінювання"
                />
                <div
                    className={`map-label map-label--third map-label map-label--${progressManager.getStageStatus(3)} no-select`}
                >
                    <h3>Етап 3</h3>
                    <h4>Gaudeamus igitur</h4>
                </div>
                <Checkpoint
                    left="70.2%"
                    top="50.5%"
                    type={FLAG}
                    state="thirdIntro"
                    onClick={this.handleClick}
                    popoverText="Етап 3"
                />
                <Checkpoint
                    left="73.3%"
                    top="64.3%"
                    type={CHECKPOINT}
                    state="Labyrinth"
                    onClick={this.handleClick}
                    popoverText="Лабіринт"
                />
                <Checkpoint
                    left="76.9%"
                    top="71.0%"
                    type={CHECKPOINT}
                    state="CodeEditor"
                    onClick={this.handleClick}
                    popoverText="Лабораторна"
                />
                <Checkpoint
                    left="81.9%"
                    top="77.6%"
                    type={CHECKPOINT}
                    state="Dance"
                    onClick={this.handleClick}
                    popoverText="Виступ"
                />
                <Checkpoint
                    left="88.8%"
                    top="80.5%"
                    type={FINISH}
                    state="Final"
                    onClick={this.handleClick}
                    popoverText="Кінець"
                />
            </div>
        );
    }
}

export default Map;
