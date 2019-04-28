import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';


export default class docsToScanState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Ви', 'Щоб відсканувати документи мені потрібен МФУ.', () => this.next());
        yield;

        this.game.phone.setEnabled(true);
        this.scanner.inputEnabled = true;
        this.scanner.input.useHandCursor = true;
        this.scanner.events.onInputDown.add(function() {
            this.game.phone.completeTodo(this.scanner.todoId);
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
            id: "FIND_SCANNER",
            text: "Знайти сканер"
        });
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:06');
        this.game.phone.setDate('02.07.18');
    }

    preload() {
        this.load.image('bg', './assets/images/1-1(intro)/bg-1-1.png');

        this.load.image('d-right', './assets/images/1-2 (point&click)/d-right.png');
        this.load.image('scanner', './assets/images/1-1(intro)/printer.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let david = this.game.add.image(1300, 250, 'd-right');
        smartSetHeight(david, 650);

        let scanner = this.game.add.image(290, 340, 'scanner');
        smartSetHeight(scanner, 180);
        scanner.todoId = "FIND_SCANNER";
        this.scanner = scanner;
        
        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }
}
