/* globals __DEV__ */
import Phaser from 'phaser';


export default class DocsState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;
        this.camera.x = 1128;
        this.camera.y = 280;
        this.game.add.tween(this.camera.scale).to({
            x: 1,
            y: 1,
        }, 3000).start().onComplete.add(() => {
            this.next();
        });
        this.game.camera.flash(0x000000, 3000, true);
        yield;


        this.game.add.tween(this.david).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.In)
        .start().onComplete.add(() => {
            this.next();
        });
        yield;


        this.game.displayDialogLine('Ви', "Так... Треба зібрати документи. Мені потрібні: \
        паспорт, військовий квиток, лист ЗНО, фотографії, сертифікат володіння іноземною моовю. \
        От тільки де вони лежать?");
        yield;

        this.game.displayDialogLine('Ви', "Якщо я забуду що мені потрібно, то я зможу подивитись це в телефоні.");
        yield;


        this.game.input.onDown.add(this.countClick, this);

        let arr = [this.sertificate, this.passport, this.photos, this.warticket, this.zno, this.door_closed, this.door_opened_left, this.door_opened_right];

        arr.forEach(e => {
            e.events.onInputDown.add(this.handleClick, this);
        });

        yield;
        this.state.start('Scanner');
    }

    init() {
        this._gen = this.gen();
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
    }

    preload() {
        this.load.image('bg', './assets/images/quest-bg-1-2.png');

        this.load.image('d-right', './assets/images/d-right.png');

        this.load.image('door-closed', './assets/images/door-closed.png');
        this.load.image('door-opened', './assets/images/door-opened.png');
        this.load.image('door-opened-right', './assets/images/door-opened-right.png');
        this.load.image('door-opened-left', './assets/images/door-opened-left.png');
        
        this.load.image('sertificate', './assets/images/sertificate.png');
        this.load.image('passport', './assets/images/passport.png');
        this.load.image('photos', './assets/images/photos.png');
        this.load.image('warticket', './assets/images/warticket.png');
        this.load.image('zno', './assets/images/zno.png');

        this.load.image('eng-small', './assets/images/eng-small.png');
        this.load.image('pass-small', './assets/images/pass-small.png');
        this.load.image('photos-small', './assets/images/photos-small.png');
        this.load.image('war-small', './assets/images/war-small.png');
        this.load.image('zno-small', './assets/images/zno-small.png');
    }

    create() {
        this.grade = 0;
        this.count = 0;
        this.flags = [false, false, false, false, false];

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let eng = this.create_sprite('eng-small', 70, 880, 70, false, false);
        this.eng = eng;

        let pass = this.create_sprite('pass-small', 160, 880, 70, false, false);
        this.pass = pass;

        let phot = this.create_sprite('photos-small', 250, 880, 70, false, false);
        this.phot = phot;

        let war = this.create_sprite('war-small', 340, 880, 70, false, false);
        this.war = war;

        let zno_small = this.create_sprite('zno-small', 430, 880, 70, false, false);
        this.zno_small = zno_small;

        let sertificate = this.create_sprite('sertificate', 1430, 175, 120, true, true);
        this.sertificate = sertificate;

        let photos = this.create_sprite('photos', 1170, 525, 40, true, true);
        this.photos = photos;

        let warticket = this.create_sprite('warticket', 1720, 340, 40, true, true);
        this.warticket = warticket;

        let zno = this.create_sprite('zno', 660, 783, 50, true, true);
        this.zno = zno;

        let door_opened_right = this.create_sprite('door-opened-right', 430, 235, 575, false, true);
        this.door_opened_right = door_opened_right;

        let door_opened_left = this.create_sprite('door-opened-left', 0, 243, 582, false, true);
        this.door_opened_left = door_opened_left;

        let passport = this.create_sprite('passport', 364, 435, 23.12345, true, true);
        passport.input.pixelPerfectOver = true;
        this.passport = passport;

        let door_closed = this.create_sprite('door-closed', 103, 234, 540, true, true);
        door_closed.input.priorityID = 1;
        this.door_closed = door_closed;

        let david = this.create_sprite('d-right', 1300, 280, 551, false, false);
        this.david = david;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    countClick(){
        this.count++;
    }

    handleClick(obj){
        if(obj.key === this.sertificate.key) {
            this.sertificate.alpha = 0;
            this.eng.alpha = 1;
            this.flags[0] = true;
        }
        if(obj.key === this.passport.key) {
            this.passport.alpha = 0;
            this.pass.alpha = 1;
            this.flags[1] = true;
        }
        if(obj.key === this.warticket.key) {
            this.warticket.alpha = 0;
            this.war.alpha = 1;
            this.flags[2] = true;
        }
        if(obj.key === this.photos.key) {
            this.photos.alpha = 0;
            this.phot.alpha = 1;
            this.flags[3] = true;
        }
        if(obj.key === this.zno.key) {
            this.zno.alpha = 0;
            this.zno_small.alpha = 1;
            this.flags[4] = true;
        }
        if(obj.key === this.door_closed.key){
            this.door_opened_left.alpha = 1;
            this.door_opened_right.alpha = 1;
            this.door_closed.alpha = 0;
            this.door_closed.visible = false;
        }
        if(obj.key === this.door_opened_left.key || obj.key === this.door_opened_right.key){
            this.door_closed.visible = true;
            this.door_opened_left.alpha = 0;
            this.door_opened_right.alpha = 0;
            this.door_closed.alpha = 1;
        }

        if(this.flags.every(e => e)){
            if(this.count <= 8){
                this.grade = 100;
            }
            else if(this.count <= 9){
                this.grade = 90;
            }
            else if(this.count <= 10){
                this.grade = 80;
            }
            else if(this.count <= 11){
                this.grade = 70;
            }
            else if(this.count <= 12){
                this.grade = 60;
            }
            else {
                this.grade = 50;
            }
            this.next();
        }
    }

    create_sprite(name, pos_X, pos_Y, height, flag_alpha, flag_input) {
        let tmp = this.game.add.image(pos_X, pos_Y, name);
        tmp.aspectRatio = tmp.width / tmp.height;
        tmp.height = height;
        tmp.width = tmp.aspectRatio * tmp.height;
        if(flag_alpha === false) {
            tmp.alpha = 0;
        }
        else {
            tmp.alpha = 1;
        }
        if(flag_input === true) {
            tmp.inputEnabled = true;
        }
        return tmp;
    }

    render() {
        // if (__DEV__) {

        // }
    }

    next() {
        this._gen.next();
    }
}