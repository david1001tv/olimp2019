import Phaser from 'phaser';
import InputComponent from './InputComponent';
import autobind from 'autobind-decorator';

const tagsForMaket = {
    header: ['html', 'head', 'title'],
    nav: ['html', 'head', 'title', 'nav', 'section'],
    logo: ['html', 'head', 'title', 'nav', 'section', 'a', 'img'],
    'body-1': ['html', 'body', 'content'],
    'body-2': ['html', 'body', 'content', 'div'],
    footer: ['html', 'footer', 'script']
};

export default class TagsState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.phone.setEnabled(true);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/tags/bg.png');
        this.load.image('header', './assets/images/tags/header.png');
        this.load.image('nav', './assets/images/tags/nav.png');
        this.load.image('logo', './assets/images/tags/logo.png');
        this.load.image('body-1', './assets/images/tags/body-1.png');
        this.load.image('body-2', './assets/images/tags/body-2.png');
        this.load.image('footer', './assets/images/tags/footer.png');
        this.load.image('input', './assets/images/tags/input.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.inputs = [
            new InputComponent(1224, 220, 1234, 863, 'html', bg, this.game),
            new InputComponent(1238, 240, 1248, 320, 'head', bg, this.game),
            new InputComponent(1262, 261, 1550, 261, 'title', bg, this.game),
            new InputComponent(1240, 340, 1249, 843, 'body', bg, this.game),
            new InputComponent(1255, 360, 1265, 521, 'section', bg, this.game),
            new InputComponent(1267, 381, 1279, 501, 'nav', bg, this.game),
            new InputComponent(1285, 401, 3000, 3000, 'a', bg, this.game),
            new InputComponent(1300, 423, 3000, 3000, 'img', bg, this.game),
            new InputComponent(1253, 582, 1262, 623, 'content', bg, this.game),
            new InputComponent(1270, 603, 1480, 603, 'div', bg, this.game),
            new InputComponent(1255, 643, 1262, 820, 'footer', bg, this.game),
            new InputComponent(1272, 705, 1280, 760, 'script', bg, this.game)
        ];

        document.addEventListener('keyup', this.handleKeyUp);

        this.next();
    }

    @autobind
    handleKeyUp(e) {
        for (let key in tagsForMaket) {
            let count = 0;
            tagsForMaket[key].forEach(e => {
                this.inputs.forEach(input => {
                    if (input.tag === e && input.input.disabled) {
                        count++;
                    }
                });
            });
            if (count === tagsForMaket[key].length) {
                this.addComponent(key);
                delete tagsForMaket[key];
            }
        }
        console.log(Object.keys(tagsForMaket).length);
        if (!Object.keys(tagsForMaket).length) {
            this.game.nextState(0);
        }
    }

    addComponent(key) {
        switch (key) {
            case 'header':
                this.game.add.image(135, 160, key);
                return;
            case 'nav':
                this.game.add.image(530, 190, key);
                return;
            case 'logo':
                this.game.add.image(150, 160, key);
                return;
            case 'body-1':
                let body = this.game.add.image(132, 252, key);
                body.width += 4;
                return;
            case 'body-2':
                this.game.add.image(135, 500, key);
                return;
            case 'footer':
                let footer = this.game.add.image(132, 760, key);
                footer.width += 4;
                return;
        }
    }

    next() {
        this._gen.next();
    }
}
