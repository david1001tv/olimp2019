import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import { smartSetHeight } from '../../utils';

export default class CodeEditorState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.displayDialogLine('Ви', 'Час писати код програми', () => this.next());
        yield;

        this.game.phone.setEnabled(true);

        var fakeInput = this.addInput();
        var cursorInput = this.addInput('#39FF00');
        cursorInput.startFocus();
        fakeInput.startFocus();

        this.counter = 0;

        var code = '#include "net/http/http_auth.h"\n\n#include <algorithm>\n\n#include "base/strings/string_tokenizer.h"\n#include "base/strings/string_util.h"\n#include "net/base/net_errors.h"\n#include "net/http/http_auth_challenge_tokenizer.h"\n#include "net/http/http_auth_handler.h"\n#include "net/http/http_auth_handler_factory.h"\n#include "net/http/http_auth_scheme.h"\n#include "net/http/http_request_headers.h"\n#include "net/http/http_response_headers.h"  \n#include "net/http/http_util.h"\n\nnamespace net {\n\nHttpAuth::Identity::Identity() : source(IDENT_SRC_NONE), invalid(true) {}\n\n    // static\nvoid HttpAuth::ChooseBestChallenge(\n\t\tHttpAuthHandlerFactory* http_auth_handler_factory,\n\t\tconst HttpResponseHeaders& response_headers,\n\t\tconst SSLInfo& ssl_info,\n\t\tTarget target,\n\t\tconst GURL& origin,\n\t\tconst std::set<Scheme>& disabled_schemes,\n\t\tconst NetLogWithSource& net_log,\n\t\tstd::unique_ptr<HttpAuthHandler>* handler) {\n\tDCHECK(http_auth_handler_factory);\n\tDCHECK(handler->get() == NULL);\n\n\t// Choose the challenge whose authentication handler gives the maximum score.\n\tstd::unique_ptr<HttpAuthHandler> best;\n\tconst std::string header_name = GetChallengeHeaderName(target);\n\tstd::string cur_challenge;\n\tsize_t iter = 0;\n\t   while (response_headers.EnumerateHeader(&iter, header_name, &cur_challenge)) {\n\t\tstd::unique_ptr<HttpAuthHandler> cur;\n\t\tint rv = http_auth_handler_factory->CreateAuthHandlerFromString(\n\t\t\t\tcur_challenge, target, ssl_info, origin, net_log, &cur);\n\t\tif (rv != OK) {\n\t\t\tVLOG(1) << "Unable to create AuthHandler. Status: "\n\t\t\t\t\t\t\t<< ErrorToString(rv) << " Challenge: " << cur_challenge;\n\t\t\tcontinue;\n\t\t}\n\t\tif (cur.get() && (!best.get() || best->score() < cur->score()) &&\n\t\t\t\t(disabled_schemes.find(cur->auth_scheme()) == disabled_schemes.end()))\n\t\t\tbest.swap(cur);\n\t}\n\thandler->swap(best);\n}\t\t\t\t\t\t\t\t\t\t\t\t\t';
        var i = 0;
        this.currentCode = '';
        this.printedCode = '';
        this.game.inputCode = '';
        this.countLines = [];
        document.getElementById('game-container').onclick = () => fakeInput.startFocus();

        this.visibleCode = this.addText('', 120, 210, 25, '#39FF00');

        fakeInput.domElement.element.addEventListener('keypress', () => this.printCode(fakeInput, cursorInput, code, event));
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('08:40');
        this.game.phone.setDate('01.09.18');
        this.game.phone.addTodo({
            id: 'CODE_EDITOR',
            text: 'Написати код програми'
        });
    }

    preload() {
        this.load.image('bg', './assets/images/3-2(programmer)/bg-3-3.png');
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

    addText(str, posX, posY, fontSize, color='#fff') {
        let tmp = this.game.add.text(posX, posY, str, {
            font: fontSize + "px 'Source Code Pro",
            fill: color
        });
        return tmp;
    }

    addInput(cursorColor='#1e1e1e') {
        let tmp = this.game.add.inputField(107, 200, {
            fillAlpha: 0,
            width: 2,
            max: 0,
            padding: 10,
            font: '25px Pangolin',
            cursorColor: cursorColor
        });
        return tmp;
    }

    printCode(fakeInput, cursorInput, code, event) {
        cursorInput.endFocus();
        this.game.inputCode += this.getChar(event);
        event.preventDefault();
        for (let j = 0; j <= 5; j++) {
            this.currentCode += code[this.counter];
            this.printedCode += code[this.counter];
            this.counter++;
        }
        this.visibleCode.setText(this.currentCode);
        this.countLines = this.currentCode.split('\n');
        if (this.countLines.length > 18) {
            this.currentCode = '';
            this.visibleCode.setText('');
        }
        if (this.printedCode.length > 1799) {
            fakeInput.endFocus();
            document.getElementById('game-container').onclick = null;
            let compiledText = this.addText("Compiled successfully", 120, 940, 30);
            this.game.phone.completeTodo('CODE_EDITOR');
            this.next();
        }
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