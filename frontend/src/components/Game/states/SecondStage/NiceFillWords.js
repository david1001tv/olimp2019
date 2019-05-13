import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Голос', 'Сьогодні Ви прокинулися в чудовому гуморі та готові з головою зануритися в навчання. За розкладом у Вас "Вступ до комп’ютерних наук", і ось Ви з нетерпінням чекаєте біля кафедри викладача, розмовляючи з одногрупниками о  мріях та сподіваннях', () => this.next());
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.displayDialogLine('Голос', 'Трохи сонний Тарас Денисович, що так і не розлучився з кабелями, привів вас до аудиторії. Ви здивувалися, коли він запропонував відкласти конспекти і зосередити увагу на моніторах. Викладач пояснив, що Вам необхідно виділити серед термінів той, про який буде йти мова', () => this.next());
        yield;
        
        this.game.add.tween(this.bg2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.icon).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
            
        //Уведомление "Знайдіть на робочому столі ярлик і запустіть його"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.icon.inputEnabled = true;
        this.icon.input.useHandCursor = true;
        yield;

        //start game
        this.game.add.tween(this.warning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.firstWarning).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.game.add.tween(this.fw).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();
        this.gameStart = true;
        this.initTiles();

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

        this.game.displayDialogLine('Голос', 'О це була дійсно корисна пара! Ви згадуєте уривки розмов старшокурсників, що почули біля кафедри, і більше не відчуваєте себе невпевнено', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.color = Math.random() * 0xffffff;
        this.gameStart = false;

        // this.game.phone.clearTodos();
        // this.game.phone.addTodos(todos);
        // this.game.phone.setEnabled(false);
        // this.game.phone.setTime('14:07');
        // this.game.phone.setDate('02.07.18');
    }
       

    preload() {
        this.load.image('bg', './assets/images/2-2 (Fillwords)/background.png');
        this.load.image('teacher', './assets/images/2-2 (Fillwords)/teacher.png');

        this.load.image('bg2', './assets/images/2-2 (Fillwords)/background2.png');
        this.load.image('fw', './assets/images/2-2 (Fillwords)/fillwords-field.png');
        this.load.image('icon', './assets/images/2-2 (Fillwords)/fillwords-icon.png');

        this.load.image('warning_message', './assets/images/2-2 (Fillwords)/warning_message.png');
    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;

        this.teacher = this.SSF.makeImg(1329, 200, 'teacher', 600, 900);

        let icon = this.game.add.image(220, 280, 'icon');
        icon.inputEnabled = false;
        icon.events.onInputDown.add(() => {
            this.next();
            icon.inputEnabled = false;
            this.game.canvas.style.cursor = "default";
        }, this);
        icon.alpha = 0;
        this.icon = icon;

        this.fw = this.SSF.makeImg(650, 100, 'fw', 750, 750);
        
        this.mass = ['архітектура', 'дедлайн', 'модуль', 'інтеграція', 'скрам', 'беклог', 'вірус', 'білд', 'тестувальник', 'репозиторій', 'мітап', 'версія', 'репорт', 'сервер'];
        this.count = 0;

        this.tileLetters = [
            'м', 'р', 'в', 'с', 'н', 'і', 'а', 'р', 'х', 'і',
            'о', 'е', 'і', 'к', 'т', 'я', 'т', 'л', 'ь', 'т',
            'д', 'п', 'р', 'р', 'е', 'і', 'е', 'а', 'н', 'е',
            'у', 'о', 'у', 'а', 'г', 'ц', 'с', 'в', 'и', 'к',
            'л', 'з', 'с', 'м', 'р', 'а', 'т', 'у', 'к', 'т',
            'ь', 'и', 'м', 'і', 'т', 'а', 'п', 'б', 'р', 'у',
            'р', 'т', 'о', 'р', 'і', 'й', 'я', 'е', 'а', 'г',
            'е', 'п', 'в', 'е', 'р', 'с', 'і', 'к', 'л', 'о',
            'д', 'о', 'р', 'т', 'с', 'е', 'р', 'в', 'е', 'р',
            'е', 'д', 'л', 'а', 'й', 'н', 'б', 'і', 'л', 'д'
        ];

        this.tileColors = [
            '#ffffff'
        ];

        this.tileWidth = 66;
        this.tileHeight = 66;


        this.tiles = this.game.add.group();


        this.tileGrid = [
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null]
        ];


        this.leftBuffer = 689;
        this.topBuffer = 157;

        //random
        var seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);

        this.guessing = false;
        this.currentWord = [];
        this.correctWords = [];

        this.game.input.onDown.add(function(){this.guessing = true;}, this);
        this.game.input.onUp.add(function(){this.guessing = false;}, this);

        this.selectBuffer = this.tileWidth / 15;


        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(760, 60, 'Знайдіть на робочому столі\nярлик і запустіть його', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;


        this.secondWarning = this.game.add.text(725, 40, 'Виділить одним довгим\nнатисканням слово, та викладач\nпояснить його', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;

        this.thirdWarning = this.game.add.text(735, 40, 'Вітаємо! Тепер Ви можете\nрозмовляти загадковою мовою\nпрограмістів', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.thirdWarning.alpha = 0;

        this.next();

    }

    initTiles(){

        for(var i = 0; i < this.tileGrid.length; i++){

            for(var j = 0; j < this.tileGrid.length; j++){

                var tile = this.addTile(i, j);

                this.tileGrid[i][j] = tile;
            }
        }
        
    }

    addTile(x, y){
        //var tileLetter = this.tileLetters[this.random.integerInRange(0, this.tileLetters.length - 1)];
        var tileLetter = this.tileLetters[this.count];
        this.count++;
        
        var tileColor = this.tileColors[this.random.integerInRange(0, this.tileColors.length - 1)];
        var tileToAdd = this.createTile(tileLetter, tileColor);   

        var tile = this.tiles.create(this.leftBuffer + (x * this.tileWidth) + this.tileWidth / 2, 0, tileToAdd);

        this.game.add.tween(tile).to({y:this.topBuffer + (y*this.tileHeight+(this.tileHeight/2))}, 500, Phaser.Easing.Linear.In, true)
        tile.anchor.setTo(0.5, 0.5);
        tile.tileLetter = tileLetter;

        return tile;

    }

    createTile(letter, color){

        var tile = this.game.add.bitmapData(this.tileWidth, this.tileHeight);

        tile.ctx.rect(5, 5, this.tileWidth - 5, this.tileHeight - 5);
        tile.ctx.fillStyle = color;
        tile.ctx.fill();

        tile.ctx.font = '30px Arial';
        tile.ctx.textAlign = 'center';
        tile.ctx.textBaseline = 'middle';
        tile.ctx.fillStyle = '#fff';
        if(color == '#ffffff'){
            tile.ctx.fillStyle = '#000000';
        }
        tile.ctx.fillText(letter, this.tileWidth / 2, this.tileHeight / 2);

        return tile;

    }

    update() {
        if (this.gameStart){
            if (this.correctWords.length == this.mass.length){
                this.next();
            }

            if(this.guessing){

                var hoverX = this.game.input.x;
                var hoverY = this.game.input.y;

                var hoverPosX = Math.floor((hoverX - this.leftBuffer)/this.tileWidth);
                var hoverPosY = Math.floor((hoverY - this.topBuffer)/this.tileHeight);

                if(hoverPosX >= 0 && hoverPosX < this.tileGrid[0].length && hoverPosY >= 0 && hoverPosY < this.tileGrid.length && hoverPosX != 10){
                    var hoverTile = this.tileGrid[hoverPosX][hoverPosY];

                    var tileLeftPosition = this.leftBuffer + (hoverPosX * this.tileWidth);
                    var tileRightPosition = this.leftBuffer + (hoverPosX * this.tileWidth) + this.tileWidth;
                    var tileTopPosition = this.topBuffer + (hoverPosY * this.tileHeight);
                    var tileBottomPosition = this.topBuffer + (hoverPosY * this.tileHeight) + this.tileHeight;
                    if(!hoverTile.isActive && hoverX > tileLeftPosition + this.selectBuffer && hoverX < tileRightPosition - this.selectBuffer 
                        && hoverY > tileTopPosition + this.selectBuffer && hoverY < tileBottomPosition - this.selectBuffer){  

                        hoverTile.isActive = true;

                        console.log(hoverTile.tileLetter);

                        this.currentWord.push(hoverTile);
                        hoverTile.tint = this.color;

                    }
                }

            }
            else {

                if(this.currentWord.length > 0){

                    var guessedWord = '';

                    for(var i = 0; i < this.currentWord.length; i++){
                        guessedWord += this.currentWord[i].tileLetter;
                        this.currentWord[i].isActive = false;
                        
                    }

                    if(this.mass.indexOf(guessedWord) > -1 && guessedWord.length > 1){

                        if(this.correctWords.indexOf(guessedWord) == -1){

                            console.log("correct!");
                            this.color = Math.random() * 0xffffff;
                            this.correctWords.push(guessedWord);

                            this.game.add.tween(this.teacher).to({
                                alpha: 1
                            }, 1500, Phaser.Easing.Cubic.InOut)
                                .start(); 
                            let str;
                            switch(guessedWord){
                                case this.mass[0]:
                                    str="Архитектура";
                                    break;
                                case this.mass[1]:
                                    str="Сайдбар на сайті - це бічна панель, де розташовуються елементи, візуально відокремлені від інших, які повідомляють додаткову інформацію.";
                                    break;
                                case this.mass[2]:
                                    str="Контент - це все, що є присутнім на сайті: текстовий зміст, зображення, аудіо, відео та інші файли будь-яких розширень";
                                    break;
                                case this.mass[3]:
                                    str="Футер, підвал - це блок в нижній частині сторінки, куди виносять корисну, але не першорядну інформацію, найчастіше контактні дані";
                                    break;
                                case this.mass[4]:
                                    str="Логотип для сайту - це емблема, унікальне зображення, за яким сайт відрізняють від інших";
                                    break;
                                case this.mass[5]:
                                    str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                                    break;
                                case this.mass[6]:
                                    str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                                    break;
                                case this.mass[7]:
                                    str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                                    break;
                                case this.mass[8]:
                                    str="Сайдбар на сайті - це бічна панель, де розташовуються елементи, візуально відокремлені від інших, які повідомляють додаткову інформацію.";
                                    break;
                                case this.mass[9]:
                                    str="Контент - це все, що є присутнім на сайті: текстовий зміст, зображення, аудіо, відео та інші файли будь-яких розширень";
                                    break;
                                case this.mass[10]:
                                    str="Футер, підвал - це блок в нижній частині сторінки, куди виносять корисну, але не першорядну інформацію, найчастіше контактні дані";
                                    break;
                                case this.mass[11]:
                                    str="Логотип для сайту - це емблема, унікальне зображення, за яким сайт відрізняють від інших";
                                    break;
                                case this.mass[12]:
                                    str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                                    break;
                                case this.mass[13]:
                                    str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                                    break;
                                default:
                                    str+="";
                            }
                            this.game.displayDialogLine('Тарас Денисович', 'Дуже добре',()=>{
                                this.game.displayDialogLine('Тарас Денисович', str, ()=>{
                                    this.game.add.tween(this.teacher).to({
                                        alpha: 0
                                    }, 1500, Phaser.Easing.Cubic.InOut)
                                        .start(); 
                                });
                            });

                            // console.log(guessedWord);
                            // this.game.displayDialogLine('123', '12323');

                        } 

                    } 
                    else {
                        this.currentWord.forEach((index) => {
                            index.tint = 0xffffff;
                        });


                        this.color = Math.random() * 0xffffff;
                        console.log("incorrect!");

                        this.game.add.tween(this.teacher).to({
                            alpha: 1
                        }, 1500, Phaser.Easing.Cubic.InOut)
                            .start(); 
                        this.game.displayDialogLine('Анастасія Марківна', 'Хм ... не думаю, що таке слово існує',()=>{
                            this.game.add.tween(this.teacher).to({
                                    alpha: 0
                                }, 1500, Phaser.Easing.Cubic.InOut)
                                    .start(); 
                        });
                    }

                    //Reset the current word
                    this.currentWord = [];

                }

            }
        }
    }

next() {
    this._gen.next();
}

}
