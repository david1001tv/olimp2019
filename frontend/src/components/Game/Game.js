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
//Интро 1 "Расписание" +
import ScheduleState from './states/SecondStage/Schedule';
//Квест 2 "Филворд" +
import FillwordsState from './states/SecondStage/FillWords';
//Квест 3 "Собери макет" + 
import LayoutPuzzleState from './states/SecondStage/LayoutPuzzle';
//Квест 4 "Ввод тегов" +
import TagsState from './states/SecondStage/Tags';
//Квест 5 "Собери проводку" + 
import CutImagesState from './states/SecondStage/CutImages';
//Квест 6 "Научная работа (карточки)" + 
import CardsState from './states/SecondStage/Cards';
//Квест 7 "Магистратура" +
import MagistracyState from './states/SecondStage/Magistracy';
//Квест 8 "Криптография" - 
//Квест 9 "Робот" - 
//Аутро 10 "Диплом магистра"
import OutroState from './states/SecondStage/Outro';


import TransitionToThirdStageState from './states/SecondStage/TransitionToThirdStage';

//Этап 3
//Квест 1 "Лабиринт" +
import LabyrinthState from './states/ThirdStage/Labyrinth';
import FirstInterviewState from './states/ThirdStage/FirstInterview';
//Квест 2 "Кроссворд" +
import CrossState from './states/ThirdStage/Cross';

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
        //PostIntro +
        this.state.add('PostIntro', PostIntroState, false);
        //Questions +
        this.state.add('Questions', QuestionsState, false);

        //Stage 2
        //Schedule +
        this.state.add("Shedule", ScheduleState, false);
        //Fillword +
        this.state.add("Fillword", FillwordsState, false);
        //LayoutPuzzle +
        this.state.add("LayoutPuzzle", LayoutPuzzleState, false);
        //Tags +
        this.state.add("Tags", TagsState, false);
        //Wiring +
        this.state.add("CutImages", CutImagesState, false);
        //Cards +
        this.state.add("Cards", CardsState, false);
        //Magistracy +
        this.state.add("Magistracy", MagistracyState, false);
        //Cryptographic -
        //Robot -
        //Outro +
        this.state.add("Outro", OutroState, false);

        //Stage 3
        //Labyrinth 
        this.state.add('Labyrinth', LabyrinthState, false);
        
        //Crossword +
        this.state.add('Cross', CrossState, false);

        //Stage 4
        //FindItems -
        //ThreeInARow -
        //TestingAndDebugging -

        
        this.state.add('Final', new Phaser.State(), false);
        */
        
        this.state.add('Intro', FirstInterviewState, false);



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
    nextStateForWork(score = null) {
        let time = new Date() - this.startTime;
        progressManager.saveHistoryEntry(this.state.current, time, score);
        this.startTime = new Date();
        // if (this.isReplaying) {
        //     this.state.start('Map');
        // } else {
            let states = Object.keys(this.state.states);
            this.progressManager.completeState(this.state.current, 0);
            let currentIndex = states.indexOf(this.state.current);

            this.state.start('Boot', true, false, states[currentIndex + 4]);
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