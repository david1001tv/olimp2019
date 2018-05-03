import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import {smartSetHeight} from '../utils';

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

        this.flag = false;

        let first_word = this.create_input(1050, 265, 4, 3);
        first_word.coord_x = 1390;
        first_word.coord_y = 275;

        let second_word = this.create_input(1160, 325, 3, 1);
        second_word.coord_x = 1450;
        second_word.coord_y = 330;

        let third_word = this.create_input(1110, 385, 5, 2);
        third_word.coord_x = 1510;
        third_word.coord_y = 385;

        let fourth_word = this.create_input(1220, 435, 4, 0);
        fourth_word.coord_x = 1570;
        fourth_word.coord_y = 445;

        let fifth_word = this.create_input(1110, 490, 5, 2);
        fifth_word.coord_x = 1500;
        fifth_word.coord_y = 510;
        
        let sixth_word = this.create_input(1050, 550, 4, 3);
        sixth_word.coord_x = 1390;
        sixth_word.coord_y = 565;
        
        let seventh_word = this.create_input(1170, 610, 6, 1);
        seventh_word.coord_x = 1630;
        seventh_word.coord_y = 630;
        
        let eighth_word = this.create_input(1165, 665, 4, 1);
        eighth_word.coord_x = 1500;
        eighth_word.coord_y = 690;

        this.check_word_func = this.check_word;

        let cross_words = [first_word, second_word, third_word, fourth_word, fifth_word, sixth_word, seventh_word, eighth_word];
        let correct_words = ['груа', 'сло', 'вочок', 'орна', 'енїда', 'руїа', 'ураїни', 'кзак'];

        cross_words.forEach((curr, index, cross_words) => {
            curr.forEach((elem, i, curr) => {
                elem.domElement.element.addEventListener('keyup', () => this.check_word(cross_words, curr, correct_words[index], curr.coord_x, curr.coord_y));
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
                padding: 12,
                width: 25,
                fill: '#5700ff',
                font: '40px Pangolin',
                max: 1
            });
        }

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
                    if(first_word[index-1] !== undefined){
                        curr.endFocus();
                        first_word[index-1].startFocus();
                    }
                }
            });
        });
        return word;
    }

    check_word(all, input_obj, str, x, y) {
        input_obj.forEach(function(curr, index, input_obj) {
            if(curr.value.toLowerCase() === str[index]) {
                curr.isCorrect = true;
            }
            else {
                curr.isCorrect = false;
            }
        })
        if(input_obj.every(e => e.isCorrect)){
            input_obj.isCorrect = true;
            input_obj.ok.alpha = 1;
            input_obj.bad.alpha = 0;
            this.flag = false;
            if(str === 'ураїни'){
                input_obj.ok.alpha = 1;
                input_obj.ok_small.alpha = 1;
                input_obj.bad_small.alpha = 0;
            }
        }
        else {
            input_obj.isCorrect = false;
            if(!this.flag){
                input_obj.ok.alpha = 0;
                input_obj.bad.alpha = 1;
                if(str === 'ураїни'){
                    input_obj.ok.alpha = 0;
                    input_obj.ok_small.alpha = 0;
                    input_obj.bad_small.alpha = 1;
                }
                this.flag = true;
            }
        }
        if(all.every(e => e.isCorrect)){
            /*TODO: grade*/ 
        }
    }

    render() {
        // if (DEV) {

        // }
    }

    next() {
        this._gen.next();
    }
}