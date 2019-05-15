import autobind from 'autobind-decorator';

import {smartSetHeight} from '../../../utils';

const CELL_WIDTH = 60;
const DEFAULT_TINT = 0xffffff;

const focusChangeListeners = [];
let words = [
    'модуль',
    'репозиторій',
    'вірус',
    'скрам',
    'архітектура',
    'інтеграція',
    'тестувальник',
    'білд',
    'мітап',
    'беклог',
    'версія',
    'сервер',
    'дедлайн',
    'репорт'
];
let descriptions = [
    'Це функціонально повний фрагмент програми, що оформлен у вигляді окремого файлу з кодом або пойменованої її частини. Контекст - треба допрацювати модуль авторизації',
    'Це місце, де зберігаються і підтримуються будь-які дані. Найчастіше дані в репозиторії зберігаються у вигляді файлів, доступних для подальшого поширення по мережі. Контекст - залий зміни проекту до репозиторію',
    'Це вид шкідливого програмного забезпечення, здатного впроваджуватися в код інших програм, системні області пам\'яті, завантажувальні сектори, а також поширювати свої копії по різноманітним каналам зв\'язку. Контекст - спіймав віруса на сайті',
    'Це підхід управління проектами для гнучкої розробки програмного забезпечення. Ви ознайомитись із ним під час навчання.',
    'Це  спосіб структурування програмної або обчислювальної системи, абстракція елементів системи на певній фазі її роботи. Контекст - у моєму додатку клієнт-серверна архітектура',
    'Це елемент процесу розробки програмного забезпечення, в ході якого окремі компоненти програмного продукту об\'єднуються в єдине ціле. Контекст - починаємо інтеграцію компонентів верстки',
    'Це фахівець, який займається тестуванням програмного забезпечення (ПЗ) з метою виявлення помилок в його роботі і їх подальшого виправлення.',
    'Українською - збірка. Це процес отримання інформаційного продукту з вихідного коду. Тобто, після написання коду Ви збираєте свій проект до файлу, що виконується комп\'ютером.',
    'Це зустріч фахівців однодумців для обговорення тих чи інших питань, обміну досвідом в неформальній обстановці. Контекст - вчора був на мітапі',
    'Це журнал тієї роботи, яка залишилася і яку необхідно виконати команд',
    'Життєвий цикл успішної комп\'ютерної програми може бути дуже довгим. Зміни в програмі бувають різними — від виправлення помилки до повного переписування. У більшості випадків назва програми залишається такою ж, змінюється підназва — так звана версія',
    'Це комп\'ютер у локальній чи глобальній мережі, який надає користувачам свої обчислювальні і дискові ресурси, а також доступ до встановлених сервісів; найчастіше працює цілодобово, чи у час роботи групи його користувачів',
    'Буквальний переклад з англійської - крайній термін, мертва лінія, останній рубіж. Тож, це крайній час, до якого має бути виконано певне завдання. Контекст - прострочити дедлайн за проектом.',
    'Збірка Репорт призначена для роботи з регламентними звітами. Програмування з використанням даної збірки полягає в послідовному створенні / відкритті та налаштування звіту'
];

function handleFocusChange() {
    focusChangeListeners.forEach(f => f());
}

export default class FillWordsComponent {
    constructor(game, teacher, objArr, posX, posY) {
        this.game = game;
        this.teacher = teacher;
        this.cells = {};
        this.coords = {
            posX: posX,
            posY: posY
        };
        this.isFocused = false;
        this.focusedCell = null;
        this.cellsStack = [];
        this.color = null;
        this.isMouseDown = false;

        let i = 0;
        objArr.forEach((object, j) => {
            const key = 'id_' + object.line + '' + object.column;
            this.cells[key] = {
                symbol: object.symbol,
                isChecked: false,
                sprite: this.game.add.sprite(this.coords.posX + ((CELL_WIDTH + 11.85) * i), this.coords.posY, 'square'),
                text: this.game.add.text(this.coords.posX + 25 + ((CELL_WIDTH + 11.85) * i), this.coords.posY + 10, object.symbol, {
                    fontSize: 40,
                }),
                line: object.line,
                column: object.column
            };

            if (objArr[j + 1] && objArr[j + 1].line !== object.line) {
                this.coords.posY += (CELL_WIDTH + 12);
            }
            if (object.column === 10) {
                i = 0;
            } else {
                i++;
            }
        });

        for (let index in this.cells) {
            let curr = this.cells[index];
            this.cells[index].next = [
                this.cells['id_' + (curr.line + 1) + '' + curr.column],
                this.cells['id_' + (curr.line - 1) + '' + curr.column],
                this.cells['id_' + curr.line + '' + (curr.column + 1)],
                this.cells['id_' + curr.line + '' + (curr.column - 1)],
            ];
            this.cells[index].sprite.alpha = 0.5;
            this.cells[index].sprite.inputEnabled = true;
            this.cells[index].sprite.input.useHandCursor = true;
            this.cells[index].sprite.events.onInputDown.add(() => this.handleClick(this.cells[index]));
            this.cells[index].sprite.events.onInputOver.add(() => this.handleOver(this.cells[index]));
        }
        //Уведомления
        let warning2 = this.game.add.image(700, 0, 'warning_message');
        warning2.alpha = 0;
        smartSetHeight(warning2, 200);
        this.warning2 = warning2;

        this.secondWarning = this.game.add.text(725, 40, 'Виділить одним довгим\nнатисканням слово, та викладач\nпояснить його', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;
        this.game.add.tween(this.warning2).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                setTimeout(() => {
                    this.game.add.tween(this.warning2).to({
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

        document.addEventListener('mousedown', this.handleOnMouseDown);
        document.addEventListener('mouseup', this.handleOnMouseUp);
    }

    @autobind
    blur() {
        if (this.focusedCell) {
            this.isFocused = false;
            this.focusedCell.focused = false;

            this.focusedCell = null;
        }
    }

    handleClick(cell) {
        if (cell.isChecked) {
            return;
        }
        this.isMouseDown = true;
        handleFocusChange();

        this.focusCell(cell);
        this.cellsStack.push(this.focusedCell);
        this.focusedCell.isChecked = true;
    }

    handleOver(cell) {
        if (this.isMouseDown) {
            if (!this.focusedCell.next.includes(cell)) {
                return
            }
            if (this.cellsStack[this.cellsStack.length - 2] !== cell && cell.isChecked) {
                return
            }

            handleFocusChange();
            this.focusCell(cell);
            if (this.cellsStack[this.cellsStack.length - 2] !== this.focusedCell) {
                this.handleOnMouseOver();
                this.focusedCell.isChecked = true;
                this.cellsStack.push(this.focusedCell);
            } else {
                const last = this.cellsStack.pop();
                last.sprite.tint = DEFAULT_TINT;
                last.isChecked = false;
            }
        }
    }

    @autobind
    handleOnMouseDown(e) {
        if (this.isFocused) {
            if (!this.color) {
                this.color = '0x' + Math.round((100000 + Math.random() * (999999 - 100000)));
            }
            this.focusedCell.sprite.tint = this.color;
        }
    }

    @autobind
    handleOnMouseUp(e) {
        if (this.cellsStack.length === 1) {
            let last = this.cellsStack.pop();
            last.sprite.tint = DEFAULT_TINT;
        } else {
            let word = '';
            this.cellsStack.forEach(cell => {
                word += cell.symbol;
            });
            if (!words.includes(word)) {
                this.cellsStack.forEach(cell => {
                    cell.sprite.tint = DEFAULT_TINT;
                    cell.isChecked = false;
                });
            } else {
                let description=descriptions[words.indexOf(word)];

                words = words.filter((item) => {
                    return item !== word
                });
                descriptions = descriptions.filter((item) => {
                    return item !== description
                });
                this.game.add.tween(this.teacher).to({
                        alpha: 1
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 
                this.game.displayDialogLine('Тарас Денисович', description,()=>{                    
                            this.game.add.tween(this.teacher).to({
                                alpha: 0
                            }, 1500, Phaser.Easing.Cubic.InOut)
                                .start();
                                if (!words.length) {
                                    this.game.displayDialogLine('Голос', "О це була дійсно корисна пара! Ви згадуєте уривки розмов старшокурсників, що почули біля кафедри, і більше не відчуваєте себе невпевнено", ()=>this.game.nextState(0));
                                    }
                });

               
            }
        }
        
        this.isMouseDown = false;
        this.isFocused = false;
        this.focusedCell = null;
        this.color = null;
        this.cellsStack = [];
    }

    @autobind
    handleOnMouseOver(e) {
        if (this.isFocused && this.focusedCell) {
            this.focusedCell.sprite.tint = this.color;
        }
    }

    focusCell(cell) {
        if (typeof cell === 'string') {
            this.focusCell(this.cells[cell]);
            return;
        }
        if (this.focusedCell) {
            this.focusedCell.focused = false;
        }
        this.isFocused = true;
        this.focusedCell = cell;
    }
}
