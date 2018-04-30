import Phaser from 'phaser';

export default class Scanner extends Phaser.State {
    init() {
        this.activeDocument = null;

    }

    preload() {
        this.load.image('bg', './assets/images/1-3 (printer)/bg-1-3.png');
        this.load.image('start-active', './assets/images/1-3 (printer)/start-active.png');
        this.load.image('start-passive', './assets/images/1-3 (printer)/start-passive.png');

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


        let startButton = this.game.add.image(1500, 750, 'start-active');
        startButton.inputEnabled = true;
        startButton.input.useHandCursor = true;
        startButton.aspectRatio = startButton.width / startButton.height;
        startButton.height = 117;
        startButton.width = startButton.aspectRatio * startButton.height;

        let eng = this.game.add.image(0, 940, 'eng-small');
        let photos = this.game.add.image(0, 940, 'photos-small');
        let pass = this.game.add.image(0, 940, 'pass-small');
        let war = this.game.add.image(0, 940, 'war-small');
        let zno = this.game.add.image(0, 940, 'zno-small');

        let group = this.game.add.group();

        //group.align(1, 5, 100, 100, Phaser.CENTER);

        let arr = [eng, photos, pass, war, zno];
        let x = 50;
        for (let i = 0; i < arr.length; i++) {
            arr[i].x = arr[i].originalX = x;
            x += arr[i].width + 10;
        }

        group.addMultiple(arr);
        group.forEach((e) => {
            console.log(arguments);
            e.inputEnabled = true;
            e.input.useHandCursor = true;
            e.input.enableDrag();
            e.events.onDragStart.add(this.handleDragStart, this)

        });

        this.game.physics.arcade.overlap(eng, zno, () => console.log('overlap'), null, this);



        this.stage.disableVisibilityChange = true;

        this.next();
    }

    handleDragStart(document) {
        console.log(document);
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

    handleDragEnd() {

    }

    next() {
        //this._gen.next();
    }
}
