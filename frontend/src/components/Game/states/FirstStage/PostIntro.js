import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import FSF from '../../states/FirstStageFunctions';

export default class IntroState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield; 

        this.game.displayDialogLine('Голос', 'З тієї миті, як Вас знайшла доленосна листівка, Ви відчуваєте незбагненне хвилювання, немов має відбутися щось надзвичайно важливе', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Однак зараз, опинившись поряд з університетом, Ви раптом засумнівалися. В думках промайнуло: "Програмування - це дуже складно і вельми нудно. Я не витримаю багато математики", "Не маю можливості дозволити собі потужний комп’ютер", "Потрібно буде багато запам’ятовувати"..', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви відчули неприємний холодок вздовж спини і несвідомо зробили крок назад. Випадково Ви зустрілися поглядом із суворим чоловіком, що стояв неподалік, і, помітивши Ваші вагання, надмінно посміхнувся. Від розглядання його татуювань відволік веселий дівочий сміх', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Побачивши Вас, дівчина з галасливої компанії доброзичливо підморгнула. Вона розташовувала до себе...', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', '*Може порадитися з нею? Чи звернутися до чоловіка?*', () => this.next());
        yield;

        this.buttonGirl_on.inputEnabled = true;
        this.buttonMan_on.inputEnabled = true;
        this.buttonGirl_on.alpha = 1;
        this.buttonMan_on.alpha = 1;
        this.firstGirl.alpha = 1;
        this.firstMan.alpha = 1;

        //Повідомлення "Цей вибір вплине на Вашу історію"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        yield;

        this.game.add.tween(this.warning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.firstWarning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        //Выбор: "Подойти к девушке"
        if (this.firstAnswer == 'Girl'){
            this.game.displayDialogLine('Голос', 'Ну ні, чоловік більш лякає Вас, ніж приваблює. Треба бути зовсім безстрашним, щоб тільки заговорити з ним. "Не сьогодні", - вирішуєте Ви і прямуєте до дівчини', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Побачивши Вас і зацікавившись, вона робить кілька кроків назустріч. Безумовно, вона - славна людина й розташовує до себе. Дівчина вітає Вас як доброго знайомого, і Ви неначе потрапляєте під чари її теплих очей', () => this.next());
            yield;

            this.game.add.tween(this.girl).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            this.game.displayDialogLine('Дiвчина', 'Привіт! Мене звати Надія. Ти з абітурієнтів? Впізнаю цю розгубленість у погляді. До якої спеціальності плануєш вступати? Дай вгадати… На туризм?', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Посмішка вийшла натягнутою - питання хвилювало Вас і остаточної відповіді не знайшлось', () => this.next());
            yield;

            this.buttonTrust_on.inputEnabled = true;
            this.buttonMistrust_on.inputEnabled = true;
            this.buttonTrust_on.alpha = 1;
            this.buttonMistrust_on.alpha = 1;
            this.secondGirl1.alpha = 1;
            this.secondGirl2.alpha = 1;
            yield;

            //Выбор: "Открыться"
            if (this.secondAnswer == "Girl1"){
                this.game.displayDialogLine('Голос', 'Більше не вагаючись, Ви розповіли їй про Ваші сумніви у власних здібностях до лякаючи складного фаху ІТ-спеціаліста. Дослухавши до кінця, вона ледь стримувала сміх, міцно стиснувши губи', () => this.next());
            }

            //Выбор: "Не открываться"
            else { 
                this.game.displayDialogLine('Голос', '*Ви стримано знизали плечима, на що дівчина здивовано підняла брови, але тактовно змовчала*', () => this.next());
                yield;
                this.game.displayDialogLine('Голос', 'Відчувши себе ніяково, Ви все ж вирішили сказати, що вас турбує', () => this.next());
            }
            yield;

            this.game.displayDialogLine('Надія', 'Комп’ютерні науки? Кльово! Це ж моя кафедра, я - студентка четвертого курсу. Пробач, але які ж дивні міфи вигадали про нашу професію! Не сперечаюсь, щоб досягти успіху, треба невтомно працювати, постійно покращувати soft skills, але як інакше? Без зусиль лише щасливці в лотереї виграють', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Ви важко зітхнули і дослухалися до її слів. Соромно зізнатись, але донедавна Ви були впевнені, що у програмуванні жінкам не місце… Ох, ці стереотипи! Крім того, Надія не виглядала ні дивною, ні асоціальною, ні занедбаною. Ваші сумніви поряд з нею здавалися надуманими та сміховинними', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Тільки поміркуй, зараз інформаційні технології вкоренилися майже в усіх сферах життя. Комунікації, медицина, освіта, промисловість, фінанси... Ти маєш змогу реалізувати себе в будь-якій галузі. Мене шалено приваблює саме ця можливість вибору, перехрестя безлічі доріг', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Вам стало цікаво, якою з доріг крокує вона у цю мить, і Ви точно не розраховували почути "інженер Machine learning". Натомість дізналися, що за цією страшною назвою ховаються ті, хто навчають машинні нейронні мережі виявляти закономірності на підставі аналізу відомостей. Тобто зрозуміли Ви вельми наближено, але перейнялись', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Тож як розвіяти твої сумніви? Мені подобається думка, що я на спеціальності супергероїв. Деякі з нас рятують мережу від вірусів, хтось - створює віртуальні всесвіти, інші - силою думки перетворюють обчислювальні машини у розумних істот, що здатні швидко виконувати важкі для людини речі', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Тобі здається, що це дуже складно, але даремно. Треба зробити перший крок, а той, хто хоче зрозуміти і розібратися, той завжди доб’ється свого', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', '*Ви пошепки запитали про те, що лякало Вас більш за все...*', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Математика? Логіка і аналітика важливі для розробників. Але це не означає, що кожного дня ти будеш вирішувати тригонометричні рівняння чи транспонувати матриці. Математичні обчислення беруть на себе різні бібліотеки, що створили за тебе. Тож розслабся, математика - це не фактор відсіювання тру-програмистів', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Що ж стосується комп’ютера, більшість софта не потребує великих потужностей і працює на звичайних ПК, але ти завжди маєш можливість затриматись у кабінеті, де проводяться практичні заняття, і скористатися університетським обладнанням', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Та мене дивує, що ти досі не запитав про наших викладачів, розклад, фахові предмети. Свого часу мене це цікавило значно більше. Отож, я дам тобі маленьку дружню пораду', () => this.next());
            yield;

            this.game.displayDialogLine('Надія', 'Бородач стає душкою, якщо демонструєш бажання з головою поринути в його предмети. Хибеник не перестає сипати термінами, але, якщо запитаєш, кожен пояснить по-людськи. Стильна любить всіх з незвичайним поглядом на, здавалося б, банальні речі. Сподіваюсь, ти скористаєшся цією підказкою, щоб сподобатись їм. А тепер пробач, мені треба повертатися до своїх. Звертайся до мене за допомогою!', () => this.next());

            this.game.add.tween(this.girl).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            //Повідомлення: "Вітаємо! У Вас з’явилась подруга, що допоможе у майбутньому"
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
            yield;

            this.game.displayDialogLine('Голос', '*Ви з вдячністю дивились вслід дівчині. Розмова з нею надала сил позбутися колишніх сумнівів. З відчуттям спокою та впевненості, Ви увійшли до університету*', () => this.next());
            yield;
        }
        
        //Выбор: "Подойти к мужчине"
        else {
            this.game.displayDialogLine('Голос', 'Він так пильно спостерігав за Вами, що по тілу бігали мурашки. Але Ви не з тих, хто лякається труднощів. Відповівши на його увагу прямим поглядом, Ви впевнено наблизились до суворого чоловіка. Він знову зверхньо посміхнувся', () => this.next());
            yield;

            this.game.add.tween(this.man).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
            this.game.displayDialogLine('Чоловік', 'Так і знав, що підійдеш. Сміливість гідна поваги, та мені цікаво, що це був за боягузливий відступ?', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'А вам було цікаво, як виплекати в собі настільки вражаючу самовпевненість. Здавалось, одного його погляду достатньо, щоб співрозмовник втратив самовладання і втік. Це певно був бізнесмен, що звик керувати великим штатом працівників. Але він виявився не такий зухвалий, як здавалось. Можливо, варто порадитись з ним?', () => this.next());
            yield;

            this.buttonDoubts_on.inputEnabled = true;
            this.buttonResolve_on.inputEnabled = true;
            this.buttonDoubts_on.alpha = 1;
            this.buttonResolve_on.alpha = 1;
            this.secondMan1.alpha = 1;
            this.secondMan2.alpha = 1;
            yield;

            //Выбор: "Рассказать про сомнения" - диалог просто идёт дальше без доп. фразы
            //Выбор: "Спросить кто он такой"
            if (this.thirdAnswer == "Man2"){
                this.game.displayDialogLine('Чоловік', 'Ти точно з абітурієнтів. Я розповім про себе, коли даш відповідь на моє питання. Що в нашому університеті змусило сміливу людину відступитись?', () => this.next());
                yield;
            }

            this.game.displayDialogLine('Голос', 'Розсудивши, що вибору в Вас не має, Ви розповіли йому про Ваші сумніви у власних здібностях до лякаючи складного фаху ІТ-спеціаліста. Із кожним Вашим словом брови чоловіка іронічно піднімалися вище, а погляд ставав все більш насмішливим. Та Ви витримали і це випробування і не втекли, все ж таки закінчивши свою розповідь', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Обрав комп’ютерні науки і злякався якихось чуток? Самому не смішно? Але звернувся ти за адресою, я - завідувач кафедри, до якої ти плануєш поступати', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'І перше, що я хочу до тебе донести, ІТ-спеціаліст - це не геній, який народжується раз у сторіччя, а звичайна людина, яка готова навчатися і застосовувати свої знання на практиці. Перші кроки завжди важкі. Все, що тобі залишається - визначитись, чи прагнеш ти постійно вдосконалюватись та завантажувати свій мозок роботою. У світі ІТ не зупиняються перед труднощами', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'Ви важко зітхнули, йому вдалося Вас присоромити. Та хіба можно було уявити, що він - програмист? Хіба він не повинен бути сутулою, розгубленою людиною з червоними очима і в товстому светрі з плямами від хот-догів і кави? Ох, ці стереотипи! Ваші сумніви поряд з ним здавалися надуманими та сміховинними', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Лякає складність? Синтаксис більшості мов програмування доступний для розуміння людей без попередньої підготовки. Все, що потрібно зробити - навчитися розуміти логіку, вивчити команди і вміти користуватися інструментами. Погодься, не фантастичне завдання', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Багато вчити? У сфері інформаційних технологій існує величезна кількість напрямків діяльності, не пов’язаних безпосередньо один з одним: хтось працює з «залізом», хтось - з програмами, хтось - з мережами. Не можна стати фахівцем у всіх напрямках. Сферу діяльності ти обираєш самостійно', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Потрібен потужний комп’ютер? Ага, і десяток моніторів на додачу. Компілятори мов програмування не вимагають великих потужностей або декількох моніторів. Працювати можна і на звичайному ПК. А якщо немає і такого - аудиторії до твоїх послуг', () => this.next());
            yield;

            this.game.displayDialogLine('Голос', 'З жалем ви зізналися, що математика для вас, подібна трагедії світового рівня.', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Єдиний розділ математики, в якому програміст дійсно повинен розбиратися - це логіка. У специфічних областях, звичайно, можуть знадобитися спеціальні знання. Так, розробнику ігор точно стане в нагоді тригонометрія. Однак, майже для будь-якого завдання можна знайти вже готові інструменти', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'І наостанок дам невелику пораду. На моїх предметах в перевазі практика, а не конспект лекцій. У графіці головне - точність та акуратність. А щоб відчувати впевненість у системному адмініструванні - вчи теорію з розумних книжок', () => this.next());
            yield;

            this.game.displayDialogLine('Чоловік', 'Тобі час йти. Можеш звертатися до мене, тільки не через дрібниці', () => this.next());

            this.game.add.tween(this.man).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

            //Повідомлення: "Завдяки своїй сміливості Ви завели знайомство з завідувачем кафедри".
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
            yield;

            this.game.displayDialogLine('Голос', 'Потрібно віддати належне, цей чоловік вмів переконувати. Розмова з ним надала сил позбутися колишніх сумнівів. З відчуттям спокою та впевненості, Ви увійшли до університету', () => this.next());
            yield;
        }

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        this.firstAnswer = null;
        this.secondAnswer = null;
        this.thirdAnswer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/1-1 (PostIntro)/background.png');

        this.load.spritesheet('button_red_on', './assets/images/1-0 (Intro)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_blue_on', './assets/images/1-0 (Intro)/Button_Choice_On_Blue.png', 610, 122);
        
        this.load.image('firstMeetingMan', './assets/images/1-1 (PostIntro)/man.png');
        this.load.image('firstMeetingGirl', './assets/images/1-1 (PostIntro)/girl.png');

        this.load.image('warning_message', './assets/images/1-1 (PostIntro)/warning_message.png');
        this.load.image('sun', './assets/images/1-1 (PostIntro)/sun.png');
        this.load.image('sun2', './assets/images/1-1 (PostIntro)/sun2.png');
        this.load.image('sun3', './assets/images/1-1 (PostIntro)/sun3.png');


    }

    create() {
        this.FSF = {...FSF};
        for (let key in this.FSF) {
            this.FSF[key] = this.FSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let sun1 = this.game.add.image(1812, 100, 'sun2');
        smartSetHeight(sun1, 80);
        this.game.add.tween(sun1).to({ x: 1700 }, 10000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        this.game.add.tween(sun1).to({ y: 150 }, 10000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        this.game.add.tween(sun1).to({ alpha: 0 }, 6000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.game.add.tween(sun1).to({ height: 40 }, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        let sun2 = this.game.add.image(1612, 50, 'sun3');
        smartSetHeight(sun2, 80);
        this.game.add.tween(sun2).to({ x: 1680 }, 40000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.game.add.tween(sun2).to({ y: 280 }, 30000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        this.game.add.tween(sun2).to({ alpha: 0 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
let sun4 = this.game.add.image(1712, 250, 'sun3');
        smartSetHeight(sun4, 200);
        // this.game.add.tween(sun2).to({ x: 1680 }, 40000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.game.add.tween(sun4).to({ y: 280 }, 30000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        this.game.add.tween(sun4).to({ alpha: 0 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
let sun3 = this.game.add.image(1412, 20, 'sun');
        smartSetHeight(sun3, 200);
        this.game.add.tween(sun3).to({ x: 1600 }, 20000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.game.add.tween(sun3).to({ y: 30 }, 10000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.game.add.tween(sun3).to({ alpha: 0 }, 5000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      
        // let cloud2 = this.game.add.image(1912, -250, 'cloud2');
        // this.game.add.tween(cloud2).to({ x: -1100 }, 40000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);

        // let cloud3 = this.game.add.image(1912, -50, 'cloud3');
        // this.game.add.tween(cloud3).to({ x: -900 }, 60000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);


        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(760, 80, 'Цей вибір вплине на Вашу історію', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.secondWarning = this.game.add.text(750, 60, 'Вітаємо! У Вас з’явилась подруга,\n що допоможе у майбутньому', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;

        this.thirdWarning = this.game.add.text(740, 60, 'Завдяки своїй сміливості Ви завели\nзнайомство з завідувачем кафедри', {
            font: "Leftonade",
            fontSize: 31,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.thirdWarning.alpha = 0;

        //girl
        this.girl = this.FSF.makeImg(1329, 0, 'firstMeetingGirl', 700, 900);
        //man
        this.man = this.FSF.makeImg(1280, 50, 'firstMeetingMan', 670, 900);

        //Вопрос 1
        let buttonGirl_on = this.game.add.button(this.game.world.centerX + 242, 400, 'button_blue_on', this.firstQuest, this, 1, 1, 0);
        buttonGirl_on.inputEnabled = false;
        buttonGirl_on.alpha = 0;
        this.buttonGirl_on = buttonGirl_on;

        let buttonMan_on = this.game.add.button(this.game.world.centerX - 850, 400, 'button_red_on', this.firstQuest, this, 1, 1, 0);
        buttonMan_on.inputEnabled = false;
        buttonMan_on.alpha = 0;
        this.buttonMan_on = buttonMan_on;

        this.firstGirl = this.game.add.text(this.game.world.centerX + 340, 425, 'Підійти до дівчини', {
            font: "Leftonade",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstGirl.alpha = 0;

        this.firstMan = this.game.add.text(this.game.world.centerX - 770, 425, 'Підійти до чоловiка', {
            font: "Leftonade",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstMan.alpha = 0;

        //Вопрос Girl 2
        let buttonTrust_on = this.game.add.button(656, 300, 'button_blue_on', this.secondQuest, this, 1, 1, 0);
        buttonTrust_on.inputEnabled = false;
        buttonTrust_on.alpha = 0;
        this.buttonTrust_on = buttonTrust_on;

        let buttonMistrust_on = this.game.add.button(656, 650, 'button_red_on', this.secondQuest, this, 1, 1, 0);
        buttonMistrust_on.inputEnabled = false;
        buttonMistrust_on.alpha = 0;
        this.buttonMistrust_on = buttonMistrust_on;

        this.secondGirl1 = this.game.add.text(730, 325, 'Довірити їй свої думки', {
            font: "Leftonade",
            fontSize: 55,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondGirl1.alpha = 0;

        this.secondGirl2 = this.game.add.text(720, 680, 'Не відкривати серце незнайомці', {
            font: "Leftonade",
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondGirl2.alpha = 0;

        //Вопрос Man 2
        let buttonDoubts_on = this.game.add.button(656, 300, 'button_blue_on', this.thirdQuest, this, 1, 1, 0);
        buttonDoubts_on.inputEnabled = false;
        buttonDoubts_on.alpha = 0;
        this.buttonDoubts_on = buttonDoubts_on;

        let buttonResolve_on = this.game.add.button(656, 650, 'button_red_on', this.thirdQuest, this, 1, 1, 0);
        buttonResolve_on.inputEnabled = false;
        buttonResolve_on.alpha = 0;
        this.buttonResolve_on = buttonResolve_on;

        this.secondMan1 = this.game.add.text(720, 325, 'Розповісти про сумніви', {
            font: "Leftonade",
            fontSize: 55,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondMan1.alpha = 0;

        this.secondMan2 = this.game.add.text(720, 680, 'Спитати, хто він в біса такий', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondMan2.alpha = 0;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    firstQuest(obj) {
        console.log(obj);
        if (obj.key == 'button_blue_on'){
            this.firstAnswer = 'Girl';
            this.game.saveChoice(false);
        }
        else {
            this.firstAnswer = 'Man';
            this.game.saveChoice(true);
        }
        module.exports.GirlOrMan = this.firstAnswer;
        this.buttonGirl_on.destroy();
        this.buttonMan_on.destroy();
        this.firstGirl.destroy();
        this.firstMan.destroy();
        this.next();
    }

    secondQuest(obj) {
        if (obj.key == 'button_blue_on'){
            this.secondAnswer = 'Girl1';
        }
        else {
            this.secondAnswer = 'Girl2';
        }
        this.buttonTrust_on.destroy();
        this.buttonMistrust_on.destroy();
        this.secondGirl1.destroy();
        this.secondGirl2.destroy();
        this.next();
    }

    thirdQuest(obj) {
        if (obj.key == 'button_blue_on'){
            this.thirdAnswer = 'Man1';
        }
        else {
            this.thirdAnswer = 'Man2';
        }
        this.buttonDoubts_on.destroy();
        this.buttonResolve_on.destroy();
        this.secondMan1.destroy();
        this.secondMan2.destroy();
        this.next();
    }
    next() {
        this._gen.next();
    }
}