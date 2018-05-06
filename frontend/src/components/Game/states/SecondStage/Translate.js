import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

export default class TranslateState extends Phaser.State {
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

    this.game.displayDialogLine('Альошин', 'Та не розумію я вас! Я у школі вивчав німецьку!', () => this.next());
    yield;

    this.alyoshin_1.alpha = 0;
    this.alyoshin_2.alpha = 1;
    this.game.displayDialogLine('Альошин', 'О, ти повернувся. Іди допоможи перекласти.', () => this.next());
    yield;

    this.game.camera.fade(0x000000, 1500, true);
    setTimeout(() => this.next(), 1500);
    yield;
    
}

init() {
    this._gen = this.gen();
    this.game.phone.clearTodos();
}

preload() {
    this.load.image('bg', './assets/images/2-2 (water)/bg-2-2a.png');
    this.load.image('alyoshin_1', './assets/images/2-3(indy)/alyoshin-4.png');
    this.load.image('alyoshin_2', './assets/images/2-3(indy)/alyoshin-3.png');
    this.load.image('indy', './assets/images/2-3(indy)/indian.png');
    this.load.image('notebook', './assets/images/2-2 (water)/hands-note.png');
}

create() {

    let bg = this.game.add.image(0, 0, 'bg');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;

    let alyoshin_1 = this.game.add.image(1310, 280, 'alyoshin_1');
    this.alyoshin_1 = alyoshin_1;
    smartSetHeight(alyoshin_1, 340);

    let alyoshin_2 = this.game.add.image(1310, 280, 'alyoshin_2');
    this.alyoshin_2 = alyoshin_2;
    this.alyoshin_2.alpha = 0;
    smartSetHeight(alyoshin_2, 300);

    let indian = this.game.add.image(1400, 285, 'indy');
    this.indian = indian;
    smartSetHeight(indian, 750);

    this.stage.disableVisibilityChange = true;
    this.next();
}

next() {
    this._gen.next();
}
}