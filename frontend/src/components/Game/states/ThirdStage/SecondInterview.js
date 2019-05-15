import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';


export default class SecondInterviewState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Цей кабінет з порога вдихнув у Вас життя і квітуче натхнення. Так що до крісла перед роботодавцем Ви сідали повні рішучості й нетерпіння. До Вас ставилися з повагою і симпатією, запропонували чашку чаю і ввічливо запитали про погоду', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', ' Посміхаючись, Ви надали роботодавцю разом з резюме портфоліо своїх найкращих графічних робіт. І почалась співбесіда...', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Роботодавець', 'Що ви будете робити, якщо у вас залишилася одна задача, або взагалі не залишиться?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Навчені досвідом, Ви задумалися над питанням. Напевно, роботодавець хоче з\'ясувати, чи візьмете Ви собі додаткову роботу', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.buttonFirst_top.inputEnabled = true;
        this.buttonFirst_top.alpha = 1;
        this.selectFirst_top.alpha = 1;
        
        this.buttonFirst_bottom.inputEnabled = true;
        this.buttonFirst_bottom.alpha = 1;
        this.selectFirst_bottom.alpha = 1;
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Роботодавець', 'Роботодавець вислухавши Вашу відповідь, щось записав собі до блокноту', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Вас запитали за Ваш процес створення дизайну, попрохали розповісти про методи, які Ви використовуєте', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви подумки відзначили, що він намагається з\'ясувати, які Ви на ділі. Треба бути обачливими', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        if ( this.ConfStatus === 1) {
            this.buttonSecond_top.inputEnabled = true;
            this.buttonSecond_top.alpha = 1;
            this.selectSecond_top.alpha = 1; 
            }

        else {
            this.buttonSecond_top.inputEnabled = false;
            this.buttonSecond_top.alpha = 0.5;
            this.selectSecond_top.alpha = 0.5; 
            }
      
        this.buttonSecond_bottom.inputEnabled = true;
        this.buttonSecond_bottom.alpha = 1;
        this.selectSecond_bottom.alpha = 1;
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        
        if (this.secondAnswer === 0){
            this.game.displayDialogLine('Роботодавець', 'Було б непогано, якби Ви розповіли про підхід, орієнтований на користувача. Ще більш ефективно було б показати це в рамках конкретного проекту. Шкода, що у Вас не було досвіду', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Не бійтеся того, що Ваш процес відрізняється від методів роботи інших дизайнерів. Головне - Ви показали логічне обгрунтування того, чому Ви вирішили саме так виконати завдання. Це гідна відповідь. Дякую', () => this.next());
        }
        yield;

        this.game.displayDialogLine('Роботодавець', 'Як Ви працюєте з іншими дизайнерами, програмістами, керівниками проектів?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ага! Він намагається з\'ясувати, чи вписуєтися Ви до культури компанії, хоче зрозуміти Ваш стиль роботи', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', '*Набувши серйозного вигляду, Ви офіційним тоном відповіли...*', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.buttonThird_top.inputEnabled = true;
        this.buttonThird_top.alpha = 1;
        this.selectThird_top.alpha = 1; 
  
        this.buttonThird_bottom.inputEnabled = true;
        this.buttonThird_bottom.alpha = 1;
        this.selectThird_bottom.alpha = 1;
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        if (this.thirdAnswer == 1){
            this.game.displayDialogLine('Роботодавець', 'Добре, що Ви знаєте, як ефективно повідомляти про свої рішення всій команді', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Майте на увазі, що кожен член команди, ймовірно, бачить проект зі своєї точки зору. Однак Вам потрібно вміти спілкуватися з усіма, щоб швидко запобігти будь-які проблеми чи непорозуміння', () => this.next());
        }
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Співбесіда добігала кінця. Ви розповіли про проект, яким пишаєтися найбільше, коли роботодавець намагався з\'ясувати Ваші сильні і слабкі сторони. Вам запропонували пройти швидкий тест на логіку та ерудицію, після чого надали на вибір наступні вакансії*', () => this.next());
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
        .start();

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

        this.game.add.tween(this.bg2).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
        .start();
               
        this.game.displayDialogLine('Голос', 'Цей досвід співбесіди був корисним. Залишилося навідатися ще до одного кабінету', () => this.next());
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

        this.load.image('bg', './assets/images/3-1-2 (SecondInterview)/backgorund.png');
        this.load.image('bg2', './assets/images/3-1-2 (SecondInterview)/backgorund2.png');
        this.load.image('employer', './assets/images/3-1-2 (SecondInterview)/employer.png');

        this.load.spritesheet('button_top', './assets/images/3-1-2 (SecondInterview)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_bottom', './assets/images/3-1-2 (SecondInterview)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('vac1', './assets/images/3-1-2 (SecondInterview)/vac1.png');
        this.load.image('vac2', './assets/images/3-1-2 (SecondInterview)/vac2.png');
        this.load.image('vac3', './assets/images/3-1-2 (SecondInterview)/vac3.png');
        this.load.image('vac4', './assets/images/3-1-2 (SecondInterview)/vac4.png');

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

        this.employer = this.SSF.makeImg(1220, 50, 'employer', 700, 900);

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

        this.selectFirst_top = this.game.add.text(715, 330, 'Зізнатися, що у Вас є вільний час', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_top.alpha = 0; 

        this.selectFirst_bottom = this.game.add.text(730, 680, 'Займатися самонавчанням', {
            font: "Leftonade",
            fontSize: 45,
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

        this.selectSecond_top = this.game.add.text(780, 310, 'Показати, як Ви працювали\nнад проектами в минулому', {
            font: "Leftonade",
            fontSize: 35,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectSecond_top.alpha = 0; 

        this.selectSecond_bottom = this.game.add.text(780, 655, 'Описати потенційний підхід\nдо типового проекту', {
            font: "Leftonade",
            fontSize: 35,
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

        this.selectThird_top = this.game.add.text(705, 330, 'Дизайн - це командний вид спорту', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectThird_top.alpha = 0; 

        this.selectThird_bottom = this.game.add.text(705, 675, 'Моя точка зору найголовніша!', {
            font: "Leftonade",
            fontSize: 45,
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
