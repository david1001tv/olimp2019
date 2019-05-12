import 'pixi';
import 'p2';
import Phaser from 'phaser';
import autobind from 'autobind-decorator';
import progressManager from '~etc/ProgressManager';

import MapState from './states/Map';
import BootState from './states/Boot';

//import IntroState from './states/FirstStage/Intro';

//Этап 1
//Интро
import IntroState from './states/FirstStage/Intro';
//ПостИнтро
import PostIntroState from './states/FirstStage/PostIntro';
//Квест 1 "Вставить слова" + 
import QuestionsState from './states/FirstStage/Questions';
import TransitionToSecondStageState from './states/FirstStage/TransitionToSecondStage';

//Этап 2
//Квест 1 "Филворд" -
//Квест 2 "Собери макет" + 
import LayoutPuzzleState from './states/SecondStage/LayoutPuzzle';
//Квест 3 "Ввод тегов" -
//Квест 4 "Собери проводку" + 
import CutImagesState from './states/SecondStage/CutImages';
//Квест 5 "Криптография" - 
//Квест 6 "Робот" - 
//Квест 7 "Научная работа (карточки)" + 
import CardsState from './states/SecondStage/Cards';
//Квест 8 "Тесты" -
import TransitionToThirdStageState from './states/SecondStage/TransitionToThirdStage';

//Этап 3
//Квест 1 "Лабиринт" -
//Квест 2 "Кроссворд" -

//Этап 4
//Квест 1 "Поиск предметов" -
//Квест 2 "Три в ряд" -
//Квест 3 "Тестирование и отлавливание багов" -


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
        /*
        //Stage 1
        //Intro +
        this.state.add('Intro', IntroState, false);
        //Questions +
        this.state.add('Questions', QuestionsState, false);

        //Stage 2
        //Fillword -
        //LayoutPuzzle +
        this.state.add("LayoutPuzzle", LayoutPuzzleState, false);
        //Tags -
        //Wiring +
        this.state.add("CutImages", CutImagesState, false);
        //Cryptographic -
        //Robot -
        //Cards +
        this.state.add("Cards", CardsState, false);
        //Tests -

        //Stage 3
        //Labyrinth -
        //Crossword -

        //Stage 4
        //FindItems -
        //ThreeInARow -
        //TestingAndDebugging -

        
        this.state.add('Final', new Phaser.State(), false);
        */
        
        // this.state.add('Intro', IntroState, false);
        // this.state.add('Intro2', PostIntroState, false);
        // this.state.add('Intro3', QuestionsState, false);

        //this.state.add('Intro4', LayoutPuzzleState, false);
        this.state.add('Intro', CardsState, false);



        this.state.start('Boot', true, false, 'Map');
    }

    @autobind
    nextState(score = null) {
        let time = new Date() - this.startTime;
        progressManager.saveHistoryEntry(this.state.current, time, score);
        this.startTime = new Date();
        // if (this.isReplaying) {
        //     this.state.start('Map');
        // } else {
            let states = Object.keys(this.state.states);
            this.progressManager.completeState(this.state.current, 0);
            let currentIndex = states.indexOf(this.state.current);

            this.state.start('Boot', true, false, states[currentIndex + 1]);
        // }
    }

    @autobind
    startState(stateKey, isReplaying = false) {
        this.isReplaying = isReplaying;
        this.phone.setMapIsShown(false);
        this.phone.setMapIsCloseable(true);

        let time = new Date() - this.startTime;
        progressManager.saveHistoryEntry(this.state.current, time);

        this.startTime = new Date();
        this.state.start('Boot', true, false, stateKey);
    }

    /* setFakeBrowserEnabled(enabled) */

    /* displayDialogLine(source, text) */
}

export default Game;