import Phaser from 'phaser';
import {smartSetHeight} from '../utils';


export default class Scanner extends Phaser.State {
    init() {
        this.activeDocument = null;
        this.isScanning = false;
    }

    preload() {
        this.load.image('bg', './assets/images/1-3 (printer)/bg-1-3.png');
        this.load.image('scanner', './assets/images/1-3 (printer)/epson.png');
        this.load.image('start-active', './assets/images/1-3 (printer)/start-active.png');
        this.load.image('start-passive', './assets/images/1-3 (printer)/start-passive.png');
        this.load.image('scanline', './assets/images/1-3 (printer)/scanline.png');

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
        this.count = 0;//count of scannings

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


        let eng = this.game.add.image(0, 940, 'eng-small');
        let photos = this.game.add.image(0, 940, 'photos-small');
        let pass = this.game.add.image(0, 940, 'pass-small');
        let war = this.game.add.image(0, 940, 'war-small');
        let zno = this.game.add.image(0, 940, 'zno-small');

        let docs = [eng, photos, pass, war, zno];
        this.docs = docs;
        let x = 50;
        for (let i = 0; i < docs.length; i++) {
            docs[i].x = docs[i].originalX = x;
            x += docs[i].width + 10;
        }

        docs.forEach((e) => {
            e.inputEnabled = true;
            e.input.useHandCursor = true;
            e.input.pixelPerfectOver = true;
            e.input.enableDrag(false, true, true, 1);
            e.events.onDragStart.add(this.handleDragStart, this);
        });

        this.stage.disableVisibilityChange = true;

        //this.next();
    }

    handleDragStart(document) {
        if (this.activeDocument !== document) {
            if (this.activeDocument !== null) {
                this.activeDocument.loadTexture(`${this.activeDocument.key.split('-')[0]}-small`);
                this.activeDocument.x = this.activeDocument.originalX;
                this.activeDocument.y = 940;
            }
            this.activeDocument = document;
            this.activeDocument.loadTexture(`${this.activeDocument.key.split('-')[0]}-big`);
            this.activeDocument.bringToTop();
        }
    }

    handleStartButtonClick() {
        if (!this.isScanning) {
            this.count++;//count of scannings

            this.isScanning = true;
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
        let scannerRectangle = new Phaser.Rectangle(149, 87, 1280, 809);

        if(this.activeDocument !== null) {
            this.activeDocument.isScanned = true;
            console.log(Phaser.Rectangle.containsRect(this.activeDocument.getBounds(), scannerRectangle));
        }
        else {
            console.log('Document isn\'t found.');
        }
        console.log('Count of scannings: ' + this.count);
        if(this.docs.every(e => e.isScanned)){
            if(this.count == 5){
                this.grade = 100;
            }
            else if(this.count <= 9){
                this.grade = 50;
            }
            this.next();
        }
    }

    next() {
        //this._gen.next();
    }
}
