import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';
import testAPI from '../../testAPI';


export default class WaterState extends Phaser.State {
    * gen() {

        this.game.displayDialogLine('Продавець', 'Доброго дня! Чим я можу допомогти?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Мені треба води придбати.', () => this.next());
        yield;

        this.game.displayDialogLine('Продавець', 'Добре. Я вам наберу, а ви можете тим часом допогти мені \
        вирішити декілька задач?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Так, залюбки.', () => this.next());
        yield;

        window.graphics = this.testAPI.addNote();
        this.testAPI.displayNote(0.5, 1);

        //first question
        let firstQuestion = this.testAPI.addText("1) Вам необхідно обчислити об'єм двох тар у \nлітрах.\
Вам відомо, що кожна тара - це циліндр. \nВисота першого цилінда 225 мм, діаметр 130 мм.\
        \nДля другого циліндра висота дорівнює 325 мм, \nа діаметр 140 мм.", 500, 440, 30);

        let firstAnswer = this.testAPI.addText("а) 4 літра і 8 літрів;", 800, 650, 32);
        firstAnswer.isRight = false;

        let secondAnswer = this.testAPI.addText("б) 3 літра і 5 літрів;", 800, 720, 32);
        secondAnswer.isRight = true;

        let thirdAnswer = this.testAPI.addText("в) 1 літр і 4 літра;", 800, 790, 32);
        thirdAnswer.isRight = false;

        let answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.testAPI.addCheck(answers);
        yield;

        this.testAPI.deleteText(firstQuestion, answers);

        //second question
        let secondQuestion = this.testAPI.addText("2) У магазині в продажу є лише сильно газована, \nслабо газована\
та негазована. Кількість пляшок \nіз слабогазованою водою в п’ять разів більша за \nкількість\
пялшок із сильногазованою водою і \nвдвічі менша за кількість пляшок із негазованою \nводою.\
Загальна кількість пляшок у цьому \nмагазині дорівнює 192. Знайти кількість пляшок з \nводою \
кожного виду. Відповіді у порядку: \nсильногазована, слабогазована, негазована", 500, 440, 30);

        firstAnswer = this.testAPI.addText("а) 12, 60 і 120 пляшок;", 800, 830, 32);
        firstAnswer.isRight = true;

        secondAnswer = this.testAPI.addText("б) 25, 80 і 97 пляшок;", 800, 900, 32);
        secondAnswer.isRight = false;

        thirdAnswer = this.testAPI.addText("в) 20, 72 і 100 пляшок;", 800, 970, 32);
        thirdAnswer.isRight = false;

        answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.testAPI.addCheck(answers);
        yield;

        this.testAPI.deleteText(secondQuestion, answers);

        //third question
        let thirdQuestion = this.testAPI.addText("3) У вас є пляшки на 3 і 5 літрів.Ви можете \nвиливати і вливати \
скільки хочете води. \nВаше завдання отримати рівно 4 літри, але як? \n(Оберіть найкоротший варіант)", 500, 440, 30);

        firstAnswer = this.testAPI.addText("а) Наповнюємо пляшку в 5 літрів, переливаємо воду до 3х-літрової, \n\
залишається 2 літри. Виливаємо воду з 3-літрової, наливаємо туди \n2 літри. Набираємо ще раз 5ти-літрову, \
доливаємо в 3-літрову \nвідсутній літр, і в 5ти-літровій залишиться рівно 4 літри;", 480, 630, 22);
        firstAnswer.isRight = false;
        firstAnswer.isHalf = true;

        secondAnswer = this.testAPI.addText("б) Налити 5 літрів, перелити до 3х-літрової. \
В 5ти-літровій \nзостанется 2 літри, повторити процедуру і злити залишок в одну \nпляшку;", 480, 770, 22);
        secondAnswer.isRight = true;
        secondAnswer.isHalf = true;

        thirdAnswer = this.testAPI.addText("в) Три пляшки по 3 літри, переливаємо в \n5ти-літрову ємність. \
Те, що залишилося і є \n4 літри. Переливаємо залишок в 5ти-літрову;", 700, 880, 22);
        thirdAnswer.isRight = false;
        thirdAnswer.isHalf = true;

        answers = [firstAnswer, secondAnswer, thirdAnswer];

        this.testAPI.addCheck(answers);
        yield;

        this.testAPI.deleteText(thirdQuestion, answers);
        this.testAPI.destroyNote();
        console.log("grade:" + this.grade);
        setTimeout(() => this.game.displayDialogLine('Продавець', 'Дякую! А ось як раз і ваша вода набралась. Прошу.', () => this.next()), 100);
        let bottles = this.game.add.image(440, 380, 'bottles');
        smartSetHeight(bottles, 300);
        yield;

        this.game.displayDialogLine('Ви', 'Дякую! До побачення.', () => this.next());
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
    }

    preload() {
        this.load.image('bg', './assets/images/2-2 (water)/bg-2-2.png');
        this.load.image('notebook', './assets/images/2-2 (water)/hands-note.png')
        this.load.image('bottles', './assets/images/2-2 (water)/bottles.png')
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.grade = 0;

        this.testAPI = {...testAPI};
        for (let key in this.testAPI) {
            this.testAPI[key] = this.testAPI[key].bind(this);
        }

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    render(){
        
    }

    next() {
        this._gen.next();
    }

}
