/* globals __DEV__ */
import Phaser from 'phaser';


export default class IntroState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;
        // this.camera.scale.setTo(5, 5);
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


        this.game.add.tween(this.mom).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.In)
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
    }

    init() {
        this._gen = this.gen();
    }

    preload() {
        this.load.image('bg', './assets/images/quest-bg1.png');
        this.load.image('mom', './assets/images/mom.png');
        this.load.image('d-sits', './assets/images/d-sits.png');
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
