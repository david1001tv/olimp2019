import Phaser from 'phaser';
import {smartSetHeight} from '../../../utils';
import CryptoInput from './CryptoInput';
import SSF from '../../../states/SecondStageFunctions';

const keyBoardTemplate = [
    ['Q','W','E','R','T','Z','U','I','O'],
    ['A','S','D','F','G','H','J','K'],
    ['P','Y','X','C','V','B','N','M','L']
];
const words = [
    'acrobat',
    'battery', 
    'chariot', 
    'dungeon', 
    'evening', 
    'forever', 
    'geology', 
    'heretic', 
    'justice', 
    'kickoff', 
];
const vigenereKeys = [
    'ability',
    'barrier',
    'calibre',
    'dancing',
    'economy',
    'failure',
    'garbage',
    'haircut',
    'jackpot',
    'keyword'
];
const CELL_OFFSET_HOR = 645;
const CELL_OFFSET_VER = 390;
const ALPHABET_END = 122;
const ALPHABET_BEGIN = 97;
const MARK_OFFSET_HOR = 1090;
const MARK_OFFSET_VER = 165;
const MARK_SIZE = 40;
const PADDING_BETWEEN_KEYS = 30;
const PADDING_BETWEEN_ROWS = 100;
const FIELD_OFFSET_HOR = 662;
const FIELD_OFFSET_VER = 155;
const FIELD_TEXT_OFFSET_HOR = 837;
const FIELD_TEXT_OFFSET_VER = 165;
const FIELD_TEXT_FONT_SIZE = 40;
const BASE_KEYBOARD_OFFSET = 552;
const TOGGLE_KEYBOARD_OFFSET = 50;

export default class CryptoState extends Phaser.State {
    * gen() {

        let context = this;

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;

        this.game.displayDialogLine('Голос', 'Страшно уявити, що Ви будете проходити в магістратурі. \
        Вам уявляються секретні знання, недосяжні для звичайних людей. Та ось наближається Адам \
        Вікторович, і на книжці у його руках Ви читаєте “Криптографія”. Що ж, звучить цікаво!', 
        () => this.next());
        yield;

        this.game.add.tween(this.cathedra).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
            this.game.add.tween(this.machine).to({
                alpha: 1
            }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
                this.generateStage();
                this.generateKey(1);
                this.teacherAppears('Ви', 'Доброго дня, Адаме Вікторовичу!');
            }); 
        }); 
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Вітаю, студент! Я здивований, що ти прийшов \
        до мене на пару раніше її початку. Для студентів 4 курсу це дуже рідке явище! Криптографія - дуже \
        цікава наука, але все одно студенти навіть не уявляють її важливості для сучасних комп\'\ютерних наук.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Це дуже дивно, адже я прийшов до вас як раз з питанням\
        стосовно криптографії.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Та невже !? Ну гаразд, я тебе уважно слухаю.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Останні кілька днів я займаюсь розробкою сайта університету.\
        В мене вже багато чого зроблено - дизайн, макет сайту, розгорнут сервер. Сьогодні я вже дійшов\
        до функціоналу реєстрації та авторизації на сайті. Однак є такая проблема: мені необхідно зберігати\
        данні клієнта у безпечному форматі, особливо його пароль в системі.', 
        () => this.next());
        yield;
        
        this.game.displayDialogLine('Ви', 'Мені відомо, що для цього існує\
        безліч різноманітних алгоритмів шифрування, але я не можу знайти найбільш ефективний з них. Ви\
        не могли би мені допомогти ?', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Хм, розробка сайта університету? Звучить доволі серйозно\
        з твого боку. Гаразд, я допоможу тобі. Але не сподівайся, що я сам все тобі розкажу! Найкращий спосіб\
        засвоїти матеріал - це використати його на практиці. Отже, якщо ти дійсно хочеш розбиратися у\
        шифрувальних алгоритмах, тобі доведеться виконати кілька моїх завдань.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Гаразд, я готовий.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Добре, тоді почнемо!', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Перше завдання для тебе буде пов\'\язано \
        з шифром Цезаря. Шифр Цезаря - це вид шифру підстановки, в якому кожен символ у відкритому\
        тексті замінюється символом, що знаходиться на деякому постійному числі позицій ліворуч або\
        праворуч нього в алфавіті. Наприклад, в шифрі зі зрушенням вправо на 3, А була б замінена на Г,\
        Б стане Д, і так далі. Спробуй зашифрувати слово у верхньому полі за допомогою шифра Цезаря з ключом ' +
        this.currentKey, 
        () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Звучить трішки складно, але я впораюсь, не сумнівайтеся!', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Чекатиму на тебе для наступного завдання. Хай щастить!', 
        () => this.next());
        yield;

        this.teacherDisappears(function() {
            context.toggleWarning(1, function() {
                context.toggleWarning(0, null, 0)
            }, 3000);
            context.generateWord(1, function() {
                context.generateKey(2);
                context.teacherAppears('Адам Вікторович', 'Непогано як для початку, але це далеко не все, що у мене є.\
                Готовий продовжити ?');
            });
        });
        yield;

        this.game.displayDialogLine('Ви', 'Так, залюбки!', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Тоді перейдемо до наступного алгоритму.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Шифр Віженера - метод поліалфавітного\
        шифрування літерного тексту з використанням ключового слова. Людина, яка посилає повідомлення,\
        записує ключове слово циклічно доти, поки його довжина не буде відповідати довжині вихідного тексту.\
        Перший символ вихідного тексту шифрується першим символом ключа згідно таблиці Віженера.\
        Решта символів шифруються подібним чином.', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Спробуй зашифрувати наступне слово із таким ключем: '+
        this.currentKey.toUpperCase(), 
        () => this.next());
        yield;

        this.teacherDisappears(function() {
            context.clearInputCells();
            context.generateWord(2, function() {
                context.teacherAppears('Адам Вікторович', 'В тебе дуже непогано виходить! Однак в мене є для тебе ще дещо.\
                Не втомився ?');
            });
        });
        yield;

        this.game.displayDialogLine('Ви', 'Ні, в мене ще багато сил!', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Тоді останній на сьогодні шифр - шифр Атбаш.\
        Це простий шифр підстановки для алфавітного письма. Правило шифрування полягає в заміні i-й літери\
        алфавіту буквою з номером n - i + 1, де n - число букв в алфавіті. Зашифруй наступне слово за допогою шифру Атбаш.', 
        () => this.next());
        yield;
        
        this.teacherDisappears(function() {
            context.clearInputCells();
            context.generateWord(3, function() {
                context.teacherAppears('Адам Вікторович', 'Молодець, я в тобі і не сумнівався.\
                Сподіваюсь, що цей матеріал допоможе тобі зробити безпечну систему зберігання паролів.\
                Використовуй його з розумом!');
            });
        });
        yield;

        this.game.displayDialogLine('Ви', 'Дуже Вам дякую! Після цих вправ мені вже не терпить\
        попрацювати!', 
        () => this.next());
        yield;

        this.game.displayDialogLine('Адам Вікторович', 'Завжди радий допомогти!', 
        () => this.next());
        yield;

        this.teacherDisappears(function() {
            context.warning.text = 'Відмінна робота! Ти ознайомився з основними видам алгоритмів шифрування та\
            маєш можливість самостійно обрати для себе найкращий!'
            context.toggleWarning(1, function() {
                context.toggleWarning(0, function() {
                    context.game.camera.fade(0x000000, 1500, true);
                    setTimeout(() => {
                        if (context.mistakes <= 2){
                            context.score = 100;
                        }
                        else if (context.mistakes <= 5){
                            context.score = 50;
                        }
                        else {
                            context.score = 10; 
                        }
                        context.game.nextState(context.score);
                    }, 1500); 
                }, 0);
            }, 3000);
        });
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);

        this.mistakes = 0;
        this.score = 0;
    }

    preload() {
        this.load.image('cathedra', './assets/images/2-8 (Crypto)/cathedra.png');
        this.load.image('machine', './assets/images/2-8 (Crypto)/background.png');
        this.load.image('teacher', './assets/images/2-8 (Crypto)/teacher.png');
        this.load.image('input', './assets/images/2-8 (Crypto)/input.png');
        this.load.image('field', './assets/images/2-8 (Crypto)/field.png');
        this.load.image('bad', './assets/images/2-8 (Crypto)/bad.png');
        this.load.image('ok', './assets/images/2-8 (Crypto)/ok.png');
        this.load.image('warning', './assets/images/2-8 (Crypto)/warning_message.png');
        this.load.image('A', './assets/images/2-8 (Crypto)/keyboard/A.png');
        this.load.image('B', './assets/images/2-8 (Crypto)/keyboard/B.png');
        this.load.image('C', './assets/images/2-8 (Crypto)/keyboard/C.png');
        this.load.image('D', './assets/images/2-8 (Crypto)/keyboard/D.png');
        this.load.image('E', './assets/images/2-8 (Crypto)/keyboard/E.png');
        this.load.image('F', './assets/images/2-8 (Crypto)/keyboard/F.png');
        this.load.image('G', './assets/images/2-8 (Crypto)/keyboard/G.png');
        this.load.image('H', './assets/images/2-8 (Crypto)/keyboard/H.png');
        this.load.image('I', './assets/images/2-8 (Crypto)/keyboard/I.png');
        this.load.image('J', './assets/images/2-8 (Crypto)/keyboard/J.png');
        this.load.image('K', './assets/images/2-8 (Crypto)/keyboard/K.png');
        this.load.image('L', './assets/images/2-8 (Crypto)/keyboard/L.png');
        this.load.image('M', './assets/images/2-8 (Crypto)/keyboard/M.png');
        this.load.image('N', './assets/images/2-8 (Crypto)/keyboard/N.png');
        this.load.image('O', './assets/images/2-8 (Crypto)/keyboard/O.png');
        this.load.image('P', './assets/images/2-8 (Crypto)/keyboard/P.png');
        this.load.image('Q', './assets/images/2-8 (Crypto)/keyboard/Q.png');
        this.load.image('R', './assets/images/2-8 (Crypto)/keyboard/R.png');
        this.load.image('S', './assets/images/2-8 (Crypto)/keyboard/S.png');
        this.load.image('T', './assets/images/2-8 (Crypto)/keyboard/T.png');
        this.load.image('U', './assets/images/2-8 (Crypto)/keyboard/U.png');
        this.load.image('V', './assets/images/2-8 (Crypto)/keyboard/V.png');
        this.load.image('W', './assets/images/2-8 (Crypto)/keyboard/W.png');
        this.load.image('X', './assets/images/2-8 (Crypto)/keyboard/X.png');
        this.load.image('Y', './assets/images/2-8 (Crypto)/keyboard/Y.png');
        this.load.image('Z', './assets/images/2-8 (Crypto)/keyboard/Z.png');
    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        this.cathedra = this.game.add.image(0, 0, 'cathedra');
        this.cathedra.height = this.game.width * this.cathedra.height / this.cathedra.width;
        this.cathedra.width = this.game.width;
        this.cathedra.alpha = 1;
        this.machine = this.game.add.image(0, 0, 'machine');
        this.machine.alpha = 0;

        this.keyWidth = this.game.cache.getImage('A').width;
        this.keyHeight = this.game.cache.getImage('A').height;

        this.verticalOffset = 570;

        this.random = new Phaser.RandomDataGenerator([Date.now()]);

        this.keyBoard = this.game.add.group();

        this.stage.disableVisibilityChange = true;

        this.game.input.keyboard.addCallbacks(this, null, null, this.keyPressed);

        this.next();
    }

    toggleWarning(visibility, callFunc, timeout) {
        this.game.add.tween(this.warning.sprite).to({
            alpha: visibility
        }, 1500, Phaser.Easing.Cubic.InOut).start(); 
        this.game.add.tween(this.warning.text).to({
            alpha: visibility
        }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
            if(callFunc !== null) {
                if(timeout !== 0) {
                    setTimeout(() => {
                        callFunc();
                    }, timeout);
                }
                else callFunc();
            }
        });

    }

    generateStage() {
        this.teacher = this.SSF.makeImg(1250, 50, 'teacher', 700, 900);

        this.field = {
            sprite: this.game.add.sprite(FIELD_OFFSET_HOR, FIELD_OFFSET_VER, 'field'),
            text: this.game.add.text(FIELD_TEXT_OFFSET_HOR, FIELD_TEXT_OFFSET_VER, '', {
                fontSize: FIELD_TEXT_FONT_SIZE,
                font: 'Leftonade',
            }),
            mark: null
        }

        this.warning = { 
            sprite: this.game.add.sprite(600, 0, 'warning'),
            text: this.game.add.text(650, 50, 'Слідуючи алгоритму, введіть\nшифр за допомогою миші або\nклавіатури', {
                fontSize: 30,
                font: 'Leftonade',
            })
        }
        smartSetHeight(this.warning.sprite, 200);
        this.warning.sprite.alpha = this.warning.text.alpha = 0;

        this.input = new CryptoInput(CELL_OFFSET_HOR, CELL_OFFSET_VER, this.game);

        this.initSymbols();
    }

    generateKey(algNum) {
        switch(algNum) {
            case 1: {
                this.currentKey = this.random.integerInRange(1, (ALPHABET_END - ALPHABET_BEGIN));
                break;
            }
            case 2: {
                this.currentKey = vigenereKeys[this.random.integerInRange(0, vigenereKeys.length - 1)];
                break;
            }
        }
    }

    generateWord(algNum, callback) {
        this.currentWord = words[this.random.integerInRange(0, words.length - 1)];
        this.updateField();
        switch(algNum) {
            case 1: {
                this.currentWord = this.caesarCipher(this.currentWord, this.currentKey);
                break;
            }
            case 2: {
                this.currentWord = this.vigenereCipher(this.currentWord, this.currentKey);
                break;
            }
            case 3: {
                this.currentWord = this.atbashCipher(this.currentWord);
                break;
            }
        }
        this.input.setWord(this.currentWord);
        this.input.onInputEnd = () => {
            let answer = '', mark = '';
            this.input.cells.map((member) => {
                answer += member.value;
            });
            if(answer === this.input.word) {
                this.input.disableInput = true;
                this.destroyFieldMark();
                mark = 'ok';
                setTimeout(callback, 100);
            }
            else {
                this.mistakes += 1;
                mark = 'bad';
            }
            this.setFieldMark(MARK_OFFSET_HOR, MARK_OFFSET_VER, mark);
        };
    }

    teacherAppears(author, text) {
        this.input.disableInput = true;
        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
            if(text !== '') this.game.displayDialogLine(author, text, () => this.next());
        });
    }

    teacherDisappears(funcCall) {
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut).start().onComplete.add(() => {
            this.input.disableInput = false;
            funcCall();
        });
    }

    caesarCipher(str, num) {
        str = str.toLowerCase();
    
        var result = '';
        var charcode = 0;
    
        for (var i = 0; i < str.length; i++) {
            charcode = (str[i].charCodeAt()) + num;
            if(charcode > ALPHABET_END) {
                var offset = charcode - ALPHABET_END - 1;
                charcode = ALPHABET_BEGIN + offset;
            }
            result += String.fromCharCode(charcode);
        }
        return result;
    }

    vigenereCipher(str, key) {
        key = key.toLowerCase();

        var result = '';
        var num = 0;

        for (var i = 0; i < key.length; i++) {
            num = (key[i].charCodeAt()) - ALPHABET_BEGIN;
            result += this.caesarCipher(str[i], num)
        }
        return result;
    }

    atbashCipher(str) {
        str = str.toLowerCase();
    
        var result = '';
        var num = 0;
    
        for (var i = 0; i < str.length; i++) {
            num = (ALPHABET_END - ALPHABET_BEGIN) - (str[i].charCodeAt() - ALPHABET_BEGIN);
            result += this.caesarCipher(String.fromCharCode(ALPHABET_BEGIN), num);
        }
        return result;
    }

    clearInputCells() {
        this.input.cells.forEach((member) => {
            member.text.setText('');
            member.value = '';
        });
    }

    destroyFieldMark() {
        if(this.field.mark) this.field.mark.destroy();
    }

    setFieldMark(x, y, sprite) {
        this.destroyFieldMark();
        this.field.mark = this.game.add.sprite(x, y, sprite);
        this.field.mark.width = this.field.mark.height = MARK_SIZE;
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
            this.verticalOffset += PADDING_BETWEEN_ROWS;
        }
    }

    addKey(i, j) {
        let button = this.keyBoard.create(this.horizontalOffset + j*(this.keyWidth + PADDING_BETWEEN_KEYS), this.verticalOffset, keyBoardTemplate[i][j]);
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
        this.horizontalOffset = i%2 === 0 ? BASE_KEYBOARD_OFFSET : BASE_KEYBOARD_OFFSET + TOGGLE_KEYBOARD_OFFSET;
    }

    next() {
        this._gen.next();
    }
}
