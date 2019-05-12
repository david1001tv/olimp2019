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

function handleFocusChange() {
    focusChangeListeners.forEach(f => f());
}

export default class FillWordsComponent {
    constructor(game, objArr, posX, posY) {
        this.game = game;
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
                console.log(words);
            }
        }
        if (!words.length) {
            setTimeout(() => this.game.nextState(0), 500);
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
