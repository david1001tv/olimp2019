import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';
import {subjectsArray} from "../../DataForSchedule/subjects";
import SSF from '../../states/SecondStageFunctions';

var PostIntro = require("../FirstStage/PostIntro.js");

const style = {
    fontSize: 20,
    font: 'Leftonade',
};

export default class ScheduleState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.phone.setEnabled(true);

        this.game.displayDialogLine('Голос', 'Ніколи ще Ви не чекали першого вересня з таким нетерпінням. І нарешті, залишивши позаду приймальну комісію, Ви стали гордим володарем студентського квитка та поки що чистої заліковки', () => this.next());
        yield;

        //пред. выбор
        if (PostIntro.GirlOrMan == "Girl") {
            this.game.displayDialogLine('Голос', 'Атмосфера актового залу, до якого Вас запросили, сповнювала душу почуттям тріумфу. Ось на сцену підійнявся чоловік, якого Ви злякалися на Дні відкритих дверей. Хто б міг подумати, що він - завідувач кафедри Комп\'ютерних наук. Не дивно, що в залі одразу настала абсолютна тиша', () => this.next());
        } else {
            this.game.displayDialogLine('Голос', 'Атмосфера актового залу, до якого Вас запросили, сповнювала душу почуттям тріумфу. Ось на сцену підійнявся вже знайомий Вам чоловік. Не дивно, що в залі одразу настала абсолютна тиша', () => this.next());
        }
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Адам Викторович', 'Вітаю вас із знаменною подією у вашому житті. Ви стали студентами факультету Інформаційних технологій.  Можливо, цей маленький крок визначить ваше майбутнє', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Викторович', 'В університеті ви отримаєте фундаментальні знання і навички самостійної роботи. Справа за вами: від вашого прагнення до навчання і бажання проявити себе залежить те, як багато ви отримаєте в роки навчання. Успіхів!', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Ви вирішили, що його порада стане для Вас життєвим кредо. Коли відлунали останні звуки урочистої церемонії Ви разом з одногрупниками вирушили до кабінету кафедри, де належало познайомитися з навчальним планом і викладачами', () => this.next());
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Куратор Вашої групи - худий високий чоловік з мотком кабелів на довгій шиї. У нього розгублений погляд, коли завідувач кафедри відволікає його від комутаторів у великій металевій шафі біля стіни. Один з кабелів, зачепившись, ледь не придушує його', () => this.next());
        yield;

        this.game.add.tween(this.teacher2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Тарас Денисович', 'Мене звати Тарас. Тарас Денисович. На своїх лекціях я ознайомлю вас з сучасними мережевими технологіями і системним адмініструванням. Та в мене так багато справ. Йдіть краще познайомтесь з іншими викладачами', () => this.next());
        yield;

        this.game.add.tween(this.teacher2).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Завідувач всміхнувся та подивився на вас з потаємним співчуттям', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Адам Викторович', 'Я викладаю розробку програмного забезпечення. Настільні, мобільні додатки, веб-програмування, тестування - все це ви будете опановувати під моїм керівництвом', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Викторович', 'Звуть мене Адам Вікторовіч, а з кожним з вас я познайомлюсь на своїх практичних заняттях. Тож раджу бути присутніми на них', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Поки він говорив, до вас наблизилась Анастасія Марковна, привертаючи увагу всіх юнаків, що одразу приосанились', () => this.next());
        yield;

        this.game.add.tween(this.teacher3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Анастасія Марковна', 'Моя сфера - комп\'ютерна графіка та веб-дизайн. Працюючи з сучасними графічними редакторами, ми з вами будемо створювати макети сайтів, анімаційні ролики, графічні елементи композицій та багато іншого. Сподіваюся, мої предмети змусять прокинутися в вас творчі таланти. Кращим стає лише той дизайнер, що відчуває креативне у звичайному', () => this.next());
        yield;

        this.game.add.tween(this.teacher3).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();


        this.game.displayDialogLine('Голос', 'Ви познайомились ще з кількома викладачами кафедри та вже збиралися йти подому, як ваш куратор згадав дещо важливе', () => this.next());
        yield;

        this.game.add.tween(this.teacher2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Тарас Денисович', 'Обов\'язково ознайомтеся з розкладом! Розподіліть між основними дисциплінами бажану кількість годин. А з додаткових виберіть ті, що вважаєте необхідними для отримання знань за фахом. Будьте розсудливі - це ваші знання!', () => this.next());
        yield;

        this.game.add.tween(this.teacher2).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.buttonGo).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.buttonGo.inputEnabled = true;
        this.game.add.tween(this.buttonGo).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.button_text).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        //Game start
        this.startGame();

        //Уведомление "Цей вибір вплине на Вашу історію"
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
        yield;

        this.buttonGo.inputEnabled = false;
        this.game.add.tween(this.buttonGo).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.button_text).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg4).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Ви ознайомились з навчальним планом кафедри, визначили важливі на Вашу думку дисципліни, та розподілили часи на викладання основних. Втомленні але задоволені Ви повертаєтесь до дому', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Попереду чекає ще багато цікавих дней. Ваша професія занадто швидко розвивається, щоб щоб залишився час для нудьги', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();

    }

    preload() {
        this.load.image('bg', './assets/images/2-1 (Shedule)/background.png');
        this.load.image('bg2', './assets/images/2-1 (Shedule)/background2.png');
        this.load.image('bg3', './assets/images/2-1 (Shedule)/background3.png');

        this.load.image('ok', './assets/images/2-1 (Shedule)/ok.png');
        this.load.image('btn-white', './assets/images/2-1 (Shedule)/btn-white.png');
        this.load.image('btn-grey', './assets/images/2-1 (Shedule)/btn-grey.png');

        this.load.image('teacher', './assets/images/2-1 (Shedule)/teacher.png');
        this.load.image('teacher2', './assets/images/2-1 (Shedule)/teacher2.png');
        this.load.image('teacher3', './assets/images/2-1 (Shedule)/teacher3.png');
        this.load.image('warning_message', './assets/images/2-1 (Shedule)/warning_message.png');
        this.load.spritesheet('button_go', './assets/images/2-1 (Shedule)/Button_Rozklad_On.png', 225, 44);
    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        this.score = 0;
        this.count = 0;

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;

        let bg3 = this.game.add.image(0, 0, 'bg3');
        bg3.height = this.game.width * bg3.height / bg3.width;
        bg3.width = this.game.width;
        bg3.alpha = 0;
        this.bg3 = bg3;

        this.teacher = this.SSF.makeImg(1260, 50, 'teacher', 700, 900); //programmer
        this.teacher2 = this.SSF.makeImg(1250, 50, 'teacher2', 700, 900); //network
        this.teacher3 = this.SSF.makeImg(1260, 0, 'teacher3', 700, 900); //design

        let buttonGo = this.game.add.button(1190, 830, 'button_go', () => this.next(), this, 1, 1, 0);
        buttonGo.inputEnabled = false;
        buttonGo.alpha = 0;
        this.buttonGo = buttonGo;

        let button_text = this.addTextOnSprite(1270, 840, 'ГОТОВО', style).addColor('#ffffff', 0);
        button_text.alpha = 0;
        this.button_text = button_text;

        this.next();
    }

    startGame() {
        style.fontSize = 25;
        let mainSubj = this.addTextOnSprite(580, 115, 'ОБОВ\'ЯЗКОВІ ДИСЦИПЛІНИ ПРОФЕСІЙНОГО І ПРАКТИЧНОГО СПРЯМУВАННЯ', style);
        mainSubj.addColor('#ffffff', 0);
        let optionalSubj = this.addTextOnSprite(830, 595, 'ДОДАТКОВІ ДИСЦИПЛІНИ', style);
        optionalSubj.addColor('#ffffff', 0);

        this.subjects = {};

        subjectsArray.forEach((subject) => {
            style.fontSize = 20;
            if (subject.color) {
                let numColumn = this.addTextOnSprite(subject.posX, subject.posY, subject.id, style);
                numColumn.addColor(subject.color, 0);

                let paddingLeft = 110;
                let firstColumnName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY, subject.firstColumnName, style);
                firstColumnName.addColor(subject.color, 0);

                paddingLeft = 350;
                let secondColumnName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY, subject.secondColumnName, style);
                secondColumnName.addColor(subject.color, 0);
                return;
            }

            this.addTextOnSprite(subject.posX, subject.posY, subject.optionalSubjectId || subject.mainSubjectId, style);

            let paddingLeft = subject.mainSubjectId ? (subject.mainSubjectId < 10 ? 35 : 40) : 35;
            let paddingTop = 10;

            let subjectName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY - paddingTop, subject.subjectName, style);

            subjectName.lineSpacing = -13;
            subjectName.inputEnabled = true;
            subjectName.input.useHandCursor = true;
            subjectName.events.onInputDown.add(() => {
                //TODO: add normal displaying of subjects info
                alert(subject.subjectName);
            });

            let minusButton = null;
            let plusButton = null;
            let checkbox = null;
            let hoursText = null;
            if (subject.minusButton && subject.plusButton) {
                paddingLeft = 60;
                paddingTop = 7;
                hoursText = this.addTextOnSprite(subject.minusButton.posX + paddingLeft, subject.minusButton.posY + paddingTop, subject.hours, style);

                minusButton = this.game.add.image(subject.minusButton.posX, subject.minusButton.posY, subject.minusButton.name);
                minusButton.inputEnabled = true;
                minusButton.input.useHandCursor = true;
                minusButton.events.onInputDown.add(this.handleMinusClick, this);

                paddingLeft = 15;
                paddingTop = -2;
                style.fontSize = 30;
                this.addTextOnSprite(subject.minusButton.posX + paddingLeft, subject.minusButton.posY + paddingTop, subject.minusButton.symbol, style);

                plusButton = this.game.add.image(subject.plusButton.posX, subject.plusButton.posY, subject.plusButton.name);
                plusButton.inputEnabled = true;
                plusButton.input.useHandCursor = true;
                plusButton.events.onInputDown.add(this.handlePlusClick, this);

                paddingLeft = 13;
                this.addTextOnSprite(subject.plusButton.posX + paddingLeft, subject.plusButton.posY + paddingTop, subject.plusButton.symbol, style);
            }
            if (subject.checkbox) {
                checkbox = this.game.add.image(subject.checkbox.posX, subject.checkbox.posY, subject.checkbox.name);
                checkbox.inputEnabled = true;
                checkbox.input.useHandCursor = true;
                checkbox.events.onInputDown.add(this.handleCheckboxClick, this);
                checkbox.isChecked = false;
            }

            let key = subject.mainSubjectId ? 'main_subject_' + subject.mainSubjectId : 'optional_subject_' + subject.optionalSubjectId
            minusButton ? minusButton.key = key : null;
            plusButton ? plusButton.key = key : null;

            this.subjects[key] = {
                id: subject.mainSubjectId || subject.optionalSubjectId,
                subjectName: subjectName,
                minusButton: minusButton,
                plusButton: plusButton,
                checkbox: checkbox,
                hours: subject.hours,
                min: subject.min,
                max: subject.max,
                hoursText: hoursText,
                subjectObj: subject
            };
        });

        let bg4 = this.game.add.image(0, 0, 'bg2');
        bg4.height = this.game.width * bg4.height / bg4.width;
        bg4.width = this.game.width;
        bg4.alpha = 0;
        this.bg4 = bg4;

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(735, 80, 'Цей вибір вплине на Вашу історію', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;
    }

    handleCheckboxClick(checkbox) {
        if (!checkbox.isChecked) {
            if (this.count === 4) {
                alert('too much optional subjects');
                // TODO: add message about too much checked optional subjects
                return;
            }
            checkbox.ok = this.game.add.image(checkbox.world.x, checkbox.world.y - 5, 'ok');
            checkbox.isChecked = true;
            this.count++;
        } else {
            checkbox.ok.destroy();
            checkbox.isChecked = false;
            this.count--;
        }
    }

    handleMinusClick(button) {
        if (this.subjects[button.key].hours - 1 >= this.subjects[button.key].min) {
            this.reduceHours(button.key);

            let key = 'main_subject_' + (this.subjects[button.key].id + 1);
            if (this.subjects[key]) {
                if (this.subjects[key].hours + 1 <= this.subjects[key].max) {
                    this.produceHours(key);
                }
            } else {
                key = 'main_subject_1';
                if (this.subjects[key] && this.subjects[key].hours + 1 <= this.subjects[key].max) {
                    this.produceHours(key);
                }
            }
        }
    }

    handlePlusClick(button) {
        if (this.subjects[button.key].hours + 1 <= this.subjects[button.key].max) {
            this.produceHours(button.key);

            let key = 'main_subject_' + (this.subjects[button.key].id + 1);
            if (this.subjects[key]) {
                if (this.subjects[key].hours - 1 >= this.subjects[key].min) {
                    this.reduceHours(key);
                }
            } else {
                key = 'main_subject_1';
                if (this.subjects[key] && this.subjects[key].hours - 1 >= this.subjects[key].min) {
                    this.reduceHours(key);
                }
            }
        }
    }

    produceHours(key) {
        style.fontSize = 20;
        this.subjects[key].hours++;
        this.subjects[key].hoursText.destroy();
        this.subjects[key].hoursText = this.addTextOnSprite(this.subjects[key].subjectObj.minusButton.posX + 60, this.subjects[key].subjectObj.minusButton.posY + 7, this.subjects[key].hours, style);
    }

    reduceHours(key) {
        style.fontSize = 20;
        this.subjects[key].hours--;
        this.subjects[key].hoursText.destroy();
        this.subjects[key].hoursText = this.addTextOnSprite(this.subjects[key].subjectObj.minusButton.posX + 60, this.subjects[key].subjectObj.minusButton.posY + 7, this.subjects[key].hours, style);
    }

    addTextOnSprite(x, y, text, style) {
        return this.add.text(x, y, text, style);
    }

    next() {
        this._gen.next();
    }
}
