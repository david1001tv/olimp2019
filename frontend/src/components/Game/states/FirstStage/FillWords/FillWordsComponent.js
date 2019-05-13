import autobind from 'autobind-decorator';

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

const definitions = {
    'модуль': 'Модуль — функціонально завершений фрагмент програми, оформлений у вигляді окремого файлу з сирцевим кодом або його іменованої частини (наприклад, Active Oberon), призначений для використання в інших програмах. Модулі дозволяють розбивати складні задачі на менші відповідно до принципу модульності. Зазвичай проектується таким чином, щоб надати програмістам зручну для багаторазового використання функціональність (інтерфейс). ',
    'репозиторій': 'Репозиторій — спеціальний сервер, на якому зберігається і з якого можна завантажити програмне забезпечення. На сервері зберігається архів програмних продуктів, які доступні для завантаження. Це місце, де зберігаються й підтримуються які-небудь дані. Найчастіше дані в репозиторії зберігаються у вигляді файлів, доступних для подальшого розповсюдження по мережі. ',
    'вірус': 'Вірус — комп\'ютерна програма, яка має здатність до прихованого самопоширення. Одночасно зі створенням власних копій віруси можуть завдавати шкоди: знищувати, пошкоджувати, викрадати дані, знижувати або й зовсім унеможливлювати подальшу працездатність операційної системи комп\'ютера. Розрізняють файлові, завантажувальні та макро-віруси. Можливі також комбінації цих типів.',
    'скрам': 'Скрам — підхід управління проектами для гнучкої розробки програмного забезпечення. Scrum чітко робить акцент на якісному контролі процесу розробки. ',
    'архітектура': 'Архітектура програмного забезпечення — спосіб структурування програмної або обчислювальної системи, абстракція елементів системи на певній фазі її роботи. Система може складатись з кількох рівнів абстракції і мати багато фаз роботи, кожна з яких може мати окрему архітектуру.',
    'інтеграція': 'Систе́мна інтеграція — поєднання компонентів підсистем в єдину систему та забезпечення роботи окремих підсистем як єдиної системи. В області інформаційних технологій системна інтеграція є процесом об\'єднання різних обчислювальних систем і програмних застосунків фізично або функціонально.',
    'тестувальник': 'Тестувальник – це фахівець, який займається перевіркою працездатності, якості, безпеки та юзабіліті програмного забезпечення, сайтів, додатків тощо.',
    'білд': 'Білд – підготовлений для використання інформаційний продукт. Найчастіше збірка - виконуваний файл - двійковий файл, який містить виконуваний код (машинні інструкції) програми або бібліотеки.',
    'мітап': 'Мітап — це неформальне зібрання фахівців для обговорення питань і передачі знань. Саме неформальне, учасників IT-мітапа не змушують сидіти в задушливих краватках і з нудьгою чекати закінчення нудної лекції.',
    'беклог': 'Беклог — це журнал залишилася роботи, яку необхідно виконати команді. Термін прийшов з сімейства методологій Agile, зокрема з Scrum, де він є одним з основних артефактів - джерелом для користувача історій.',
    'версія': 'Версія програмного продукту - фіксоване стан реалізації програмного продукту на конкретну дату, виконаної відповідно до технічного завдання Замовника, якому присвоюється символічне позначення у вигляді номера.',
    'сервер': 'Сервер  — у комп\'ютерній термінології термін може стосуватися окремого комп\'ютера чи програми. Головною ознакою в обох випадках є здатність машини чи програми переважну кількість часу працювати автономно, без втручання людини, реагуючи на зовнішні події відповідно до встановленого програмного забезпечення.',
    'дедлайн': 'Дедлайн - це самий крайній термін (зазвичай термін) виконання будь-якої однієї задачі або цілого проекту.',
    'репорт': 'Репорт - це документ, що описує ситуацію або послідовність дій призвела до некоректної роботи об\'єкта тестування, із зазначенням причин і очікуваного результату.'
};

function handleFocusChange() {
    focusChangeListeners.forEach(f => f());
}

export default class FillWordsComponent {
    constructor(game, objArr, posX, posY, moveProff, proff) {
        this.game = game;
        this.moveProff = moveProff;
        this.proff = proff;
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
                words = words.filter((item) => {
                    return item !== word
                });
                this.moveProff(this.proff, definitions[word]);
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

    removeProff() {
        this.proff.body.moveTo(700, 1700, Phaser.ANGLE_RIGHT);
        if (!words.length) {
            setTimeout(() => this.game.nextState(0), 500);
        }
    }
}
