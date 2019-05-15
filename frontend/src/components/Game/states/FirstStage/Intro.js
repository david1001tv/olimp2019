import Phaser from 'phaser';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';

export default class IntroState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.game.displayDialogLine('Голос', 'Промайнули шкільні тижні, і сьогодні Ви склали останній іспит. Що чекає попереду?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Хочеться досягти успіху, щоб ніколи не наздогнало почуття жалю за нездійсненним. Настав час планувати майбутнє. Настав час обрати майбутню професію.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Здається, що всі Ваші однолітки вже встигли визначитися і залишилися лише Ви. Але професій так багато, що Ви відчуваєте себе розгубленим. Лікар? Вчитель? Космонавт? Все не те.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Треба щоб і цікавою була, і сучасною, і з високою заробітною платою...', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', '*Зненацька щось яскраве промайнуло перед Вашими очима. Це була підхоплена вітром листівка*', () => this.next());
        yield;

        this.buttonTake_on.inputEnabled = true;
        this.buttonIgnore_on.inputEnabled = true;
        this.buttonTake_on.alpha = 1;
        this.buttonIgnore_on.alpha = 1;
        this.firstTake.alpha = 1;
        this.firstIgonre.alpha = 1;
        yield;

        if (this.answer == 'No'){
            this.game.displayDialogLine('Голос', 'Ви збираєтеся пройти повз, але порив вітру кидає листівку прямо Вам в обличчя. "Напевно, це доля", - гадаєте Ви, придивляючись до тексту', () => this.next());
        }
        else {
            this.game.displayDialogLine('Ви', 'Треба подивитися', () => this.next());
        }
        yield;

        this.game.displayDialogLine('Голос', 'Ви робите ковток свіжозвареної бразильської кави, що залишив на Вашому столі послужливий особистий помічник, і не кваплячись, з почуттям власної гідності, декількома надрозумними командами програмуєте космічні машини', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'О, це надзвичайно круто!  Давно забуте почуття наснаги захоплює Вас. З нетерпінням Ви шукаєте на листівці дату - вже завтра!  Треба якнайскоріше зареєструватися', () => this.next());
        yield;

        this.game.setFakeBrowserEnabled(true);
        yield;

        this.game.displayDialogLine('Голос', 'Ви почуваєтесь значно впевненіше. Можливо наступний день стане вирішальним і надасть можливість остаточно визначитися з майбутньою професією.', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('13:56');
        this.game.phone.setDate('02.07.18');
        this.answer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/1-0 (Intro)/background.png');
        this.load.image('booklet', './assets/images/1-0 (Intro)/booklet.png');
        this.load.image('booklet_back', './assets/images/1-0 (Intro)/booklet_back.png');

        this.load.spritesheet('button_red_on', './assets/images/1-0 (Intro)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_blue_on', './assets/images/1-0 (Intro)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('cloud1', './assets/images/1-0 (Intro)/cloud1.png');
        this.load.image('cloud2', './assets/images/1-0 (Intro)/cloud2.png');
        this.load.image('cloud3', './assets/images/1-0 (Intro)/cloud3.png');

    }

    create() {
        this.token = PubSub.subscribe('browser', this.handleBrowserEvent);

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let cloud1 = this.game.add.image(1912, -400, 'cloud2');
        this.game.add.tween(cloud1).to({ x: -900 }, 90000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);

        let cloud2 = this.game.add.image(1912, -250, 'cloud2');
        this.game.add.tween(cloud2).to({ x: -1100 }, 40000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);

        let cloud3 = this.game.add.image(1912, -50, 'cloud3');
        this.game.add.tween(cloud3).to({ x: -900 }, 60000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);


        //Формы выбора
        let buttonTake_on = this.game.add.button(this.game.world.centerX + 242, 400, 'button_blue_on', this.actionOnClick, this, 1, 1, 0);
        buttonTake_on.inputEnabled = false;
        buttonTake_on.alpha = 0;
        this.buttonTake_on = buttonTake_on;


        let buttonIgnore_on = this.game.add.button(this.game.world.centerX - 850, 400, 'button_red_on', this.actionOnClick, this, 1, 1, 0);
        buttonIgnore_on.inputEnabled = false;
        buttonIgnore_on.alpha = 0;
        this.buttonIgnore_on = buttonIgnore_on;

        //Текст в формах выбора
        this.firstTake = this.game.add.text(this.game.world.centerX + 435, 420, 'Схопити', {
            font: "Pangolin",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstTake.alpha = 0;

        this.firstIgonre = this.game.add.text(this.game.world.centerX - 685, 420, 'Ігнорувати', {
            font: "Pangolin",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstIgonre.alpha = 0;


        let booklet = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet');
        booklet.alpha = 0;
        this.booklet = booklet;

        let booklet_back = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet_back');
        booklet_back.alpha = 0;
        this.booklet_back = booklet_back;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    actionOnClick(obj) {
        if (obj.key == 'button_blue_on'){
            this.answer = 'Yes';
        }
        else {
            this.answer = 'No';
        }
        this.buttonTake_on.destroy();
        this.buttonIgnore_on.destroy();
        this.firstTake.destroy();
        this.firstIgonre.destroy();
        this.next();
    }

    // для продолжения и сохранения токина в локалстрейдж
    @autobind
    handleBrowserEvent(_, event) {
        if (event === 'form-submitted') {
            this.game.phone.completeTodo('BROWSER');
        } else if (event === 'continue') {
            this.game.setFakeBrowserEnabled(false);
            this.next();
        }

    }

    shutdown() {
        this.game.setFakeBrowserEnabled(false);
        PubSub.unsubscribe(this.token);
    }

    next() {
        this._gen.next();
    }

}
