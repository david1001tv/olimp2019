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
        if (!this.friend){
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

            
            this.game.displayDialogLine('Голос', 'З кабінету Вашого начальника вийшов Адам Вікторович. Побачивши Вас, він здивовано посміхнувся та наблизився', () => this.next());
            yield;

            this.game.add.tween(this.teacher).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.displayDialogLine('Адам Вікторович', 'Так ти влаштувався до однієї з найпрестижніших компаній? Вельми амбітно. Втім, я не сумнівався у тобі, великий потенціал завжди спрямований на великі можливості', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'У Вас була перерва, тож Ви, замість того, щоб розпрощатися, заговорили про роботу і якось непомітно розговорилися. Адам, як він дозволив себе називати, виявився приємним співрозмовником, розумним, уважним, з по-англійськи тонким гумором. Ви розповіли йому про бажання кар\'єрного росту', () => this.next());
            yield;

            this.game.displayDialogLine('Адам Вікторович', 'Для кар\'єрного росту необхідний ріст професійний. Твої знання і вміння, досвід, авторитет в професійних колах - все це впливає на швидкість і якість твоєї роботи. Якщо керівник бачить твій розвиток як фахівця, він задумається і над підвищенням', () => this.next());
            yield;

            this.game.displayDialogLine('Адам Вікторович', 'Шляхи професійного розвитку бувають різні. Це може бути вертикальний ріст, більше залежить від амбіцій особистості, або горизонтальне зростання, що передбачає отримання нових завдань, знань, можливостей, розширення функціоналу', () => this.next());
            yield;

            this.game.displayDialogLine('Адам Вікторович', 'Адже навіть перехід з одного проекту в інший, вивчення нових технологій, збільшення проектної команди, наприклад, з 3-х до 5-ти осіб, можна розцінювати як професійне зростання', () => this.next());
            yield;

            this.game.displayDialogLine('Адам Вікторович', 'Тож я пропоную тобі відвідати курс підвищення кваліфікації “Управління IT інфраструктурою, розробка стратегії IT”, що незабаром розпочнеться у Лондоні. Тебе очікують конференції та семінари із провідними фахівцями. Я домовлюсь з твоїм босом, якщо вирішиш поїхати', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Ви змогли лише кивнути, уражені можливостями, що раптово звалилися на Вас. Тиждень в Лондоні, занурення в ІТ - про це можна було лише мріяти! Треба збирати валізи', () => this.next());
            yield;

            this.game.add.tween(this.teacher).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

        }

        this.game.add.tween(this.bg3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Коли Ви потрапили на конференцію, у Вас перехопило подих. Це був величезний майданчик з відкритим верхом і сценою. Ви ще ніколи не бачили такого скупчення програмістів, системних адмінів та дизайнерiв з усіх куточків світу', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'До початку конференції залишалося всього пару хвилин, через що люди метушилися і бігали в різні боки, хтось по роботі, а хтось просто шукав своїх друзів', () => this.next());
        yield;
        
        this.game.displayDialogLine('Голос', 'Хтось вийшов на сцену, напевно починається...', () => this.next());
        yield;

        this.game.add.tween(this.bg3).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg4).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.lecturer).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.slide1).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.slide1).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
        }, 3000));
        yield;

        this.game.add.tween(this.slide2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Лектор', 'Сьогодні ми поговоримо про управління ІТ інфраструктурою і процесами. Ефективні системи управління ІТ інфраструктурою базуються на бібліотеці ITIL, що містить передовий досвід організації роботи ІТ інфраструктури, та об\'єднують сховище інформації про неї і інструменти, необхідні для обслуговування запитів користувачів', () => this.next());
        yield;

        this.game.add.tween(this.slide2).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.slide3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Лектор', 'На початковому етапі вирішення управлінських завдань передбачає виявлення очікуваних від роботи інформаційних сервісів результатів, об\'єктивної оцінки стану системи ІТ управління і подальшого планування заходів, спрямованих на її оптимізацію', () => this.next());
        yield;

        this.game.displayDialogLine('Лектор', 'У кожному конкретному випадку повинна бути розроблена індивідуальна концепція розвитку системи управління ІТ інфраструктурою', () => this.next());
        yield;
        
        this.game.add.tween(this.slide3).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.slide4).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        
        this.game.displayDialogLine('Лектор', 'Ще одним ключовим завданням є контроль над змінами, що відбуваються в інфраструктурі. З цією метою використовуються рішення по інвентаризації програмно-апаратних засобів та автоматизованому отриманні даних про ІТ інфраструктури з метою врахування змін складу і налаштувань її компонентів', () => this.next());
        yield;

        this.game.add.tween(this.slide4).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.slide5).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        
        this.game.displayDialogLine('Лектор', 'Спеціалізовані рішення, пропоновані аутсорсинговими компаніями, допомагають їм грамотно організувати процеси планування, а також розгортання і надання послуг в сфері ІТ, що дозволяє досягати необхідного рівня якості послуг', () => this.next());
        yield;

        this.game.displayDialogLine('Лектор', 'Системи моніторингу якості послуг і компонентів ІТ інфраструктури забезпечують надійний контроль. Ефективне управління ІТ інфраструктурою підприємства неможливо без постійного моніторингу, що дозволяє отримувати актуальну інформацію, що вимагається для винесення правильних рішень щодо підвищення якості послуг, що надаються', () => this.next());
        yield;

        this.game.add.tween(this.slide5).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg3).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg4).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.lecturer).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'Прийшов час підвести підсумки конференції, і крім як "Це було чудово", у Вашій голові нічого не виникало', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви отримали настільки багато цікавої, а найголовніше корисної, інформації, що тепер Ваше життя не стане колишнім. Ви згадали всі свої попередні проекти та представили наскільки краще вони б були, використовуючи знання, отримані сьогодні. Але це в минулому, для цього і були створені такі збори. Завжди добре навчитися чомусь новому', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Для себе Ви вирішили, що надалі, поїздки на такі заходи будуть в пріоритеті, а начальство тільки підтримає таке прагнення до підвищення своїх професійних навичок', () => this.next());
        yield;

        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.bg3).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.displayDialogLine('Голос', 'На наступний день після Вашого повернення з курсу підвищення кваліфікації Вам видали сертифікати.  Ви розуміли, щоб пробитися на перспективну посаду в організації, необхідно мати гарну освіту', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Сертифікати, що підтверджують кваліфікацію, підвищували Ваші шанси на успіх у цій справі. Папірці з заклинаннями "MCSE", "CCIЕ", "MCP", "CNE" діяли на роботодавців так само, як на кота валер\'янка', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви прочитали, що сертифікація по бібліотеці ITIL досить затребувана форма сертифікації it-спеціалістів, яка підтверджує не тільки професійні знання та вміння, але також і управлінські навички', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Вона підтверджує кваліфікацію програмістів, дає оцінку їх здібностям вирішувати завдання, які виникають у процесі надання та підтримки інформаційних систем на підприємстві', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Сертифікація програмістів ITSM - визнаний стандарт, застосовуваний для оцінки знань і навичок it-спеціалістів в області управління ІТ-підрозділами компанії. Вищими рівнями сертифікації є IT Service Manager, ITIL Expert і ITIL Master. Фахівці з таким рівнем сертифікації високо цінуються в будь-якій організації', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Тож відтепер на Вашому столі у рамках виблискували у сонячних променях сертифікати від провідних компаній', () => this.next());
        yield;

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

        //Выбранные вариант в PostIntro, из бд: 0 - girl, 1 - man
        let choices = this.game.getChoice();
        choices.then(res => {
            this.friend = res.choice.friend;
        });
    }

    preload() {
        this.load.image('bg', './assets/images/4-1 (Conference)/background.png');
        this.load.image('bg2', './assets/images/4-1 (Conference)/workbanch.png');
        this.load.image('bg3', './assets/images/4-1 (Conference)/background2.png');
        this.load.image('bg4', './assets/images/4-1 (Conference)/background3.png');

        this.load.image('teacher', './assets/images/4-1 (Conference)/teacher.png');
        this.load.image('girl', './assets/images/4-1 (Conference)/girl.png');
        this.load.image('lecturer', './assets/images/4-1 (Conference)/lecturer.png');

        this.load.image('slide1', './assets/images/4-1 (Conference)/slide1.png');
        this.load.image('slide2', './assets/images/4-1 (Conference)/slide2.png');
        this.load.image('slide3', './assets/images/4-1 (Conference)/slide3.png');
        this.load.image('slide4', './assets/images/4-1 (Conference)/slide4.png');
        this.load.image('slide5', './assets/images/4-1 (Conference)/slide5.png');

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

        let bg4 = this.game.add.image(0, 0, 'bg4');
        bg4.height = this.game.width * bg4.height / bg4.width;
        bg4.width = this.game.width;
        bg4.alpha = 0;
        this.bg4 = bg4;

        this.slide1 = this.SSF.makeImg(296, 94, 'slide1', 1342, 744);
        this.slide2 = this.SSF.makeImg(296, 94, 'slide2', 1342, 744);
        this.slide3 = this.SSF.makeImg(296, 94, 'slide3', 1342, 744);
        this.slide4 = this.SSF.makeImg(296, 94, 'slide4', 1342, 744);
        this.slide5 = this.SSF.makeImg(296, 94, 'slide5', 1342, 744);

        this.teacher = this.SSF.makeImg(1260, 50, 'teacher', 700, 900);
        this.girl = this.SSF.makeImg(1329, 0, 'girl', 700, 900);
        this.lecturer = this.SSF.makeImg(1260, 50, 'lecturer', 700, 900);

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(750, 80, 'Надія - Ваша подруга на віки-вічні!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.secondWarning = this.game.add.text(740, 80, 'Вітаємо! Наставник стає Вам другом!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;
        
        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }

}