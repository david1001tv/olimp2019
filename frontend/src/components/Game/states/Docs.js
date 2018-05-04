/* globals __DEV__ */
import Phaser from 'phaser';
import {smartSetHeight} from '../utils';
import todos from '../todos/Docs';

export default class DocsState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;


        this.game.add.tween(this.david).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.In)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;


        this.game.displayDialogLine('Ви', 'Так... Треба зібрати документи. Мені потрібні: \
        паспорт, військовий квиток, лист ЗНО, фотографії, сертифікат володіння іноземною моовю. \
        От тільки де вони лежать?', () => this.next());
        yield;


        this.game.displayDialogLine('Ви', 'Якщо я забуду що мені потрібно, то я зможу подивитись це в телефоні.', () => this.next());
        yield;

        this.game.phone.setEnabled(true);
        this.door_opened_right.events.onInputDown.add(this.handleDoors, this);
        this.door_opened_left.events.onInputDown.add(this.handleDoors, this);
        this.door_closed.events.onInputDown.add(this.handleDoors, this);
        this.game.input.onDown.add(this.countClick, this);
        let docs = [this.sertificate, this.passport, this.photos, this.warticket, this.zno];
        this.docs = docs;
        docs.forEach(e => {
            e.events.onInputDown.add(this.handleClick, this);
        });
        yield;


        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.state.start('Scanner');
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:03');
        this.game.phone.setDate('02.07.18');

    }

    preload() {
        this.load.image('bg', './assets/images/1-2 (point&click)/quest-bg-1-2.png');

        this.load.image('d-right', './assets/images/1-2 (point&click)/d-right.png');

        this.load.image('door-closed', './assets/images/1-2 (point&click)/door-closed.png');
        this.load.image('door-opened', './assets/images/1-2 (point&click)/door-opened.png');
        this.load.image('door-opened-right', './assets/images/1-2 (point&click)/door-opened-right.png');
        this.load.image('door-opened-left', './assets/images/1-2 (point&click)/door-opened-left.png');

        this.load.image('sertificate', './assets/images/1-2 (point&click)/sertificate.png');
        this.load.image('passport', './assets/images/1-2 (point&click)/passport.png');
        this.load.image('photos', './assets/images/1-2 (point&click)/photos.png');
        this.load.image('warticket', './assets/images/1-2 (point&click)/warticket.png');
        this.load.image('zno', './assets/images/1-2 (point&click)/zno.png');

        this.load.image('sertificate-small', './assets/images/1-2 (point&click)/eng-small.png');
        this.load.image('passport-small', './assets/images/1-2 (point&click)/pass-small.png');
        this.load.image('photos-small', './assets/images/1-2 (point&click)/photos-small.png');
        this.load.image('warticket-small', './assets/images/1-2 (point&click)/war-small.png');
        this.load.image('zno-small', './assets/images/1-2 (point&click)/zno-small.png');
    }

    create() {
        this.grade = 0;
        this.count = 0;
        //this.flags = [false, false, false, false, false];

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let eng = this.create_sprite('sertificate-small', 70, 880, 70, false, false);
        let pass = this.create_sprite('passport-small', 160, 880, 70, false, false);
        let phot = this.create_sprite('photos-small', 250, 880, 70, false, false);
        let war = this.create_sprite('warticket-small', 340, 880, 70, false, false);
        let zno_small = this.create_sprite('zno-small', 430, 880, 70, false, false);

        let docs_small = [eng, pass, phot, war, zno_small];
        this.docs_small = docs_small;

        let sertificate = this.create_sprite('sertificate', 1430, 175, 120, true, true, 'DOCS_ENG');
        sertificate.small = eng;
        this.sertificate = sertificate;

        let photos = this.create_sprite('photos', 1170, 525, 40, true, true, 'DOCS_PHOTO');
        photos.small = phot;
        this.photos = photos;

        let warticket = this.create_sprite('warticket', 1720, 340, 40, true, true, 'DOCS_WAR');
        warticket.small = war;
        this.warticket = warticket;

        let zno = this.create_sprite('zno', 660, 783, 50, true, true, 'DOCS_ZNO');
        zno.small = zno_small;
        this.zno = zno;

        let door_opened_right = this.create_sprite('door-opened-right', 430, 235, 575, false, true);
        this.door_opened_right = door_opened_right;

        let door_opened_left = this.create_sprite('door-opened-left', 0, 243, 582, false, true);
        this.door_opened_left = door_opened_left;

        let passport = this.create_sprite('passport', 352, 420, 46, true, true, 'DOCS_PASS');
        passport.input.pixelPerfectOver = true;
        passport.small = pass;
        this.passport = passport;

        let door_closed = this.create_sprite('door-closed', 103, 234, 540, true, true);
        door_closed.input.priorityID = 1;
        this.door_closed = door_closed;

        let david = this.create_sprite('d-right', 1300, 280, 551, false, false);
        this.david = david;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    countClick() {
        this.count++;
    }

    handleDoors(obj) {
        if (obj.key === this.door_closed.key) {
            this.door_opened_left.alpha = 1;
            this.door_opened_right.alpha = 1;
            this.door_closed.alpha = 0;
            this.door_closed.visible = false;
        }
        if (obj.key === this.door_opened_left.key || obj.key === this.door_opened_right.key) {
            this.door_closed.visible = true;
            this.door_opened_left.alpha = 0;
            this.door_opened_right.alpha = 0;
            this.door_closed.alpha = 1;
        }
    }

    handleClick(obj) {
        obj.isFind = true;
        obj.alpha = 0;
        obj.small.alpha = 1;

        this.game.phone.completeTodo(obj.todoId);

        if (this.docs.every(e => e.isFind)) {
            if (this.count <= 8) {
                this.grade = 100;
            }
            else if (this.count <= 9) {
                this.grade = 90;
            }
            else if (this.count <= 10) {
                this.grade = 80;
            }
            else if (this.count <= 11) {
                this.grade = 70;
            }
            else if (this.count <= 12) {
                this.grade = 60;
            }
            else {
                this.grade = 50;
            }
            this.next();
        }
    }

    create_sprite(name, pos_X, pos_Y, height, flag_alpha, flag_input, todoId) {
        let tmp = this.game.add.image(pos_X, pos_Y, name);
        smartSetHeight(tmp, height);
        if (flag_alpha === false) {
            tmp.alpha = 0;
        }
        else {
            tmp.alpha = 1;
        }
        if (flag_input === true) {
            tmp.inputEnabled = true;
        }
        if (todoId) {
            tmp.todoId = todoId;
        }

        return tmp;
    }

    next() {
        this._gen.next();
    }
}