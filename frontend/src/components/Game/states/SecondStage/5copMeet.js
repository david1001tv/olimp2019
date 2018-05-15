import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

export default class GrannyBadState extends Phaser.State {
    * gen() {
        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.game.displayDialogLine('Ви', 'Фух, здається встиг. Майже друга. ', () => this.next());
        yield;

        this.shadow.alpha = 1;
        this.game.add.tween(this.fivecopQuite).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;

        this.fivecopQuite.alpha = 0;
        this.fivecopTalk.alpha = 1;
        this.game.displayDialogLine('П\'ятикоп О.Є.', 'Доброго дня! Мене звуть П\'ятикоп Олена Євгенівна. \
        Я викладач кафедри Комп\'ютерних наук. Зараз хочу вам запропонувати пройти зі мною, подивитись де \
        знаходиться кафедра та познайомитись з викладачами.', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Доброго дня! Так, я залюбки.', () => this.next());
        yield;

        this.game.displayDialogLine('П\'ятикоп О.Є.', 'Тоді ходімо, тільки не відставайте, бо для абітурієнтів завжди \
        важко орієнтуватись у нашому ВУЗі. Він для них немов лабіринт.', () => this.next());
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('13:58');
        this.game.phone.setDate('21.07.18');
    }

    preload() {
        this.load.image('bg', './assets/images/2-1 (crossword)/bg-2-1.png');
        this.load.image('d-big', './assets/images/2-1 (crossword)/d-big.png');

        this.load.image('fivecop-1', './assets/images/2-4 (proffs)/fivecop-1.png');
        this.load.image('fivecop-2', './assets/images/2-4 (proffs)/fivecop-2.png');
        this.load.image('shadow', './assets/images/2-1 (crossword)/shadow.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;  
        
        let david = this.game.add.image(45, 300, 'd-big');
        smartSetHeight(david, 830);

        this.shadow = this.game.add.image(1285, 895, 'shadow');
        smartSetHeight(this.shadow, 100);
        this.shadow.alpha = 0;

        this.fivecopQuite = this.game.add.image(1280, 180, 'fivecop-2')
        smartSetHeight(this.fivecopQuite, 800);
        this.fivecopQuite.alpha = 0;

        this.fivecopTalk = this.game.add.image(1280, 180, 'fivecop-1');
        smartSetHeight(this.fivecopTalk, 800);
        this.fivecopTalk.alpha = 0;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }
}