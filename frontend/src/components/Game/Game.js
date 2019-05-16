import 'pixi';
import 'p2';
import Phaser from 'phaser';
import autobind from 'autobind-decorator';
import progressManager from '~etc/ProgressManager';

import MapState from './states/Map';
import BootState from './states/Boot';

//Этап 1 +
//Интро +
import IntroState from './states/FirstStage/Intro';
//ПостИнтро +
import PostIntroState from './states/FirstStage/PostIntro';
//Квест 1 "Вставить слова" + 
import QuestionsState from './states/FirstStage/Questions';

//Этап 2 +
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
//Квест 8 "Криптография" - not WORK!
import CryptoState from './states/SecondStage/Crypto';
//Квест 9 "Робот" +
import RobotState from './states/SecondStage/Robot';
//Аутро 10 "Диплом магистра"
import OutroState from './states/SecondStage/Outro';

//Этап 3 +
//Квест 1 "Лабиринт" +
import LabyrinthState from './states/ThirdStage/Labyrinth';
//Сцена 2 "Собеседование программист" +
import FirstInterviewState from './states/ThirdStage/FirstInterview';
//Сцена 3 "Собеседование дизайнер" +
import SecondInterviewState from './states/ThirdStage/SecondInterview';
//Сцена 4 "Собеседование комп. сети" +
import ThirdInterviewState from './states/ThirdStage/ThirdInterview';
//Квест 5 "Кроссворд" +
import CrossState from './states/ThirdStage/Cross';

//Этап 4 +
//Квест 1 "Поиск предметов" +
import ConferenceState from './states/FourthStage/Conference';
//Квест 2 "Три в ряд" +
import ThreeInARowState from './states/FourthStage/ThreeInRow';
//Квест 3 "Тестирование и отлавливание багов" +
import DebuggingState from './states/FourthStage/fixBugs';
//Конец 4 +
import EndState from './states/FourthStage/End';


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
    
        // //Stage 1 +
        // //Intro +
        // this.state.add('Intro', IntroState, false);
        // //PostIntro +
        // this.state.add('PostIntro', PostIntroState, false);
        // //Questions +
        // this.state.add('Questions', QuestionsState, false);

        // //Stage 2 +
        // //Schedule +
        // this.state.add("Schedule", ScheduleState, false);
        // //Fillword +
        // this.state.add("FillWords", FillwordsState, false);
        // //LayoutPuzzle +
        // this.state.add("LayoutPuzzle", LayoutPuzzleState, false);
        // //Tags +
        // this.state.add("Tags", TagsState, false);
        // //Wiring +
        // this.state.add("CutImages", CutImagesState, false);
        // //Cards +
        // this.state.add("Cards", CardsState, false);
        // //Magistracy +
        // this.state.add("Magistracy", MagistracyState, false);
        // //Cryptographic +
        // this.state.add("Crypto", CryptoState, false);
        // //Robot +
        // this.state.add("Robot", RobotState, false);
        // //Outro +
        // this.state.add("Outro", OutroState, false);

        // //Stage 3 +
        // //Labyrinth 
        // this.state.add('Labyrinth', LabyrinthState, false);
        // this.state.add('FirstInterview', FirstInterviewState, false);
        // this.state.add('SecondInterview', SecondInterviewState, false);
        // this.state.add('ThirdInterview', ThirdInterviewState, false);
        // //Crossword +
        // this.state.add('Cross', CrossState, false);

        // //Stage 4 +
        // //FindItems (Conference) +
        // this.state.add('Conference', ConferenceState, false);
        // //ThreeInARow +
        // this.state.add('ThreeInARow', ThreeInARowState, false);
        // //TestingAndDebugging +
        // this.state.add('Debugging', DebuggingState, false);
        // //End +
        // this.state.add('End', EndState, false);
   
        // this.state.add('Final', new Phaser.State(), false);

        this.state.add('Intro', CryptoState, false);


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

    saveChoice(friend = false, science = false, magistracy = false, profession = '') {
        progressManager.saveChoice(friend, science, magistracy, profession);
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

    getChoice() {
        return progressManager.getChoice();
    }

    saveSchedule(subjects) {
        progressManager.saveSubjects(subjects)
    }

    getHistory() {
        return progressManager.getHistory();
    }

    getSubjects() {
        return progressManager.getSubjects();
    }

    getMe() {
        return progressManager.getMe();
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