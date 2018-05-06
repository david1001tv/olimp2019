import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';
import todos from '../../todos/Scanner';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;


        this.game.displayDialogLine('Ви', 'Тепер треба відсканувати всі документи', () => this.next());
        yield;

        this.game.input.enabled = true;
        this.game.phone.setEnabled(true);
        yield;


        this.game.displayDialogLine('Ви', 'Готово. Тепер потрібно зареєструватися на сайті університету.', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this.activeDocument = null;
        this.isScanning = false;
        this.count = 0;// Счётчик нажатий на кнопку сканирования

        this._gen = this.gen();

        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
    }

    preload() {

        this.load.image('bg', './assets/images/1-3 (printer)/bg-1-3.png');
        this.load.image('scanner', './assets/images/1-3 (printer)/epson.png');
        this.load.image('start-active', './assets/images/1-3 (printer)/start-active.png');
        this.load.image('start-passive', './assets/images/1-3 (printer)/start-passive.png');
        this.load.image('scanline', './assets/images/1-3 (printer)/scanline.png');
        this.load.image('checkmark', './assets/images/1-3 (printer)/checkmark.png');

        this.load.image('eng-big', './assets/images/1-3 (printer)/eng-big.png');
        this.load.image('photos-big', './assets/images/1-3 (printer)/photos-big.png');
        this.load.image('pass-big', './assets/images/1-3 (printer)/pass-big.png');
        this.load.image('war-big', './assets/images/1-3 (printer)/war-big.png');
        this.load.image('zno-big', './assets/images/1-3 (printer)/zno-big.png');

        this.load.image('eng-small', './assets/images/1-2 (point&click)/eng-small.png');
        this.load.image('photos-small', './assets/images/1-2 (point&click)/photos-small.png');
        this.load.image('pass-small', './assets/images/1-2 (point&click)/pass-small.png');
        this.load.image('war-small', './assets/images/1-2 (point&click)/war-small.png');
        this.load.image('zno-small', './assets/images/1-2 (point&click)/zno-small.png');
    }

    create() {

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;


        let scanline = this.game.add.image(143, 40, 'scanline');
        smartSetHeight(scanline, 890);
        this.scanline = scanline;

        let epson = this.game.add.image(52, 15, 'scanner');
        smartSetHeight(epson, 1020);

        let startButton = this.game.add.image(1500, 750, 'start-active');
        smartSetHeight(startButton, 117);
        startButton.inputEnabled = true;
        startButton.input.useHandCursor = true;
        startButton.events.onInputDown.add(this.handleStartButtonClick, this);
        this.startButton = startButton;


        let eng = this.game.add.image(0, INACTIVE_Y, 'eng-small');
        let photos = this.game.add.image(0, INACTIVE_Y, 'photos-small');
        let pass = this.game.add.image(0, INACTIVE_Y, 'pass-small');
        let war = this.game.add.image(0, INACTIVE_Y, 'war-small');
        let zno = this.game.add.image(0, INACTIVE_Y, 'zno-small');

        let docs = [eng, photos, pass, war, zno];
        let todoIds = ['SCAN_ENG', 'SCAN_PHOTO', 'SCAN_PASS', 'SCAN_WAR', 'SCAN_ZNO'];
        this.docs = docs;

        // Позиционирование доков
        let x = 50;
        docs.forEach((doc, index) => {
            doc.x = doc.originalX = x;
            x += doc.width + 10;

            doc.todoId = todoIds[index];

        });

        docs.forEach((e) => {
            e.inputEnabled = true;
            e.input.useHandCursor = true;
            e.input.pixelPerfectOver = true;
            e.input.enableDrag(false, true, true, 1);
            e.events.onDragStart.add(this.handleDragStart, this);
        });

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    activateDocument(doc) {
        this.activeDocument = doc;
        doc.loadTexture(`${doc.key.split('-')[0]}-big`);
        doc.bringToTop();
    }

    deactivateDocument(doc) {
        doc.loadTexture(`${doc.key.split('-')[0]}-small`);
        doc.x = doc.originalX;
        doc.y = INACTIVE_Y;
    }

    handleDragStart(doc) {
        if (this.activeDocument !== doc) {
            if (this.activeDocument !== null) {
                this.deactivateDocument(this.activeDocument);
            }
            this.activateDocument(doc);
        }
    }

    handleStartButtonClick() {
        if (!this.isScanning) {
            this.count++;

            this.isScanning = true;
            this.game.input.enabled = false;
            this.startButton.loadTexture('start-passive');

            let forthTween = this.game.add.tween(this.scanline).to({
                x: 1455,
            }, 1000);
            let backTween = this.game.add.tween(this.scanline).to({
                x: this.scanline.x,
            }, 500);
            backTween.onComplete.add(this.handleScanEnd, this);

            forthTween.chain(backTween);
            forthTween.start();
        }
    }

    handleScanEnd() {
        this.isScanning = false;
        this.game.input.enabled = true;
        this.startButton.loadTexture('start-active');


        let scannerRectangle = new Phaser.Rectangle(149, 87, 1280, 809);
        const {activeDocument} = this;

        if (this.activeDocument !== null) {
            // Проверка на успешное сканирование
            if (Phaser.Rectangle.containsRect(activeDocument.getBounds(), scannerRectangle)) {
                activeDocument.isScanned = true;
                this.deactivateDocument(activeDocument);
                activeDocument.inputEnabled = false;

                let checkmark = this.game.add.image(activeDocument.originalX + 10, INACTIVE_Y, 'checkmark');
                smartSetHeight(checkmark, 50);

                this.game.phone.completeTodo(activeDocument.todoId);

                this.activeDocument = null;
            } else {
                this.game.displayDialogLine('Ви', 'Ой, щось кривувато вийшло. Спробую ще раз');
            }
        }

        if (this.docs.every(e => e.isScanned)) {
            if (this.count === 5) {
                this.grade = 100;
            }
            else if (this.count <= 9) {
                this.grade = Math.round(40 / (this.count - 5)) + 50;
            }
            else {
                this.grade = 50;
            }
            this.next();
        }
    }

    next() {
        this._gen.next();
    }
}
