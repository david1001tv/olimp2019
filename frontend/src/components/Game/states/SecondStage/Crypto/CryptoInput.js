import autobind from 'autobind-decorator';
import {smartSetHeight} from '../../../utils';

const CELL_WIDTH = 65;
const CELL_PADDING = 40;

const KEY_BACKSPACE = 8;

export default class CryptoInput {
    constructor(x, y, word, game) {
        console.log(word);
        this.isFocused = true;
        this.game = game;
        this.word = word;
        this.onInputEnd = () => null;
        this.disableInput = false;

        this.cells = word.split('').map((e, i) => ({
            focused: false,
            sprite: this.game.add.sprite(x + (CELL_WIDTH + CELL_PADDING) * i, y, 'input'),
            text: this.game.add.text(x + 10 + (CELL_WIDTH + CELL_PADDING) * i, y, '', {
                fontSize: 40,
                font: 'Pangolin',
            }),
            index: i,
            value: ''
        }));
        this.focusedCell = this.cells[0];

        /*this.mark = this.game.add.sprite(x + (CELL_WIDTH + CELL_PADDING) * this.word.length, y, 'bad');
        this.mark.visible = false;*/

        //smartSetHeight(this.mark, CELL_WIDTH);

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
}