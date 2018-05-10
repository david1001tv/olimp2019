import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import {smartSetHeight} from '../../utils';

let player;
let cursors;
let pandas;
let pandas2;
let result = 'Move with the cursors';
let walls;

export default class LabyrinthState extends Phaser.State {
    * gen() {

    }

    init() {

    }

    preload() {
        this.game.stage.backgroundColor = '#85b5e1';

        // this.game.load.image('player', 'assets/d-walk-1.png');
        this.game.load.spritesheet('player', 'assets/images/3-1 (labyrinth)/mummy.png', 37, 45, 18);
        this.game.load.image('walls', 'assets/images/3-1 (labyrinth)/walls.png');
        this.game.load.physics('physicsData', 'assets/images/3-1 (labyrinth)/maze.json');
        this.game.load.image('panda', 'assets/images/3-1 (labyrinth)/door.png');
        this.game.load.image('panda2', 'assets/images/3-1 (labyrinth)/door2.png');
    }

    create() {
        
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        var wallCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var pandaCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();

        walls = this.game.add.physicsGroup();
        let wall = this.game.add.sprite(960, 540, 'walls');
        wall.anchor.x = 0;
        wall.anchor.y = 0;
        this.game.physics.p2.enable(wall);
        wall.body.clearShapes();
        wall.body.loadPolygon('physicsData', 'walls');
        wall.body.static = true;
        wall.body.setCollisionGroup(wallCollisionGroup);
        wall.body.collides(playerCollisionGroup);
        
        pandas = this.game.add.group();
        pandas2 = this.game.add.group();
        pandas.enableBody = true;
        pandas2.enableBody = true;
        pandas.physicsBodyType = Phaser.Physics.P2JS;
        pandas2.physicsBodyType = Phaser.Physics.P2JS;

        //let text = this.game.add.text(100, 100, '- button nuked -', { font: '64px'});
        let d1 = [ 210, 800, '234', 275, 975, ' 46', 865, 1045, ' 64', 1035, 1045, '  3', 1210, 1045, ' 30', 1320, 1045, ' Ж ', 1223, 890, ' 58', 605, 694, ' 56', 605, 733, ' 57', 560, 245, ' 55', 480, 137, '408', 480, 33, '176', 630, 33, '356', 630, 137, '113', 975, 310, '225', 1465, 312, '238', 1750, 33, '115'];
        for (let i = 0; i < 51; i = i+3)
        {
                let panda = pandas.create(d1[i],d1[i+1],'panda');
                let text = this.game.add.text(d1[i]-22, d1[i+1]-15, d1[i+2]);
                panda.body.setRectangle(66, 33);
                panda.body.setCollisionGroup(pandaCollisionGroup);
                panda.body.collides([pandaCollisionGroup, playerCollisionGroup]);
                panda.body.static = true;
        }

        // let d2 = [ 105, 840, 140, 663, 310, 420, 310, 591, 521, 734, 1012, 520, 1185, 662, 1080, 138, 1433, 765, 1745, 770, 1713, 380, 1677, 145];
        let d2 = [ 105, 840, '124', 140, 663, '230', 310, 420, ' 14', 310, 591, '320', 521, 734, '117', 1012, 520, '338', 1185, 662, '500', 1080, 138, '508', 1433, 765, ' M ', 1745, 770, '330', 1713, 380, '34', 1677, 145, '416'];
        for (let i = 0; i < 36; i = i+3)
        {
                let panda2 = pandas2.create(d2[i],d2[i+1],'panda2');
                let text1 = this.game.add.text(d2[i]+15, d2[i+1]-20, d2[i+2]);
                text1.rotation = 1.575;
                panda2.body.setRectangle(33,66);
                panda2.body.setCollisionGroup(pandaCollisionGroup);
                panda2.body.collides([pandaCollisionGroup, playerCollisionGroup]);
                panda2.body.static = true;
        }

            //player = this.game.add.sprite(50, 30, 'player');
            player = this.game.add.sprite(200, 360, 'player', 5);
            this.game.physics.p2.enable(player, false);
            player.body.collideWorldBounds = true;
            player.body.fixedRotation = true;
            player.body.setCollisionGroup(playerCollisionGroup);
    
            player.body.collides(wallCollisionGroup);
            player.body.collides(pandaCollisionGroup, this.wrongPanda, this);

        cursors = this.game.input.keyboard.createCursorKeys();
    }

    wrongPanda() {
        //player.body.velocity.x = 0;
        // player.body.velocity.y = 0;
        //player.body.setZeroVelocity();
        //player.body.velocity.x = -20000;
        //player.body.velocity.y = -20000;
        //player.body.static = true;
        result = 'You last hit: The wall :)';
        //player.body.moves = false;
        this.game.displayDialogLine('Message', 'text');
        //player.body.static = false;

    }

    update() {

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
        this.game.debug.text(result, 32, 32);
    }

    next() {
        this._gen.next();
    }
}