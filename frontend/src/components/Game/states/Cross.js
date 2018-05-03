import Phaser from 'phaser';
import PhaserInput from 'phaser-input';

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
        this.game.plugins.add(PhaserInput.Plugin);
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let first_word = this.create_input(1050, 265, 4, 3);
        let second_word = this.create_input(1160, 325, 3, 1);
        let third_word = this.create_input(1110, 385, 5, 2);
        let fourth_word = this.create_input(1220, 435, 4, 0);
        let fifth_word = this.create_input(1110, 490, 5, 2);
        let sixth_word = this.create_input(1050, 550, 4, 3);
        let seventh_word = this.create_input(1170, 610, 6, 1);
        let eighth_word = this.create_input(1165, 665, 4, 1);

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

        word.forEach(function (curr, indx, first_word) {
            curr.domElement.element.addEventListener('keydown', function (e) {
                e.preventDefault();
                if (regEx.test(e.key)){
                    curr.setText(e.key);
                    curr.startFocus();
                    if (first_word[indx + 1] !== undefined) {
                        curr.endFocus();
                        first_word[indx + 1].startFocus();
                    }
                }
                else if(e.keyCode == 8){
                    curr.setText('');
                    curr.startFocus();
                    if(first_word[indx-1] !== undefined){
                        curr.endFocus();
                        first_word[indx-1].startFocus();
                    }
                }
            });
        });
        return word;
    }

    render() {
        // if (DEV) {

        // }
    }

    next() {
        this._gen.next();
    }
}