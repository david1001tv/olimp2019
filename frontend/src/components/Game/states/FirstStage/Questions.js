import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import testAPI from '../../testAPI';

export default class QuestionsState extends Phaser.State {
    * gen() {

    setTimeout(() => this.next(), 3000);
    this.game.camera.flash(0x000000, 3000, true);
    yield;
    this.game.phone.setEnabled(false);
    this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
    this.game.displayDialogLine('Герой', 'О ні! З останнього ряду дуже погано чути. Яке він сказав слово?', () => this.next());
    yield;
    this.bg_speaking.alpha = 1;
//first question
     let oneTask=this.testAPI.oneTask(this.slide1, this.cloud, 
        "Idea slide ..... долор", 
        ["а) hgjhgj","б) jkjhkjh","в) hgjhgj","г) fhgfhg"], 
        [false,true,false,false],  
        this.testAPI.addText,this.testAPI.makeAnswer,this.testAPI.getMasAnswer,this.testAPI.addCheck,this.testAPI.setTextAlpha);
    yield;
    this.testAPI.deleteTask(this.testAPI.destroyIncorrect,this.testAPI.deleteText,oneTask,this.cloud)
//second question
    oneTask=this.testAPI.oneTask(this.slide2, this.cloud, 
        "Idea slide2 ..... долор", 
        ["а) 11111","б) 2222","в) hgjhgj","г) fhgfhg"], 
        [true,false,false,false],  
        this.testAPI.addText,this.testAPI.makeAnswer,this.testAPI.getMasAnswer,this.testAPI.addCheck,this.testAPI.setTextAlpha);
    yield;
    this.testAPI.deleteTask(this.testAPI.destroyIncorrect,this.testAPI.deleteText,oneTask,this.cloud)
//third question
     oneTask=this.testAPI.oneTask(this.slide3, this.cloud, 
        "Idea slide3 ..... долор", 
        ["а) 3333","б) jkjhkjh","в) hgjhgj","г) fhgfhg"], 
        [false,true,false,false],  
        this.testAPI.addText,this.testAPI.makeAnswer,this.testAPI.getMasAnswer,this.testAPI.addCheck,this.testAPI.setTextAlpha);
    yield;
    this.testAPI.deleteTask(this.testAPI.destroyIncorrect,this.testAPI.deleteText,oneTask,this.cloud)
//fourth question
    oneTask=this.testAPI.oneTask(this.slide4, this.cloud, 
        "Idea slide4 ..... долор", 
        ["а) 44444","б) 2222","в) hgjhgj","г) fhgfhg"], 
        [true,false,false,false],  
        this.testAPI.addText,this.testAPI.makeAnswer,this.testAPI.getMasAnswer,this.testAPI.addCheck,this.testAPI.setTextAlpha);
    yield;
    this.testAPI.deleteTask(this.testAPI.destroyIncorrect,this.testAPI.deleteText,oneTask,this.cloud)

   

    this.game.camera.fade(0x000000, 1500, true);
    setTimeout(() => this.next(), 1500);
    yield;
    this.camera.scale.setTo(1, 1);
    this.game.nextState(this.grade);
}

init() {
    this._gen = this.gen();
    this.game.phone.clearTodos();
    this.game.phone.addTodo({
        id: "TRANSLATE",
        text: "Прослухати інформацію"
    });
    this.game.phone.setEnabled(false);
    this.game.phone.setTime('11:00');
    this.game.phone.setDate('21.05.19');
}

preload() {
    // this.load.image('bg', './assets/images/2-2 (water)/bg-2-2a.png');
    this.load.image('teacher', './assets/images/2-3(indy)/hipster.png');
    this.load.image('background', './assets/images/2-3(indy)/background.png');
    this.load.image('cloud', './assets/images/2-3(indy)/cloud.png');
    this.load.image('slide1', './assets/images/2-3(indy)/slide1.png');
    this.load.image('slide2', './assets/images/2-3(indy)/slide2.png');
    this.load.image('slide3', './assets/images/2-3(indy)/slide1.png');
    this.load.image('slide4', './assets/images/2-3(indy)/slide2.png');
    this.load.image('bg_speaking', './assets/images/2-3(indy)/bg-speaking.png');
    // this.load.image('notebook', './assets/images/2-2 (water)/hands-note.png');
    this.load.image('bad', './assets/images/2-1 (crossword)/bad.png');
}

create() {
    this.testAPI = {...testAPI};
    for (let key in this.testAPI) {
        this.testAPI[key] = this.testAPI[key].bind(this);
    }

    let bg = this.game.add.image(0, 0, 'background');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;
    this.slide1=this.testAPI.makeImg(440, 85, 'slide1',1100,700);
    this.slide2=this.testAPI.makeImg(440, 85, 'slide2',1100,700);
    this.slide3=this.testAPI.makeImg(440, 85, 'slide3',1100,700);
    this.slide4=this.testAPI.makeImg(440, 85, 'slide4',1100,700);
    this.teacher=this.testAPI.makeImg(1200, 300, 'teacher',500,740);
    this.bg_speaking=this.testAPI.makeImg(100, 850, 'bg_speaking',1700,200);
    this.cloud=this.testAPI.makeImg(10, 580, 'cloud',400,200);

    this.stage.disableVisibilityChange = true;

    this.grade = 100;
    this.flag = true;
    this.bad = [];

    
    this.next();
}

    shutdown() {
        this.game.camera.scale.setTo(1, 1);
    }


next() {
    this._gen.next();
}
}