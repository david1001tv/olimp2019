import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';


export default class WaterState extends Phaser.State {
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

        this.game.displayDialogLine('Ви', 'Яка довжезна черга!', () => this.next());
        yield;

        this.alyoshin.alpha = 0;
        let alyoshin_2 = this.game.add.image(1280, 273, 'alyoshin-2');
        smartSetHeight(alyoshin_2, 305);
        this.game.displayDialogLine('Альошин', 'Гей, ти! Ти абітурієнт? Я голова прийомної комісії, реєструю лише VIP-клієнтів.', () => this.next());
        yield;

        let alyoshinCoffe = this.game.add.image(1180, 280, 'alyoshin-coffe');
        smartSetHeight(alyoshinCoffe, 110);
        this.game.displayDialogLine('Альошин', 'В мене закінчилась вода для кави. Ось тримай 5 гривень, збігай набери води. А я прийму твої документи без черги.', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Гаразд, я швидко.', () => this.next());
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
    }

    preload() {
        this.load.image('bg', './assets/images/2-2 (water)/bg-2-2a.png');
        this.load.image('alyoshin', './assets/images/2-2 (water)/alyoshin-1.png');
        this.load.image('alyoshin-2', './assets/images/2-2 (water)/alyoshin-2.png');
        this.load.image('alyoshin-coffe', './assets/images/2-2 (water)/alyoshin-coffe.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let alyoshin = this.game.add.image(1280, 253, 'alyoshin');
        this.alyoshin = alyoshin;
        smartSetHeight(alyoshin, 326);

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }
}
