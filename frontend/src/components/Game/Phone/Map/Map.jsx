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
                </div>
                <Checkpoint
                    left="4.0229%"
                    top="13.7963%"
                    type={FLAG}
                    state="Intro"
                    onClick={this.handleClick}
                    popoverText="Етап 1"
                />
                <Checkpoint
                    left="10%"
                    top="26%"
                    type={CHECKPOINT}
                    state="PostIntro"
                    onClick={this.handleClick}
                    popoverText="День відкритих дверей"
                />
                <Checkpoint
                    left="16.35416667%"
                    top="30%"
                    type={CHECKPOINT}
                    state="Questions"
                    onClick={this.handleClick}
                    popoverText="Інформація"
                />
                <div
                    className={`map-label map-label--second map-label map-label--${progressManager.getStageStatus(2)} no-select`}
                >
                </div>
                <Checkpoint
                    left="24%"
                    top="25%"
                    type={FLAG}
                    state="Schedule"
                    onClick={this.handleClick}
                    popoverText="Етап 2"
                />
                <Checkpoint
                    left="26%"
                    top="40%"
                    type={CHECKPOINT}
                    state="FillWords"
                    onClick={this.handleClick}
                    popoverText="Вступ до комп'ютерних наук"
                />
                <Checkpoint
                    left="28%"
                    top="46%"
                    type={CHECKPOINT}
                    state="LayoutPuzzle"
                    onClick={this.handleClick}
                    popoverText="Веб-дизайн"
                />
                <Checkpoint
                    left="30%"
                    top="52%"
                    type={CHECKPOINT}
                    state="Tags"
                    onClick={this.handleClick}
                    popoverText="Веб-програмування"
                />
                <Checkpoint
                    left="32%"
                    top="58%"
                    type={CHECKPOINT}
                    state="CutImages"
                    onClick={this.handleClick}
                    popoverText="Комп'ютерні мережі"
                />
                <Checkpoint
                    left="34%"
                    top="64%"
                    type={CHECKPOINT}
                    state="Cards"
                    onClick={this.handleClick}
                    popoverText="Наукова робота"
                />
                <Checkpoint
                    left="37%"
                    top="70%"
                    type={CHECKPOINT}
                    state="Magistracy"
                    onClick={this.handleClick}
                    popoverText="Диплом бакалавра"
                />
                <Checkpoint
                    left="40%"
                    top="76%"
                    type={CHECKPOINT}
                    state="Crypto"
                    onClick={this.handleClick}
                    popoverText="Кріптографія"
                />
                <Checkpoint
                    left="44%"
                    top="82%"
                    type={CHECKPOINT}
                    state="Robot"
                    onClick={this.handleClick}
                    popoverText="Штучний інтелект"
                />
                <Checkpoint
                    left="47%"
                    top="88%"
                    type={CHECKPOINT}
                    state="Outro"
                    onClick={this.handleClick}
                    popoverText="Диплом магістра"
                />
                <div
                    className={`map-label map-label--third map-label map-label--${progressManager.getStageStatus(3)} no-select`}
                >
                </div>
                <Checkpoint
                    left="56%"
                    top="75%"
                    type={FLAG}
                    state="Labyrinth"
                    onClick={this.handleClick}
                    popoverText="Етап 3"
                />
                <Checkpoint
                    left="60%"
                    top="73%"
                    type={CHECKPOINT}
                    state="FirstInterview"
                    onClick={this.handleClick}
                    popoverText="Перша співбесіда"
                />
                <Checkpoint
                    left="64%"
                    top="67%"
                    type={CHECKPOINT}
                    state="SecondInterview"
                    onClick={this.handleClick}
                    popoverText="Друга співбесіда"
                />
                <Checkpoint
                    left="68%"
                    top="61%"
                    type={CHECKPOINT}
                    state="ThirdInterview"
                    onClick={this.handleClick}
                    popoverText="Третя співбесіда"
                />
                <Checkpoint
                    left="72%"
                    top="55%"
                    type={CHECKPOINT}
                    state="Cross"
                    onClick={this.handleClick}
                    popoverText="Договір"
                />
                <div
                    className={`map-label map-label--third map-label map-label--${progressManager.getStageStatus(4)} no-select`}
                >
                </div>
                <Checkpoint
                    left="80%"
                    top="45%"
                    type={FLAG}
                    state="Conference"
                    onClick={this.handleClick}
                    popoverText="Етап 4"
                />
                <Checkpoint
                    left="84%"
                    top="42%"
                    type={CHECKPOINT}
                    state="threeInRow"
                    onClick={this.handleClick}
                    popoverText="Розробка проекту"
                />
                <Checkpoint
                    left="88%"
                    top="36%"
                    type={CHECKPOINT}
                    state="fixBugs"
                    onClick={this.handleClick}
                    popoverText="Тестування"
                />
                <Checkpoint
                    left="94%"
                    top="24%"
                    type={FINISH}
                    state="End"
                    onClick={this.handleClick}
                    popoverText="Успіх"
                />
            </div>
        );
    }
}

export default Map;