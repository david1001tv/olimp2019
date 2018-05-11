import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

const ARROWS_BOTTOM = 950;
const STATIC_ARROWS_TOP = 100;
const ARROWS_LEFT = 100;
const ARROWS_SIDE_PADDING = 30;
const ARROW_SIZE = 150;

const LEFT_ARROW = 0;
const UP_ARROW = 1;
const DOWN_ARROW = 2;
const RIGHT_ARROW = 3;


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let rotation = [
    -90,
    0,
    180,
    90
];

class Hand {
    constructor(verticalFrame, changingFrame, horizontalFrame) {
        this.activeFrame = verticalFrame;
        this.verticalFrame = verticalFrame;
        this.changingFrame = changingFrame;
        this.horizontalFrame = horizontalFrame;

        [...arguments].forEach(e => {
            e.visible = false;
        });

        this.activeFrame.visible = true;
    }

    moveToVertical() {
        if (this.activeFrame !== this.verticalFrame) {
            this.activeFrame = this.verticalFrame;
            this.horizontalFrame.visible = false;
            this.changingFrame.visible = true;
            setTimeout(() => {
                this.verticalFrame.visible = true;
                this.changingFrame.visible = false
            }, 50);
        }
    }

    moveToHorizontal() {
        if (this.activeFrame !== this.horizontalFrame) {
            this.activeFrame = this.horizontalFrame;
            this.verticalFrame.visible = false;
            this.changingFrame.visible = true;
            setTimeout(() => {
                this.horizontalFrame.visible = true;
                this.changingFrame.visible = false
            }, 50);
        }
    }
}

export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;


        this.game.input.enabled = true;
        yield;


        this.game.nextState();
    }

    constructor() {
        super();

        this.score = 50;
    }

    init() {
        this.activeDocument = null;

        this._gen = this.gen();

        this.game.phone.setEnabled(false);
    }

    preload() {
        this.load.image('bg', './assets/images/3-4(final)/bg-3-4.png');
        this.load.image('scorebar', './assets/images/3-4(final)/scorebar.png');
        this.load.image('rector', './assets/images/3-4(final)/rector.png');
        this.load.image('d-head', './assets/images/3-4(final)/d-head.png');
        this.load.image('d-body', './assets/images/3-4(final)/d-body.png');
        this.load.image('d-shadow', './assets/images/3-4(final)/d-shadow.png');
        this.load.image('d-righthand-right', './assets/images/3-4(final)/d-righthand-right.png');
        this.load.image('d-righthand-down', './assets/images/3-4(final)/d-righthand-down.png');
        this.load.image('d-righthand-changing', './assets/images/3-4(final)/d-righthand-changing.png');
        this.load.image('d-lefthand-left', './assets/images/3-4(final)/d-lefthand-left.png');
        this.load.image('d-lefthand-changing', './assets/images/3-4(final)/d-lefthand-changing.png');
        this.load.image('d-lefthand-top', './assets/images/3-4(final)/d-lefthand-top.png');
        this.load.image('arrow', './assets/images/3-4(final)/arrow.png');
        this.load.image('arrow-button-pressed', './assets/images/3-4(final)/arrow-button-pressed.png');
        this.load.image('arrow-button-released', './assets/images/3-4(final)/arrow-button-released.png');
        this.game.load.atlasJSONHash('d-legs', './assets/images/3-4(final)/legs.png', './assets/images/3-4(final)/legs.json');
        this.game.load.atlasJSONHash('d-righthand', './assets/images/3-4(final)/hand-sprites.png', './assets/images/3-4(final)/hand-sprites.json');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');

        this.game.add.image(823, 933, 'd-shadow');
        let legs = this.game.add.sprite(807, 700, 'd-legs', 'd-legs-up');

        this.game.add.image(871, 488, 'd-body');
        this.game.add.image(900, 367, 'd-head');

        this.scoreBar = this.game.add.sprite(1673, 65, 'scorebar');
        this.scoreRect = new Phaser.Rectangle(1673, 65 + this.score, 100, this.score);
        // this.scoreBar.crop(this.scoreRect);


        legs.animations.add('dance');
        legs.animations.play('dance', 3, true);


        this.staticArrows = [];
        this.activeArrows = [[], [], [], []];

        for (let i = 0; i < 4; i++) {
            let staticArrow = this.game.add.image(ARROWS_LEFT + i * (ARROW_SIZE + ARROWS_SIDE_PADDING), STATIC_ARROWS_TOP, 'arrow-button-released');
            staticArrow.anchor.setTo(0.5, 0.5);
            staticArrow.angle = rotation[i];
            this.staticArrows.push(staticArrow);
        }

        // let rector = this.game.add.image(830, 155, 'rector');
        // smartSetHeight(rector, 830);


        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.sendArrow();


        this.rightHand = new Hand(
            this.game.add.image(915, 516, 'd-righthand-down'),
            this.game.add.image(966, 464, 'd-righthand-changing'),
            this.game.add.image(1013, 411, 'd-righthand-right'),
        );

        this.leftHand = new Hand(
            this.game.add.image(802, 381, 'd-lefthand-top'),
            this.game.add.image(800, 393, 'd-lefthand-changing'),
            this.game.add.image(829, 426, 'd-lefthand-left'),
        );

        this.cursors.left.onDown.add(e => this.handleKeyDown(LEFT_ARROW));
        this.cursors.up.onDown.add(e => this.handleKeyDown(UP_ARROW));
        this.cursors.down.onDown.add(e => this.handleKeyDown(DOWN_ARROW));
        this.cursors.right.onDown.add(e => this.handleKeyDown(RIGHT_ARROW));

        this.cursors.left.onUp.add(e => this.handleKeyUp(LEFT_ARROW));
        this.cursors.up.onUp.add(e => this.handleKeyUp(UP_ARROW));
        this.cursors.down.onUp.add(e => this.handleKeyUp(DOWN_ARROW));
        this.cursors.right.onUp.add(e => this.handleKeyUp(RIGHT_ARROW));

        this.staticArrows.forEach((e, index) => {
            e.inputEnabled = true;
            e.events.onInputDown.add(() => this.handleKeyDown(index));
            e.events.onInputUp.add(() => this.handleKeyUp(index));
        });

        this.next();
    }


    handleKeyDown(index) {
        let staticArrow = this.staticArrows[index];
        let arrowsOnIndex = this.activeArrows[index];
        let staticArrowBounds = staticArrow.getBounds();

        let overlappingArrow = arrowsOnIndex.find(arrow => {
            let arrowBounds = arrow.getBounds();
            return Phaser.Rectangle.intersects(arrowBounds, staticArrowBounds);
        });

        if (overlappingArrow) {
            this.updateScore(1);
            this.activeArrows[index].splice(this.activeArrows[index].indexOf(overlappingArrow), 1);
            overlappingArrow.destroy();
        } else {
            this.updateScore(-1);
        }
        this.staticArrows[index].loadTexture('arrow-button-pressed');
        console.log('score', this.score);

        switch (index) {
            case LEFT_ARROW:
                this.leftHand.moveToHorizontal();
                break;
            case UP_ARROW:
                this.leftHand.moveToVertical();
                break;
            case DOWN_ARROW:
                this.rightHand.moveToVertical();
                break;
            case RIGHT_ARROW:
                this.rightHand.moveToHorizontal();
                break;
        }

    }

    handleKeyUp(index) {
        this.staticArrows[index].loadTexture('arrow-button-released');
    }

    generateArrow(index) {
        let x = ARROWS_LEFT + index * (ARROW_SIZE + ARROWS_SIDE_PADDING);

        let arrow = this.game.add.image(x, ARROWS_BOTTOM, 'arrow');
        arrow.anchor.setTo(0.5, 0.5);
        arrow.angle = rotation[index];
        arrow.index = index;


        this.activeArrows[index].push(arrow);

        return arrow;
    }

    sendArrow() {
        let arrow = this.generateArrow(randomInt(0, 3));
        this.game.add.tween(arrow)
            .to({y: 0}, randomInt(1000, 1500))
            .start()
            .onComplete
            .add((e) => {
                console.log('score', this.score);
                this.activeArrows[e.index].splice(this.activeArrows[e.index].indexOf(e), 1);
                this.updateScore(-1);
                e.destroy();
            });
        setTimeout(() => this.sendArrow(), randomInt(500, 1000));
    }

    updateScore(diff) {
        this.score += diff;

        let color;
        let greenColor = Math.floor(this.score / 100 * 255);
        let redColor = 255 - greenColor;
        color = redColor << 8;
        color = color | greenColor;
        color = color << 8;
        this.scoreBar.tint = color;

        this.scoreRect.y = 65 + 100 - this.score;
        this.scoreRect.height = this.score;
        // this.scoreBar.crop(this.scoreRect);
    }

    next() {
        this._gen.next();
    }
}
