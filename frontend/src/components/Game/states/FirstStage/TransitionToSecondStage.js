import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';


export default class TransitionToSecondStageState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 2000, true);
        setTimeout(() => this.next(), 2000);
        yield;


        this.game.displayDialogLine('Телефон', '*Пилик, пилик*', () => this.next());
        yield;


        // this.game.displayDialogLine('Ви', 'О, щось прийшло на пошту. Треба подивитися.', () => this.next());
        // yield;


        this.bgPhone.visible = true;
        this.mobile.visible = true;
        let continueText = this.game.add.text(1050, 975, 'Клацніть, щоб продовжити...', {
            align: 'center',
            font: 'Pangolin',
            fontSize: 70,
            fontStyle: 'italic',
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.game.input.onDown.add(() => {
            this.bgPhone.visible = false;
            this.mobile.visible = false;
            continueText.destroy();

            setTimeout(() => this.next(), 2000);
            this.game.input.onDown.removeAll();
        });
        yield;


        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        // let blackBg = this.game.add.graphics();
        // blackBg.beginFill(0x000000);
        // blackBg.drawRect(0, 0, this.game.width, this.game.height);
        // blackBg.endFill();
        //
        // this.game.camera.resetFX();

        // let laterText = this.game.add.text(this.world.centerX, this.world.centerY, 'Три тижні потому...', {
        //     align: 'center',
        //     font: 'Neucha',
        //     fontSize: 120,
        //     fontStyle: 'italic',
        //     fill: 'white',
        //     stroke: 'black',
        //     strokeThickness: 8,
        // });
        // laterText.anchor.setTo(0.5, 0.5);
        // laterText.alpha = 0;
        // this.game.add.tween(laterText).to({alpha: 1}, 2000, 'Linear', true, 0, 0, true)
        //     .yoyoDelay(2000)
        //     .onComplete.add(() => this.next());
        // yield;

        this.game.startState('Map');
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:09');
        this.game.phone.setDate('02.07.18');
    }

    preload() {
        this.load.image('bg', './assets/images/1-1(intro)/bg-1-1.png');
        this.load.image('pc', './assets/images/1-1(intro)/pc2.png');
        this.load.image('mom', './assets/images/1-1(intro)/mom.png');
        this.load.image('d-sits', './assets/images/1-1(intro)/d-sits.png');
        this.load.image('d-sits-turn', './assets/images/1-1(intro)/d-sits-turn.png');
        this.load.image('printer', './assets/images/1-1(intro)/printer.png');
        this.load.image('bg-phone', './assets/images/mobile/bg-phone.png');
        this.load.image('mobile', './assets/images/mobile/mobile2.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let pc = this.game.add.image(1123, 257, 'pc');
        smartSetHeight(pc, 212);

        let david = this.game.add.image(1128, 280, 'd-sits');
        smartSetHeight(david, 551);
        this.david = david;

        let printer = this.game.add.image(284, 340, 'printer');
        smartSetHeight(printer, 178);

        let bgPhone = this.game.add.image(882, 0, 'bg-phone');
        bgPhone.visible = false;
        this.bgPhone = bgPhone;

        let mobile = this.game.add.image(1277, 73, 'mobile');
        mobile.visible = false;
        smartSetHeight(mobile, 920);
        this.mobile = mobile;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }
}
