import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import IntroState from './states/Intro';
import DocsState from './states/Docs';

import config from './config';

class Game extends Phaser.Game {
    constructor() {
        const width = config.gameWidth;
        const height = config.gameHeight;

        super(width, height, Phaser.CANVAS, 'game-container', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Intro', IntroState, false);
        this.state.add('Docs', DocsState, false);

        this.state.start('Docs');
    }

    next() {
        const currentState = this.state.states[this.state.current];
        if (currentState && currentState.next) {
            currentState.next();
        }
    }

    /* displayDialogLine(source, text) */
}

export default Game;

