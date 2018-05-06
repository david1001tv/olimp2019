import Phaser from 'phaser';
import {smartSetHeight} from '../utils';

export default class GrannyGoodState extends Phaser.State {
    * gen() {
        this.game.displayDialogLine('Бабця', ' Добре, дійсно розумний, але неохайний. Іншого разу приходь у нормальному вигляді. А зараз проходь.', () => this.next());
        yield;
        
        this.state.start('WaterAlyoshin');
    }

    init() {
        this._gen = this.gen();
    }

    preload() {
        this.load.image('bg', './assets/images/2-1 (crossword)/bg-2-1.png');
        this.load.image('bubble', './assets/images/2-1 (crossword)/bubble-3.png');
        this.load.image('d-big', './assets/images/2-1 (crossword)/d-big.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;  
        
        let david = this.game.add.image(45, 300, 'd-big');
        smartSetHeight(david, 830);

        let shadow = this.game.add.image(1285, 895, 'shadow');
        smartSetHeight(shadow, 100);
        let bubbleGood = this.game.add.image(1220, 280, 'bubble');
        smartSetHeight(bubbleGood, 700);

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }
}