import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import todos from '../../todos/Scanner';
import SSF from '../../states/SecondStageFunctions';

export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Отримати диплом вдруге ще хвилююче, ніж вперше. І навіть якось сумно стає, Ви звикли до доброзичливих стін університету. Це був Ваш дім на довгі шість років, та будь-який дім колись стає частинкою минулого', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Але почуття гордості настигає та паморочить, варто лише отримати від Адама Вікторовича диплом магістру', () => this.next());
        yield;


        if (this.score >= 600){
            this.game.add.tween(this.master_red).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {
                    this.game.add.tween(this.master_blue).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                    this.next();
                }, 3000));
            this.game.add.tween(this.leftText).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.leftText).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
            }, 3000));
            this.game.add.tween(this.rightText).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.rightText).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
            }, 3000));
        }
        else {
            this.game.add.tween(this.master_blue).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {  
                    this.game.add.tween(this.master_blue).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                    this.next();
                }, 3000));
            this.game.add.tween(this.leftText).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.leftText).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
            }, 3000));
            this.game.add.tween(this.rightText).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.rightText).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
            }, 3000));
        }
        yield;

        this.game.displayDialogLine('Голос', 'Попереду чекає шлях ще більш захоплюючий та не менш складний. Шлях працевлаштування, та Ви вирушаєте далі з почуттям впевненості у своїх здібностях, знаючи собі ціну', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(0);
    }

    init() {
        //total score
        //800/600/80
        //Выбранные вариант в PostIntro, из бд: 0 - girl, 1 - man
        let choices = this.game.getChoice();
        choices.then(res => {
            this.friend = res.friend;
        });

        let history = this.game.getHistory();
        history.then(res => {
            res.forEach(state => {
                if (state.score) {
                    this.score += state.score;
                }
            });
        });

        let me = this.game.getMe();
        me.then(res => {
            this.me = res;
            this.leftText = this.game.add.text(575, 350, this.me.firstName + ' ' + this.me.lastName);
            this.leftText.alpha = 0;

            this.rightText = this.game.add.text(1100, 350, this.me.firstName + ' ' + this.me.lastName);
            this.rightText.alpha = 0;

            this.next();
        });

        this._gen = this.gen();

        this.game.phone.setEnabled(true);

    }

    preload() {

        this.load.image('bg', './assets/images/2-10 (Outro)/background.png');
        this.load.image('master_blue', './assets/images/2-10 (Outro)/master_blue.png');
        this.load.image('master_red', './assets/images/2-10 (Outro)/master_red.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.master_blue = this.SSF.makeImg(430, 100, 'master_blue', 1050, 750);
        this.master_red = this.SSF.makeImg(430, 100, 'master_red', 1050, 750);
    }

    next() {
        this._gen.next();
    }
}
