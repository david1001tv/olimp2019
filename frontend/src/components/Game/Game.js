import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import IntroState from './states/Intro';
import DocsState from './states/Docs';
import ScannerState from './states/Scanner';
import BrowserState from './states/Browser';
import BubbleState from './states/Bubble';
import CrossState from './states/Cross';
import BubbleGoodState from './states/BubbleGood';
import WaterAlyoshinState from './states/Water_Alyoshin';
import WaterMarketState from './states/Water_Market';
import TranslateState from './states/Translate';


import config from './config';

class Game extends Phaser.Game {
    constructor() {
        const width = config.gameWidth;
        const height = config.gameHeight;

        super(width, height, Phaser.CANVAS, 'game-container', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Intro', IntroState, false);
        this.state.add('Docs', DocsState, false);
        this.state.add('Scanner', ScannerState, false);
        this.state.add('Browser', BrowserState, false);
        this.state.add('Bubble', BubbleState, false);
        this.state.add('Cross', CrossState, false);
        this.state.add('BubbleGood', BubbleGoodState, false);
        this.state.add('Water_Alyoshin', WaterAlyoshinState, false);
        this.state.add('Water_Market', WaterMarketState, false);
        this.state.add('Translate', TranslateState, false);

        this.state.start('Boot');
    }

    /* setFakeBrowserEnabled(enabled) */

    /* displayDialogLine(source, text) */

    /* phone */
}

export default Game;

