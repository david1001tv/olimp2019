import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';


export default class FirstInterviewState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Ви увійшли до кабінету та привітались з його господарем.  Людина, що займала крісло керівника відділу розробки, була стриманою, ввічливою і відчуженою. Ви не могли позбутися незатишного відчуття та нервувалися', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Взяти себе в руки та правильно відповідати на запитання було дуже важко', () => this.next());
        yield;

        this.game.displayDialogLine('Роботодавець', 'Як Ви уявляєте свій ідеальний робочий день?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ідеальний? О, Вам було що на це відповісти...', () => this.next());
        yield;

        this.buttonFirst_top.inputEnabled = true;
        this.buttonFirst_top.alpha = 1;
        this.selectFirst_top.alpha = 1;
        
        this.buttonFirst_bottom.inputEnabled = true;
        this.buttonFirst_bottom.alpha = 1;
        this.selectFirst_bottom.alpha = 1;
        yield;

        if (this.firstAnswer == 1) {
            this.game.displayDialogLine('Роботодавець', 'Роботодавець дивно на Вас подивився та потім посміхнувся', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Роботодавець поважно хитнув головою, мов щось вирішив для себе', () => this.next());
        }
        yield;

         
       this.game.displayDialogLine('Голос', 'Ви раптом збагнули, що завдяки цьому питанню можна було зрозуміти, які завдання цікаві і пріоритетні Вам, скільки часу Ви відводите на роботу і відпочинок протягом дня...', () => this.next());
       yield;

       this.game.displayDialogLine('Роботодавець', 'Чому ви хочете почати кар\'єру в сфері ІТ', () => this.next());
       yield;

       this.game.displayDialogLine('Голос', 'На сей раз Ви відразу здогадалися, що мета цього питання - прояснити Вашу мотивацію, бажання і готовність розвиватися в обраній професії. Тож відповіли Ви, обмірковуючи кожне слово та отримали вже більш зацікавлений погляд', () => this.next());
       yield;

       this.game.displayDialogLine('Роботодавець', 'Що ви зазвичай робите, коли розумієте, що не встигаєте щось зробити (занадто багато завдань)?', () => this.next());
       yield;

       this.buttonSecond_top.inputEnabled = true;
       this.buttonSecond_top.alpha = 1;
       this.selectSecond_top.alpha = 1;
       
       this.buttonSecond_bottom.inputEnabled = true;
       this.buttonSecond_bottom.alpha = 1;
       this.selectSecond_bottom.alpha = 1;
       yield;
       
       this.game.displayDialogLine('Роботодавець', 'За відповіддю, а саме за способом вирішення цієї проблеми я можу багато про що судити. Якщо людина бере на себе всі завдання, то він швидше за все не командний гравець, такий собі герой-одиночка', () => this.next());
       yield;

       this.game.displayDialogLine('Роботодавець', 'Якщо людина звернеться до менеджера з питання пріоритетності завдань і додаткових ресурсів, то він раціональний, проактивний і швидше за все буде рости', () => this.next());
       yield;

       this.game.displayDialogLine('Голос', 'Ви похитали у відповідь, як кожна розумна людина. Співбесіда підходила до кінця, і Вас запитали за Ваші досягнення', () => this.next());
       yield;

        if ( this.ConfStatus == 1) {
        this.buttonThird_top.inputEnabled = true;
        this.buttonThird_top.alpha = 1;
        this.selectThird_top.alpha = 1; 
        }
        else {
        this.buttonThird_top.inputEnabled = false;
        this.buttonThird_top.alpha = 0.5;
        this.selectThird_top.alpha = 0.5; 
        }
  
        this.buttonThird_bottom.inputEnabled = true;
        this.buttonThird_bottom.alpha = 1;
        this.selectThird_bottom.alpha = 1;
        yield;
       
       this.game.displayDialogLine('Голос', 'За результатами співбесіди Вам запропонували декілька варіантів працевлаштування, кожний із своїми вимогами, деякі з котрих залежали від обраних Вами важливих та неважливих дисциплін під час навчання в університеті. Тож деякі вакансії були Вам недоступні через нестачу знань', () => this.next());
       yield;

        //Вакансии
       this.game.add.tween(this.vac1).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.vac1).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                 this.next();
            }, 3000));
        yield;
        this.game.add.tween(this.vac2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.vac2).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                 this.next();
            }, 3000));
        yield;
        this.game.add.tween(this.vac3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.vac3).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                 this.next();
            }, 3000));
        yield;
        this.game.add.tween(this.vac4).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.vac4).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                 this.next();
            }, 3000));
        yield;

               
       this.game.displayDialogLine('Голос', 'Перша співбесіда залишила незабутні враження, але Ви ще не були впевнені, що саме ця посада заслуговує на Вас. То ж вирушили до наступного кабінету', () => this.next());
       yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        //Участвол ли в конференци: 0 - no, 1 - yes   
        this.ConfStatus = 0;

        this.firstAnswer = null;
        this.secondAnswer = null;
        this.thirdAnswer = null;

    }

    preload() {

        this.load.image('bg', './assets/images/3-1-1 (FirstInterview)/backgorund.png');

        this.load.spritesheet('button_top', './assets/images/3-1-1 (FirstInterview)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_bottom', './assets/images/3-1-1 (FirstInterview)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('vac1', './assets/images/3-1-1 (FirstInterview)/vac1.png');
        this.load.image('vac2', './assets/images/3-1-1 (FirstInterview)/vac2.png');
        this.load.image('vac3', './assets/images/3-1-1 (FirstInterview)/vac3.png');
        this.load.image('vac4', './assets/images/3-1-1 (FirstInterview)/vac4.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.vac1 = this.SSF.makeImg(660, 50, 'vac1', 600, 800);
        this.vac2 = this.SSF.makeImg(660, 50, 'vac2', 600, 800);
        this.vac3 = this.SSF.makeImg(660, 50, 'vac3', 600, 800);
        this.vac4 = this.SSF.makeImg(660, 50, 'vac4', 600, 800);

        //Вопрос 1
        let buttonFirst_top = this.game.add.button(656, 300, 'button_top', this.firstSelection, this, 1, 1, 0);
        buttonFirst_top.inputEnabled = false;
        buttonFirst_top.alpha = 0;
        this.buttonFirst_top = buttonFirst_top;

        let buttonFirst_bottom = this.game.add.button(656, 650, 'button_bottom', this.firstSelection, this, 1, 1, 0);
        buttonFirst_bottom.inputEnabled = false;
        buttonFirst_bottom.alpha = 0;
        this.buttonFirst_bottom = buttonFirst_bottom;

        this.selectFirst_top = this.game.add.text(750, 325, 'У відрядженні в Нью-Йорку', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_top.alpha = 0; 

        this.selectFirst_bottom = this.game.add.text(700, 685, 'Вирішуючи завдання складного проекту', {
            font: "Leftonade",
            fontSize: 35,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_bottom.alpha = 0;

        //Вопрос 2
        let buttonSecond_top = this.game.add.button(656, 300, 'button_top', this.secondSelection, this, 1, 1, 0);
        buttonSecond_top.inputEnabled = false;
        buttonSecond_top.alpha = 0;
        this.buttonSecond_top = buttonSecond_top;

        let buttonSecond_bottom = this.game.add.button(656, 650, 'button_bottom', this.secondSelection, this, 1, 1, 0);
        buttonSecond_bottom.inputEnabled = false;
        buttonSecond_bottom.alpha = 0;
        this.buttonSecond_bottom = buttonSecond_bottom;

        this.selectSecond_top = this.game.add.text(820, 325, 'Беру все на себе', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectSecond_top.alpha = 0; 

        this.selectSecond_bottom = this.game.add.text(760, 675, 'Звернуся до менеджеру', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectSecond_bottom.alpha = 0;

        //Вопрос 3
        let buttonThird_top = this.game.add.button(656, 300, 'button_top', this.thirdSelection, this, 1, 1, 0);
        buttonThird_top.inputEnabled = false;
        buttonThird_top.alpha = 0;
        this.buttonThird_top = buttonThird_top;

        let buttonThird_bottom = this.game.add.button(656, 650, 'button_bottom', this.thirdSelection, this, 1, 1, 0);
        buttonThird_bottom.inputEnabled = false;
        buttonThird_bottom.alpha = 0;
        this.buttonThird_bottom = buttonThird_bottom;

        this.selectThird_top = this.game.add.text(775, 325, 'Наукова конференція', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectThird_top.alpha = 0; 

        this.selectThird_bottom = this.game.add.text(690, 675, 'Я вчився, а не брав участь у конкурсах', {
            font: "Leftonade",
            fontSize: 38,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectThird_bottom.alpha = 0;

        this.next();
    }

    firstSelection(obj){
        if (obj.key == 'button_top'){
            this.firstAnswer = 1;
        }
        else {
            this.firstAnswer = 0;
        }

        this.buttonFirst_top.destroy();
        this.buttonFirst_bottom.destroy();
        this.selectFirst_top.destroy();
        this.selectFirst_bottom.destroy();
        this.next();
    }

    secondSelection(obj){
        if (obj.key == 'button_top'){
            this.secondAnswer = 1;
        }
        else {
            this.secondAnswer = 0;
        }

        this.buttonSecond_top.destroy();
        this.buttonSecond_bottom.destroy();
        this.selectSecond_top.destroy();
        this.selectSecond_bottom.destroy();
        this.next();
    }

    thirdSelection(obj){
        if (obj.key == 'button_top'){
            this.thirdAnswer = 1;
        }
        else {
            this.thirdAnswer = 0;
        }

        this.buttonThird_top.destroy();
        this.buttonThird_bottom.destroy();
        this.selectThird_top.destroy();
        this.selectThird_bottom.destroy();
        this.next();
    }


    next() {
        this._gen.next();
    }
}
