import 'pixi';
import 'p2';
import Phaser from 'phaser';
import autobind from 'autobind-decorator';
import progressManager from '~etc/ProgressManager';

import MapState from './states/Map';
import BootState from './states/Boot';
import IntroState from './states/FirstStage/Intro';
import DocsState from './states/FirstStage/Docs';
import ScannerState from './states/FirstStage/Scanner';
import BrowserState from './states/FirstStage/Browser';
import GrannyBadState from './states/SecondStage/GrannyBad';
import CrossState from './states/SecondStage/Cross';
import GrannyGoodState from './states/SecondStage/GrannyGood';
import WaterAlyoshinState from './states/SecondStage/WaterAlyoshin';
import WaterMarketState from './states/SecondStage/WaterMarket';
import TranslateState from './states/SecondStage/Translate';
import ProffsState from './states/SecondStage/Proffs';
import AudienceState from './states/SecondStage/Audience';
import GradesState from './states/SecondStage/Grades';
import DanceState from './states/ThirdStage/Dance';
import LabyrinthState from './states/ThirdStage/Labyrinth';


import config from './config';

class Game extends Phaser.Game {

    constructor(phoneAPI, progressManager) {
        const width = config.gameWidth;
        const height = config.gameHeight;

        super(width, height, Phaser.CANVAS, 'game-container', null);

        this.phone = phoneAPI;
        this.progressManager = progressManager;
        this.isReplaying = false;

        this.startTime = null;

        this.state.add('Map', MapState, false);
        this.state.add('Boot', BootState, false);
        this.state.add('Intro', IntroState, false);
        this.state.add('Docs', DocsState, false);
        this.state.add('Scanner', ScannerState, false);
        this.state.add('Browser', BrowserState, false);
        this.state.add('GrannyBad', GrannyBadState, false);
        this.state.add('Cross', CrossState, false);
        this.state.add('GrannyGood', GrannyGoodState, false);
        this.state.add('WaterAlyoshin', WaterAlyoshinState, false);
        this.state.add('WaterMarket', WaterMarketState, false);
        this.state.add('Translate', TranslateState, false);
        this.state.add('Proffs', ProffsState, false);
        this.state.add('Audience', AudienceState, false);
        this.state.add('Grades', GradesState, false);
        this.state.add('Dance', DanceState, false);
        this.state.add('Labyrinth', LabyrinthState, false);

        this.state.start('Boot', true, false, 'Dance');
    }

    @autobind
    nextState(score = null) {
        let time = new Date() - this.startTime;
        progressManager.saveHistoryEntry(this.state.current, time, score);
        this.startTime = new Date();
        if (this.isReplaying) {
            this.state.start('Map');
        } else {
            let states = Object.keys(this.state.states);
            this.progressManager.completeState(this.state.current, 0);
            let currentIndex = states.indexOf(this.state.current);

            this.state.start('Boot', true, false, states[currentIndex + 1]);
        }
    }

    @autobind
    startState(stateKey, isReplaying = false) {
        this.isReplaying = isReplaying;
        this.phone.setMapIsShown(false);
        this.phone.setMapIsCloseable(true);

        this.startTime = new Date();
        this.state.start('Boot', true, false, stateKey);
    }

    /* setFakeBrowserEnabled(enabled) */

    /* displayDialogLine(source, text) */
}

export default Game;

