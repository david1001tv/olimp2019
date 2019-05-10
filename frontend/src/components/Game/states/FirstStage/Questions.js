import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import FSF from '../../states/FirstStageFunctions';

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
     let oneTask=this.FSF.oneTask(this.slide1, this.cloud, 
        "Idea slide ..... долор", 
        ["а) hgjhgj","б) jkjhkjh","в) hgjhgj","г) fhgfhg"], 
        [false,true,false,false],  
        this.FSF.addText,this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
    yield;
    this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)

//second question
    oneTask=this.FSF.oneTask(this.slide2, this.cloud, 
        "Idea slide2 ..... долор", 
        ["а) 11111","б) 2222","в) hgjhgj","г) fhgfhg"], 
        [true,false,false,false],  
        this.FSF.addText,this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
    yield;
    this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)

//third question
     oneTask=this.FSF.oneTask(this.slide3, this.cloud, 
        "Idea slide3 ..... долор", 
        ["а) 3333","б) jkjhkjh","в) hgjhgj","г) fhgfhg"], 
        [false,true,false,false],  
        this.FSF.addText,this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
    yield;
    this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)
    
//fourth question
    oneTask=this.FSF.oneTask(this.slide4, this.cloud, 
        "Idea slide4 ..... долор", 
        ["а) 44444","б) 2222","в) hgjhgj","г) fhgfhg"], 
        [true,false,false,false],  
        this.FSF.addText,this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
    yield;
    this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)

   

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
    this.load.image('teacher', './assets/images/1-1 (questions)/hipster.png');
    this.load.image('background', './assets/images/1-1 (questions)/background.png');
    this.load.image('cloud', './assets/images/1-1 (questions)/cloud.png');
    this.load.image('slide1', './assets/images/1-1 (questions)/slide1.png');
    this.load.image('slide2', './assets/images/1-1 (questions)/slide2.png');
    this.load.image('slide3', './assets/images/1-1 (questions)/slide1.png');
    this.load.image('slide4', './assets/images/1-1 (questions)/slide2.png');
    this.load.image('bg_speaking', './assets/images/1-1 (questions)/bg-speaking.png');
    this.load.image('bad', './assets/images/1-1 (questions)/bad.png');
}

create() {
    this.FSF = {...FSF};
    for (let key in this.FSF) {
        this.FSF[key] = this.FSF[key].bind(this);
    }

    let bg = this.game.add.image(0, 0, 'background');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;
    this.slide1=this.FSF.makeImg(440, 85, 'slide1',1100,700);
    this.slide2=this.FSF.makeImg(440, 85, 'slide2',1100,700);
    this.slide3=this.FSF.makeImg(440, 85, 'slide3',1100,700);
    this.slide4=this.FSF.makeImg(440, 85, 'slide4',1100,700);
    this.teacher=this.FSF.makeImg(1200, 300, 'teacher',500,740);
    this.bg_speaking=this.FSF.makeImg(100, 850, 'bg_speaking',1700,200);
    this.cloud=this.FSF.makeImg(10, 580, 'cloud',400,200);

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