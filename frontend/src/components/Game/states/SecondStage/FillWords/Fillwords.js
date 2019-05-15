import Phaser from 'phaser';
import FillwordsComponent from './FillWordsComponent';
import SSF from '../../../states/SecondStageFunctions';

import {smartSetHeight} from '../../../utils';
import {fillwordsObjects} from '../../../fillword/fillwords';

export default class FillwordsState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Сьогодні Ви прокинулися в чудовому гуморі та готові з головою зануритися в навчання. За розкладом у Вас "Вступ до комп’ютерних наук", і ось Ви з нетерпінням чекаєте біля кафедри викладача, розмовляючи з одногрупниками о  мріях та сподіваннях', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.displayDialogLine('Голос', 'Трохи сонний Тарас Денисович, що так і не розлучився з кабелями, привів вас до аудиторії. Ви здивувалися, коли він запропонував відкласти конспекти і зосередити увагу на моніторах. Викладач пояснив, що Вам необхідно виділити серед термінів той, про який буде йти мова', () => this.next());
        yield;
        
        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.icon).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
            
        //Уведомление "Знайдіть на робочому столі ярлик і запустіть його"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.icon.inputEnabled = true;
        this.icon.input.useHandCursor = true;
        yield;

        //start game
        this.game.add.tween(this.warning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.firstWarning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.openWindow();
        yield;
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/2-2 (Fillwords)/background.png');
        this.load.image('bg2', './assets/images/2-2 (Fillwords)/background2.png');

        this.load.image('icon', './assets/images/2-2 (Fillwords)/fillwords-icon.png');
        this.load.image('field', './assets/images/2-2 (Fillwords)/fillwords-field.png');
        this.load.image('square', './assets/images/2-2 (Fillwords)/norm-fillwords-square.png');
        this.load.image('teacher', './assets/images/2-2 (Fillwords)/teacher.png');

        this.load.image('warning_message', './assets/images/2-2 (Fillwords)/warning_message.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;

        this.teacher = this.SSF.makeImg(1250, 50, 'teacher', 700, 900);


        let icon = this.game.add.image(220, 280, 'icon');
        icon.inputEnabled = false;
        icon.events.onInputDown.add(() => {
            this.next();
            icon.inputEnabled = false;
            this.game.canvas.style.cursor = "default";
        }, this);
        icon.alpha = 0;
        this.icon = icon;

        const field = this.game.add.image(600, 80, 'field');
        field.alpha = 0;
        this.field = field;

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(760, 60, 'Знайдіть на робочому столі\nярлик і запустіть його', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.thirdWarning = this.game.add.text(735, 40, 'Вітаємо! Тепер Ви можете\nрозмовляти загадковою мовою\nпрограмістів', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.thirdWarning.alpha = 0;

        this.next();
    }

    shutdown() {
        
    }

    render() {

    }

    openWindow() {
        this.field.alpha = 1;
        this.icon.inputEnabled = false;
        this.inputs = new FillwordsComponent(this.game, this.teacher, fillwordsObjects, 642, 142);
    }

    next() {
        this._gen.next();
    }
}