import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';

export default class EndState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  
        
        this.game.displayDialogLine('Голос', 'Ви успішно закрили проект, який приніс чималий прибуток компанії. Керівництво не могло не відзначити Вашого внеску і старань. Так стрімко по кар\'єрних сходах ще ніхто не взлітав!', () => this.next());
        yield;

        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.warning).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                }, 3000);   
        });

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.firstWarning).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                }, 3000);   
        });

        this.game.displayDialogLine('Голос', 'IT-фахівець - найперспективніша професія в світі. Ні для кого не секрет, що заробітні плати IT-фахівців прив\'язані до долара. Кар\'єрне зростання прозоре і добре структуроване', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Як вже зазначалося, перед розробником відкриті всі дороги. Одна з яких - стати провідним розробником. Але це тільки одна. Можна стати фрілансером або відкрити власну компанію', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Тож прямуйте до свого успішного майбутнього!', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        this.answer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/4-4 (End)/background.png');
        this.load.image('warning_message', './assets/images/4-4 (End)/warning_message.png');
    }

    create() {

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(745, 80, 'Вітаємо! Ви здобули позицію Senior!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });

        this.firstWarning.alpha = 0;

        this.next();
    }

    next() {
        this._gen.next();
    }

}
