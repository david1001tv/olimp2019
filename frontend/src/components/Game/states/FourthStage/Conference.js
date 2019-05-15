import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';

export default class WWHState extends Phaser.State {
    * gen() {

        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Як же приємно дивитися на величну сучасну споруда, усвідомлюючи, що Ви працюєте в одному з її комфортабельних офісів. Вам подобається Ваша робота, колектив, сфера діяльності, але останнім часом все частіше стали відвідувати думки про кар\'єрний ріст', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Можливо, саме сьогодні доля  надасть Вам шанс?', () => this.next());
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        //Данные из БД
        if (this.friend == 0){
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

            this.game.displayDialogLine('Голос', 'Під час перерви до Вашого робочого місця заглянула Надія. Вона працювала в сусідньому офісі, і Ви багато часу проводили разом', () => this.next());
            yield;

            this.game.add.tween(this.girl).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.displayDialogLine('Надія', 'Привіт! Ну що, твої валізи вже зібрані? Я сподіваюсь, ти не збираєшся пропустити курс підвищення кваліфікації в Празі? П\'ять днів конференцій, семінарів, форумів - це чудова можливість для професійного росту! Начальство схвалює і заохочує', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Професійний ріст? Він не так помітний, як кар\'єрний, його можна відмітити за більш якісним і швидким виконанням поставлених завдань, за зростанням Ваших показників, щодо підвищення затребуваності серед клієнтів', () => this.next());
            yield;
            
            this.game.displayDialogLine('Голос', 'Та професійний ріст не супроводжується підвищенням статусу, зарплати, тож навіщо він Вам?', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Не лякай мене! Це зростання професійних знань, умінь і навичок, визнання професійним співтовариством результатів твоєї праці, авторитету в професійної діяльності. Для керівників фахівці, які розвиваються професійно, більш затребувані. Крім того, професійний ріст сприяє і кар\'єрному.', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Залишилось лише погодитися із нею. Серед варіантів професійного росту: усіх конференцій, курсів підвищення кваліфікації, тренінгів та семінарів, - "Управління IT інфраструктурою, розробка стратегії IT" - досить цікавий, щоб зосередитись на ньому', () => this.next());
            yield;

            this.game.add.tween(this.girl).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.add.tween(this.bg3).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        }
        else {

        }

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(this.score);



    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: "TRANSLATE",
            text: "Допомогти з перекладом"
        });
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('11:00');
        this.game.phone.setDate('21.07.18');

        //Подгрузить из бд, с кем выбор из 1 этапа: 0 - girl; 1 - man
        this.friend = 0;
    }

    preload() {
        this.load.image('bg', './assets/images/4-1 (Conference)/background.png');
        this.load.image('bg2', './assets/images/4-1 (Conference)/workbanch.png');
        this.load.image('bg3', './assets/images/4-1 (Conference)/background2.png');
        this.load.image('bg4', './assets/images/4-1 (Conference)/background3.png');

        this.load.image('teacher', './assets/images/4-1 (Conference)/teacher.png');
        this.load.image('girl', './assets/images/4-1 (Conference)/girl.png');

        this.load.image('warning_message', './assets/images/4-1 (Conference)/warning_message.png');


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

        let bg3 = this.game.add.image(0, 0, 'bg3');
        bg3.height = this.game.width * bg3.height / bg3.width;
        bg3.width = this.game.width;
        bg3.alpha = 0;
        this.bg3 = bg3;

        this.teacher = this.SSF.makeImg(1260, 50, 'teacher', 700, 900);
        this.girl = this.SSF.makeImg(1329, 0, 'girl', 700, 900);

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(750, 80, 'Надія - Ваша подруга на віки вічні!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;
        
        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }

}