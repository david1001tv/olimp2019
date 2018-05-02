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


        this.game.displayDialogLine('Ви', "Такс... Потрібно зібрати документи. Мені потрібні: \
        паспорт, військовий квиток, результати ЗНО, фотокартки, сертифікат з английської. \
        От тільки де вони лежать? <клік щоб продовжити>");
        yield;


        this.game.displayDialogLine('Голос всередені', 'Гей, ти, так, ти-ти, хочеш підказку? \
        Тоді клацай знов на це повідомлення. І поводься природно, ніхтно не повинен знати про цю розмову. \
        <клік щоб продовжити>');
        yield;


        this.game.displayDialogLine('Голос всередені', 'Добре, хлопче. Тільки пообіцяй, що про це ніхто не буде знати.\
        Гаразд? Ну добре. Отже підказка: не забудь перевірити шафу. Усе, мені пора, щасти тобі. <клік щоб продовжити>');
        yield;
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
        let count = 0;
        this.count = count;

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let eng = this.create_sprite('eng-small', 70, 800, 70, false, false);
        this.eng = eng;

        let pass = this.create_sprite('pass-small', 140, 800, 70, false, false);
        this.pass = pass;

        let phot = this.create_sprite('photos-small', 210, 800, 70, false, false);
        this.phot = phot;

        let war = this.create_sprite('war-small', 280, 800, 70, false, false);
        this.war = war;

        let zno_small = this.create_sprite('zno-small', 350, 800, 70, false, false);
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

        let arr = [sertificate, passport, photos, warticket, zno, door_closed, door_opened_left, door_opened_right];

        arr.forEach(e => {
            e.events.onInputDown.add(this.handleClick, this);
        })

        let david = this.create_sprite('d-right', 1300, 280, 551, false, false);
        this.david = david;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    handleClick(obj){
        this.count++;
        if(obj.key === this.sertificate.key) {
            this.sertificate.alpha = 0
            this.eng.alpha = 1;
        }
        if(obj.key === this.passport.key) {
            this.passport.alpha = 0
            this.pass.alpha = 1;
        }
        if(obj.key === this.warticket.key) {
            this.warticket.alpha = 0
            this.war.alpha = 1;
        }
        if(obj.key === this.photos.key) {
            this.photos.alpha = 0
            this.phot.alpha = 1;
        }
        if(obj.key === this.zno.key) {
            this.zno.alpha = 0
            this.zno_small.alpha = 1;
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