import autobind from 'autobind-decorator';
import {smartSetHeight} from '../../utils';

const CELL_WIDTH = 48;
const CELL_PADDING = 9;
const TINT_FOCUS = 0x0000ff;
const TINT_DISABLED = 0xdee8f9;
const TINT_ENABLED = 0xffffff;
const TINT_ERROR = 0xff7777;

const KEY_BACKSPACE = 8;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const focusChangeListeners = [];
function handleFocusChange() {
    focusChangeListeners.forEach(f => f());
}

export default class InputComponent {
    constructor(xOpen, yOpen, xClose, yClose, tag, bg, game) {
        this.isFocused = false;
        this.game = game;
        this.tag = tag;
        this.bg = bg;
        this.focusedCell = null;

        this.input = {
            focused: false,
            spriteOpen: this.game.add.sprite(xOpen, yOpen, 'input'),
            spriteClose: this.game.add.sprite(xClose, yClose, 'input'),
            value: this.tag,
            input: '',
            textOpen: null,
            textClose: null,
            xOpen: xOpen,
            yOpen: yOpen,
            xClose: xClose,
            yClose: yClose,
            disabled: false
        };

        smartSetHeight(this.input.spriteOpen, 18);
        smartSetHeight(this.input.spriteClose, 18);
        this.input.spriteOpen.tint = TINT_DISABLED;
        this.input.spriteOpen.alpha = 0.5;
        this.input.spriteOpen.inputEnabled = true;
        this.input.spriteOpen.input.useHandCursor = true;
        this.input.spriteOpen.events.onInputDown.add(() => this.handleClick(this.input));
        this.input.spriteClose.tint = TINT_DISABLED;
        this.input.spriteClose.alpha = 0.5;
        this.input.spriteClose.inputEnabled = true;
        this.input.spriteClose.input.useHandCursor = true;
        this.input.spriteClose.events.onInputDown.add(() => this.handleClick(this.input));

        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(() => this.handleClick(null));

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
            this.focusedCell.spriteOpen.tint = TINT_DISABLED;
            this.focusedCell.spriteClose.tint = TINT_DISABLED;

            this.focusedCell = null;
        }
    }

    handleClick(cell) {
        if (!cell || cell.disabled) {
            return;
        }
        handleFocusChange();

        this.focusCell(cell);
    }

    @autobind
    handleKeyDown(e) {
        switch (true) {
            case e.keyCode === KEY_BACKSPACE:
                this.focusedCell.input = this.focusedCell.input.slice(0, this.focusedCell.input.length - 1);
                this.focusedCell.textOpen.destroy();
                this.focusedCell.textClose.destroy();
                this.focusedCell.textOpen = this.game.add.text(this.focusedCell.xOpen + 2, this.focusedCell.yOpen + 2, this.focusedCell.input, {
                    fontSize: 14
                });
                this.focusedCell.textClose = this.game.add.text(this.focusedCell.xClose + 2, this.focusedCell.yClose + 2, this.focusedCell.input, {
                    fontSize: 14
                });
                return;
            case 65 <= e.keyCode <= 90:
                if (!this.isFocused)
                    return;
                if (/[A-z']/.test(e.key)) {
                    if ((this.focusedCell.input + e.key).length <= 4) {
                        this.focusedCell.input += e.key;
                    } else {
                        return;
                    }
                    if (!this.focusedCell.textOpen && !this.focusedCell.textClose) {
                        this.focusedCell.textOpen = this.game.add.text(this.focusedCell.xOpen + 2, this.focusedCell.yOpen + 2, this.focusedCell.input, {
                            fontSize: 14
                        });
                        this.focusedCell.textClose = this.game.add.text(this.focusedCell.xClose + 2, this.focusedCell.yClose + 2, this.focusedCell.input, {
                            fontSize: 14
                        });
                    } else {
                        this.focusedCell.textOpen.destroy();
                        this.focusedCell.textClose.destroy();
                        this.focusedCell.textOpen = this.game.add.text(this.focusedCell.xOpen + 2, this.focusedCell.yOpen + 2, this.focusedCell.input, {
                            fontSize: 14
                        });
                        this.focusedCell.textClose = this.game.add.text(this.focusedCell.xClose + 2, this.focusedCell.yClose + 2, this.focusedCell.input, {
                            fontSize: 14
                        });
                    }
                }
                if (this.focusedCell.input !== this.focusedCell.value) {
                    this.focusedCell.spriteOpen.tint = TINT_ERROR;
                    this.focusedCell.spriteClose.tint = TINT_ERROR;
                } else {
                    this.focusedCell.spriteOpen.tint = TINT_ENABLED;
                    this.focusedCell.spriteClose.tint = TINT_ENABLED;
                    this.focusedCell.disabled = true;
                }
                return;
            default:
                return;
        }
    }

    focusCell(cell) {
        if (!cell) {
            return;
        }
        this.isFocused = true;
        this.focusedCell = cell;
        cell.focused = true;
        cell.spriteOpen.tint = TINT_FOCUS;
        cell.spriteClose.tint = TINT_FOCUS;
    }

    set wrong(isWrong) {
        this.mark.visible = true;
        if (isWrong) {
            this.mark.loadTexture('bad');
        } else {
            this.mark.loadTexture('ok');
        }
    }

    get isWrong() {
        return this.mark.visible && this.mark.key === 'bad';
    }

    set disabled(isDisabled) {
        this.cells.forEach(cell => {
            if (isDisabled) {
                cell.spriteOpen.events.onInputDown.removeAll();
                cell.spriteOpen.inputEnabled = false;
                cell.spriteOpen.useHandCursor = false;
            } else {
                cell.spriteOpen.events.onInputDown.add(() => this.handleClick(cell));
            }
        })
    }

    get disabled() {
        return !this.cells[0].spriteOpen.inputEnabled;
    }

    get length() {
        return this.cells.length;
    }

    get value() {
        return this.cells.map(cell => cell.value).join('');
    }
}