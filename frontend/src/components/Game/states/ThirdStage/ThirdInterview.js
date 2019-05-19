import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';


export default class ThirdInterviewState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'З цим роботодавцем у Вас була попередня співбесіда за телефоном. Це було добрим знаком - Ваше резюме пройшло попередній відбір. Ви отримали запрошення пройти очну співбесіду та вже не так сильно хвилювалися', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Але варто було пам\'ятати, що Ваші відповіді не повинні суперечити тим, що були раніше. Ви відкрили двері і, перш ніж сісти на запропонований стілець, спокійно привіталися з ще декількома кандидатами на посаду. Це була групова співбесіда', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви проявили самовладання і дотримувалися правил пристойності - ввічливість, доброзичливість і повага до чужої думки, хоча й іноді бажання перебити і розкритикувати конкурента, який говорив дурниці, затьмарювало розум', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Уважно вислухавши кожного конкурента, Ви зфіксували слабкі і сильні місця у відповідях і будували свої відповіді з урахуванням поміченого', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Роботодавець', 'Що ви будете робити, якщо кінцевий користувач скаже, що файл втрачено?', () => this.next());
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

        if (this.firstAnswer == 1) {
            this.game.displayDialogLine('Роботодавець', 'Так, це вірна відповідь, та краще було б спочатку виконати пошук на диску, щоб переконатися, що вони не були перенесені в іншу папку', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Дуже добре, навіть розповіли про знімки VSS, відновлення кінцевих користувачів в Провіднику і способах відновлення в їх улюбленій програмі зі створення резервних копій. Ви надзвичайно підковані у питанні!', () => this.next());
        }
        yield;

        this.game.displayDialogLine('Роботодавець', 'Уявіть, що я менеджер, і поясніть мені, що таке DNS', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Цікаве завдання! Відкрите питання загального плану грало роль тесту на комунікативні здібності і було відмінною можливістю для отримання бонусних балів. Тож...', () => this.next());
        yield;

        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        if (this.NetworkCoef) {
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

        if (this.secondAnswer == 0) {
            this.game.displayDialogLine('Роботодавець', 'Шкода, що Ви не можете пояснити, як відбувається виконання DNS-запиту, принцип роботи форвардерів та завантаження в активний каталог (Active Directory)', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Ви вирішили частину корпоративних завдань. Так тримати!', () => this.next());
        }
        yield;
        
        this.game.displayDialogLine('Роботодавець', 'Вас прийняли на роботу і тепер Вам належить обрати ноутбук. Яким буде ваш вибір?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Здається, у цей момент в Вас хотіли викликати хвилювання. Виказати...', () => this.next());
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

        if (this.thirdAnswer == 1) {
            this.game.displayDialogLine('Роботодавець', 'Тепер я впевнений в тому, що системне адміністрування для Вас - це спосіб життя, а не просто хобі', () => this.next());
        }
        else {
            this.game.displayDialogLine('Роботодавець', 'Хотілося б бачити радість при думці, що Вам належить вибрати нове "залізо"', () => this.next());
        }
        yield;
        
        this.game.add.tween(this.employer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
       
        this.game.displayDialogLine('Голос', 'Також Вас запитали, як Ви плануєте своє майбутнє. Адміністрування систем Windows - це відмінний шлюз в безліч різних професій. Ви з пристрастю відповіли, що мрієте піти в управління, щоб стати наступним CIO', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Тож роботодавець зазначив, що Ви будете намагатися показати кращий результат, щоб просуватися вгору по сходах. Вам запропонували кілька вакансій', () => this.next());
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

               
        this.game.displayDialogLine('Голос', 'Як же співбесіди виснажують морально! Але Ви виходили з кабінета останнього работодавця з легким серцем, адже не розгубились і показали себе з кращого боку', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(0);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        //Коэффициент комп. сетей максимальный?: 0 - no, 1 - yes   
        let subjects = this.game.getSubjects();
        console.log(subjects);
        subjects.then(res => {
            this.NetworkCoef = res.second_proff > 1;
            this.next();
        });

        this.firstAnswer = null;
        this.secondAnswer = null;
        this.thirdAnswer = null;

    }

    preload() {

        this.load.image('bg', './assets/images/3-1-3 (ThirdInterview)/backgorund.png');
        this.load.image('bg2', './assets/images/3-1-3 (ThirdInterview)/backgorund2.png');
        this.load.image('employer', './assets/images/3-1-3 (ThirdInterview)/employer.png');

        this.load.spritesheet('button_top', './assets/images/3-1-3 (ThirdInterview)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_bottom', './assets/images/3-1-3 (ThirdInterview)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('vac1', './assets/images/3-1-3 (ThirdInterview)/vac1.png');
        this.load.image('vac2', './assets/images/3-1-3 (ThirdInterview)/vac2.png');
        this.load.image('vac3', './assets/images/3-1-3 (ThirdInterview)/vac3.png');
        this.load.image('vac4', './assets/images/3-1-3 (ThirdInterview)/vac4.png');

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

        this.selectFirst_top = this.game.add.text(755, 330, 'Відновлю з резервної копії', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_top.alpha = 0; 

        this.selectFirst_bottom = this.game.add.text(780, 660, 'Зпершу перевірю, що його не\nперенесли до іншої папки', {
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

        this.selectSecond_top = this.game.add.text(780, 305, 'Розповісти, як відбувається\nвиконання DNS-запиту', {
            font: "Leftonade",
            fontSize: 35,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectSecond_top.alpha = 0; 

        this.selectSecond_bottom = this.game.add.text(730, 675, 'Коротко пояснити принцип ', {
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

        this.selectThird_top = this.game.add.text(710, 325, 'Радість і захоплення можливістю', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectThird_top.alpha = 0; 

        this.selectThird_bottom = this.game.add.text(760, 675, 'Спокій і зосередженість', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectThird_bottom.alpha = 0;
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
