import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

const ARROWS_BOTTOM = 950;
const STATIC_ARROWS_TOP = 100;
const ARROWS_LEFT = 100;
const ARROWS_SIDE_PADDING = 30;
const ARROW_SIZE = 150;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let rotation = [
    -90,
    0,
    180,
    90
];

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

        this.score = 0;
    }

    init() {
        this.activeDocument = null;

        this._gen = this.gen();

        this.game.phone.setEnabled(false);
    }

    preload() {
        this.load.image('bg', './assets/images/3-4(final)/bg-3-4.png');
        this.load.image('rector', './assets/images/3-4(final)/rector.png');
        this.load.image('d-head', './assets/images/3-4(final)/d-head.png');
        this.load.image('d-body', './assets/images/3-4(final)/d-body.png');
        this.load.image('d-shadow', './assets/images/3-4(final)/d-shadow.png');
        this.load.image('d-righthand-changing', './assets/images/3-4(final)/d-righthand-changing.png');
        this.load.image('d-lefthand-changing', './assets/images/3-4(final)/d-lefthand-changing.png');
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

        legs.animations.add('dance');
        legs.animations.play('dance', 3, true);

        let righthand = this.game.add.sprite(915, 411, 'd-righthand', 'd-righthand-down');
        righthand.animations.add('dance');
        righthand.animations.play('dance', 3, true);

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

        // setInterval(() => {
        //     let arrow = this.generateArrow(randomInt(0, 3));
        //     this.game.add.tween(arrow)
        //         .to({y: 0}, randomInt(750, 1500))
        //         .start()
        //         .onComplete
        //         .add((e) => {
        //             console.log('score', this.score);
        //             this.activeArrows[e.index].splice(this.activeArrows[e.index].indexOf(e), 1);
        //             this.score--;
        //             e.destroy();
        //         });
        // }, 1500);

        this.cursors.left.onDown.add(e => this.handleKeyDown(0));
        this.cursors.up.onDown.add(e => this.handleKeyDown(1));
        this.cursors.down.onDown.add(e => this.handleKeyDown(2));
        this.cursors.right.onDown.add(e => this.handleKeyDown(3));

        this.cursors.left.onUp.add(e => this.handleKeyUp(0));
        this.cursors.up.onUp.add(e => this.handleKeyUp(1));
        this.cursors.down.onUp.add(e => this.handleKeyUp(2));
        this.cursors.right.onUp.add(e => this.handleKeyUp(3));

        this.next();
    }

    render() {

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
            this.score++;
            this.activeArrows[index].splice(this.activeArrows[index].indexOf(overlappingArrow), 1);
            overlappingArrow.destroy();
        } else {
            this.score--;
        }
        this.staticArrows[index].loadTexture('arrow-button-pressed');
        console.log('score', this.score);
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
                this.score--;
                e.destroy();
            });
        setTimeout(() => this.sendArrow(), randomInt(500, 1000));
    }

    next() {
        this._gen.next();
    }
}
