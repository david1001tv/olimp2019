/* globals __DEV__ */
import Phaser from 'phaser';


export default class IntroState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;

        this.camera.scale.setTo(5, 5);
        this.camera.x = 1128 * 5 - 1000;
        this.camera.y = 280 * 5 - 300;
        this.game.add.tween(this.camera).to({ x: 1128, y: 280 }, 5000).start();
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


        this.game.displayDialogLine('Маман', 'Доброго ранку синку! Тобі вже прийшов лист з університету?');
        yield;


        this.game.displayDialogLine('Ви', 'Так, мамо');
        yield;


        this.game.displayDialogLine('Маман', 'Ти вже обрав спеціальність? Син моєї подруги програміст, вже на першому курсі він отримував 1000$ щомісяця.');
        yield;


        this.game.displayDialogLine('Ви', 'Добре, мамо');
        yield;


        this.david.loadTexture('d-sits');
        this.game.add.tween(this.mom).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;


        this.game.displayDialogLine('Ви', 'Кожного дня працюю за комп’ютером. Справді добре було б покращити свої навички володіння їм.');
        yield;


        this.game.displayDialogLine('Ви', 'Вирішено. Поступлю на програміста.');
        yield;
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
        mom.aspectRatio = mom.width / mom.height;
        mom.height = 668;
        mom.width = mom.aspectRatio * mom.height;
        mom.alpha = 0;
        this.mom = mom;

        let david = this.game.add.image(1128, 280, 'd-sits');
        david.aspectRatio = david.width / david.height;
        david.height = 551;
        david.width = david.aspectRatio * david.height;
        this.david = david;

        let printer = this.game.add.image(284, 340, 'printer');
        printer.aspectRatio = printer.width / printer.height;
        printer.height = 178;
        printer.width = printer.aspectRatio * printer.height;



        // const bannerText = 'Phaser + ES6 + Webpack';
        // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
        //     font: '40px Bangers',
        //     fill: '#77BFA3',
        //     smoothed: false
        // });

        // banner.padding.set(10, 16);
        // banner.anchor.setTo(0.5);

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    render() {
        // if (__DEV__) {
        this.game.debug.spriteInfo(this.mom, 32, 32);
        // }
    }

    next() {
        this._gen.next();
    }
}
