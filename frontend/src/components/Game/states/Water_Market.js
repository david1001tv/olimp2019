import Phaser from 'phaser';
import {smartSetHeight} from '../utils';


export default class WaterState extends Phaser.State {
    * gen() {
        this.camera.scale.setTo(5, 5);
        this.camera.x = 1128 * 5;
        this.camera.y = 280 * 5 - 300;
        this.game.add.tween(this.camera).to({ x: -250, y: 0 }, 5000).start();
        this.game.add.tween(this.camera.scale).to({
            x: 1,
            y: 1,
        }, 5000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.game.displayDialogLine('Продавець', 'Доброго дня! Чим я можу допомогти?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Мені треба води придбати.', () => this.next());
        yield;

        this.game.displayDialogLine('Продавець', 'Добре. Я вам наберу, а ви можете тим часом допогти мені \
        вирішити декілька задач?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Так, залюбки.', () => this.next());
        yield;

        let notebook = this.game.add.image(300, 385, 'notebook');
        smartSetHeight(notebook, 700);

        //first question
        let firstQuestion = this.addText("1) Вам необхідно обчислити об'єм двох тар у \nлітрах.\
Вам відомо, що кожна тара - це циліндр. \nВисота першого цилінда 225 мм, діаметр 130 мм.\
        \nДля другого целіндра висота дорівнює 325 мм, \nа діаметр 140 мм.", 500, 440, 30);

        let firstAnswer = this.addText("а) 4 літра і 8 літрів;", 800, 650, 32);
        firstAnswer.isRight = false;

        let secondAnswer = this.addText("б) 3 літра і 5 літрів;", 800, 720, 32);
        secondAnswer.isRight = true;

        let thirdAnswer = this.addText("в) 1 літр і 4 літра;", 800, 790, 32);
        thirdAnswer.isRight = false;

        let answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.addCheck(answers);
        yield;

        this.deleteText(firstQuestion, answers);

        //second question
        let secondQuestion = this.addText("2) У магазині в продажу є лише сильно газована, \nслабо газована\
та негазована. Кількість пляшок \nіз слабогазованою водою в п’ять разів більша за \nкількість\
пялшок із сильногазованою водою і \nвдвічі менша за кількість пляшок із негазованою \nводою.\
Загальна кількість пляшок у цьому \nмагазині дорівнює 192. Знайти кількість пляшок з \nводою \
кожного виду. Відповіді у порядку: \nсильногазована, слабогазована, негазована", 500, 440, 30);

        firstAnswer = this.addText("а) 12, 60 і 120 пляшок;", 800, 830, 32);
        firstAnswer.isRight = true;

        secondAnswer = this.addText("б) 25, 80 і 97 пляшок;", 800, 900, 32);
        secondAnswer.isRight = false;

        thirdAnswer = this.addText("в) 20, 72 і 100 пляшок;", 800, 970, 32);
        thirdAnswer.isRight = false;

        answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.addCheck(answers);
        yield;

        this.deleteText(secondQuestion, answers);

        //third question
        let thirdQuestion = this.addText("3) У вас є пляшки на 3 і 5 літрів.Ви можете \nвиливати і вливати \
скільки хочете води. \nВаше завдання отримати рівно 4 літри, але як? \n(Оберіть найкоротший варіант)", 500, 440, 30);

        firstAnswer = this.addText("а) Наповнюємо пляшку в 5 літрів, переливаємо воду до 3х-літрової, \n\
залишається 2 літри. Виливаємо воду з 3-літрової, наливаємо туди \n2 літри. Набираємо ще раз 5ти-літрову, \
доливаємо в 3-літрову \nвідсутній літр, і в 5ти-літровій залишиться рівно 4 літри;", 480, 630, 22);
        firstAnswer.isRight = false;
        firstAnswer.isHalf = true;

        secondAnswer = this.addText("б) Налити 5 літрів, перелити до 3х-літрової. \
В 5ти-літровій \nзостанется 2 літри, повторити процедуру і злити залишок в одну \nпляшку;", 480, 770, 22);
        secondAnswer.isRight = true;
        secondAnswer.isHalf = true;

        thirdAnswer = this.addText("в) Три пляшки по 3 літри, переливаємо в \n5ти-літрову ємність. \
Те, що залишилося і є \n4 літри. Переливаємо залишок в 5ти-літрову;", 700, 880, 22);
        thirdAnswer.isRight = false;
        thirdAnswer.isHalf = true;

        answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.addCheck(answers);
        yield;

        this.deleteText(thirdQuestion, answers);
        notebook.destroy();
        console.log("grade:" + this.grade);
        this.game.displayDialogLine('Продавець', 'Дякую! А ось як раз і ваша вода набралась. Прошу.', () => this.next());
        yield;

        /*TODO: appearance of bottles*/
        /*this.game.add.image(x, y, 'waterThreeLiter');
        this.game.add.image(x, y, 'waterFiveLiter');*/
        this.game.displayDialogLine('Ви', 'Дякую! До побачення.', () => this.next());
        yield

        //this.state.start('English');
    }

    init() {
        this._gen = this.gen();
    }

    preload() {
        this.load.image('bg', './assets/images/2-2 (water)/bg-2-2.png');
        this.load.image('notebook', './assets/images/2-2 (water)/hands-note.png')
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.grade = 0;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    next() {
        this._gen.next();
    }

    addText(str, posX, posY, fontSize){
        let tmp = this.game.add.text(posX, posY, str, {
                font: fontSize+"px Pangolin",
        });
        return tmp;
    }

    checkAnswers(obj){
        if(obj.isHalf === true){
            this.grade += 50;
        }
        if(obj.isRight === true){
            this.grade += 50;
        }
        this.next();
    }

    addCheck(obj){
        obj.forEach(e => {
            e.inputEnabled = true;
            e.events.onInputDown.add(this.checkAnswers, this);
            e.input.useHandCursor = true;
        });
    }

    deleteText(objQuestion, objAnswers){
        objQuestion.destroy();
        objAnswers.forEach(e => {
            e.destroy();
        });
    }
}
