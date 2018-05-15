import autobind from 'autobind-decorator';
import {smartSetHeight} from '../../../utils';


const CELL_WIDTH = 48;
const CELL_PADDING = 9;
const TINT_FOCUS = 0x0000ff;
const TINT_DISABLED = 0x777777;
const TINT_ENABLED = 0xffffff;
const TINT_ERROR = 0xff7777;

const KEY_BACKSPACE = 8;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;


let focusChangeListeners = [];
function handleFocusChange() {
    focusChangeListeners.forEach(f => f());
}

export default class CrosswordInput {
    constructor(x, y, word, prefilledIndex, game) {
        prefilledIndex--;
        this.isFocused = false;
        this.game = game;
        this.word = word;
        this.focusedCell = null;
        this.onInputEnd = () => null;
        this.prefilledIndex = prefilledIndex;

        this.cells = word.split('').map((e, i) => ({
            focused: false,
            sprite: this.game.add.sprite(x + (CELL_WIDTH + CELL_PADDING) * i, y, 'square'),
            text: this.game.add.text(x + 10 + (CELL_WIDTH + CELL_PADDING) * i, y, '', {
                fontSize: 40,
                font: 'Pangolin',
            }),
            index: i,
            value: ''
        }));

        this.mark = this.game.add.sprite(x + (CELL_WIDTH + CELL_PADDING) * this.word.length, y, 'bad');
        this.mark.visible = false;

        smartSetHeight(this.mark, CELL_WIDTH);

        this.cells.forEach(cell => {
            smartSetHeight(cell.sprite, CELL_WIDTH);
            cell.sprite.alpha = 0.5;
            cell.sprite.inputEnabled = true;
            cell.sprite.input.useHandCursor = true;
            cell.sprite.events.onInputDown.add(() => this.handleClick(cell));
        });

        this.cells[prefilledIndex].sprite.tint = TINT_DISABLED;

        this.cells[prefilledIndex].value = word[prefilledIndex];
        this.cells[prefilledIndex].text.setText(word[prefilledIndex]);

        focusChangeListeners.push(this.blur);

        document.addEventListener('keydown', this.handleKeyDown);
    }

    destroy() {
        focusChangeListeners.splice(focusChangeListeners.indexOf(this.blur));
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    @autobind
    blur() {
        if (this.focusedCell) {
            this.isFocused = false;
            this.focusedCell.focused = false;
            if (this.focusedCell.index === this.prefilledIndex) {
                this.focusedCell.sprite.tint = TINT_DISABLED;
            }
            else {
                this.focusedCell.sprite.tint = TINT_ENABLED;
            }

            this.focusedCell = null;
        }
    }

    handleClick(cell) {
        handleFocusChange();

        this.focusCell(cell);
    }

    @autobind
    handleKeyDown(e) {
        if (!this.isFocused)
            return;

        if (e.key.length === 1 && /[А-яіІїЇєЄ']/.test(e.key)) {
            if (this.focusedCell.index === this.prefilledIndex && e.key !== this.focusedCell.value) {
                this.focusedCell.sprite.tint = TINT_ERROR;
                return;
            }

            this.focusedCell.text.setText(e.key);
            this.focusedCell.value = e.key;

            let nextIndex = this.focusedCell.index + 1;
            if (nextIndex >= this.cells.length) {
                this.onInputEnd();
            } else {
                this.focusCell(this.cells[nextIndex]);
            }
        }
        switch (e.keyCode) {
            case KEY_BACKSPACE:
                this.mark.visible = false;
                if ((this.focusedCell.value === '' || this.focusedCell.index === this.prefilledIndex) && this.focusedCell.index !== 0) {
                    let nextIndex = this.focusedCell.index - 1;
                    this.focusCell(this.cells[nextIndex]);
                } else {
                    this.focusedCell.value = '';
                    this.focusedCell.text.setText('');
                }
                return;
            case KEY_LEFT:
                if (this.focusedCell.index !== 0)
                    this.focusCell(this.focusedCell.index - 1);
                return;

            case KEY_RIGHT:
                if (this.focusedCell.index !== this.word.length - 1)
                    this.focusCell(this.focusedCell.index + 1);
                return;
        }
    }

    focusCell(cell) {
        if (typeof cell === 'number') {
            this.focusCell(this.cells[cell]);
            return;
        }
        if (this.focusedCell) {
            this.focusedCell.focused = false;
            if (this.focusedCell.index === this.prefilledIndex)
                this.focusedCell.sprite.tint = TINT_DISABLED;
            else
                this.focusedCell.sprite.tint = TINT_ENABLED;
        }
        this.isFocused = true;
        this.focusedCell = cell;
        cell.focused = true;
        cell.sprite.tint = TINT_FOCUS;
    }

    set wrong(isWrong) {
        this.mark.visible = true;
        if (isWrong) {
            this.mark.loadTexture('bad');
        } else {
            this.mark.loadTexture('ok');
        }
    }

    set disabled(isDisabled) {
        this.cells.forEach(cell => {
            if (isDisabled) {
                cell.sprite.events.onInputDown.removeAll();
                cell.sprite.inputEnabled = false;
                cell.sprite.useHandCursor = false;
            } else {
                cell.sprite.events.onInputDown.add(() => this.handleClick(cell));
            }
        })
    }

    get disabled() {
        return !this.cells[0].sprite.inputEnabled;
    }

    get length() {
        return this.cells.length;
    }

    get value() {
        return this.cells.map(cell => cell.value).join('');
    }
}