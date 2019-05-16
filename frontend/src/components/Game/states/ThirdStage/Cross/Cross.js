import Phaser from 'phaser';
import CrosswordInput from './CrosswordInput';

import {smartSetHeight} from '../../../utils';

export default class CrossState extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;
        
        this.game.displayDialogLine('Голос', 'Ви вирішили трохи прогулятися, провітрити голову. Вам потрібен був час, щоб прийняти рішення, яку з пропозицій роботи прийняти', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Коли Ви розібралися з усіма перспективами, зарплатою і кар\'єрним ростом, належало дати собі відповідь, навіщо Вам потрібна робота, чого ви чекаєте від нового проекту, яким бачите своє життя після прийняття остаточного рішення?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Чи вибираєте Ви «майданчик для старту», тоді варто віддати перевагу варіанту з більшими можливостями для власного розвитку. Чи може Ви перебуваєте в пошуку стабільності? Тоді варто обирати пропозицію з гарантованими незмінними умовами', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Упевнившись в остаточному виборі, Ви рушили до необхідного кабінету. Але не все так просто, як здавалося. Роботодавець попросив Вас виконати ще одне завдання, щоб оцінити Ваші теоретичні знання', () => this.next());
        yield;

        this.buttonFirst_top.inputEnabled = true;
        this.buttonFirst_top.alpha = 1;
        this.selectFirst_top.alpha = 1;

        this.buttonFirst_center.inputEnabled = true;
        this.buttonFirst_center.alpha = 1;
        this.selectFirst_center.alpha = 1;
        
        this.buttonFirst_bottom.inputEnabled = true;
        this.buttonFirst_bottom.alpha = 1;
        this.selectFirst_bottom.alpha = 1;
        yield;

        this.PROGRAMMING = 2;
        this.GRAPHICSS = 1;
        this.NETWORKS = 0;
        this.var_name = this.answer;

        if(this.var_name == this.PROGRAMMING){
            this.game.add.tween(this.bg4).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        }else if(this.var_name == this.GRAPHICSS){
            this.game.add.tween(this.bg3).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        }else if(this.var_name == this.NETWORKS){
            this.game.add.tween(this.bg2).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        }

        this.startGame();
        yield;

        this.game.add.tween(this.bg5).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
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

        this.game.displayDialogLine('Голос', 'Це було важко, але Ви впорались! Залишилося підписати договір, та це вже дрібниці. Ви подолали ще один важкий етап життя, попереду чекає кар\'єрний ріст. Успіхів!', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        if (this.mistakes <= 2){
            this.score = 100;
        }
        else if (this.mistakes <= 4){
            this.score = 50;
        }
        else {
            this.score = 10; 
        }
        this.game.nextState(this.score);

    }

    init() {
        this.score = 0;
        this.mistakes = 0;

        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.addTodo({
            id: "CROSS",
            text: "Розв\'язати кросворд"
        });
        this.game.phone.setEnabled(true);
        this.game.phone.setTime('10:22');
        this.game.phone.setDate('21.07.18');
        this.minPoints = 100;
        this.maxPoints = 200;
        this.answer = null;

    }

    preload() {
            
        this.load.image('bg', './assets/images/3-2 (Cross)/background.png');
        this.load.image('bg2', './assets/images/3-2 (Cross)/seti_fon.png');
        this.load.image('bg3', './assets/images/3-2 (Cross)/grafika_fon.png');
        this.load.image('bg4', './assets/images/3-2 (Cross)/program_fon.png');

        this.load.image('ok', './assets/images/3-2 (Cross)/ok.png');
        this.load.image('bad', './assets/images/3-2 (Cross)/bad.png');
        this.load.image('square', './assets/images/3-2 (Cross)/square.png');

        this.load.spritesheet('button_network', './assets/images/3-2 (Cross)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_design', './assets/images/3-2 (Cross)/Button_Choice_On_Blue.png', 610, 122);
        this.load.spritesheet('button_prog', './assets/images/3-2 (Cross)/Button_Choice_On_Blue.png', 610, 122);

        this.load.image('warning_message', './assets/images/3-2 (Cross)/warning_message.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let bg2 = this.game.add.image(0, 0, 'bg2');
        bg2.height = this.game.width * bg2.height / bg2.width;
        bg2.width = this.game.width;
        bg2.alpha = 0;
        this.bg2 = bg2;

        let bg3 = this.game.add.image(0, 0, 'bg3');
        bg3.height = this.game.width * bg3.height / bg3.width;
        bg3.width = this.game.width;
        bg3.alpha = 0;
        this.bg3 = bg3;

        let bg4 = this.game.add.image(0, 0, 'bg4');
        bg4.height = this.game.width * bg4.height / bg4.width;
        bg4.width = this.game.width;
        bg4.alpha = 0;
        this.bg4 = bg4;

        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(735, 60, 'Вітаємо! Ви підтвердили свої знання\nта отрималу посаду!', {
            font: "Leftonade",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        let buttonFirst_top = this.game.add.button(656, 150, 'button_network', this.selection, this, 1, 1, 0);
        buttonFirst_top.inputEnabled = false;
        buttonFirst_top.alpha = 0;
        this.buttonFirst_top = buttonFirst_top;

        let buttonFirst_center = this.game.add.button(656, 400, 'button_design', this.selection, this, 1, 1, 0);
        buttonFirst_center.inputEnabled = false;
        buttonFirst_center.alpha = 0;
        this.buttonFirst_center = buttonFirst_center;


        let buttonFirst_bottom = this.game.add.button(656, 650, 'button_prog', this.selection, this, 1, 1, 0);
        buttonFirst_bottom.inputEnabled = false;
        buttonFirst_bottom.alpha = 0;
        this.buttonFirst_bottom = buttonFirst_bottom;

        this.selectFirst_top = this.game.add.text(740, 175, 'Системне адміністрування', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_top.alpha = 0; 

        this.selectFirst_center = this.game.add.text(890, 425, 'Дизайн', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_center.alpha = 0; 

        this.selectFirst_bottom = this.game.add.text(830, 675, 'Програмування', {
            font: "Leftonade",
            fontSize: 45,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.selectFirst_bottom.alpha = 0;
        this.next();
    }

    startGame() {
        this.flag_kiy = false;
        this.flagBackspace = false;

        this.timerText = this.game.add.text(32, 32, '', {
            font: "Leftonade",
            fontSize: 70,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });

        if(this.var_name == this.PROGRAMMING){
            this.inputs = [
                new CrosswordInput(1190, 303, 'компілятор', 4, this.game),
                new CrosswordInput(992, 354, 'коментар', 8, this.game),
                new CrosswordInput(1340, 404, 'обєкт', 1, this.game),
                new CrosswordInput(1238, 453, 'алгоритм', 3, this.game),
                new CrosswordInput(1190, 504, 'інкремент', 4, this.game),
                new CrosswordInput(1090, 553, 'константа', 6, this.game),
                new CrosswordInput(1340, 603, 'модуль', 1, this.game),
                new CrosswordInput(1290, 652, 'масив', 2, this.game),
            ];  
        }else if(this.var_name == this.GRAPHICSS){
            this.inputs = [
                new CrosswordInput(1100, 305, 'трасування', 6, this.game),
                new CrosswordInput(1152, 355, 'піксель', 5, this.game),
                new CrosswordInput(1102, 404, 'графіка', 6, this.game),
                new CrosswordInput(1201, 455, 'растушевка', 4, this.game),
                new CrosswordInput(1053, 504, 'редактор', 7, this.game),
                new CrosswordInput(1102, 553, 'палітра', 6, this.game),
                new CrosswordInput(1202, 603, 'планшет', 4, this.game),
                new CrosswordInput(1152, 652, 'анімація', 5, this.game),
            ];  
        }else if(this.var_name == this.NETWORKS){
            this.inputs = [
                new CrosswordInput(1064, 298, 'забезпечення', 6, this.game),
                new CrosswordInput(1215, 348, 'сервер', 3, this.game),
                new CrosswordInput(1264, 397, 'модем', 2, this.game),
                new CrosswordInput(1164, 446, 'провідник', 4, this.game),
                new CrosswordInput(1264, 495, 'память', 2, this.game),
                new CrosswordInput(1016, 546, 'кілобайт', 7, this.game),
                new CrosswordInput(1314, 596, 'домен', 1, this.game),
                new CrosswordInput(1164, 645, 'адреса', 4, this.game),
                new CrosswordInput(1264, 695, 'браузер', 2, this.game),
                new CrosswordInput(1064, 495, 'біт', -1, this.game, true),
            ];  
        }

        this.inputs.forEach((input, index) => {
            input.onInputEnd = () => {
                if (input.value === input.word) {
                    input.blur();
                    let nextInput = this.inputs.find((curr, currIndex) => !curr.disabled && currIndex > index);
                if (nextInput) {
                        setTimeout(() => nextInput.focusCell(0), 0);
                    }
                    input.wrong = false;
                    input.disabled = true;
                } else {
                    this.mistakes += 1;
                    input.wrong = true;
                }

                if (this.inputs.every(input => input.disabled)) {
                    this.game.phone.completeTodo("CROSS");
                    setTimeout(() => this.next(), 500);
                }
            };
        });
        this.inputs[0].focusCell(0);
        this.inputs[0].isFocused = true;

        let bg5 = this.game.add.image(0, 0, 'bg');
        bg5.height = this.game.width * bg5.height / bg5.width;
        bg5.width = this.game.width;
        bg5.alpha = 0;
        this.bg5 = bg5;
    }

    shutdown() {
        clearTimeout(this.goTimer);
        this.inputs.forEach(input => input.destroy());
    }

    render() {

    }

    selection(obj) {
        if (obj.key == 'button_network'){
            this.answer = 0;
        }
        else if (obj.key == 'button_design'){
            this.answer = 1;
        }
        else {
            this.answer = 2;
        }

        this.buttonFirst_top.destroy();
        this.buttonFirst_center.destroy();
        this.buttonFirst_bottom.destroy();

        this.selectFirst_top.destroy();
        this.selectFirst_center.destroy();
        this.selectFirst_bottom.destroy();
        this.next();
    }

    next() {
        this._gen.next();
    }
}