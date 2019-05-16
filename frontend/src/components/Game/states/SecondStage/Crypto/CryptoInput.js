import autobind from 'autobind-decorator';
import {smartSetHeight} from '../../../utils';

const CELL_WIDTH = 65;
const CELL_PADDING = 43;
const CELL_COUNT = 7;

const KEY_BACKSPACE = 8;

export default class CryptoInput {
    constructor(x, y, game) {
        this.isFocused = true;
        this.game = game;
        this.count = CELL_COUNT;
        this.word = null;
        this.cells = [];
        this.onInputEnd = () => null;
        this.disableInput = false;

        for(let i = 0; i < this.count; i++) {
            this.cells[i] = {
                focused: false,
                sprite: this.game.add.sprite(x + (CELL_WIDTH + CELL_PADDING) * i, y, 'input'),
                text: this.game.add.text(x + 10 + (CELL_WIDTH + CELL_PADDING) * i, y, '', {
                    fontSize: 40,
                    font: 'Pangolin',
                }),
                index: i,
                value: ''
            }
        }

        this.focusedCell = this.cells[0];

        this.cells.forEach(cell => {
            smartSetHeight(cell.sprite, CELL_WIDTH);
            cell.sprite.alpha = 0.5;
            cell.sprite.inputEnabled = true;
        });

        document.addEventListener('keydown', this.handleKeyDown);
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    @autobind
    handleKeyDown(e) {
        this.isDeleteLetter(e.keyCode);
        if(this.disableInput)
            return;

        if (/^[a-z\s]*$/.test(e.key)) {
            this.focusedCell.text.setText(e.key.toLowerCase());
            this.focusedCell.value = e.key;

            const nextCell = this.cells[this.focusedCell.index + 1];
            if (this.word.length === this.value.length) {
                this.disableInput = true;
                this.onInputEnd();
                if (this.isWrong && nextCell) {
                    this.focusCell(nextCell);
                }
            } else {
                if(nextCell) this.focusCell(nextCell);
            }
        }
    }

    setWord(word) {
        this.word = word;
        this.focusedCell = this.cells[0];
        this.disableInput = false;
    }

    isDeleteLetter(keyCode) {
        if(keyCode === KEY_BACKSPACE) {
            if ((this.focusedCell.value === '') && this.focusedCell.index !== 0) {
                let nextIndex = this.focusedCell.index - 1;
                this.focusCell(this.cells[nextIndex]);
            } 
            this.clearCell(this.focusedCell);
            if(this.disableInput) this.disableInput = false;
            return;
        }
    }

    clearCell(cell) {
        cell.value = '';
        cell.text.setText('');
    }

    focusCell(cell) {
        if (typeof cell === 'number') {
            this.focusCell(this.cells[cell]);
            return;
        }
        if (this.focusedCell) {
            this.focusedCell.focused = false;
        }
        this.isFocused = true;
        this.focusedCell = cell;
        cell.focused = true;
    }

    get length() {
        return this.cells.length;
    }

    get value() {
        return this.cells.map(cell => cell.value).join('');
    }
}