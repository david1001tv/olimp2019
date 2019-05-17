import Phaser from 'phaser';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';
import {smartSetHeight, smartSetWidth} from '../../utils';

export default class testGame extends Phaser.State {
    * gen() {
        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  
        
        this.game.displayDialogLine('Голос', 'Нарешті завершилася робота над проектом. Ви зібрали докупи всі частини, залишилося лише провести тестування на роботоспроможність', () => this.next());
        yield;
                
        this.game.displayDialogLine('Голос', 'Але що це?! У роботі баги! Треба терміново позбутися від них!', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Чому буває так, що програми працюють неправильно? Все дуже просто - вони створюються і використовуються людьми. Якщо припуститься помилки, це може привести до проблеми в роботі програми - вона використовується неправильно, а значить, може повести себе не так, як очікувалося', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Дефект, Баг (Defect, Bug) - недолік компонента або системи, який може привести до відмови певної функціональності. Дефект, виявлений під час виконання програми, може викликати відмову окремого компонента або всієї системи', () => this.next());
        yield;

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

        this.game.setfixBugsEnabled(true);
        yield;
        this.game.setfixBugsEnabled(false);

        this.game.displayDialogLine('Голос', 'Наближавшся час, коли потрібно здавати проект. Все, що могли, Ви зробили', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
      
    }

    @autobind
    handleBrowserEvent(_, event) {
        if (event === 'yes') {
            console.log("go");
            this.next();
        }

    }

    init() {
        this.game.phone.setEnabled(true);
        this._gen = this.gen();

    }

    preload() {
        this.load.image('bg', './assets/images/4-3 (FixBugs)/bg.png');
        this.load.image('warning_message', './assets/images/4-3 (FixBugs)/warning_message.png');     
    }

    create() {
        this.token = PubSub.subscribe('goNext', this.handleBrowserEvent);
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        this.flag_kiy = false;
        this.flagBackspace = false;

        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 180);
        this.warning = warning;

        this.firstWarning = this.game.add.text(770, 45, 'Натискаючи на "баги"\nпроекту, позбудьтесь їх', {
            font: "Leftonade",
            fontSize: 35,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;
    
        this.next();
    }

    shutdown() {
        PubSub.unsubscribe(this.token);
    }
    next() {
        this._gen.next();
    }
   
}