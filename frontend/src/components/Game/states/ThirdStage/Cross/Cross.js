import Phaser from 'phaser';
import CrosswordInput from './CrosswordInput';

import {smartSetHeight} from '../../../utils';


const PROGRAMMING = 0;// готово
const GRAPHICSS = 1;
const NETWORKS = 2;

let var_name = 2;


export default class CrossState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 3000, true);
        yield;
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: "CROSS",
            text: "Розв\'язати кросворд"
        });
        this.game.phone.setEnabled(true);
        this.game.phone.setTime('10:22');
        this.game.phone.setDate('21.07.18');
        this.time = 7 * 60 * 1000;
        this.minPoints = 100;
        this.maxPoints = 200;
        this.rate = 0;
        this.goTimer = setTimeout(() => this.checkRate(), this.time);
        this.timer = setInterval(() => this.checkTime(), 1000);
    }

    preload() {
        if(var_name == PROGRAMMING){
            // програмач
            this.load.image('bg', './assets/images/3-2 (Cross)/program_fon.png');
        }else if(var_name == GRAPHICSS){
            // графика
            this.load.image('bg', './assets/images/3-2 (Cross)/grafika_fon.png');
        }else if(var_name == NETWORKS){
             // сети
            this.load.image('bg', './assets/images/3-2 (Cross)/seti_fon.png');
        }

        // this.load.image('bg', './assets/images/3-2 (Cross)/bg-newspaper.png');
        this.load.image('ok', './assets/images/3-2 (Cross)/ok.png');
        this.load.image('bad', './assets/images/3-2 (Cross)/bad.png');
        this.load.image('square', './assets/images/3-2 (Cross)/square.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.flag_kiy = false;
        this.flagBackspace = false;

        this.timerText = this.game.add.text(32, 32, '', {
            font: "Pangolin",
            fontSize: 70,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });



        if(var_name == PROGRAMMING){
            this.inputs = [
                new CrosswordInput(1190, 303, 'компілятор', 4, this.game),
                new CrosswordInput(992, 354, 'коментар', 8, this.game),
                new CrosswordInput(1340, 404, 'обєкт', 1, this.game),
                new CrosswordInput(1238, 453, 'алгоритм', 3, this.game),
                new CrosswordInput(1190, 504, 'інкремент', 4, this.game),
                new CrosswordInput(1090, 553, 'константа', 6, this.game),
                new CrosswordInput(1340, 603, 'модуль', 1, this.game),
                new CrosswordInput(1290, 652, 'масив', 2, this.game),
            ];  
        }else if(var_name == GRAPHICSS){
            this.inputs = [
                new CrosswordInput(1100, 305, 'трасування', 6, this.game),
                new CrosswordInput(1152, 355, 'піксель', 5, this.game),
                new CrosswordInput(1102, 404, 'графіка', 6, this.game),
                new CrosswordInput(1201, 455, 'растушевка', 4, this.game),
                new CrosswordInput(1053, 504, 'редактор', 7, this.game),
                new CrosswordInput(1102, 553, 'палітра', 6, this.game),
                new CrosswordInput(1202, 603, 'планшет', 4, this.game),
                new CrosswordInput(1152, 652, 'анімація', 5, this.game),
            ];  
        }else if(var_name == NETWORKS){
            this.inputs = [
                new CrosswordInput(1064, 298, 'забезпечення', 6, this.game),
                new CrosswordInput(1215, 348, 'сервер', 3, this.game),
                new CrosswordInput(1264, 397, 'модем', 2, this.game),
                new CrosswordInput(1164, 446, 'провідник', 4, this.game),
                new CrosswordInput(1264, 495, 'память', 2, this.game),
                new CrosswordInput(1016, 546, 'кілобайт', 7, this.game),
                new CrosswordInput(1314, 596, 'домен', 1, this.game),
                new CrosswordInput(1164, 645, 'адреса', 4, this.game),
                new CrosswordInput(1264, 695, 'браузер', 2, this.game),
                new CrosswordInput(1064, 495, 'біт', -1, this.game, true),
            ];  
        }

        this.inputs.forEach((input, index) => {
            input.onInputEnd = () => {
                if (input.value === input.word) {
                    input.blur();
                    let nextInput = this.inputs.find((curr, currIndex) => !curr.disabled && currIndex > index);
                    if (nextInput) {
                        setTimeout(() => nextInput.focusCell(0), 0);
                    }
                    input.wrong = false;
                    input.disabled = true;
                } else {
                    input.wrong = true;
                }

                if (this.inputs.every(input => input.disabled)) {
                    let rate;
                    if ((this.time) / 1000 >= 330) {
                        rate = this.maxPoints;
                    }
                    else {
                        let percent = this.time / (7 * 60 * 1000);
                        rate = Math.round(this.minPoints * percent + this.minPoints);
                    }
                    this.game.phone.completeTodo("CROSS");
                    setTimeout(() => this.game.nextState(rate), 500);
                }
            };
        });
        this.inputs[0].focusCell(0);
        this.inputs[0].isFocused = true;
    }

    checkRate() {
        this.rate = this.minPoints;
        this.game.nextState(this.rate);
    }

    checkTime() {
        function leadingZero(number) {
            return number >= 10 ? number.toString() : '0' + number;
        }

        this.time -= 1000;
        let minutes = Math.floor(this.time / (60 * 1000));
        let seconds = this.time / 1000 - minutes * 60;
        this.timerText.setText(`${leadingZero(minutes)}:${leadingZero(seconds)}`);
    }

    shutdown() {
        clearTimeout(this.goTimer);
        this.inputs.forEach(input => input.destroy());
    }

    render() {

    }

    next() {
        this._gen.next();
    }
}