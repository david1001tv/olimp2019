import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

const PLAYER_SPEED = 250;

let player;
let cursors;
let horizontalDoors;
let verticalDoors;
let rightDoors;

export default class LabyrinthState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Після успішного отримання диплома, Ви вирішили знайти собі роботу, але де ж її шукати як не в бізнес-центрі?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Будівля просто вражає своїми масштабами, скільки ж тут усього кабінетів?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Основною перевагою таких величезних будівель є те, що тут Ви зможете відшукати роботу на будь-яку спеціальність, але з цього випливає і мінус - зробити це вкрай складно. Вам доведеться затриматися, для того, щоб відшукати потрібний кабінет, проте який з номерів вірний?', () => this.next());
        yield;
        this.game.displayDialogLine('Ви', 'Здається в номері кабінету повинна бути цифра "1"…', () => {
            this.game.add.tween(this.bg).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
            this.game.add.tween(this.warning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.warning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });

            this.game.add.tween(this.firstWarning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.firstWarning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });
        });
        yield;

        yield;

        this.game.camera.fade(0x000000, 1500);
        setTimeout(() => this.next(), 1500);
        yield;


        this.game.nextState();
    }

    init() {
        this._gen = this.gen();

        this.game.phone.setEnabled(true);
        this.game.phone.setTime('08:30');
        this.game.phone.setDate('01.09.18');
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: 'LABYRINTH',
            text: 'Пройти до 330-ї аудиторії'
        });
    }

    preload() {
        this.load.image('bg', './assets/images/3-1 (Labyrinth)/background.png');
        this.load.image('bg2', './assets/images/3-1 (Labyrinth)/background2.png');

        this.game.load.atlas('player', 'assets/images/3-1 (Labyrinth)/walking-spritesheet.png', 'assets/images/3-1 (Labyrinth)/walking-spritesheet.json');
        this.game.load.image('walls', 'assets/images/3-1 (Labyrinth)/walls.png');
        this.game.load.physics('physicsData', 'assets/images/3-1 (Labyrinth)/maze.json');
        this.game.load.image('door-horizontal', 'assets/images/3-1 (Labyrinth)/door-horizontal.png');
        this.game.load.image('door-vertical', 'assets/images/3-1 (Labyrinth)/door-vertical.png');

        this.load.image('warning_message', './assets/images/3-1 (Labyrinth)/warning_message.png');
    }

    create() {

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        var wallCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        var doorsCollisionGroup = this.game.physics.p2.createCollisionGroup();
        let rightDoorCollisionGroup = this.game.physics.p2.createCollisionGroup();
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

        rightDoors = this.game.add.group();
        horizontalDoors = this.game.add.group();
        verticalDoors = this.game.add.group();
        horizontalDoors.enableBody = true;
        verticalDoors.enableBody = true;
        rightDoors.enableBody = true;
        horizontalDoors.physicsBodyType = Phaser.Physics.P2JS;
        verticalDoors.physicsBodyType = Phaser.Physics.P2JS;
        rightDoors.physicsBodyType = Phaser.Physics.P2JS;

        let rightDoor = rightDoors.create(1745, 770, 'door-vertical');
        let text0 = this.game.add.text(1760, 750, '416');
        text0.rotation = 1.575;
        rightDoor.body.setRectangle(33,66);
        rightDoor.body.setCollisionGroup(rightDoorCollisionGroup);
        rightDoor.body.collides(playerCollisionGroup);
        rightDoor.body.static = true;

        let d1 = [ 630, 33, ' 57', 210, 800, '234', 275, 975, '234', 865, 1045, ' 46', 1035, 1045, ' 64', 1210, 1045, ' 3 ', 1320, 1045, ' 30', 1223, 890, '255', 605, 694, '356', 605, 733, '176', 560, 245, '408', 480, 137, ' 58', 480, 33, ' 56', 630, 137, ' 55', 975, 310, '113', 1465, 312, '238', 1750, 33, '115'];
        for (let i = 0; i < 51; i = i+3) {
            let door = horizontalDoors.create(d1[i], d1[i + 1], 'door-horizontal');
            this.game.add.text(d1[i] - 22, d1[i + 1] - 15, d1[i + 2]);
            door.body.setRectangle(66, 33);
            door.body.setCollisionGroup(doorsCollisionGroup);
            door.body.collides([doorsCollisionGroup, playerCollisionGroup]);
            door.body.static = true;
        }

        let d2 = [ 140, 663, '230', 1713, 380, '330', 105, 840, '124', 310, 420, '320', 310, 591, ' 14', 521, 734, '117', 1012, 520, '338', 1185, 662, '500', 1080, 138, ' M ', 1433, 765, '508', 1677, 145, '34'];
        for (let i = 0; i  < 33; i = i+3) {
            let door = verticalDoors.create(d2[i], d2[i + 1], 'door-vertical');
            let text = this.game.add.text(d2[i] + 15, d2[i + 1] - 20, d2[i + 2]);
            text.rotation = 1.575;
            door.body.setRectangle(33, 66);
            door.body.setCollisionGroup(doorsCollisionGroup);
            door.body.collides([doorsCollisionGroup, playerCollisionGroup]);
            door.body.static = true;
        }

        player = this.game.add.sprite(50, 950, 'player');
        player.animations.add('walk');

        this.game.physics.p2.enable(player, false);
        player.body.collideWorldBounds = true;
        player.body.fixedRotation = true;
        player.body.setCollisionGroup(playerCollisionGroup);

        player.body.collides(wallCollisionGroup);
        player.body.collides(doorsCollisionGroup, this.handleWrongDoor, this);
        player.body.collides(rightDoorCollisionGroup, this.handleRightDoor, this);

        cursors = this.game.input.keyboard.createCursorKeys();


        cursors.down.onUp.add(this.stopPlayerWalkAnimation);
        cursors.left.onUp.add(this.stopPlayerWalkAnimation);
        cursors.up.onUp.add(this.stopPlayerWalkAnimation);
        cursors.right.onUp.add(this.stopPlayerWalkAnimation);


        // // Телепортация для дебага
        // this.game.input.onDown.add(e => {
        //    player.body.static = true;
        //    player.x = e.position.x;
        //    player.body.x = e.position.x;
        //    player.y = e.position.y;
        //    player.body.y = e.position.y;
        //    player.body.static = false;
        //    ;
        // });

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        this.bg = bg;

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(725, 40, 'Вам необхідно знайти вірний кабінет.\nУправління здійснюється стрілками на\nклавіатурі', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.next();
    }

    stopPlayerWalkAnimation() {
        player.animations.stop('walk');
    }

    handleRightDoor() {
        this.next();
    }

    handleWrongDoor() {
        this.game.paused = true;
        let rand = Math.floor(Math.random() * (7));
        rand = this.phrase(rand);
        this.game.displayDialogLine( rand[0], rand[1], () => {
            this.game.paused = false;
            player.animations.stop('walk');
        });
    }

    phrase (rand) {
        if (rand == 0)
        return [ ' Ви', ' Хм, схоже я помилився дверима...'];
        if (rand == 1)
        return [ ' Ви', ' Здається це комора'];
        if (rand == 2)
        return [ ' Ви', ' Тут порожньо'];
        if (rand == 3)
        return [ ' Ви', ' Тут нікого немає'];
        if (rand == 4)
        return [ ' Ви', ' Ці двері замкнені'];
        if (rand == 5)
        return [ ' Ви', ' Це точно не тут'];
        if (rand == 6)
        return [ ' Ви', ' Здається я тут вже був'];
    }

    update() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.up.isDown) {
            player.animations.play('walk', 5, true);
            player.body.velocity.y = -PLAYER_SPEED;
            player.angle = -90;
        }
        else if (cursors.down.isDown) {
            player.animations.play('walk', 5, true);
            player.body.velocity.y = PLAYER_SPEED;
            player.angle = 90;
        }

        if (cursors.left.isDown) {
            player.animations.play('walk', 5, true);
            player.body.velocity.x = -PLAYER_SPEED;

            if (cursors.up.isDown)
                player.angle = 225;
            else if (cursors.down.isDown)
                player.angle = 135;
            else
                player.angle = 180;
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk', 5, true);
            player.body.velocity.x = PLAYER_SPEED;
            if (cursors.up.isDown)
                player.angle = -45;
            else if (cursors.down.isDown)
                player.angle = 45;
            else
                player.angle = 0;
        }
    }

    shutdown() {
        this.game.stage.backgroundColor = '#000000';
    }

    next() {
        this._gen.next();
    }
}