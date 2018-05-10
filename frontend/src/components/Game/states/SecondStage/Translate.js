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
    let firstStep = this.game.add.tween(this.camera).to({ x: 2820, y: -600 }, 800);
    let secondStep = this.game.add.tween(this.camera).to({ x: 500, y: -600 }, 800);
    let thirdStep = this.game.add.tween(this.camera).to({ x: 1400, y: -600 }, 800);
        
    firstStep.chain(secondStep, thirdStep);
    let zoom = this.game.add.tween(this.camera.scale).to({
        x: 1.5,
        y: 1.5,
    }, 2000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
    firstStep.start();
    yield;

    this.alyoshin_1.alpha = 1;
    this.alyoshin_2.alpha = 0;
    this.game.displayDialogLine('Альошин', 'Можешь дізнатися, чи приніс він усі документи?', () => this.next());
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
    this.testAPI.displayNote(0.5, 1);

    this.game.camera.fade(0x000000, 1500, true);
    setTimeout(() => this.next(), 1500);
    yield;
    
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

    this.grade = 0;
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