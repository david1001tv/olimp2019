import Phaser from 'phaser';
import {smartSetHeight} from '../../../utils';
import CryptoInput from './CryptoInput';

const keyBoardTemplate = [
    ['Q','W','E','R','T','Z','U','I','O'],
    ['A','S','D','F','G','H','J','K'],
    ['P','Y','X','C','V','B','N','M','L']
];
const words = [
    {word:'acrobat', checked: false},
    {word:'battery', checked: false},
    {word:'chariot', checked: false},
    {word:'dungeon', checked: false},
    {word:'evening', checked: false},
    {word:'forever', checked: false},
    {word:'geology', checked: false},
    {word:'heretic', checked: false},
    {word:'justice', checked: false},
    {word:'kickoff', checked: false},
    {word:'landing', checked: false}
];
const CELL_OFFSET_HOR = 645;
const CELL_OFFSET_VER = 390;

export default class CryptoState extends Phaser.State {
    * gen() {
        let context = this;
        this.generateWord(function() {
            context.game.displayDialogLine('Ви', 'Просторий хол, пронизаний сонячними променями, зустрічає вас галасливим натовпом. Ви відчуваєте себе частиною масштабної і значної події. Захоплення тісно переплітається з хвилюванням, збиваючи з звичного ритму сердце. Ваш погляд розгублено бігає по людських силуетах і табличках, що підняті високо над головами. Так багато кафедр...', () => context.next());
        });
        yield;
        this.clearInputCells();

        this.generateWord(function() {
            context.game.displayDialogLine('Ви', 'Просторий хол, пронизаний сонячними променями, зустрічає вас галасливим натовпом. Ви відчуваєте себе частиною масштабної і значної події. Захоплення тісно переплітається з хвилюванням, збиваючи з звичного ритму сердце. Ваш погляд розгублено бігає по людських силуетах і табличках, що підняті високо над головами. Так багато кафедр...', () => context.next());
        });
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
    }

    preload() {
        this.load.image('machine', './assets/images/crypto/background.png');
        this.load.image('input', './assets/images/crypto/input.png');
        this.load.image('field', './assets/images/crypto/field.png');
        this.load.image('bad', './assets/images/crypto/bad.png');
        this.load.image('ok', './assets/images/crypto/ok.png');
        this.load.image('A', './assets/images/crypto/keyboard/A.png');
        this.load.image('B', './assets/images/crypto/keyboard/B.png');
        this.load.image('C', './assets/images/crypto/keyboard/C.png');
        this.load.image('D', './assets/images/crypto/keyboard/D.png');
        this.load.image('E', './assets/images/crypto/keyboard/E.png');
        this.load.image('F', './assets/images/crypto/keyboard/F.png');
        this.load.image('G', './assets/images/crypto/keyboard/G.png');
        this.load.image('H', './assets/images/crypto/keyboard/H.png');
        this.load.image('I', './assets/images/crypto/keyboard/I.png');
        this.load.image('J', './assets/images/crypto/keyboard/J.png');
        this.load.image('K', './assets/images/crypto/keyboard/K.png');
        this.load.image('L', './assets/images/crypto/keyboard/L.png');
        this.load.image('M', './assets/images/crypto/keyboard/M.png');
        this.load.image('N', './assets/images/crypto/keyboard/N.png');
        this.load.image('O', './assets/images/crypto/keyboard/O.png');
        this.load.image('P', './assets/images/crypto/keyboard/P.png');
        this.load.image('Q', './assets/images/crypto/keyboard/Q.png');
        this.load.image('R', './assets/images/crypto/keyboard/R.png');
        this.load.image('S', './assets/images/crypto/keyboard/S.png');
        this.load.image('T', './assets/images/crypto/keyboard/T.png');
        this.load.image('U', './assets/images/crypto/keyboard/U.png');
        this.load.image('V', './assets/images/crypto/keyboard/V.png');
        this.load.image('W', './assets/images/crypto/keyboard/W.png');
        this.load.image('X', './assets/images/crypto/keyboard/X.png');
        this.load.image('Y', './assets/images/crypto/keyboard/Y.png');
        this.load.image('Z', './assets/images/crypto/keyboard/Z.png');
    }

    create() {
        this.game.add.image(0, 0, 'machine');

        this.keyWidth = this.game.cache.getImage('A').width;
        this.keyHeight = this.game.cache.getImage('A').height;

        this.verticalOffset = 570;
        this.paddingBetweenKeys = 30;
        this.offsetBetweenRows = 100;

        this.random = new Phaser.RandomDataGenerator([Date.now()]);

        this.keyBoard = this.game.add.group();
        this.field = {
            sprite: this.game.add.sprite(662, 155, 'field'),
            text: this.game.add.text(662 + 175, 165, '', {
                fontSize: 40,
                font: 'Pangolin',
            }),
            mark: null
        }

        this.initSymbols();

        this.stage.disableVisibilityChange = true;

        this.game.input.keyboard.addCallbacks(this, null, null, this.keyPressed);

        this.next();
    }

    generateWord(callback) {
        this.currentWord = words[this.random.integerInRange(0, words.length - 1)].word;
        this.updateField();
        this.input = new CryptoInput(CELL_OFFSET_HOR, CELL_OFFSET_VER, this.currentWord, this.game);
        this.input.onInputEnd = () => {
            let answer = '';
            this.input.cells.map((member) => {
                answer += member.value;
            });
            if(answer === this.input.word) {
                this.destroyFieldMark();
                this.setFieldMark(975, 165, 'ok');
                setTimeout(callback, 100);
            }
            else this.setFieldMark(980, 170, 'bad');
        };
    }

    cipheredWord() {
        
    }

    clearInputCells() {
        this.input.cells.forEach((member) => {
            member.sprite.destroy();
            member.text.destroy();
            member.value = '';
        });
    }

    destroyFieldMark() {
        if(this.field.mark) this.field.mark.destroy();
    }

    setFieldMark(x, y, sprite) {
        this.field.mark = this.game.add.sprite(x, y, sprite);
        this.field.mark.width = this.field.mark.height = 40;
    }

    updateField() {
        this.destroyFieldMark();
        this.field.text.setText(this.currentWord);
    }

    initSymbols() {
        for(let i = 0; i < keyBoardTemplate.length; i++) {
            this.toggleOffset(i);
            for(let j = 0; j < keyBoardTemplate[i].length; j++) {
                this.addKey(i, j);
            }
            this.verticalOffset += this.offsetBetweenRows;
        }
    }

    addKey(i, j) {
        let button = this.keyBoard.create(this.horizontalOffset + j*(this.keyWidth + this.paddingBetweenKeys), this.verticalOffset, keyBoardTemplate[i][j]);
        button.value = keyBoardTemplate[i][j];
        button.inputEnabled = true;
        button.events.onInputDown.add(this.keyPressedByMouse, this);

        return button;
    }

    animateKey(key) {
        this.game.add.tween(key.scale).to({x: 0.75, y: 0.75}, 100).to({x: 1, y: 1}, 100).start();
    }

    keyPressed(key) {
        let target = this.keyBoard.iterate('value', key.toUpperCase(), Phaser.Group.RETURN_CHILD);
        this.animateKey(target);
    }

    keyPressedByMouse(key) {
        this.animateKey(key);
        key.key = key.key.toLowerCase();
        this.input.handleKeyDown(key);
    }

    toggleOffset(i) {
        let baseOffset = 552, offset = 50;
        this.horizontalOffset = i%2 === 0 ? baseOffset : baseOffset + offset;
    }

    next() {
        this._gen.next();
    }
}
