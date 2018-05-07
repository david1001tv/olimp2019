import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import { smartSetHeight } from '../../utils';

export default class CodeEditorState extends Phaser.State { *
    gen() {
        // this.game.displayDialogLine('Ви', 'Час писати код програми', () => this.next());
        // yield;

        let fakeInput = this.game.add.inputField(120, 200, {
            fillAlpha: 0,
            padding: 10,
            fill: '#fff',
            font: '35px Pangolin',
            max: 100,
            borderWidth: 2,
            borderColor: '#fff',
            cursorColor: '#fff'
        });
        yield;

        let code = this.addText('#include "net/http/http_auth.h"\n\n#include \ <algorithm>\n\n#include "base/strings/string_tokenizer.h"\n#include \
"base/strings/string_util.h"\n#include "net/base/net_errors.h"\n#include \
"net/http/http_auth_challenge_tokenizer.h"\n#include "net/http/http_auth_\
handler.h"\n#include "net/http/http_auth_handler_factory.h"\n#include "net/\
http/http_auth_scheme.h"\n#include "net/http/http_request_headers.h"\n#include \
"net/http/http_response_headers.h"\n#include "net/http/http_util.h"\n\nnamespace\
net {\n\nHttpAuth::Identity::Identity() : source(IDENT_SRC_NONE), invalid(true) \
{}', 120, 200, 25)

        let compiledText = this.addText("Compiled successfully", 120, 933, 30);
        yield;
        this.state.start('Translate');
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(true);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
        this.game.phone.addTodo({
            id: 'CODE_EDITOR',
            text: 'Написати код програми'
        });
    }

    preload() {
        this.load.image('bg', './assets/images/3-3(programmer)/bg-3-3.png');
        this.game.plugins.add(PhaserInput.Plugin);
    }

    create() {

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.next();
    }

    next() {
        this._gen.next();
    }

    addText(str, posX, posY, fontSize) {
        let tmp = this.game.add.text(posX, posY, str, {
            font: fontSize + "px 'Source Code Pro",
            fill: '#39FF00'
        });
        return tmp;
    }

    getChar(event) {
        if (event.which == null) { // IE
            if (event.keyCode < 32) return null; // спец. символ
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which < 32) return null; // спец. символ
            return String.fromCharCode(event.which); // остальные
        }

        return null; // спец. символ
    }
}