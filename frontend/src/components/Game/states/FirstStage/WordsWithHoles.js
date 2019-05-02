import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import testAPI from '../../testAPI';

export default class WWHState extends Phaser.State {
    * gen() {

    setTimeout(() => this.next(), 3000);
    this.game.camera.flash(0x000000, 3000, true);
    yield;

    this.game.displayDialogLine('Я', 'Мне надо внимательно прослушать эту лекцию, хотя здесь так шумно от болього количества студентов...', () => this.next());
    yield;

    //this.teacher_design.alpha = 1;
    this.game.add.tween(this.teacher_design).to({
        alpha: 1
    }, 1500, Phaser.Easing.Cubic.InOut)
        .start().onComplete.add(() => {
        this.next();
    });
    yield;

    this.game.displayDialogLine('Преподаватель по дизайну', '*Приветствует всех, вступительное слово, что-то про призентацию, тишину в аудитории и бла-бла*', () => this.next());
    yield;

    this.game.phone.setEnabled(false);

    //this.presentation1.alpha = 1;
    this.game.add.tween(this.presentation1).to({
        alpha: 1
    }, 1500, Phaser.Easing.Cubic.InOut)
        .start().onComplete.add(() => {
        this.next();
    });
    yield;
    
    
    //first question
    this.bg_dialog.alpha = 0.5;
    this.game.phone.setEnabled(true);
    this.cloud.alpha = 1;

    /*
    let character = this.testAPI.addText("Преподаватель", 50, 820, 24);
    let character_text = this.testAPI.addText("Вставь ... слово", 50, 880, 24);
    */

    let character = this.game.add.text(50, 820, 'Препод', {
        align: 'left',
        font: 'Pangolin',
        fontSize: 24,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 8,
    });

    let character_text = this.game.add.text(50, 880, 'Жижо текст ... гавгав', {
        align: 'left',
        font: 'Pangolin',
        fontSize: 24,
        fill: 'white',
        stroke: 'black',
        strokeThickness: 8,
    });

    let klac = this.game.add.text(1700, 930, 'Жмякни, ёпта...', {
        align: 'right',
        font: 'Pangolin',
        fontSize: 24,
        fill: 'gray',
        strokeThickness: 8,
        
    });


    
    let firstAnswer = this.testAPI.addAnswers(this.testAPI.addText("а) Вариант ответа А", 50, 570, 24), false, 10, 570, false);
    let secondAnswer = this.testAPI.addAnswers(this.testAPI.addText("б) Вариант ответа Б", 50, 630, 24), true);
    let thirdAnswer = this.testAPI.addAnswers(this.testAPI.addText("в) Вариант ответа В", 50, 690, 24), false, 10, 690, false);
    let fourthAnswer = this.testAPI.addAnswers(this.testAPI.addText("г) Вариант ответа Г", 50, 750, 24), false, 10, 750, false);
    
    let answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(null, answers);
    this.testAPI.deleteText(null, [character, character_text, klac]);
    
    this.bg_dialog.alpha = 0;
    this.cloud.alpha = 0;

    setTimeout(() => this.game.displayDialogLine('Препод', "Малаца, идём дальше", () => this.next()), 100);
    yield;

    this.presentation1.alpha = 0;

    this.presentation2.alpha = 1;


    /*
    //second question
    this.game.displayDialogLine('Преподаватель по дизайну', '*Текст 2ого предложения с ...*', () => this.next());
    yield;

    this.game.phone.setEnabled(true);
    window.graphics = this.testAPI.addNote(0, 650, 250);
    this.testAPI.displayNote(0, 1);

    firstAnswer = this.testAPI.addText("а) Вариант ответа А", 50, 660, 24);
    firstAnswer.isRight = false;
    firstAnswer.coord_x = 10;
    firstAnswer.coord_y = 660;
    firstAnswer.check = false;

    secondAnswer = this.testAPI.addText("б) Вариант ответа Б", 50, 720, 24);
    secondAnswer.isRight = true;

    thirdAnswer = this.testAPI.addText("в) Вариант ответа В", 50, 780, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 10;
    thirdAnswer.coord_y = 780;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Вариант ответа Г", 50, 850, 24);
    fourthAnswer.isRight = false;
    fourthAnswer.coord_x = 10;
    fourthAnswer.coord_y = 850;
    firstAnswer.check = false;

    answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

    this.testAPI.addCheck(answers);
    yield;

    this.testAPI.destroyIncorrect();
    this.testAPI.deleteText(null, answers);
    this.testAPI.displayNote(0, 0);

    setTimeout(() => this.game.displayDialogLine('Препод', "Ты агонь хлопец", () => this.next()), 100);
    yield;


    //third question
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "У нашому викладацькому штаті є видатні професори, лектори  та  досвідчені \
    викладачі, ти скоро з ними познайомишся.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    let text = this.testAPI.addText("In our staff there are well – known professors,\n lecturers and ____ teachers you’ll meet\n them soon.", 900, 300, 24);
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
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Добре, усі 4 роки навчання поділяються на семестри, кожен з яких йде \
    протягом 16 тижнів.", () => this.next()), 100);
    yield;

    this.testAPI.displayNote(0.5, 1);
    text = this.testAPI.addText("All 4 years of study are ____  into terms each of\n them last 16 weeks.", 900, 300, 24);
    firstAnswer = this.testAPI.addText("а) Divided", 935, 370, 24);
    firstAnswer.isRight = true;

    secondAnswer = this.testAPI.addText("б) Considered", 935, 405, 24);
    secondAnswer.isRight = false;
    secondAnswer.coord_x = 890;
    secondAnswer.coord_y = 405;
    secondAnswer.check = false;

    thirdAnswer = this.testAPI.addText("в) Touched", 935, 440, 24);
    thirdAnswer.isRight = false;
    thirdAnswer.coord_x = 890;
    thirdAnswer.coord_y = 440;
    firstAnswer.check = false;

    fourthAnswer = this.testAPI.addText("г) Compared", 935, 475, 24);
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
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Скажи, що семестр включає в себе відвідування лекцій, семінарів, \
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
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Зауваж, що практичні заняття проводяться у гарно оснащених \
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
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Тепер основне: наш університет надає денне або заочне навчання на вимогу \
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
    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Ми можемо надати йому житло у гуртожитку.", () => this.next()), 100);
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

    this.game.phone.completeTodo("TRANSLATE");
    setTimeout(() => this.game.displayDialogLine('Індієць', "I want to receive a  full – time education please. And yes I will need a dormitory \
    to live in.  I promise I will attend all the classes and work hard.  Thank you for your help.", () => this.next()), 100);
    yield;

    this.game.add.tween(this.indian).to({
        alpha: 0
    }, 1500, Phaser.Easing.Cubic.InOut)
        .start().onComplete.add(() => {
        this.next();
    });
    yield;
    this.alyoshin_1.alpha = 0;
    this.alyoshin_2.alpha = 1;

    setTimeout(() => this.game.displayDialogLine('Альошин С.В.', "Дякую тобі за допомогу! Нам такі на КН знадобляться. \
    До речі, можеш ближче ознайомитись за нашою кафедрою. Приходь о 14:00 у хол цього корпусу, Олена Євгенівна \
    хотіла познайомити абітуриєнтів із викладачами.", () => this.next()), 100);
    yield;

    this.game.camera.fade(0x000000, 1500, true);
    setTimeout(() => this.next(), 1500);
    yield;
    this.camera.scale.setTo(1, 1);
    this.game.nextState(this.grade);
    */
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
}

preload() {
    this.load.image('bg', './assets/images/1-1 (words with holes)/background.png');
    this.load.image('bg_dialog', './assets/images/1-1 (words with holes)/bg_dialog.png');
    this.load.image('teacher_design', './assets/images/1-1 (words with holes)/teacher_design.png');
    this.load.image('cloud', './assets/images/1-1 (words with holes)/cloud.png');


    this.load.image('presentation1', './assets/images/1-1 (words with holes)/presentation1.png');
    this.load.image('presentation2', './assets/images/1-1 (words with holes)/presentation2.png');
    this.load.image('presentation3', './assets/images/1-1 (words with holes)/presentation3.png');
    this.load.image('presentation4', './assets/images/1-1 (words with holes)/presentation4.png');
}

create() {

    let bg = this.game.add.image(0, 0, 'bg');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;

    let teacher_design = this.game.add.image(1620, 380, 'teacher_design');
    this.teacher_design = teacher_design;
    this.teacher_design.alpha = 0;
    smartSetHeight(teacher_design, 700);

    let cloud = this.game.add.image(0, 560, 'cloud');
    this.cloud = cloud;
    this.cloud.alpha = 0;


    let bg_dialog = this.game.add.image(0, 810, 'bg_dialog');
    this.bg_dialog = bg_dialog;
    this.bg_dialog.alpha = 0;
    smartSetHeight(bg_dialog, 200);
    smartSetWidth(bg_dialog, 1920);

    let presentation1 = this.game.add.image(610, 140, 'presentation1');
    this.presentation1 = presentation1;
    this.presentation1.alpha = 0;

    let presentation2 = this.game.add.image(610, 140, 'presentation2');
    this.presentation2 = presentation2;
    this.presentation2.alpha = 0;

    let presentation3 = this.game.add.image(610, 140, 'presentation3');
    this.presentation3 = presentation3;
    this.presentation3.alpha = 0;

    let presentation4 = this.game.add.image(610, 140, 'presentation4');
    this.presentation4 = presentation4;
    this.presentation4.alpha = 0;

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

    shutdown() {
        this.game.camera.scale.setTo(1, 1);
    }

next() {
    this._gen.next();
}
}