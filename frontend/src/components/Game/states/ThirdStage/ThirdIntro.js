import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

export default class thirdIntroState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        
        this.game.displayDialogLine('Ви', 'Ледве встигаю, скоро дзвоник.', () => this.next());
        yield;

        this.setVisible(this.shadow);
        this.game.add.tween(this.bubbleGood).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;
        this.game.displayDialogLine('Бабця', 'О, це ти, розмуник! Бачу поступив. Після кросворду я не \
        сумнівалась у цьому.', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Дякую. Перепрошую, але я трохи поспішаю. Не хочу на пару \
        запізнитись.', () => this.next());
        yield;

        this.game.displayDialogLine('Бабця', 'А, добре, це ти вірно. І тепер нормально одягнений. Проходь.', () => this.next());
        yield;

        this.setVisible(this.shadow);
        this.game.add.tween(this.bubbleGood).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;
        this.game.displayDialogLine('Ви', 'Фух... Вже зараз буде дзвоник... А де ця клята аудиторія...?!', () => this.next());
        yield;
        
        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/2-1 (crossword)/bg-2-1.png');
        this.load.image('bubble', './assets/images/2-1 (crossword)/bubble-3.png');
        this.load.image('d-big', './assets/images/2-1 (crossword)/d-big.png');
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
        this.shadow.visible = false;

        this.bubbleGood = this.game.add.image(1220, 280, 'bubble');
        smartSetHeight(this.bubbleGood, 700);
        this.bubbleGood.alpha = 0;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }

    setVisible(obj){
        obj.visible = !obj.visible;
    }
}