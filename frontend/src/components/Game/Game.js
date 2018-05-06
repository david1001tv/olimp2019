import 'pixi';
import 'p2';
import Phaser from 'phaser';

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
        this.state.add('GrannyBad', GrannyBadState, false);
        this.state.add('Cross', CrossState, false);
        this.state.add('GrannyGood', GrannyGoodState, false);
        this.state.add('WaterAlyoshin', WaterAlyoshinState, false);
        this.state.add('WaterMarket', WaterMarketState, false);
        this.state.add('Translate', TranslateState, false);
        this.state.add('Proffs', ProffsState, false);

        this.state.start('Boot');
    }

    /* setFakeBrowserEnabled(enabled) */

    /* displayDialogLine(source, text) */

    /* phone */
}

export default Game;

