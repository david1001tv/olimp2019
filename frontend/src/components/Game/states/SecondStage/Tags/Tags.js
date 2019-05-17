import Phaser from 'phaser';
import InputComponent from './InputComponent';
import autobind from 'autobind-decorator';
import {smartSetWidth, smartSetHeight} from '../../../utils';

const tagsForMaket = {
    header: ['header'],
    nav: ['nav'],
    logo: ['img'],
    'body-1': ['section'],
    'body-2': ['div'],
    footer: ['footer'],
    script: ['script']

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
        this.game.displayDialogLine('Адам Вікторович', 'Наша робота - розповісти браузеру так, щоб йому стало зрозуміло, що позначає кожен з цих елементів і як вони поєднуються один з одним синтаксично. Для написання сайтів використовується HTML (HyperText Markup Language) - мова розмітки гіпертексту. Простіше кажучи, це мова, яка використовує «теги» (наприклад, <так>) для розмітки тексту, щоб ви могли описати текст своєму браузеру. Верстати сайт можна в будь-якому текстовому редакторі, навіть в Блокноті', () => this.next());
        yield; 
        this.game.displayDialogLine('Адам Вікторович', 'Всі конструкції тегів надзвичайно прості і виглядають наступним чином <tagname>контент</tagname>. Ви могли помітити, що другий тег відрізняється. Це тому, що кожен тег повинен бути «закритий», якщо говорити на жаргоні. Слеш в останьому тезі повідомляє браузеру, що ця розмітка завершує елемент. Є також теги, які не потрібно закривати. Наприклад, тег зображення <img>, який використовується для вставки зображення (запам\'ятайте його)', () => this.next());
        yield; 
        this.game.displayDialogLine('Адам Вікторович', 'Важливим розумінням щодо HTML-тегів є те, що HTML містить словник, який визначає теги і описує, коли і де їх використовувати, подібно словникам, які містять слова мови. Тож коротко розповім про ключові теги, які Вам доведеться сьогодні використати. Тег <html> є контейнером, який містить в собі весь вміст веб-сторінки. Погляньмо на тег <head>, який містить елементи дуже корисні для пошукових систем, вкладок браузера. Наприклад, назва веб-сторінки знаходиться у <title>', () => this.next());
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
        yield;
        this.game.nextState(0);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
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
        this.count = 0;
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
        this.firstWarning = this.game.add.text(740, 40, 'Уведіть до полей, що праворуч, теги \ntitle, head, html, body, header, nav, \nfooter, script, a, content, img, div', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });

        this.firstWarning.alpha = 0;

        this.next();
    }

    @autobind
    handleKeyUp(e) {
        this.count++;
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
        if (!Object.keys(tagsForMaket).length) {
            this.warning=this.game.add.image(700, 0, 'warning_message');
            smartSetHeight(this.warning, 200);
            this.firstWarning = this.game.add.text(760, 60, 'Вітаємо! Ви отримали навички\n веб-програмування та поліпшили\n ставлення викладача!', {
                    font: "Leftonade",
                    fontSize: 30,
                    fill: 'black'
                });
            let score = 0;
            switch (true) {
                case (this.count === 52):
                    score = 100;
                    break;
                case (this.count <= 62):
                    score = 75;
                    break;
                case (this.count <= 70):
                    score = 50;
                    break;
                default:
                    score = 25;
                    break;
            }
            this.game.displayDialogLine('Голос', 'Світ не буде колишнім. Знаючи, як створюються веб-сторінки, Ви інакше дивитись на знайомі сайти', () => this.game.nextState(score) );
        }
    }

    addComponent(key) {
        switch (key) {
            case 'header':
                this.game.add.image(135, 160, key);
                this.warning=this.game.add.image(700, 0, 'warning_message');
                smartSetHeight(this.warning, 200);
                this.firstWarning = this.game.add.text(740, 40, 'Уведіть до полей, що праворуч, теги \ntitle, head, html, body, header, nav, \nfooter, script, a, content, img, div', {
                    font: "Leftonade",
                    fontSize: 30,
                    fill: 'white',
                    stroke: 'black',
                    strokeThickness: 8,
                });
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'Тег <header> задає «шапку» сайту або розділу, в якому зазвичай розташовується заголовок', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'nav':
                this.game.add.image(530, 190, key);
                this.warning=this.game.add.image(700, 0, 'warning_message');
                smartSetHeight(this.warning, 200);
                this.firstWarning = this.game.add.text(740, 40, 'Уведіть до полей, що праворуч, теги \ntitle, head, html, body, header, nav, \nfooter, script, a, content, img, div', {
                    font: "Leftonade",
                    fontSize: 30,
                    fill: 'white',
                    stroke: 'black',
                    strokeThickness: 8,
                });
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'Тег <nav> задає навігацію сайту. Якщо на сторінці кілька блоків посилань, то в <nav> зазвичай поміщають пріоритетні посилання', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'logo':
                this.game.add.image(150, 160, key);
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'В цьому випадку тег <img> був модифікований атрибутом src. Якщо ми залишимо тег на самоті, браузер не матиме ніякої можливості для отримання джерела інформації для відображення. Коли ми визначаємо src, то говоримо браузеру: «Гей, завантаж інформацію з цього джерела». Браузер знає, що потрібно шукати папку і в ній файл', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'body-1':
                let body = this.game.add.image(132, 252, key);
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', '<section> задає розділ документа, може застосовуватися для блоку новин, контактної інформації, глав тексту, вкладок в діалоговому вікні та ін. Розділ зазвичай містить заголовок', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'body-2':
                this.game.add.image(135, 500, key);
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'Елемент <div> є блоковим елементом і призначений для виділення фрагмента документа з метою зміни виду вмісту. Простіше кажучи, це контейнер для угруповання інших елементів.', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'footer':
                let footer = this.game.add.image(132, 760, key);
                footer.width += 4;
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'Тег <footer> задає «підвал» сайту або розділу, в ньому може розташовуватися ім\'я автора, дата документа, контактна і правова інформація', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
            case 'script':
                this.teacher = this.game.add.image(1250, 50, 'teacher');
                smartSetWidth(this.teacher,700);
                this.game.displayDialogLine('Адам Вікторович', 'Тег <script> призначений для опису скриптів, може містити посилання на програму або її частину тексту певною мовою. Тобто, це якийсь функціональний блок', ()=>{
                    this.game.add.tween(this.teacher).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                });
                return;
        }
    }

    next() {
        this._gen.next();
    }
}
