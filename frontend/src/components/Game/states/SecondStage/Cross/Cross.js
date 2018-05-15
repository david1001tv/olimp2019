import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import CrosswordInput from './CrosswordInput';

import {smartSetHeight} from '../../../utils';

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
        this.load.image('bg', './assets/images/2-1 (crossword)/bg-newspaper.png');
        this.load.image('ok', './assets/images/2-1 (crossword)/ok.png');
        this.load.image('bad', './assets/images/2-1 (crossword)/bad.png');
        this.load.image('square', './assets/images/2-1 (crossword)/square.png');
        this.game.plugins.add(PhaserInput.Plugin);
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

        this.inputs = [
            new CrosswordInput(1103, 278, 'груша', 4, this.game),
            new CrosswordInput(1216, 335, 'село', 2, this.game),
            new CrosswordInput(1158, 393, 'вовчок', 3, this.game),
            new CrosswordInput(1272, 450, 'чорна', 1, this.game),
            new CrosswordInput(1160, 506, 'енеїда', 3, this.game),
            new CrosswordInput(1103, 562, 'руїна', 4, this.game),
            new CrosswordInput(1216, 618, 'україни', 2, this.game),
            new CrosswordInput(1215, 676, 'козак', 2, this.game),
        ];
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