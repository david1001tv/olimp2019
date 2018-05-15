/* globals __DEV__ */
import Phaser from 'phaser';
import { smartSetHeight } from '../../utils';
import { getHistory } from '~api';

export default class GradesState extends Phaser.State {
    * gen() {
        this.game.displayDialogLine('Федосова І.В.', 'Так, це бал твого атестату, ми його перевели уже до 200-бальної \
        системи.', () => this.next());
        yield;
        let att = this.history.find(e => e.state === 'Docs').score + this.history.find(e => e.state === 'Scanner').score;
        this.game.add.text(1020, 470, att, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова І.В.', 'Наступне в нас ЗНО з української мови.', () => this.next());
        yield;
        let ukr = this.history.find(e => e.state === 'Cross').score;
        this.game.add.text(1020, 530, ukr, {
            font: "30px Pangolin",
        });
       // yield;

        this.game.displayDialogLine('Федосова І.В.', 'Далі математика.', () => this.next());
        yield;
        let math = this.history.find(e => e.state === 'WaterMarket').score;
        this.game.add.text(1020, 590, math, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова І.В.', 'Остання англійська мова.', () => this.next());
        yield;
        let eng = this.history.find(e => e.state === 'Translate').score;
        this.game.add.text(1020, 650, eng, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова І.В.', 'Тепер ми можем побачити твій загальний рейтинг.', () => this.next());
        yield;
        let rait = (0.1 * att) + (0.4 * math) + (0.2 * ukr) + (0.3 * eng);
        this.game.add.text(980, 710, rait, {
            font: "30px Pangolin",
        });
        //yield;
        this.game.displayDialogLine('Федосова І.В.', 'Тепер підпис...', () => this.next());
        yield;

        this.game.add.tween(this.signature).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
            this.next();
        });
        yield;

        this.game.displayDialogLine('Федосова І.В.', 'Начебто усе. Зараз, поставлю печать.', () => this.next());
        yield;
        this.firstTween.start(); 
        this.game.phone.setEnabled(true);
        this.game.phone.completeTodo("RAIT");

        this.isNext = this.game.add.text(700, 950, "Натисніть сюди, щоб продовжити...", {
            font: "Pangolin",
            fontSize: 70,
            fontStyle: 'italic',
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.isNext.inputEnabled = true;
        this.isNext.input.useHandCursor = true;
        this.isNext.events.onInputDown.add(this.handleClick, this);
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        //window.location.reload();
        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
        this.game.phone.addTodo({
            id: "RAIT",
            text: "Подивитись свої бали"
        });
        this.game.phone.setTime('15:00');
        this.game.phone.setDate('21.07.18');
    }

    preload() {
        this.load.image('bg', './assets/images/2-5 (audience)/bg-papers-n.png');
        this.load.image('stamp', './assets/images/2-5 (audience)/stamp.png');
        this.load.image('hand-stamps', './assets/images/2-5 (audience)/hand-stamps.png');
        this.load.image('hand-wait', './assets/images/2-5 (audience)/hand-wait.png');
        this.load.image('ok', './assets/images/2-1 (crossword)/ok.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.history = [];
        getHistory().then(history => {
            this.history = history.map(e => e);
            this.next();
        });
        
        this.game.add.text(800, 220, "ПДТУ", {
            font: "50px Pangolin",
        });
        this.game.add.text(520, 300, "Це офіційний документ у якому будуть виставлені ваші \nбали ЗНО, \
атестату і рейтинговий бал для вступу в ВНЗ", {
            font: "30px Pangolin"
        });
        this.game.add.text(530, 415, "Найменування", {
            font: "35px Pangolin",
        });
        this.game.add.text(810, 415, "Коефіцієнт", {
            font: "35px Pangolin",
        });
        this.game.add.text(810, 470, "0,1", {
            font: "30px Pangolin",
        });
        this.game.add.text(810, 530, "0,2", {
            font: "30px Pangolin",
        });
        this.game.add.text(810, 590, "0,4", {
            font: "30px Pangolin",
        });
        this.game.add.text(810, 650, "0,3", {
            font: "30px Pangolin",
        });
        this.game.add.text(1020, 415, "Бали", {
            font: "35px Pangolin",
        });
        this.game.add.text(530, 470, "Бал аттестату", {
            font: "30px Pangolin",
        });
        this.game.add.text(530, 530, "Українська мова ", {
            font: "30px Pangolin",
        });
        this.game.add.text(530, 590, "Математика", {
            font: "30px Pangolin",
        });
        this.game.add.text(530, 650, "Англійська мова", {
            font: "30px Pangolin",
        });
        this.game.add.text(530, 710, "Рейтинг: ", {
            font: "30px Pangolin",
        });
        this.game.add.text(500, 850, "Завідувач кафедрою", {
            font: "30px Pangolin",
        });
        this.game.add.text(1040, 850, "І.В. Федосова", {
            font: "30px Pangolin",
        });
        this.game.add.text(850, 895, "підпис", {
            font: "15px Pangolin",
        });
        this.game.add.text(1110, 895, "П.І.Б.", {
            font: "15px Pangolin",
        });

        this.signature = this.game.add.image(820, 800, 'ok');
        smartSetHeight(this.signature, 100);
        this.signature.alpha = 0;
        let stamp = this.game.add.sprite(850, 2000, 'stamp');
        smartSetHeight(stamp, 200);
        let handWait = this.game.add.sprite(1050, 2000, 'hand-wait');
        smartSetHeight(handWait, 500);
        let handStamps = this.game.add.sprite(870, 2000, 'hand-stamps');
        smartSetHeight(handStamps, 470);

        this.firstTween = this.game.add.tween(handWait).to( { y: 700 }, 1500);
        this.secondTween = this.game.add.tween(handWait).to( { x: 1000, y: 770 }, 300);
        this.thirdTween = this.game.add.tween(handWait).to( { y: 2000 }, 10);
        this.fourTween = this.game.add.tween(handStamps).to( { y: 780 }, 10);
        this.fiveTween = this.game.add.tween(handStamps).to({}, 200);
        this.sixTween = this.game.add.tween(handStamps.scale).to({x: 0.6, y: 0.6}, 100);
        this.sevenTween = this.game.add.tween(stamp).to( { y: 800 }, 10);
        this.eightTween = this.game.add.tween(handStamps).to( { y: 2000 }, 10);
        this.nineTween = this.game.add.tween(handWait).to( { y: 770 }, 10);
        this.tenTween = this.game.add.tween(handWait).to( { x: 1050, y: 700 }, 300);
        this.elevenTween = this.game.add.tween(handWait).to( { y: 2000 }, 1500);

        this.firstTween.chain(this.secondTween);
        this.secondTween.chain(this.thirdTween);
        this.thirdTween.chain(this.fourTween);
        this.fourTween.chain(this.fiveTween);
        this.fiveTween.chain(this.sixTween);
        this.sixTween.chain(this.sevenTween);
        this.sevenTween.chain(this.eightTween);
        this.eightTween.chain(this.nineTween);
        this.nineTween.chain(this.tenTween);
        this.tenTween.chain(this.elevenTween);

        this.stage.disableVisibilityChange = true;
        //this.next();
    }

    next() {
        this._gen.next();
    }

    handleClick(){
        setTimeout(() => this.game.displayDialogLine('Федосова І.В.', 'Ось і все. Можеш йти. Про зачислення \
        тебе повідомлять.', () => this.next()), 150);
    }
}