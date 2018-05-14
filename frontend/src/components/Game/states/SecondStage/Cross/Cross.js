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
        this.inputs[0].focusCell(0);
        this.inputs[0].isFocused = true;
    }

    create_input(x, y, lenght, empty) {
        let i;
        let word = [lenght];

        for (i = 0; i < lenght; i++) {
            x += 55;
            if (i == empty) {
                x += 55;
            }
            word[i] = this.game.add.inputField(x, y, {
                fillAlpha: 0,
                padding: 10,
                width: 25,
                fill: '#5700ff',
                font: '35px Pangolin',
                max: 1,
                placeHolder: 'Password',
            });
        }

        word.flag = false;

        let regEx = /[а-яА-ЯіІїЇєЄ]/;

        word.forEach(function (curr, index, first_word) {
            curr.domElement.element.onkeydown = function (e) {
                e.preventDefault();
                if (regEx.test(e.key)) {
                    curr.setText(e.key);
                    curr.startFocus();
                    if (first_word[index + 1] !== undefined) {
                        curr.endFocus();
                        first_word[index + 1].startFocus();
                    }
                }
                else if (e.keyCode == 8) {
                    curr.setText('');
                    curr.startFocus();
                    if (first_word[index - 1] !== undefined && this.flagBackspace === true) {
                        curr.endFocus();
                        first_word[index - 1].startFocus();
                    }
                    if (this.flagBackspace === true) {
                        this.flagBackspace = false;
                    }
                    else {
                        this.flagBackspace = true;
                    }
                }
            };
        });
        return word;
    }

    check_word(all, input_obj, str) {
        if (input_obj.map(e => e.value.toLowerCase()).join('') === str) {
            input_obj.isCorrect = true;
        }
        else {
            input_obj.isCorrect = false;
        }
        if (input_obj.isCorrect) {
            input_obj.ok.alpha = 1;
            input_obj.bad.alpha = 0;
            input_obj.flag = false;
            if (str === 'ураїни') {
                input_obj.ok.alpha = 1;
                input_obj.ok_small.alpha = 1;
                input_obj.bad_small.alpha = 0;
            }
        }
        else {
            if (!input_obj.flag || !this.flag_kiy) {
                input_obj.ok.alpha = 0;
                input_obj.bad.alpha = 1;
                if (str === 'ураїни') {
                    if (input_obj[input_obj.length - 1].value.toLowerCase() === 'и') {
                        input_obj.ok_small.alpha = 1;
                        input_obj.bad_small.alpha = 0;
                        this.flag_kiy = true;
                    }
                    else {
                        input_obj.ok_small.alpha = 0;
                        input_obj.bad_small.alpha = 1;
                    }
                }
                input_obj.flag = true;
            }
        }

        if (all.every(e => e.isCorrect)) {
            if ((this.time) / 1000 >= 330) this.rate = this.maxPoints;
            else {
                let percent = this.time / (7 * 60 * 1000);
                this.rate = Math.round(this.minPoints * percent + this.minPoints);
            }
            this.game.phone.completeTodo("CROSS");
            this.game.nextState(this.rate);
        }
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