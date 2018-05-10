import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import {smartSetHeight} from '../../utils';

const PLAYER_SPEED = 250;

let player;
let cursors;
let horizontalDoors;
let verticalDoors;

export default class LabyrinthState extends Phaser.State {
    * gen() {

    }

    init() {
        this.game.phone.setEnabled(true);
    }

    preload() {
        this.game.stage.backgroundColor = '#fff3e0';

        this.game.load.atlas('player', 'assets/walking-spritesheet.png', 'assets/walking-spritesheet.json');
        this.game.load.image('walls', 'assets/walls.png');
        this.game.load.physics('physicsData', 'assets/maze.json');
        this.game.load.image('door-horizontal', 'assets/door-horizontal.png');
        this.game.load.image('door-vertical', 'assets/door-vertical.png');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        var wallCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var doorsCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();

        let wall = this.game.add.sprite(960, 540, 'walls');
        wall.anchor.x = 0;
        wall.anchor.y = 0;
        this.game.physics.p2.enable(wall);
        wall.body.clearShapes();
        wall.body.loadPolygon('physicsData', 'walls');
        wall.body.static = true;
        wall.body.setCollisionGroup(wallCollisionGroup);
        wall.body.collides(playerCollisionGroup);
        this.wall = wall;

        horizontalDoors = this.game.add.group();
        verticalDoors = this.game.add.group();
        horizontalDoors.enableBody = true;
        verticalDoors.enableBody = true;
        horizontalDoors.physicsBodyType = Phaser.Physics.P2JS;
        verticalDoors.physicsBodyType = Phaser.Physics.P2JS;


        let d1 = [210, 800, '234', 275, 975, ' 46', 865, 1045, ' 64', 1035, 1045, '  3', 1210, 1045, ' 30', 1320, 1045, ' Ж ', 1223, 890, ' 58', 605, 694, ' 56', 605, 733, ' 57', 560, 245, ' 55', 480, 137, '408', 480, 33, '176', 630, 33, '356', 630, 137, '113', 975, 310, '225', 1465, 312, '238', 1750, 33, '115'];
        for (let i = 0; i < 51; i = i + 3) {
            let door = horizontalDoors.create(d1[i], d1[i + 1], 'door-horizontal');
            this.game.add.text(d1[i] - 22, d1[i + 1] - 15, d1[i + 2]);
            door.body.setRectangle(66, 33);
            door.body.setCollisionGroup(doorsCollisionGroup);
            door.body.collides([doorsCollisionGroup, playerCollisionGroup]);
            door.body.static = true;
        }

        // let d2 = [ 105, 840, 140, 663, 310, 420, 310, 591, 521, 734, 1012, 520, 1185, 662, 1080, 138, 1433, 765, 1745, 770, 1713, 380, 1677, 145];
        let d2 = [105, 840, '124', 140, 663, '230', 310, 420, ' 14', 310, 591, '320', 521, 734, '117', 1012, 520, '338', 1185, 662, '500', 1080, 138, '508', 1433, 765, ' M ', 1745, 770, '330', 1713, 380, '34', 1677, 145, '416'];
        for (let i = 0; i < 36; i = i + 3) {
            let door = verticalDoors.create(d2[i], d2[i + 1], 'door-vertical');
            let text = this.game.add.text(d2[i] + 15, d2[i + 1] - 20, d2[i + 2]);
            text.rotation = 1.575;
            door.body.setRectangle(33, 66);
            door.body.setCollisionGroup(doorsCollisionGroup);
            door.body.collides([doorsCollisionGroup, playerCollisionGroup]);
            door.body.static = true;
        }

        player = this.game.add.sprite(50, 30, 'player');
        player.animations.add('walk');

        this.game.physics.p2.enable(player, false);
        player.body.collideWorldBounds = true;
        player.body.fixedRotation = true;
        player.body.setCollisionGroup(playerCollisionGroup);

        player.body.collides(wallCollisionGroup);
        player.body.collides(doorsCollisionGroup, this.handleWrongDoor, this);

        cursors = this.game.input.keyboard.createCursorKeys();


        cursors.down.onUp.add(this.stopPlayerWalkAnimation);
        cursors.left.onUp.add(this.stopPlayerWalkAnimation);
        cursors.up.onUp.add(this.stopPlayerWalkAnimation);
        cursors.right.onUp.add(this.stopPlayerWalkAnimation);
    }

    stopPlayerWalkAnimation() {
        player.animations.stop('walk');
    }

    handleWrongDoor() {
        this.game.paused = true;
        this.game.displayDialogLine('asdasd', 'Test Test Test Test Test Test', () => {
            this.game.paused = false;
            player.animations.stop('walk');
        });
    }

    update() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.up.isDown) {
            player.animations.play('walk', 18, true);
            player.body.velocity.y = -PLAYER_SPEED;
            player.angle = -90;
        }
        else if (cursors.down.isDown) {
            player.animations.play('walk', 18, true);
            player.body.velocity.y = PLAYER_SPEED;
            player.angle = 90;
        }

        if (cursors.left.isDown) {
            player.animations.play('walk', 18, true);
            player.body.velocity.x = -PLAYER_SPEED;

            if (cursors.up.isDown)
                player.angle = 225;
            else if (cursors.down.isDown)
                player.angle = 135;
            else
                player.angle = 180;
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk', 18, true);
            player.body.velocity.x = PLAYER_SPEED;
            if (cursors.up.isDown)
                player.angle = -45;
            else if (cursors.down.isDown)
                player.angle = 45;
            else
                player.angle = 0;
        }
    }

    render() {
        this.game.debug.body(this.wall);
    }

    next() {
        this._gen.next();
    }
}