/* globals __DEV__ */
import Phaser from 'phaser';


export default class DocsState extends Phaser.State {
    * gen() {
        console.log(0);
        console.log(this.camera);
        window.CAMERA = this.camera;
        // this.camera.scale.setTo(5, 5);
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


        /*this.game.displayDialogLine('Ви', 'Добре, мамо');
        yield;*/
    }

    init() {
        this._gen = this.gen();
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.parentIsWindow = true;
    }

    preload() {
        this.load.image('bg', './assets/images/quest-bg-1-2.png');
        this.load.image('door-closed', './assets/images/door-closed.png');
        this.load.image('d-right', './assets/images/d-right.png');
        this.load.image('sertificate', './assets/images/sertificate.png');
        //this.load.image('door-opened-right', './assets/images/door-opened-right.png');
        //this.load.image('door-opened-left', './assets/images/door-opened-left.png');
        this.load.image('door-opened', './assets/images/door-opened.png');
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

    open_door(){
        //this.door_opened_right.alpha = 1;
        //this.door_opened_left.alpha = 1;
        this.door_opened.alpha = 1;
        this.door_closed.alpha = 0;
    }

    close_door(){
        //this.door_opened_right.alpha = 0;
        //this.door_opened_left.alpha = 0;
        this.door_opened.alpha = 0;
        this.door_closed.alpha = 1;
    }

    get_sertificate() {
        this.sertificate.alpha = 0
        this.eng.alpha = 1;
    }

    get_passport() {
        this.passport.alpha = 0;
        this.pass.alpha = 1;
    }

    get_photos() {
        this.photos.alpha = 0;
        this.phot.alpha = 1;
    }

    get_war() {
        this.warticket.alpha = 0;
        this.war.alpha = 1;
    }

    get_zno() {
        this.zno.alpha = 0;
        this.zno_small.alpha = 1;
    }

    create() {
        //game.input.mouse.capture = true;

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let eng = this.game.add.image(70, 800, 'eng-small');
        eng.aspectRatio = eng.width / eng.height;
        eng.height = 70;
        eng.width = eng.aspectRatio * eng.height;
        eng.alpha = 0;
        this.eng = eng;

        let pass = this.game.add.image(140, 800, 'pass-small');
        pass.aspectRatio = pass.width / pass.height;
        pass.height = 70;
        pass.width = pass.aspectRatio * pass.height;
        pass.alpha = 0;
        this.pass = pass;

        let phot = this.game.add.image(210, 800, 'photos-small');
        phot.aspectRatio = phot.width / phot.height;
        phot.height = 70;
        phot.width = phot.aspectRatio * phot.height;
        phot.alpha = 0;
        this.phot = phot;

        let war = this.game.add.image(280, 800, 'war-small');
        war.aspectRatio = war.width / war.height;
        war.height = 70;
        war.width = war.aspectRatio * war.height;
        war.alpha = 0;
        this.war = war;

        let zno_small = this.game.add.image(350, 800, 'zno-small');
        zno_small.aspectRatio = zno_small.width / zno_small.height;
        zno_small.height = 70;
        zno_small.width = zno_small.aspectRatio * zno_small.height;
        zno_small.alpha = 0;
        this.zno_small = zno_small;

        let sertificate = this.game.add.image(1430, 175, 'sertificate');
        sertificate.aspectRatio = sertificate.width / sertificate.height;
        sertificate.height = 120;
        sertificate.width = sertificate.aspectRatio * sertificate.height;
        sertificate.inputEnabled = true;
        this.sertificate = sertificate;
        sertificate.events.onInputDown.add(this.get_sertificate, this);

        let photos = this.game.add.image(1170, 525, 'photos');
        photos.aspectRatio = photos.width / photos.height;
        photos.height = 40;
        photos.width = photos.aspectRatio * photos.height;
        photos.inputEnabled = true;
        this.photos = photos;
        photos.events.onInputDown.add(this.get_photos, this);

        let warticket = this.game.add.image(1720, 340, 'warticket');
        warticket.aspectRatio = warticket.width / warticket.height;
        warticket.height = 40;
        warticket.width = warticket.aspectRatio * warticket.height;
        warticket.inputEnabled = true;
        this.warticket = warticket;
        warticket.events.onInputDown.add(this.get_war, this);

        let zno = this.game.add.image(660, 783, 'zno');
        zno.aspectRatio = zno.width / zno.height;
        zno.height = 50;
        zno.width = zno.aspectRatio * zno.height;
        zno.inputEnabled = true;
        this.zno = zno;
        zno.events.onInputDown.add(this.get_zno, this);

        let passport = this.game.add.image(364, 435, 'passport');
        passport.aspectRatio = passport.width / passport.height;
        passport.height = 23.12345;
        passport.width = passport.aspectRatio * passport.height;
        passport.inputEnabled = true;
        this.passport = passport;
        passport.events.onInputDown.add(this.get_passport, this);

        let door_closed = this.game.add.image(103, 234, 'door-closed');
        door_closed.aspectRatio = door_closed.width / door_closed.height;
        door_closed.height = 540;
        door_closed.width = door_closed.aspectRatio * door_closed.height;
        door_closed.alpha = 1;
        door_closed.inputEnabled = true;
        door_closed.input.priorityID = 1;
        door_closed.events.onInputDown.add(this.open_door, this);
        this.door_closed = door_closed;

        let door_opened = this.game.add.image(5, 240, 'door-opened');
        door_opened.aspectRatio = door_opened.width / door_opened.height;
        door_opened.height = 580;
        door_opened.width = door_opened.aspectRatio * door_opened.height;
        door_opened.inputEnabled = true;
        door_opened.events.onInputDown.add(this.close_door, this);
        door_opened.alpha = 0;
        this.door_opened = door_opened;
        /*let door_opened_right = this.game.add.image(5, 240, 'door-opened-right');
        door_opened_right.aspectRatio = door_opened_right.width / door_opened_right.height;
        door_opened_right.height = 580;
        door_opened_right.width = door_opened_right.aspectRatio * door_opened_right.height;
        door_opened_right.inputEnabled = true;
        door_opened_right.events.onInputDown.add(this.close_door, this);
        door_opened_right.alpha = 0;
        this.door_opened_right = door_opened_right;

        let door_opened_left = this.game.add.image(5, 240, 'door-opened-left');
        door_opened_left.aspectRatio = door_opened_left.width / door_opened_left.height;
        door_opened_left.height = 580;
        door_opened_left.width = door_opened_left.aspectRatio * door_opened_left.height;
        door_opened_left.inputEnabled = true;
        door_opened_left.events.onInputDown.add(this.close_door, this);
        door_opened_left.alpha = 0;
        this.door_opened_left = door_opened_left;*/

        let david = this.game.add.image(1300, 280, 'd-right');
        david.aspectRatio = david.width / david.height;
        david.height = 551;
        david.width = david.aspectRatio * david.height;
        david.alpha = 0;
        this.david = david;

        // const bannerText = 'Phaser + ES6 + Webpack';
        // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
        //     font: '40px Bangers',
        //     fill: '#77BFA3',
        //     smoothed: false
        // });

        // banner.padding.set(10, 16);
        // banner.anchor.setTo(0.5);

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    render() {
        // if (__DEV__) {
            /*let count = 0;
            if(game.input.mousePointer.isDown) {
                count++;
            }*/
        this.game.debug.spriteInfo(this.david, 32, 32);
        // }
    }

    next() {
        this._gen.next();
    }
}
