import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';


export default class IntroState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  

        this.game.displayDialogLine('Голос', 'Промайнули шкільні тижні, і сьогодні Ви склали останній іспит. Що чекає попереду?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Хочеться досягти успіху, щоб ніколи не наздогнало почуття жалю за нездійсненним. Настав час планувати майбутнє. Настав час обрати майбутню професію.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Здається, що всі Ваші однолітки вже встигли визначитися і залишилися лише Ви. Але професій так багато, що Ви відчуваєте себе розгубленим. Лікар? Вчитель? Космонавт? Все не те.', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', '* У вас під ногами щось зашаруділо*', () => this.next());
        yield;

        this.camera.scale.setTo(1, 1);
        this.camera.x = 1128 * 5;
        this.camera.y = 350 * 5 - 300;
        let firstStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        let secondStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        let thirdStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
    
        firstStep.chain(secondStep, thirdStep);
        this.game.add.tween(this.camera.scale).to({
            x: 1.2,
            y: 1.2,
        }, 2000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
        firstStep.start();
        yield;

        this.buttonYes.alpha = 1;
        this.buttonNo.alpha = 1;
        yield;

        if (this.answer == 'No'){
            this.game.displayDialogLine('Ви', 'А раптом це щось важливе, думаю варто подивитися', () => this.next());
        }
        else {
            this.game.displayDialogLine('Ви', 'Треба подивитися', () => this.next());
        }
        yield;

        this.booklet.alpha = 1;

        this.game.displayDialogLine('Ви', 'Хм, а це вже цікаво, комп\'ютери... програмування... я завжди цим цікавився', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Думаю, мені варто зареєструватися', () => this.next());
        yield;
        
        //регистрация

        this.game.displayDialogLine('Ви', 'Готово, а де це взагалі знаходиться? Може бути інформація є на зворотному боці буклета?', () => this.next());
        yield;

        this.booklet.alpha = 0;
        this.booklet_back.alpha = 1;
        yield;

        //карта

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('13:56');
        this.game.phone.setDate('02.07.18');
        this.answer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/1-0 (Intro)/background.png');
        this.load.image('booklet', './assets/images/1-0 (Intro)/booklet.png');
        this.load.image('booklet_back', './assets/images/1-0 (Intro)/booklet_back.png');

        this.load.image('button_yes', './assets/images/1-0 (Intro)/button_yes.png');
        this.load.image('button_no', './assets/images/1-0 (Intro)/button_no.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let buttonYes = this.game.add.button(this.game.world.centerX + 300, 300, 'button_yes', this.actionOnClick, this, 2, 1, 0);
        let buttonNo = this.game.add.button(this.game.world.centerX - 650, 300, 'button_no', this.actionOnClick, this, 2, 1, 0);
        buttonYes.alpha = 0;
        buttonNo.alpha = 0

        this.buttonYes = buttonYes;
        this.buttonNo = buttonNo;
        


        let booklet = this.game.add.image(this.game.world.centerX - 100, this.game.world.centerY - 510, 'booklet');
        booklet.alpha = 0;
        this.booklet = booklet;

        let booklet_back = this.game.add.image(this.game.world.centerX - 100, this.game.world.centerY - 510, 'booklet_back');
        booklet_back.alpha = 0;
        this.booklet_back = booklet_back;

        // let mom = this.game.add.image(1612, 200, 'mom');
        // smartSetHeight(mom, 668);
        // mom.alpha = 0;
        // this.mom = mom;

        // let david = this.game.add.image(1128, 280, 'd-sits');
        // smartSetHeight(david, 551);
        // this.david = david;

        // let printer = this.game.add.image(284, 340, 'printer');
        // smartSetHeight(printer, 178);

        // let bgPhone = this.game.add.image(882, 0, 'bg-phone');
        // bgPhone.visible = false;
        // this.bgPhone = bgPhone;

        // let mobile = this.game.add.image(1277, 73, 'mobile');
        // mobile.visible = false;
        // smartSetHeight(mobile, 920);
        // this.mobile = mobile;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    actionOnClick(obj) {
        console.log(obj.key);
        if (obj.key == 'button_yes'){
            this.answer = 'Yes';
        }
        else {
            this.answer = 'No';
        }
        this.buttonYes.destroy();
        this.buttonNo.destroy();
        this.next();
    }

    next() {
        this._gen.next();
    }

}
