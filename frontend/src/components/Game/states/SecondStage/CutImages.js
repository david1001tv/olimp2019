import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';

export default class WWHState extends Phaser.State {
    * gen() {

        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Ви відчули недобре, коли розгублений погляд Тараса Денисовича набув осмисленості, зупинившись на Вас', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Тарас Денисович', 'Як там Вас звати? А втім неважливо. Ходімо, Вам видався унікальний шанс реальної практики монтажа локальної мережі', () => this.next());
        yield;
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Голос', 'Одногрупники побажали Вам удачі. Вам тільки й залишилось, що поспішно направитись вслід за викладачем', () => this.next());
        yield;
        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Тарас Денисович', 'Будь-яка локальна мережа складається з декількох складових: комп\ютери, які Ви будете об\'єднувати; кабель, за допомогою якого Ви будете їх об\'єднувати і центральний пристрій, який управлятиме передачею даних по мережі (комутатор)', () => this.next());
        yield;
        this.game.displayDialogLine('Тарас Денисович', 'Ми розглянемо сьогодні найпоширеніший варіант побудови локальної мережі: з використанням топології "зірка", коли комп\'ютери підключаються до комутатора кабелем "вита пара". Та по-перше...', () => this.next());
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.startGame();

         // Уведомление "Розплутайте кабелі, повертаючи частини головоломки"
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

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.mass.forEach((index) => {
            this.game.add.tween(index).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        });


        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Тарас Денисович', 'Кабелі підєднуємо одним кінцем до роз\'ємів мережних карт всіх комп\'ютерів, а іншим кінцем до роз\'ємів комутатора… Перевіряємо працездатність нашої мережі на фізичному рівні… Все працює! Дякую Вам!', () => this.next());
        yield;

        //Уведомление "Вітаємо! Ви отримали навички монтажа локальної мережі та поліпшили ставлення викладача!"
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

        this.game.add.tween(this.secondWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.secondWarning).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                }, 3000);   
        });
        this.game.displayDialogLine('Голос', 'Ви витерли піт з чола й зняли з плеча обривок кабелю. Все в житті може стати в нагоді! Але відпочинок Вам не завадить...', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        if (this.mistakes <= 125){
            this.score = 100;
        }
        else if (this.mistakes <= 175){
            this.score = 50;
        }
        else {
            this.score = 10; 
        }
        this.game.nextState(this.score);
    }

preload() {
    this.load.image('bg', './assets/images/2-5 (Cut_images)/background.png');
    this.load.image('bg2', './assets/images/2-5 (Cut_images)/background2.png');

    this.load.image('teacher', './assets/images/2-5 (Cut_images)/teacher.png');
    this.load.image('warning_message', './assets/images/2-5 (Cut_images)/warning_message.png');

    for (let i = 1; i < 26; i++){
        this.load.image('image'+i, './assets/images/2-5 (Cut_images)/image_part_0'+ i +'.png');
    }

}

create() {
    this.SSF = {...SSF};
    for (let key in this.SSF) {
        this.SSF[key] = this.SSF[key].bind(this);
    }

    let bg = this.game.add.image(0, 0, 'bg');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;
    this.bg = bg;

    let bg2 = this.game.add.image(0, 0, 'bg2');
    bg2.height = this.game.width * bg2.height / bg2.width;
    bg2.width = this.game.width;
    bg2.alpha = 0;
    this.bg2 = bg2;

    this.teacher = this.SSF.makeImg(1250, 50, 'teacher', 700, 900);
    
    this.stage.disableVisibilityChange = true;
    this.next();
}

startGame() {
    this.mass = [];
    this.mass_angles = [0, 90, -180, -90];
    let x = 563;
    let y = 73;

    let count = 1;

    for (let i = 1; i < 26; i++){
        let image = this.game.add.image(x+86.5, y+86.5, 'image'+i);
        image.side = Math.floor(Math.random() * (4 - 0) + 0);
        image.anchor.setTo(0.5, 0.5);
        image.angle = this.mass_angles[image.side];


        image.inputEnabled = true;
        image.events.onInputDown.add(this.rotate_image, this);
        image.input.useHandCursor = true;


        smartSetHeight(image, 173);
        smartSetWidth(image, 173);
        image.alpha = 0;

        this.mass.push(image);

        x += 173;
        if (count == 5){
            y += 173;
            x = 563;
            count = 0;
        }
        count++;
        
    this.game.add.tween(image).to({
        alpha: 1
    }, 1500, Phaser.Easing.Cubic.InOut)
        .start();
    }

    //Уведомления
    let warning = this.game.add.image(700, 0, 'warning_message');
    warning.alpha = 0;
    smartSetHeight(warning, 200);
    this.warning = warning;

    this.firstWarning = this.game.add.text(750, 65, 'Розплутайте кабелі,\nповертаючи частини головоломки', {
        font: "Leftonade",
        fontSize: 30,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 8,
    });
    this.firstWarning.alpha = 0;

    this.secondWarning = this.game.add.text(750, 45, 'Вітаємо! Ви отримали навички\nмонтажа локальної мережі та\nполіпшили ставлення викладача!', {
        font: "Leftonade",
        fontSize: 30,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 8,
    });
    this.secondWarning.alpha = 0;    
}

rotate_image (e) {
    let key = this.mass_angles.indexOf(e.angle); 
    (key < this.mass_angles.length - 1) ? key++ : key = 0;
    e.angle = this.mass_angles[key];
    this.mistakes += 1;
    
    console.log(this.SSF.imageCheck(this.mass));
    if (this.SSF.imageCheck(this.mass)){
        this.next();
    }


}

init() {
    this._gen = this.gen();
    this.game.phone.setEnabled(true);

    this.mistakes = 0;
    this.score = 0;
}

shutdown() {
    this.game.camera.scale.setTo(1, 1);
}

next() {
    this._gen.next();
}

}