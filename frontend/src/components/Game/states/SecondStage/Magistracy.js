import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import todos from '../../todos/Scanner';
import SSF from '../../states/SecondStageFunctions';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Ось і настав цей знаменний день! День підбиття підсумків, коли можна гордовито сказати: Ви це зробили, Ви впоралися! Подолавши важкий і тернистий шлях навчання, здобули диплом бакалавра!', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Адам Вікторович під оплески виходить на сцену. Він розповідає про те, що ви здобули, закінчивши програму бакалавра', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Адам Вікторович', 'За ці роки ви освоїли багато навиків. Серед результатів вашого навчання: здатність застосовувати знання основних форм і законів абстрактно-логічного мислення, вміння використовувати знання з основних фундаментальних, при­родничих та загально-інженерних дисциплін, а також системного аналізу, моде­лювання систем, теорії алгоритмів, теорії прийняття рішень та дискретної математики', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Ви навчилися розробляти програмні моделі предметних середовищ, вибирати парадигму програмування, використовувати інструментальні засоби розробки клієнт-серверних застосувань, створювати розподілені бази даних, застосовувати методи, підходи та інструментальні засоби для проектування веб-застосувань та багато чому іншому', () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Тож програма бакалаврату надала вам базову освіту за професією. Ви можете починати працювати в своїй професії як кваліфікований фахівець. Для ряду спеціальностей і вакансій вища освіта є обов\'язковою умовою для роботи і диплом бакалавра - це той мінімум, якого достатньо. Вітаю вас з цим', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        
        this.game.displayDialogLine('Голос', 'Адам Вікторович запрошує студентів на сцену під гучні оплески зали та з пошаною видає заслугований диплом. Ось і Ваша черга. Хвилювання охопило кожну клітинку тіла, коли Ви отримали...', () => this.next());
        yield;

        if (this.score >= 90){
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

            this.game.add.tween(this.bachelor_red).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {  
                    this.game.add.tween(this.bachelor_red).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                    this.next();
                }, 3000));
        }
        else {
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

            this.game.add.tween(this.bachelor_blue).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => setTimeout(() => {  
                    this.game.add.tween(this.bachelor_blue).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                    this.next();
                }, 3000));
        }
        yield;

        this.game.displayDialogLine('Голос', 'Сповнені несамовитої гордості Ви повернулися до свого місця у залі та дочекалися кінця церемонії. Світ грав яскравими барвами, настрій був кращим за чудовий, але...', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви ще не відчували впевненості у своїх знаннях. Чи можливо буде працевлаштуватися вже зараз? Щось ніяково… Треба з кимось порадитися', () => this.next());
        yield;

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

            this.game.add.tween(this.thirdWarning).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start().onComplete.add(() => {
                    setTimeout(() => {
                        this.game.add.tween(this.thirdWarning).to({
                            alpha: 0
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start();
                    }, 3000);   
            });

            this.game.displayDialogLine('Голос', 'На думку одразу спала Надія. Ось хто певно допоможе Вам! Ви подзвонили їй та домовились зустрітись біля кафедри', () => this.next());
            yield;

            this.game.add.tween(this.bg2).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
            this.game.add.tween(this.girl).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.displayDialogLine('Надія', 'Привіт! Дай тебе пригорнути - вітаю з дипломом! Ну і як? Не шкодував, що обрав професію ІТ-спеціаліста?', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Ви впевнено похитали головою, адже навіть думки такої за роки навчання не виникало. Зате Вас турбувало дещо інше, чим Ви й поділилися із Надією', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Ну що тобі відповісти? Я перш ніж влаштуватись на роботу, закінчила магістратуру', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Магістратуру? Ще півтора року навчання? Ви якось не прагнули повертатись до лекційної зали. Нехотя Ви запитали, навіщо це потрібно, підсвідомо відкинувши одну лише можливість', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Бо диплому бакалавра достатньо тільки для старту твоєї кар\'єри. Але для просування по кар\'єрних сходах необхідні більш глибокі знання як в спеціальності, предметі, так і в суміжних областях', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Також це отримання додаткової спеціалізації, навичок управління. Без цього не досягти великих результатів', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Ви нагадали, що Білл Гейтс не має вищої освіти - лише два роки навчання в бакалавраті Гарвардського університету. Як на Вас, то був впевнений контраргумент. Надія дивно посміхнулась та натякнула, що Ви - не Білл Гейтс. Та що вона розуміє', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Послухай, навчання в магістратурі відкриває нові можливості для розвитку кар\'єри та нові горизонти отримання знань, розвиває вузькопрофільні і аналітичні вміння, готує фундамент для наукової або управлінської кар\'єри', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'У резюме магістра куди більше шансів потрапити на розгляд до директора, а у його власника - отримати цікаву роботу', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Та в Вас було ще одне дуже, здавалося б, вагоме твердження проти навчання. В IT-сфері все так швидко розвивається, що на магістерських програмах викладають вчорашній день', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Ймовірно, так і було ще кілька років тому. Але зараз магістратура, в основному, вчить вчитися, а значить - випускник магістратури буде більш успішно сприймати нове, володіти навичками самонавчання. Та приймати рішення лише тобі', () => this.next());
            yield;

            //выбор здобуваты или нет

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
        this.score = 0;

        //0 - girl, 1 - man
        this.friend = 0;

        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
    }

    preload() {

        this.load.image('bg', './assets/images/2-7 (Magistracy)/background.png');
        this.load.image('bg2', './assets/images/2-7 (Magistracy)/background2.png');
        this.load.image('teacher', './assets/images/2-7 (Magistracy)/teacher.png');
        this.load.image('girl', './assets/images/2-7 (Magistracy)/girl.png');

        this.load.image('warning_message', './assets/images/2-7 (Magistracy)/warning_message.png');
        
        this.load.image('bachelor_blue', './assets/images/2-7 (Magistracy)/bachelor_blue.png');
        this.load.image('bachelor_red', './assets/images/2-7 (Magistracy)/bachelor_red.png');
        this.load.image('master_blue', './assets/images/2-7 (Magistracy)/master_blue.png');
        this.load.image('master_red', './assets/images/2-7 (Magistracy)/master_red.png');

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


        this.teacher = this.SSF.makeImg(1260, 50, 'teacher', 700, 900);
        this.girl = this.SSF.makeImg(1329, 0, 'girl', 700, 900);

        this.bachelor_blue = this.SSF.makeImg(430, 210, 'bachelor_blue', 1050, 750);
        this.bachelor_red = this.SSF.makeImg(430, 210, 'bachelor_red', 1050, 750);
        this.master_blue = this.SSF.makeImg(430, 210, 'master_blue', 1050, 750);
        this.master_red = this.SSF.makeImg(430, 210, 'master_red', 1050, 750);

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(750, 65, 'Завдяки наполегливості та завзяттю\nВи отримали червоний диплом!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.secondWarning = this.game.add.text(750, 60, 'Ви отримали диплом бакалавра!\nТрішки не вистачило до червоного...', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;

        this.thirdWarning = this.game.add.text(750, 60, 'Завдяки колишнім рішенням Ви\nмаєте змогу порадитись з подругою', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.thirdWarning.alpha = 0;

        this.fourthWarning = this.game.add.text(730, 60, 'Завдяки колишнім рішенням Ви\nмаєте змогу порадитись з наставником', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.fourthWarning.alpha = 0;


        this.next();
    }

    next() {
        this._gen.next();
    }
}
