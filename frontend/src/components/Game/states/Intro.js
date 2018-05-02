import Phaser from 'phaser';
import {smartSetHeight} from '../utils';


export default class IntroState extends Phaser.State {
    * gen() {
        this.camera.scale.setTo(5, 5);
        this.camera.x = 1128 * 5;
        this.camera.y = 280 * 5 - 300;
        this.game.add.tween(this.camera).to({ x: -250, y: 0 }, 5000).start();
        this.game.add.tween(this.camera.scale).to({
            x: 1,
            y: 1,
        }, 5000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.david.loadTexture('d-sits-turn');
        this.game.add.tween(this.mom).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;


        this.game.displayDialogLine('Маман', 'Доброго ранку, синку! Тобі вже прийшов лист з університету?', () => this.next());
        yield;


        this.game.displayDialogLine('Ви', 'Так, мамо.', () => this.next());
        yield;


        this.game.displayDialogLine('Маман', 'Ти вже обрав спеціальність? Син моєї подруги програміст, вже на першому курсі він отримував 1000$ щомісяця.', () => this.next());
        yield;


        this.game.displayDialogLine('Ви', 'Добре, мамо.', () => this.next());
        yield;


        this.david.loadTexture('d-sits');
        this.game.add.tween(this.mom).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;


        this.game.displayDialogLine('Ви', 'Кожного дня працюю за комп’ютером. Справді добре було б покращити свої навички володіння їм.', () => this.next());
        yield;


        this.game.displayDialogLine('Ви', 'Вирішено! Поступлю на програміста.', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.state.start('Docs');
    }

    init() {
        this._gen = this.gen();
    }

    preload() {
        this.load.image('bg', './assets/images/1-1 (intro)/bg-1-1.png');
        this.load.image('mom', './assets/images/1-1 (intro)/mom.png');
        this.load.image('d-sits', './assets/images/1-1 (intro)/d-sits.png');
        this.load.image('d-sits-turn', './assets/images/1-1 (intro)/d-sits-turn.png');
        this.load.image('printer', './assets/images/1-1 (intro)/printer.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let mom = this.game.add.image(1612, 200, 'mom');
        smartSetHeight(mom, 668);
        mom.alpha = 0;
        this.mom = mom;

        let david = this.game.add.image(1128, 280, 'd-sits');
        smartSetHeight(david, 551);
        this.david = david;

        let printer = this.game.add.image(284, 340, 'printer');
        smartSetHeight(printer, 178);

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }
}
