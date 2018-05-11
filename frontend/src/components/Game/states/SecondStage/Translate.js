import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';
import testAPI from '../../testAPI';

export default class TranslateState extends Phaser.State {
    * gen() {

    setTimeout(() => this.next(), 3000);
    this.game.camera.flash(0x000000, 3000, true);
    yield;

    this.game.displayDialogLine('Альошин', 'Та не розумію я вас! Я у школі вивчав німецьку!', () => this.next());
    yield;

    this.alyoshin_1.alpha = 0;
    this.alyoshin_2.alpha = 1;
    this.game.displayDialogLine('Альошин', 'О, ти повернувся. Іди допоможи перекласти.', () => this.next());
    yield;

    //здесь анимация перехода с камерой
    this.camera.scale.setTo(1, 1);
    this.camera.x = 1128 * 5;
    this.camera.y = 350 * 5 - 300;
    let firstStep = this.game.add.tween(this.camera).to({ x: 2520, y: -600 }, 800);
    let secondStep = this.game.add.tween(this.camera).to({ x: 200, y: -600 }, 800);
    let thirdStep = this.game.add.tween(this.camera).to({ x: 920, y: -600 }, 800);

    firstStep.chain(secondStep, thirdStep);
    let zoom = this.game.add.tween(this.camera.scale).to({
        x: 1.5,
        y: 1.5,
    }, 3000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
    firstStep.start();
    yield;

    this.alyoshin_1.alpha = 1;
    this.alyoshin_2.alpha = 0;

    //first question
    this.game.displayDialogLine('Альошин', 'Можеш дізнатися, чи приніс він усі документи?', () => this.next());
    yield;
    window.graphics = this.testAPI.addNote(780, 240, 500);
    this.testAPI.displayNote(0.5, 1);

    let firstAnswer = this.testAPI.addText("а) Dude, he doesn’t want to see you  and even\n said me to tell you to get the hell out of here.", 935, 300, 24);
    firstAnswer.isRight = false;
    firstAnswer.coord_x = 890;
    firstAnswer.coord_y = 300;
    firstAnswer.check = false;

    let secondAnswer = this.testAPI.addText("б) Are you brought all the necessary\n documents?", 935, 370, 24);
    secondAnswer.isRight = true;

    let thirdAnswer = this.testAPI.addText("в) Did you take all your relatives with you?", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    let fourthAnswer = this.testAPI.addText("г) How are you doing?  Ya ne shary how to\n translate", 935, 475, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 475;
    firstAnswer.check = false;

    let answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(null, answers);
    this.testAPI.displayNote(0, 0);

    setTimeout(() => this.game.displayDialogLine('Індус', "I took all the documents that are required and want to ask a few questions about PSTU. \
    I came at the faculty of IT what can you tell me about it’s stuff?", () => this.next()), 100);
    yield;

    //second question
    this.testAPI.displayNote(0.5, 1);
    firstAnswer = this.testAPI.addText("а) Він питає, шо роблять на факультеті  ІТ?", 935, 300, 24);
    firstAnswer.isRight = false;
    firstAnswer.coord_x = 890;
    firstAnswer.coord_y = 300;
    firstAnswer.check = false;

    secondAnswer = this.testAPI.addText("б) Він хоче дізнатися про викладацький\n склад факультету.", 935, 335, 24);
    secondAnswer.isRight = true;

    thirdAnswer = this.testAPI.addText("в) Його цікавить що вивчають на\n факультеті ІТ.", 935, 405, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 405;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Питає, чи ви викладаєте на його\n спеціальності.", 935, 475, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 475;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(null, answers);
    this.testAPI.displayNote(0, 0);

    //third question
    setTimeout(() => this.game.displayDialogLine('Альошин', "У нашому викладацькому штаті є видатні професори, лектори  та  досвідчені \
    викладачі, ти скоро з ними познайомишся.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    let text = this.testAPI.addText("In our staff there are well – known professors,\n lecturers and ____ teachers you’ll meet\n them really soon.", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Expirienced", 935, 405, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Comprehensive", 935, 440, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 440;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) Kind", 935, 475, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 475;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Separate", 935, 510, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 510;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(text, answers);
    this.testAPI.displayNote(0, 0);

    //fourth question
    setTimeout(() => this.game.displayDialogLine('Альошин', "Добре, усі 4 роки навчання поділяються на семестри, кожен з яких йде \
    протягом 16 тижнів.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    text = this.testAPI.addText("All 4 years of study ____  into terms each of\n them last 16 weeks.", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Divide", 935, 370, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Consider", 935, 405, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 405;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) Touch", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Compare", 935, 475, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 475;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(text, answers);
    this.testAPI.displayNote(0, 0);

    //fifth question
    setTimeout(() => this.game.displayDialogLine('Альошин', "Скажи, що семестр включає в себе відвідування лекцій, семінарів, \
    консультацій та написання курсовоЇ роботи. ", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    text = this.testAPI.addText("During a term you will ______ lectures, \nseminars, tutorials and you will do your course \npaper", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Attend", 935, 405, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Watch", 935, 440, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 440;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) Break", 935, 475, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 475;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Pass", 935, 510, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 510;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(text, answers);
    this.testAPI.displayNote(0, 0);

    //sixth question
    setTimeout(() => this.game.displayDialogLine('Альошин', "Зауваж, що практичні заняття проводяться у гарно оснащених \
    лабораторіях", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    text = this.testAPI.addText("All the practical lessons are held in _____\n laboratories.", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Well – equipped ", 935, 370, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Nice", 935, 405, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 405;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) Clean", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Fairly poor", 935, 475, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 475;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(text, answers);
    this.testAPI.displayNote(0, 0);

    //seventh question
    setTimeout(() => this.game.displayDialogLine('Альошин', "Тепер основне: наш університет надає денне або заочне навчання на вимогу \
    студента.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    text = this.testAPI.addText("Our university provides full-time or ____\n education", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Part – time ", 935, 370, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Divided", 935, 405, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 405;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) IT", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Complete", 935, 475, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 475;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(text, answers);
    this.testAPI.displayNote(0, 0);

    //eighth question
    setTimeout(() => this.game.displayDialogLine('Альошин', "Ми можемо надати йому житло у гуртожитку.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    firstAnswer = this.testAPI.addText("а) If you need a place to live our university\n provides a dormitory for non-local students.", 935, 300, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) For non-local students our university\n allows to study from home.", 935, 370, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 370;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) If you want to spend some time with him\n he doesn’t mind.", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) As I see you need a place to live you can\n rent it from him", 935, 510, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 890;
    fourthAnswer.coord_y = 510;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(null, answers);
    this.testAPI.displayNote(0, 0);
    console.log("grade:" + this.grade);

    setTimeout(() => this.game.displayDialogLine('Індус', "I want to receive a  full – time education please. And yes I will need a dormitory \
    to live in.  I promise I will attend all the classes and work hard.  Thank you for your help.", () => this.next()), 100);
    yield;

    this.game.camera.fade(0x000000, 1500, true);
    setTimeout(() => this.next(), 1500);
    yield;
    this.camera.scale.setTo(1, 1);
    this.game.nextState(this.grade);
}

init() {
    this._gen = this.gen();
    this.game.phone.clearTodos();
}

preload() {
    this.load.image('bg', './assets/images/2-2 (water)/bg-2-2a.png');
    this.load.image('alyoshin_1', './assets/images/2-3(indy)/alyoshin-4.png');
    this.load.image('alyoshin_2', './assets/images/2-3(indy)/alyoshin-3.png');
    this.load.image('indy', './assets/images/2-3(indy)/indian.png');
    this.load.image('notebook', './assets/images/2-2 (water)/hands-note.png');
    this.load.image('bad', './assets/images/2-1 (crossword)/bad.png');
}

create() {

    let bg = this.game.add.image(0, 0, 'bg');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;

    let alyoshin_1 = this.game.add.image(1310, 280, 'alyoshin_1');
    this.alyoshin_1 = alyoshin_1;
    smartSetHeight(alyoshin_1, 340);

    let alyoshin_2 = this.game.add.image(1310, 280, 'alyoshin_2');
    this.alyoshin_2 = alyoshin_2;
    this.alyoshin_2.alpha = 0;
    smartSetHeight(alyoshin_2, 300);

    let indian = this.game.add.image(1400, 285, 'indy');
    this.indian = indian;
    smartSetHeight(indian, 750);

    this.stage.disableVisibilityChange = true;

    this.grade = 100;
    this.flag = true;
    this.bad = [];

    this.testAPI = {...testAPI};
    for (let key in this.testAPI) {
        this.testAPI[key] = this.testAPI[key].bind(this);
    }
    this.next();
}

next() {
    this._gen.next();
}
}