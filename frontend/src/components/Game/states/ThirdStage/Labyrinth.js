import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import {smartSetHeight} from '../../utils';

let player;
let cursors;

let walls;

export default class LabyrinthState extends Phaser.State {
    * gen() {

    }

    init() {

    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';

        this.game.load.image('player', 'assets/phaser-dude.png');
        this.game.load.image('block', 'assets/lazer.png');
        this.game.load.image('walls', 'assets/walls.png');
        this.game.load.physics('physicsData', 'assets/maze.json');
    }

    create() {
        player = this.game.add.sprite(50, 30, 'player');

        this.game.physics.startSystem(Phaser.Physics.P2JS);

        walls = this.game.add.physicsGroup();
        let wall = this.game.add.sprite(960, 540, 'walls');
        wall.anchor.x = 0;
        wall.anchor.y = 0;
        this.game.physics.p2.enable([wall, player]);
        wall.body.clearShapes();
        wall.body.loadPolygon('physicsData', 'walls');
        wall.body.static = true;

        player.body.collideWorldBounds = true;

        cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.game.physics.arcade.collide(player, walls);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -300;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 300;
        }

        if (cursors.up.isDown)
        {
            player.body.velocity.y = -300;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 300;
        }
    }

    render() {

    }

    next() {
        this._gen.next();
    }
}