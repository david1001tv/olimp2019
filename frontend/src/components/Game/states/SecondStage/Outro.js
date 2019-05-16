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
        this.score = 800;

        this._gen = this.gen();

        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');

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

        this.next();
    }

    next() {
        this._gen.next();
    }
}
