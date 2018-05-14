import autobind from 'autobind-decorator';
import {smartSetHeight} from '../../../utils';


const CELL_WIDTH = 48;
const CELL_PADDING = 9;
const FOCUS_TINT = 0x0000ff;

const BACKSPACE_KEY = 8;


(() => {
        window.__listeners = [];
        window.__handleFocusChange = function () {
            window.__listeners.forEach(f => f());
        };
    }
)();

export default class CrosswordInaput {
    constructor(x, y, word, prefilledIndex, game) {
        prefilledIndex--;
        this.isFocused = false;
        this.game = game;
        this.focusedCell = null;
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
        this.cells.forEach(cell => {
            smartSetHeight(cell.sprite, CELL_WIDTH);
            cell.sprite.alpha = 0.5;
            cell.sprite.inputEnabled = true;
            cell.sprite.input.useHandCursor = true;
            cell.sprite.events.onInputDown.add(() => this.handleClick(cell));
        });

        this.cells[prefilledIndex].value = word[prefilledIndex];
        this.cells[prefilledIndex].text.setText(word[prefilledIndex]);

        window.__listeners.push(() => this.blur());

        document.addEventListener('keydown', this.handleKeyDown);
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    blur() {
        if (this.focusedCell) {
            this.isFocused = false;
            this.focusedCell.focused = false;
            this.focusedCell.sprite.tint = 0xffffff;
            this.focusedCell = null;
        }
    }

    handleClick(cell) {
        window.__handleFocusChange();

        this.focusCell(cell);
    }

    @autobind
    handleKeyDown(e) {
        if (!this.isFocused)
            return;

        if (e.key.length === 1 && /[A-zА-яіЇєЄ']/.test(e.key)) {
            if (this.focusedCell.index === this.prefilledIndex && e.key !== this.focusedCell.value) {
                return;
            }

            this.focusedCell.text.setText(e.key);
            this.focusedCell.value = e.key;

            let nextIndex = this.focusedCell.index + 1;
            if (nextIndex >= this.cells.length)
                nextIndex--;

            this.focusCell(this.cells[nextIndex]);
        }
        if (e.keyCode === BACKSPACE_KEY) {
            if ((this.focusedCell.value === '' || this.focusedCell.index === this.prefilledIndex) && this.focusedCell.index !== 0) {
                let nextIndex = this.focusedCell.index - 1;
                this.focusCell(this.cells[nextIndex]);
            } else {
                this.focusedCell.value = '';
                this.focusedCell.text.setText('');
            }
        }

    }

    focusCell(cell) {
        if (typeof cell === 'number') {
            this.focusCell(this.cells[cell]);
            return;
        }
        if (this.focusedCell) {
            this.focusedCell.focused = false;
            this.focusedCell.sprite.tint = 0xffffff;
        }
        this.isFocused = true;
        this.focusedCell = cell;
        cell.focused = true;
        cell.sprite.tint = FOCUS_TINT;
    }

    get length() {
        return this.cells.length;
    }

    get value() {
        return this.cells.map(cell => cell.value).join('');
    }
}