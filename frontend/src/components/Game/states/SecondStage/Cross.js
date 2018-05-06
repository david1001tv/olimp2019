import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import {smartSetHeight} from '../../utils';

export default class CrossState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;
        this.camera.x = 1128;
        this.camera.y = 280;
        this.game.add.tween(this.camera.scale).to({
            x: 1,
            y: 1,
        }, 3000).start().onComplete.add(() => {
            this.next();
        });
        this.game.camera.flash(0x000000, 3000, true);
        yield;
    }

    init() {
        this._gen = this.gen();
        this.time = 7*60*1000;
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
        this.game.plugins.add(PhaserInput.Plugin);
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.flag_kiy = false;
        this.flagBackspace = false;

        let first_word = this.create_input(1050, 270, 4, 3);
        first_word.coord_x = 1390;
        first_word.coord_y = 275;

        let second_word = this.create_input(1163, 330, 3, 1);
        second_word.coord_x = 1450;
        second_word.coord_y = 330;

        let third_word = this.create_input(1110, 388, 5, 2);
        third_word.coord_x = 1510;
        third_word.coord_y = 385;

        let fourth_word = this.create_input(1220, 445, 4, 0);
        fourth_word.coord_x = 1570;
        fourth_word.coord_y = 445;

        let fifth_word = this.create_input(1110, 502, 5, 2);
        fifth_word.coord_x = 1500;
        fifth_word.coord_y = 510;
        
        let sixth_word = this.create_input(1050, 560, 4, 3);
        sixth_word.coord_x = 1390;
        sixth_word.coord_y = 565;
        
        let seventh_word = this.create_input(1165, 618, 6, 1);
        seventh_word.coord_x = 1630;
        seventh_word.coord_y = 630;
        
        let eighth_word = this.create_input(1165, 675, 4, 1);
        eighth_word.coord_x = 1500;
        eighth_word.coord_y = 690;

        this.timerText = this.game.add.text(32, 32, '');
        this.rateText = this.game.add.text(32, 64, '');

        this.check_word_func = this.check_word;

        let cross_words = [first_word, second_word, third_word, fourth_word, fifth_word, sixth_word, seventh_word, eighth_word];
        let correct_words = ['груа', 'сло', 'вочок', 'орна', 'енїда', 'руїа', 'ураїни', 'кзак'];

        cross_words.forEach((curr, index, cross_words) => {
            curr.forEach((elem, i, curr) => {
                elem.domElement.element.addEventListener('keyup', () => this.check_word(cross_words, curr, correct_words[index]));
            });
            curr.ok = this.game.add.image(curr.coord_x, curr.coord_y, 'ok');
            curr.bad = this.game.add.image(curr.coord_x, curr.coord_y, 'bad');
            if(correct_words[index] === 'ураїни'){
                curr.bad_small = this.game.add.image(1570, 750, 'bad');
                smartSetHeight(curr.bad_small, 40);
                curr.bad_small.alpha = 0;

                curr.ok_small = this.game.add.image(1570, 750, 'ok');
                smartSetHeight(curr.ok_small, 40);
                curr.ok_small.alpha = 0;
            }
            smartSetHeight(curr.ok, 40);
            smartSetHeight(curr.bad, 40);
            curr.ok.alpha = 0;
            curr.bad.alpha = 0;
        });

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    create_input(x, y, lenght, empty){
        let i;
        let word = [lenght];

        for(i = 0; i < lenght; i++){
            x += 55;
            if(i == empty){
                x += 55;
            }
            word[i] = this.game.add.inputField(x, y, {
                fillAlpha: 0,
                padding: 10,
                width: 25,
                fill: '#5700ff',
                font: '35px Pangolin',
                max: 1
            });
        }

        word.flag = false;

        let regEx = /[а-яА-ЯіІїЇєЄ]/;

        word.forEach(function (curr, index, first_word) {
            curr.domElement.element.addEventListener('keydown', function (e) {
                e.preventDefault();
                if (regEx.test(e.key)){
                    curr.setText(e.key);
                    curr.startFocus();
                    if (first_word[index + 1] !== undefined) {
                        curr.endFocus();
                        first_word[index + 1].startFocus();
                    }
                }
                else if(e.keyCode == 8){
                    curr.setText('');
                    curr.startFocus();
                    if(first_word[index-1] !== undefined && this.flagBackspace === true){
                        curr.endFocus();
                        first_word[index-1].startFocus();
                    }
                    if(this.flagBackspace === true){
                        this.flagBackspace = false;
                    }
                    else {
                        this.flagBackspace = true;
                    }
                }
            });
        });
        return word;
    }

    check_word(all, input_obj, str) {
        if(input_obj.map(e => e.value.toLowerCase()).join('') === str){
            input_obj.isCorrect = true;
        }
        else {
            input_obj.isCorrect = false;
        }
        if(input_obj.isCorrect){
            input_obj.ok.alpha = 1;
            input_obj.bad.alpha = 0;
            input_obj.flag = false;
            if(str === 'ураїни'){
                input_obj.ok.alpha = 1;
                input_obj.ok_small.alpha = 1;
                input_obj.bad_small.alpha = 0;
            }
        }
        else {
            if(!input_obj.flag || !this.flag_kiy){
                input_obj.ok.alpha = 0;
                input_obj.bad.alpha = 1;
                if(str === 'ураїни'){
                    if(input_obj[input_obj.length - 1].value.toLowerCase() === 'и'){
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

        if(all.every(e => e.isCorrect)){
            if((this.time)/1000 >= 330) this.rate = this.maxPoints;
            else {
                let percent = this.time / (7 * 60 * 1000);
                this.rate = Math.round(this.minPoints * percent + this.minPoints);
            }
            this.rateText.setText(this.rate);
            this.state.start('GrannyGood');
        }
    }

    checkRate() {
        this.rate = this.minPoints;
        next();
    }

    checkTime(){
        function leadingZero(number) {
            return number >= 10 ? number.toString() : '0' + number;
        }
        this.time -= 1000;
        let minutes = Math.floor(this.time / (60*1000));
        let seconds = this.time / 1000 - minutes * 60;
        this.timerText.setText(`${leadingZero(minutes)}:${leadingZero(seconds)}`);
    }

    render() {

    }

    next() {
        this._gen.next();
    }
}