import Phaser from 'phaser';
import PhaserInput from 'phaser-input';
import { smartSetHeight } from '../../utils';

export default class CodeEditorState extends Phaser.State {
    * gen() {
        // this.game.displayDialogLine('Ви', 'Час писати код програми', () => this.next());
        // yield;

        let fakeInput = this.addInput();
        let cursorInput = this.addInput('#39FF00');
        cursorInput.startFocus();
        fakeInput.startFocus();

        let code = '#include "net/http/http_auth.h"\n\n#include <algorithm>\n\n#include "base/strings/string_tokenizer.h"\n#include "base/strings/string_util.h"\n#include "net/base/net_errors.h"\n#include "net/http/http_auth_challenge_tokenizer.h"\n#include "net/http/http_auth_handler.h"\n#include "net/http/http_auth_handler_factory.h"\n#include "net/http/http_auth_scheme.h"\n#include "net/http/http_request_headers.h"\n#include "net/http/http_response_headers.h"\n#include "net/http/http_util.h"\n\nnamespace net {\n\nHttpAuth::Identity::Identity() : source(IDENT_SRC_NONE), invalid(true) {}\n\n// static\nvoid HttpAuth::ChooseBestChallenge(\n\t\tHttpAuthHandlerFactory* http_auth_handler_factory,\n\t\tconst HttpResponseHeaders& response_headers,\n\t\tconst SSLInfo& ssl_info,\n\t\tTarget target,\n\t\tconst GURL& origin,\n\t\tconst std::set<Scheme>& disabled_schemes,\n\t\tconst NetLogWithSource& net_log,\n\t\tstd::unique_ptr<HttpAuthHandler>* handler) {\n\tDCHECK(http_auth_handler_factory);\n\tDCHECK(handler->get() == NULL);\n\n\t// Choose the challenge whose authentication handler gives the maximum score.\n\tstd::unique_ptr<HttpAuthHandler> best;\n\tconst std::string header_name = GetChallengeHeaderName(target);\n\tstd::string cur_challenge;\n\tsize_t iter = 0;\n\twhile (response_headers.EnumerateHeader(&iter, header_name, &cur_challenge)) {\n\t\tstd::unique_ptr<HttpAuthHandler> cur;\n\t\tint rv = http_auth_handler_factory->CreateAuthHandlerFromString(\n\t\t\t\tcur_challenge, target, ssl_info, origin, net_log, &cur);\n\t\tif (rv != OK) {\n\t\t\tVLOG(1) << "Unable to create AuthHandler. Status: "\n\t\t\t\t\t\t\t<< ErrorToString(rv) << " Challenge: " << cur_challenge;\n\t\t\tcontinue;\n\t\t}\n\t\tif (cur.get() && (!best.get() || best->score() < cur->score()) &&\n\t\t\t\t(disabled_schemes.find(cur->auth_scheme()) == disabled_schemes.end()))\n\t\t\tbest.swap(cur);\n\t}\n\thandler->swap(best);\n}\n\n// static\nHttpAuth::AuthorizationResult HttpAuth::HandleChallengeResponse(\n\t\tHttpAuthHandler* handler,\n\t\tconst HttpResponseHeaders& response_headers,\n\t\tTarget target,\n\t\tconst std::set<Scheme>& disabled_schemes,\n\t\tstd::string* challenge_used) {\n\tDCHECK(handler);\n\tDCHECK(challenge_used);\n\tchallenge_used->clear();\n\tHttpAuth::Scheme current_scheme = handler->auth_scheme();\n\tif (disabled_schemes.find(current_scheme) != disabled_schemes.end())\n\t\treturn HttpAuth::AUTHORIZATION_RESULT_REJECT;\n\tstd::string current_scheme_name = SchemeToString(current_scheme);\n\tconst std::string header_name = GetChallengeHeaderName(target);\n\tsize_t iter = 0;\n\tstd::string challenge;\n\tHttpAuth::AuthorizationResult authorization_result =\n\t\t\tHttpAuth::AUTHORIZATION_RESULT_INVALID;\n\twhile (response_headers.EnumerateHeader(&iter, header_name, &challenge)) {\n\t\tHttpAuthChallengeTokenizer props(challenge.begin(), challenge.end());\n\t\tif (!base::LowerCaseEqualsASCII(props.scheme(),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcurrent_scheme_name.c_str()))\n\t\t\tcontinue;\n\t\tauthorization_result = handler->HandleAnotherChallenge(&props);\n\t\tif (authorization_result != HttpAuth::AUTHORIZATION_RESULT_INVALID) {\n\t\t\t*challenge_used = challenge;\n\t\t\treturn authorization_result;\n\t\t}\n\t}\n\t// Finding no matches is equivalent to rejection.\n\treturn HttpAuth::AUTHORIZATION_RESULT_REJECT;\n}\n\n// static\nstd::string HttpAuth::GetChallengeHeaderName(Target target) {\n\tswitch (target) {\n\t\tcase AUTH_PROXY:\n\t\t\treturn "Proxy-Authenticate";\n\t\tcase AUTH_SERVER:\n\t\t\treturn "WWW-Authenticate";\n\t\tdefault:\n\t\t\tNOTREACHED();\n\t\t\treturn std::string();\n\t}\n}\n\n// static\nstd::string HttpAuth::GetAuthorizationHeaderName(Target target) {\n\tswitch (target) {\n\t\tcase AUTH_PROXY:\n\t\t\treturn HttpRequestHeaders::kProxyAuthorization;\n\t\tcase AUTH_SERVER:\n\t\t\treturn HttpRequestHeaders::kAuthorization;\n\t\tdefault:\n\t\t\tNOTREACHED();\n\t\t\treturn std::string();\n\t}\n}\n\n// static\nstd::string HttpAuth::GetAuthTargetString(Target target) {\n\tswitch (target) {\n\t\tcase AUTH_PROXY:\n\t\t\treturn "proxy";\n\t\tcase AUTH_SERVER:\n\t\t\treturn "server";\n\t\tdefault:\n\t\t\tNOTREACHED();\n\t\t\treturn std::string();\n\t}\n}\n\n\n\n// static\nconst char* HttpAuth::SchemeToString(Scheme scheme) {\n\tstatic const char* const kSchemeNames[] = {\n\t\t\tkBasicAuthScheme,\t\t kDigestAuthScheme,\t\tkNtlmAuthScheme,\n\t\t\tkNegotiateAuthScheme, kSpdyProxyAuthScheme, kMockAuthScheme};\n\tstatic_assert(arraysize(kSchemeNames) == AUTH_SCHEME_MAX,\n\t\t\t\t\t\t\t\t"http auth scheme names incorrect size");\n\tif (scheme < AUTH_SCHEME_BASIC || scheme >= AUTH_SCHEME_MAX) {\n\t\tNOTREACHED();\n\t\treturn "invalid_scheme";\n\t}\n\treturn kSchemeNames[scheme];\n}\n\n}';
        let i = 0;
        let currentCode = '';
        let inputCode = '';
        let countLines = [];

        let visibleCode = this.addText('', 120, 210, 25, '#39FF00');

        fakeInput.domElement.element.addEventListener('keydown', function(e) {
            cursorInput.endFocus();
            inputCode += String.fromCharCode(e.which).toLowerCase();
            console.log('input code: ' + inputCode);
            console.log('input length: ' + inputCode.length);
            e.preventDefault();
            for (let j = 0; j <= 5; j++) {
                currentCode += code[i];
                i++;
            }
            visibleCode.setText(currentCode);
            countLines = currentCode.split('\n');
            if(countLines.length > 18) {              
                currentCode = '';
                visibleCode.setText('');
            }
        })
        if(inputCode.length == 1000) {
            var compiledText = this.addText("Compiled successfully", 120, 933, 30);
        }
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
}