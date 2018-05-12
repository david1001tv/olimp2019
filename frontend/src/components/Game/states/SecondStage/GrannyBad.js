import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

export default class GrannyBadState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;
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

        this.game.displayDialogLine('Підказка', 'На другому етапі від правильності виконання кожного квесту залежить ваш бал здачі ЗНО. Будьте уважні.', () => this.next());
        yield;

        let shadow = this.game.add.image(1285, 895, 'shadow');
        smartSetHeight(shadow, 100);
        let bubbleOne = this.game.add.image(1220, 280, 'bubble-1');
        smartSetHeight(bubbleOne, 700);
        this.game.displayDialogLine('Бабця', 'А ну стій. Куди?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Я… цей… абітурієнт…', () => this.next());
        yield;

        this.game.displayDialogLine('Бабця', 'Бачила я вас таких “абітурієнтів”. Чому у шортах прийшов? У нас тут навчальний заклад, а не пляж!', () => this.next());
        yield;

        let hand = this.game.add.image(840,800, 'd-hand');
        smartSetHeight(hand, 380);
        this.game.displayDialogLine('Ви', 'Літо… Спекотно… Я й подумав, що краще буде вдягти…', () => this.next());
        yield;

        bubbleOne.destroy();
        let bubbleTwo = this.game.add.image(1200, 250, 'bubble-2');
        smartSetHeight(bubbleTwo, 730);
        this.game.displayDialogLine('Бабця', 'Подумав він! Раз такий розумний допоможи розгадати кросворд.', () => this.next());
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
        this.load.image('bubble-1', './assets/images/2-1 (crossword)/bubble-1.png');
        this.load.image('bubble-2', './assets/images/2-1 (crossword)/bubble-2.png');
        this.load.image('d-big', './assets/images/2-1 (crossword)/d-big.png');
        this.load.image('d-hand', './assets/images/2-1 (crossword)/d-hand.png');
        this.load.image('shadow', './assets/images/2-1 (crossword)/shadow.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;  
        
        let david = this.game.add.image(45, 300, 'd-big');
        smartSetHeight(david, 830);

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }
}