import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import FSF from '../../states/FirstStageFunctions';

export default class QuestionsState extends Phaser.State {
    * gen() {
        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.game.displayDialogLine('Голос', 'Просторий хол, пронизаний сонячними променями, зустрічає вас галасливим натовпом. Захоплення тісно переплітається з хвилюванням, збиваючи зі звичного ритму сердце. Ваш погляд розгублено бігає по людських силуетах і табличках, що підняті високо над головами. Так багато кафедр...', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Але ось Ви помічаєте необхідну, її неможливо сплутати з іншими', () => this.next());
        yield;

        //Уведомление "Подсказка о выборе группы"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.add.tween(this.secondWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.bg.inputEnabled = true;
        yield;

        this.game.add.tween(this.warning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.add.tween(this.secondWarning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

		this.game.displayDialogLine('Голос', 'Приєднавшись до групи юнаків і дівчат, Ви непомітно розглядаєте ту, що утримує табличку в доглянутих руках з ніжним манікюром', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'У ній підсвідомо відчувається порода жінок, що зачаровують з перших поглядів і граціозних жестів. Вам важко повірити, що крижана красуня обрала шлях ІТ, але очі не обманюють', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();

        if (!this.friend){
            this.game.displayDialogLine('Голос', 'Здається, Ви знаєте, хто така Стильна', () => this.next());
            yield;
        }

        this.game.displayDialogLine('Викладач', 'Ще раз повторюю, звуть мене Анастасія Марківна, дочекаємося інших і через декілька хвилин підем до аудиторії', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Невдовзі Ви разом з іншими рушаєте коридорами університету до лекційної зали з підготовленим для презентації екраном', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start()

        this.game.add.tween(this.bg).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                this.game.add.tween(this.presentation).to({
                    alpha: 1
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start().onComplete.add(() => this.next());
        });
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start()
        
        this.game.add.tween(this.slide1).to({
            alpha: 0.9
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви розумієте, яку помилку допустили, обравши останню парту. Слова Анастасії Марківни, як вона представилась, долітають до вас через одне', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Пересісти ближче немає можливості: всі місця зайняті. Добре хоч екран великий, і можна здогадатися, що за слово Ви не почули, ознайомившись з інформацією', () => this.next());
        yield; 

        this.game.add.tween(this.fake_dialog).to({
            alpha: 0.8
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.slide1).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => this.next());
        yield;

        //first question
        let oneTask=this.FSF.oneTask(this.slide2, this.cloud, 
            "Сфера ІТ ... розвивається, і хороший ІТ-фахівець ніколи не залишиться без роботи", 
            ["а) повільно","б) динамічно","в) стрибкоподібно","г) невпевнено"], 
            [false,true,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect, this.FSF.deleteText, oneTask, this.cloud);
        console.log(this.mistakes);
        
        //second question
        oneTask=this.FSF.oneTask(this.slide3, this.cloud, 
            "Комп'ютерні науки є дуже ... спеціальністю", 
            ["а) престижною","б) героїчною","в) магічною","г) застарілою"], 
            [true,false,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect, this.FSF.deleteText, oneTask, this.cloud);

        //third question
        oneTask=this.FSF.oneTask(this.slide4, this.cloud, 
            "Ми підготуємо вас до проектування, розробки та супроводу ... систем", 
            ["а) інформаційних","б) телекомунікаційних","в) зоряних","г) геоінформаційних"], 
            [true,false,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)

        //fourth question
        oneTask=this.FSF.oneTask(this.slide5, this.cloud, 
            "На спеціальності 'КН' ... вивчають графіку, комп'ютерні мережі і розробку програмного забезпечення", 
            ["а) викладачі","б) студенти","в) бабусі","г) чаклуни"], 
            [false,true,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)
        
        //fifth question
        oneTask=this.FSF.oneTask(this.slide6, this.cloud, 
            "Спеціаліст з інформаційних технологій може реалізувати себе у ... напрямках.", 
            ["а) безлічі","б) двох","в) небагатьох","г) гуманітарних"], 
            [true,false,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)

        //sixth question
        oneTask=this.FSF.oneTask(this.slide7, this.cloud, 
            "Після навчання ви можете влаштуватися на посаду ... продюсера", 
            ["а) театрального","б) музичного","в) кiно","г) веб"], 
            [false,false,false,true],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)
       

        this.game.add.tween(this.cloud).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.fake_dialog).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        //seventh question
        this.game.add.tween(this.slide8).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {  
                this.game.add.tween(this.slide8).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start();
                this.next();
            }, 2000));
        yield;
        
        this.game.add.tween(this.fake_dialog).to({
            alpha: 0.8
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        oneTask=this.FSF.oneTask(this.slide9, this.cloud, 
            "Підвищення кваліфікації призначене для ... знань обраної вами професії", 
            ["а) узагальнення","б) успадкування","в) поглиблення","г) погiршення"], 
            [false,false,true,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)     

        //eigth question
        oneTask=this.FSF.oneTask(this.slide10, this.cloud, 
            "Почавши свою кар’єру як Junior, ви можете досягти звання ...", 
            ["а) Senior","б) Master","в) Mister","г) Don"], 
            [true,false,false,false],  
            this.FSF.addText, this.FSF.addTextSimple, this.FSF.makeAnswer,this.FSF.getMasAnswer,this.FSF.addCheck,this.FSF.setTextAlpha);
        yield;
        this.FSF.deleteTask(this.FSF.destroyIncorrect,this.FSF.deleteText,oneTask,this.cloud)  

        //Уведомление: "Окончание квеста (результат)"
        if (this.mistakes <= 1) {
            this.firstWarning = this.game.add.text(760, 45, 'Ви уважно слухали викладача і\nотримали повніше уявлення\nпро професію', {
                font: "Leftonade",
                fontSize: 30,
                fill: 'white',
                stroke: 'black',
                strokeThickness: 8,
            });
        }
        else if (this.mistakes > 1 ) {
            this.firstWarning = this.game.add.text(760, 60, 'Ви здобули базове уявлення про\nпрофесію. Варто бути уважнішим', {
                font: "Leftonade",
                fontSize: 30,
                fill: 'white',
                stroke: 'black',
                strokeThickness: 8,
            });
        }
        this.firstWarning.alpha = 0;

        this.game.add.tween(this.fake_dialog).to({
            alpha: 0
        }, 1000, Phaser.Easing.Cubic.InOut)
            .start();
        
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

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.firstWarning).to({
                        alpha: 0
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start();
                }, 3000);   
        });
        
        this.game.displayDialogLine('Голос', 'За один лише день Ви перенасичені інформацією, але рішення приймаєте усвідомлено. Ви міцні у своїй вірі, що дивний світ ІТ - це Ваш шлях. Тож перший і найважчий крок був зроблений...', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        this.camera.scale.setTo(1, 1);

        if (this.mistakes <= 1){
            this.score = 100;
        }
        else if (this.mistakes <= 3){
            this.score = 50;
        }
        else {
            this.score = 10; 
        }
        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        this.go = false;

        //кол-во ошибок
        this.mistakes = 0;
        this.score = 0;

        //Выбранные вариант в PostIntro, из бд: 0 - girl, 1 - man
        let choices = this.game.getChoice();
        choices.then(res => {
			this.friend = res.friend;
            this.next();
        });
    }

    preload() {
        this.load.image('bg', './assets/images/1-2 (Questions)/background.png');
        this.load.image('presentation', './assets/images/1-2 (Questions)/presentation.png');
        this.load.image('teacher', './assets/images/1-2 (Questions)/teacher.png');
        this.load.image('cloud', './assets/images/1-2 (Questions)/cloud.png');


        for (let i = 1; i < 11; i++){
            this.load.image('slide' + i, './assets/images/1-2 (Questions)/slide' + i + '.png');
        }

        this.load.image('bad', './assets/images/1-2 (Questions)/bad.png');
        this.load.image('warning_message', './assets/images/1-2 (Questions)/warning_message.png');
        this.load.image('fake_dialog_background', './assets/images/1-2 (Questions)/fake_dialog_background.png');
    }

    create() {
        this.FSF = {...FSF};
        for (let key in this.FSF) {
            this.FSF[key] = this.FSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        bg.inputEnabled = false;
        bg.events.onInputDown.add(this.clickZone, this);
        this.bg = bg;

        let presentation = this.game.add.image(0, 0, 'presentation');
        presentation.height = this.game.width * presentation.height / presentation.width;
        presentation.width = this.game.width;
        presentation.alpha = 0;
        this.presentation = presentation;


        this.slide1 = this.FSF.makeImg(405, 140, 'slide1', 1130, 900);
        this.slide2 = this.FSF.makeImg(405, 140, 'slide2', 1130, 900);
        this.slide3 = this.FSF.makeImg(405, 140, 'slide3', 1130, 900);
        this.slide4 = this.FSF.makeImg(405, 140, 'slide4', 1130, 900);
        this.slide5 = this.FSF.makeImg(405, 140, 'slide5', 1130, 900);
        this.slide6 = this.FSF.makeImg(405, 140, 'slide6', 1130, 900);
        this.slide7 = this.FSF.makeImg(405, 140, 'slide7', 1130, 900);
        this.slide8 = this.FSF.makeImg(405, 140, 'slide8', 1130, 900);
        this.slide9 = this.FSF.makeImg(405, 140, 'slide9', 1130, 900);
        this.slide10 = this.FSF.makeImg(405, 140, 'slide10', 1130, 900);


        this.teacher = this.FSF.makeImg(1260, 0, 'teacher', 700, 900);

        this.fake_dialog = this.FSF.makeImg(40, 800, 'fake_dialog_background', 1820, 400);
        this.cloud = this.FSF.makeImg(10, 580, 'cloud', 400, 200);

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        //Уведомление: "Подсказка, что необходимо выбрать толпу"
        this.secondWarning = this.game.add.text(740, 85, 'Менi потрiбно обрати вiрну групу', {
            font: "Leftonade",
            fontSize: 33,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;

        this.stage.disableVisibilityChange = true;

        this.grade = 100;
        this.flag = true;
        this.bad = [];
    }

    clickZone(obj) {
        let positionX = this.game.input.mousePointer.x;
        let positionY = this.game.input.mousePointer.y;

        if (positionX <= 710 && positionX >= 275 && positionY <= 800 && positionY >= 150){
            this.go = true;
            this.bg.inputEnabled = false;
            this.next();
        }
        else {
            this.go = false;
        }
    
    }

    next() {
        this._gen.next();
    }
}