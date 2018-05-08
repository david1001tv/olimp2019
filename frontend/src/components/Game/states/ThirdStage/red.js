
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

        this.game.load.image('player', 'assets/d-walk-1.png');
        this.game.load.image('block', 'assets/lazer.png');
        this.game.load.image('walls', 'assets/walls.png');
        this.game.load.physics('physicsData', 'assets/maze.json');
        this.game.load.image('panda', 'assets/door.png');
        this.game.load.image('panda2', 'assets/door2.png');
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

        //let text = game.add.text(100, 100, '- button nuked -');

       // let word = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        let d1 = [ 210, 800, 275, 975, 865, 1045, 1035, 1045, 1210, 1045, 1320, 1045, 1223, 890, 605, 694, 605, 733, 560, 245, 480, 137, 480, 33, 630, 33, 630, 137, 975, 310, 1465, 312, 1750, 33];
        for (let i = 0; i < 34; i = i+2)
        {
                let panda = pandas.create( d1[i],d1[i+1], 'panda');
                //let text = game.add.text( d1[i], d1[i+1], 'desyrel', word[i]);
                panda.body.setRectangle(66, 33);
                panda.body.setCollisionGroup(pandaCollisionGroup);
                panda.body.collides([pandaCollisionGroup, playerCollisionGroup]);
                panda.body.static = true;
        }

        let d2 = [ 105, 840, 140, 663, 310, 420, 310, 591, 521, 734, 1012, 520, 1185, 662, 1080, 138, 1433, 765, 1745, 770, 1713, 380, 1677, 145];
        for (let i = 0; i < 24; i = i+2)
        {
                let panda2 = pandas2.create(d2[i],d2[i+1],'panda2');
                panda2.body.setRectangle(33,66);
                panda2.body.setCollisionGroup(pandaCollisionGroup);
                panda2.body.collides([pandaCollisionGroup, playerCollisionGroup]);
                panda2.body.static = true;
        }

            player = this.game.add.sprite(50, 30, 'player');
        
            this.game.physics.p2.enable(player, false);
            player.body.collideWorldBounds = true;
            player.body.fixedRotation = true;
            player.body.setCollisionGroup(playerCollisionGroup);
    
            player.body.collides(wallCollisionGroup);
            player.body.collides(pandaCollisionGroup, this.wrongPanda, this);

        cursors = this.game.input.keyboard.createCursorKeys();
    }

    wrongPanda() {
        result = 'You last hit: The wall :)';
        //this.game.displayDialogLine('Message', 'text');
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