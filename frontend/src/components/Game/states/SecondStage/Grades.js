/* globals __DEV__ */
import Phaser from 'phaser';
import { smartSetHeight } from '../../utils';
import { getHistory } from '~api';

export default class GradesState extends Phaser.State {
    * gen() {
        this.game.displayDialogLine('Федосова', 'Так, це бал твого атестату, ми його перевели уже до 200-бальної \
        системи.', () => this.next());
        yield;
        let att = this.history.find(e => e.state === 'Docs').score + this.history.find(e => e.state === 'Scanner').score;
        this.game.add.text(650, 340, att, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова', 'Наступне в нас ЗНО з української мови.', () => this.next());
        yield;
        let ukr = this.history.find(e => e.state === 'Cross').score;
        this.game.add.text(770, 410, ukr, {
            font: "30px Pangolin",
        });
       // yield;

        this.game.displayDialogLine('Федосова', 'Далі математика.', () => this.next());
        yield;
        let math = this.history.find(e => e.state === 'WaterMarket').score;
        this.game.add.text(705, 480, math, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова', 'Остання англійська мова.', () => this.next());
        yield;
        let eng = this.history.find(e => e.state === 'Translate').score;
        this.game.add.text(695, 550, eng, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова', 'Тепер ми можем побачити твій загальний рейтинг.', () => this.next());
        yield;
        let rait = (0.1 * att) + (0.4 * math) + (0.2 * ukr) + (0.3 * eng);
        this.game.add.text(570, 620, rait, {
            font: "30px Pangolin",
        });
        //yield;

        this.game.displayDialogLine('Федосова', 'Начебто усе. Зараз, поставлю печать.', () => this.next());
        yield;
        this.firstTween.start(); 
        this.game.phone.setEnabled(true);
        this.game.phone.completeTodo("RAIT");

        this.isNext = this.game.add.text(1700, 1000, "Далі", {
            font: "50px Pangolin",
        });
        this.isNext.inputEnabled = true;
        this.isNext.input.useHandCursor = true;
        this.isNext.events.onInputDown.add(this.handleClick, this);
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

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
        this.load.image('bg', './assets/images/2-5 (audience)/bg-papers.png');
        this.load.image('stamp', './assets/images/2-5 (audience)/stamp.png');
        this.load.image('hand-stamps', './assets/images/2-5 (audience)/hand-stamps.png');
        this.load.image('hand-wait', './assets/images/2-5 (audience)/hand-wait.png');
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
        
        this.game.add.text(800, 200, "ПДТУ", {
            font: "50px Pangolin",
        });
        this.game.add.text(450, 270, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at.", {
            font: "30px Pangolin",
        });
        this.game.add.text(450, 340, "Бал аттестату: ", {
            font: "30px Pangolin",
        });
        this.game.add.text(450, 410, "ЗНО з української мови: ", {
            font: "30px Pangolin",
        });
        this.game.add.text(450, 480, "ЗНО з математики: ", {
            font: "30px Pangolin",
        });
        this.game.add.text(450, 550, "ЗНО з англійської: ", {
            font: "30px Pangolin",
        });
        this.game.add.text(450, 620, "Рейтинг: ", {
            font: "30px Pangolin",
        });

        let stamp = this.game.add.sprite(1000, 2000, 'stamp');
        smartSetHeight(stamp, 200);
        let handWait = this.game.add.sprite(1200, 2000, 'hand-wait');
        smartSetHeight(handWait, 500);
        let handStamps = this.game.add.sprite(990, 2000, 'hand-stamps');
        smartSetHeight(handStamps, 470);

        this.firstTween = this.game.add.tween(handWait).to( { y: 700 }, 1500);
        this.secondTween = this.game.add.tween(handWait).to( { x: 1120, y: 770 }, 300);
        this.thirdTween = this.game.add.tween(handWait).to( { y: 2000 }, 10);
        this.fourTween = this.game.add.tween(handStamps).to( { y: 780 }, 10);
        this.fiveTween = this.game.add.tween(handStamps).to({}, 200);
        this.sixTween = this.game.add.tween(handStamps.scale).to({x: 0.6, y: 0.6}, 100);
        this.sevenTween = this.game.add.tween(stamp).to( { y: 800 }, 10);
        this.eightTween = this.game.add.tween(handStamps).to( { y: 2000 }, 10);
        this.nineTween = this.game.add.tween(handWait).to( { y: 770 }, 10);
        this.tenTween = this.game.add.tween(handWait).to( { x: 1200, y: 700 }, 300);
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
    }

    next() {
        this._gen.next();
    }

    handleClick(){
        setTimeout(() => this.game.displayDialogLine('Федосова', 'Ось і все. Можеш йти. Про зачислення \
        тебе повідомлять.', () => this.next()), 150);
    }
}