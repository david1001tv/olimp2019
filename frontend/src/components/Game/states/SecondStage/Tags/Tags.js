import Phaser from 'phaser';
import InputComponent from './InputComponent';
import autobind from 'autobind-decorator';
import {smartSetWidth, smartSetHeight} from '../../../utils';

const tagsForMaket = {
    header: ['html', 'head', 'title', 'header', 'body'],
    nav: ['html', 'head', 'title', 'nav', 'header', 'body'],
    logo: ['html', 'head', 'title', 'nav', 'header', 'body', 'a', 'img'],
    'body-1': ['html', 'body', 'section'],
    'body-2': ['html', 'body', 'section', 'div'],
    footer: ['html', 'footer'],
    script: ['html', 'footer', 'script']

};

export default class TagsState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        this.game.displayDialogLine('Голос', 'Ви старанно приховуєте позіхи - результат безсонних ночей, що провели за вивченням графіки. Але варто з\'явитися біля Вас Адаму Вікторовичу, і сонливість зникає без сліду', () => this.next());
        yield;
        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Адам Вікторович', 'Ти-то мені й потрібен. Маю до тебе прохання. Чув адже, які в нас негаразди з сайтом кафедри? Сьогодні я розповім основи верстки сайтів і буду вдячним, якщо ти відразу застосуєш їх на практиці, на нашому сайті', () => this.next());
        yield;      
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.displayDialogLine('Голос', 'Вас долають сумніви у власних здібностях, але Ви все-таки погоджуєтеся. Хто у здоровому глузді відмовляє Адаму Вікторовичу?', () => this.next());
       yield;
       this.game.add.tween(this.bg).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
       this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });  
        yield;
        
        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 
        this.game.displayDialogLine('Адам Вікторович', 'Сучасні технології - рушійна сила світу нашого часу. Сайти давно і міцно замінили в повсякденності книги і газети, так що вміння їх створювати, верстати, точно стане у нагоді. Ви, можливо, пам\'ятаєте з дитинства, що для будівництва чогось конкретного потрібно багато різних блоків, які корисні для різних речей. Кожен з них має певну функцію. Те ж саме і з сайтами. Коли ви створюєте свій сайт, то використовуєте різні елементи відповідно до їх ідеального призначення', () => this.next());
        yield;      
        this.game.displayDialogLine('Адам Вікторович', 'Наша робота - розповісти браузеру так, щоб йому стало зрозуміло, що позначає кожен з цих елементів і як вони поєднуються один з одним синтаксично. Для написання сайтів використовується HTML (HyperText Markup Language) - мова розмітки гіпертексту. Простіше кажучи, це мова, яка використовує «теги» (наприклад, <так>) для розмітки тексту, щоб ви могли описати текст своєму браузеру. Верстати сайт можна в будь-якому текстовому редакторі, навіть в Блокноті, але ми скористаємося більш зручним додатком', () => this.next());
        yield; 
        this.game.displayDialogLine('Адам Вікторович', 'Всі конструкції тегів надзвичайно прості і виглядають наступним чином <tagname>контент</tagname>. Ви могли помітити, що другий тег відрізняється. Це тому, що кожен тег повинен бути «закритий», якщо говорити на жаргоні. Слеш в останьому тезі повідомляє браузеру, що ця розмітка завершує елемент. Є також теги, які не потрібно закривати. Наприклад, тег зображення <img>, який використовується для вставки зображення (запам\'ятайте його)', () => this.next());
        yield; 
        this.game.displayDialogLine('Адам Вікторович', 'Важливим розумінням щодо HTML-тегів є те, що HTML містить словник, який визначає теги і описує, коли і де їх використовувати, подібно словникам, які містять слова мови. Тож коротко розповім про ключові теги, які Вам доведеться сьогодні використати. Тег <html> є контейнером, який містить в собі весь вміст веб-сторінки. Погляньмо на тег <head>, який містить елементи дуже корисні для пошукових систем, вкладок браузера. Наприклад, назва веб-сторінки знаходиться у <title>.', () => this.next());
        yield; 
        this.game.displayDialogLine('Адам Вікторович', 'Ми повинні зробити ще одну річ після додавання <head> і вставити тег <body>. Він відокремлює зміст всієї сторінки від <head>. Все, що відображається на веб-сторінці, поміщається в <body>. Тег <a> є одним з важливих елементів HTML і призначений для створення посилань (переходів на інші сторінки після натискання на елемент). Тож, починайте! Про інші теги я розповім під час роботи', () => this.next());
        yield; 
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.phone.setEnabled(true);
        yield;
        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/2-4 (Tags)/background.png');
        this.load.image('header', './assets/images/2-4 (Tags)/header.png');
        this.load.image('nav', './assets/images/2-4 (Tags)/nav.png');
        this.load.image('logo', './assets/images/2-4 (Tags)/logo.png');
        this.load.image('body-1', './assets/images/2-4 (Tags)/body-1.png');
        this.load.image('body-2', './assets/images/2-4 (Tags)/body-2.png');
        this.load.image('footer', './assets/images/2-4 (Tags)/footer.png');
        this.load.image('input', './assets/images/2-4 (Tags)/input.png');
        this.load.image('teacher', './assets/images/2-4 (Tags)/teacher.png');
        this.load.image('warning_message', './assets/images/2-4 (Tags)/warning_message.png');
        this.load.image('bg2', './assets/images/2-4 (Tags)/background2.png');

    }

    create() {
        

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;


        this.inputs = [
            new InputComponent(1224, 220, 1234, 863, 'html', bg2, this.game),
            new InputComponent(1238, 240, 1248, 320, 'head', bg2, this.game),
            new InputComponent(1262, 261, 1550, 261, 'title', bg2, this.game),
            new InputComponent(1240, 340, 1249, 843, 'body', bg2, this.game),
            new InputComponent(1255, 360, 1265, 521, 'header', bg2, this.game),
            new InputComponent(1267, 381, 1279, 501, 'nav', bg2, this.game),
            new InputComponent(1285, 401, 3000, 3000, 'a', bg2, this.game),
            new InputComponent(1300, 423, 3000, 3000, 'img', bg2, this.game),
            new InputComponent(1253, 582, 1262, 623, 'section', bg2, this.game),
            new InputComponent(1270, 603, 1480, 603, 'div', bg2, this.game),
            new InputComponent(1255, 643, 1262, 820, 'footer', bg2, this.game),
            new InputComponent(1272, 705, 1280, 760, 'script', bg2, this.game)
        ];

        document.addEventListener('keyup', this.handleKeyUp);

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        this.bg=bg;

        this.teacher = this.game.add.image(1250, 50, 'teacher');
        smartSetWidth(this.teacher,700);
        this.teacher.alpha=0;

        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;
        this.firstWarning = this.game.add.text(760, 60, 'Уведіть до полей, що праворуч, теги \ntitle, head, html, body, header, nav, \nfooter, script, a, content, img, div', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'black'
        });

        this.firstWarning.alpha = 0;

        this.next();
    }

    @autobind
    handleKeyUp(e) {
        for (let key in tagsForMaket) {
            let count = 0;
            tagsForMaket[key].forEach(e => {
                this.inputs.forEach(input => {
                    if (input.tag === e && input.input.disabled) {
                        count++;
                    }
                });
            });
            if (count === tagsForMaket[key].length) {
                this.addComponent(key);
                delete tagsForMaket[key];
            }
        }
        console.log(Object.keys(tagsForMaket).length);
        if (!Object.keys(tagsForMaket).length) {
        this.warning=this.game.add.image(700, 0, 'warning_message');
                smartSetHeight(this.warning, 200);
        this.firstWarning = this.game.add.text(760, 60, 'Вітаємо! Ви отримали навички\n веб-програмування та поліпшили\n ставлення викладача!', {
                    font: "Leftonade",
                    fontSize: 30,
                    fill: 'black'
                });
        this.game.displayDialogLine('Голос', 'Світ не буде колишнім. Знаючи, як створюються веб-сторінки, Ви інакше дивитись на знайомі сайти', () => this.game.nextState(0) );
        // yield; 
    
           
        }
    }

    addComponent(key) {
        switch (key) {
            case 'header':
                this.game.add.image(135, 160, key);
                return;
            case 'nav':
                this.game.add.image(530, 190, key);
                return;
            case 'logo':
                this.game.add.image(150, 160, key);
                return;
            case 'body-1':
                let body = this.game.add.image(132, 252, key);
                return;
            case 'body-2':
                this.game.add.image(135, 500, key);
                return;
            case 'footer':
                let footer = this.game.add.image(132, 760, key);
                footer.width += 4;
                return;
        }
    }

    next() {
        this._gen.next();
    }
}
