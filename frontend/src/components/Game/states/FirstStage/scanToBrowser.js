import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';


export default class scanToBrowserState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Ви', 'Мені потрібен комп\'ютер, щоб зареєструватись та почитати \
        щось про ВУЗ чи кафедру.', () => this.next());
        yield;

        this.game.phone.setEnabled(true);
        this.pc.inputEnabled = true;
        this.pc.input.useHandCursor = true;
        this.pc.events.onInputDown.add(function() {
            this.game.phone.completeTodo(this.pc.todoId);
            this.next();
        }, this);
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: "FIND_PC",
            text: "Сісти за комп\'ютер"
        });
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:10');
        this.game.phone.setDate('02.07.18');
    }

    preload() {
        this.load.image('bg', './assets/images/1-1 (intro)/bg-1-1.png');

        this.load.image('d-right', './assets/images/1-2 (point&click)/d-right.png');
        this.load.image('scanner', './assets/images/1-1 (intro)/printer.png');
        this.load.image('pc', './assets/images/1-1 (intro)/pc2.png');
        this.load.image('chair', './assets/images/1-1 (intro)/chair.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let pc = this.game.add.image(1135, 278, 'pc');
        smartSetHeight(pc, 190);
        pc.todoId = "FIND_PC";
        this.pc = pc;

        let scanner = this.game.add.image(290, 340, 'scanner');
        smartSetHeight(scanner, 180);

        let david = this.game.add.image(100, 250, 'd-right');
        smartSetHeight(david, 650);

        let chair = this.game.add.image(1100, 500, 'chair');
        smartSetHeight(chair, 400);
        
        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }
}
