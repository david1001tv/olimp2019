import 'pixi';
import 'p2';
import Phaser from 'phaser';
import autobind from 'autobind-decorator';

import MapState from './states/Map';
import BootState from './states/Boot';
import IntroState from './states/Intro';
import DocsState from './states/Docs';
import ScannerState from './states/Scanner';
import BrowserState from './states/Browser';
import CrossState from './states/Cross';


import config from './config';

class Game extends Phaser.Game {

    constructor(phoneAPI, progressManager) {
        const width = config.gameWidth;
        const height = config.gameHeight;

        super(width, height, Phaser.CANVAS, 'game-container', null);

        this.phone = phoneAPI;
        this.progressManager = progressManager;
        this.isReplaying = false;

        this.state.add('Map', MapState, false);
        this.state.add('Boot', BootState, false);
        this.state.add('Intro', IntroState, false);
        this.state.add('Docs', DocsState, false);
        this.state.add('Scanner', ScannerState, false);
        this.state.add('Browser', BrowserState, false);
        this.state.add('Cross', CrossState, false);

        this.state.start('Boot', true, false, 'Map');
    }

    @autobind
    nextState() {
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

        this.state.start('Boot', true, false, stateKey);
    }

    /* setFakeBrowserEnabled(enabled) */

    /* displayDialogLine(source, text) */
}

export default Game;

