import Phaser from 'phaser';
import { smartSetHeight } from '../../utils';

export default class GrannyBadState extends Phaser.State {
    * gen() {
        window.CAMERA = this.camera;
        this.camera.x = 1128;
        this.camera.y = 280;
        this.game.add.tween(this.camera.scale).to({
            x: 1,
            y: 1,
        }, 3000).start().onComplete.add(() => {
            this.next();
        });
        // this.game.camera.flash(0x000000, 3000, true);
        // yield;

        let dStand = this.game.add.image(1660, 240, 'd-stand');
        smartSetHeight(dStand, 830);

        let proninaWorks = this.game.add.image(1055, 260, 'pronina-works');
        smartSetHeight(proninaWorks, 305);

        this.game.displayDialogLine('Ви', 'Ольго Iгорiвно, можна здати лабораторну роботу?', () => this.next());
        yield;

        proninaWorks.destroy();
        let proninaSceptic = this.game.add.image(1055, 260, 'pronina-sceptic');
        smartSetHeight(proninaSceptic, 305);

        this.game.displayDialogLine('Пронiна', 'Звiсно, сiдай.', () => this.next());
        yield;

        proninaSceptic.destroy();
        let proninaAngry = this.game.add.image(1055, 260, 'pronina-angry');
        smartSetHeight(proninaAngry, 305);
        dStand.destroy();
        let dPass = this.game.add.image(1190, 270, 'd-pass');
        smartSetHeight(dPass, 410);

        this.game.displayDialogLine('Пронiна', 'Що це за програма така? Ти, взагалi, бачив, що написав?', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Начебто все працювало. Зараз гляну, що там.', () => this.next());
        yield;

        // this.bg1.destroy();

        let bg2 = this.game.add.image(0, 0, 'bg2');
        smartSetHeight(bg2, 1080);

        this.game.inputCode = 'iaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonviaogjvoinheiarbviaengvjrwijvnawonvnweonv'
        let tmpCode = 'gojakwvfasfsavapfkvgafdvwarfvcwesdfceweq\nfoanverfsaferafverfvewvwgvwdfvasvovopn\nfoijffaefaergrrgnoasfsdavsdinvowvnoi\nvrowfasfvweveasdvadanvrjnvoj\n\tjfisdofjcnwcfasdfdsvosnv\n\tfjuwihjnvuiavuvgdfgerhbtvwev\n\tvasnvojnjumyjhawewdovwovwwaeowjodvnwojvnojswn\n\t\tvjfovmigearsggraojraemvoerk\n\t\tiaovbjmaieofjvmbiaeorbmjoirmjb\n\t\tjafviowerpvjre\n\t\t\tfvergasrgvegzvsdrev\n\t\tkoresmvsokmnorekmodfv'
        if (!this.game.inputCode) {
            this.game.inputCode = tmpCode;
        } else this.formatCode();
        let code = this.game.add.text(550, 260, this.game.inputCode, {
            font: "20px 'Source Code Pro",
            fill: '#000'
        });

        this.game.displayDialogLine('Ви', 'Ой. Це, мабуть, принтер так надрукував, в мене все працювало.', () => this.next());
        yield;

        this.game.phone.completeTodo('LABORATORY');
        bg2.destroy();
        code.destroy();

        let veres = this.game.add.image(1600, 140, 'veres');
        smartSetHeight(veres, 925);

        proninaAngry.destroy();
        let proninaSmile = this.game.add.image(1055, 260, 'pronina-smile');
        smartSetHeight(proninaSmile, 305);

        this.game.displayDialogLine('Верескун', 'Добого дня. Вибачте, що вiдволiкаю. Я хотiв би повiдомити, що незабаром вiдбудеться "Дебют першокурсника".', () => this.next());
        yield;

        this.game.displayDialogLine('Верескун', 'На ньому студенти можуть показати свої здiбностi, гарно провести чаc та заробити додатковi бали.', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', 'Здрастуйте. Це гарна новина! Я обов`язково вiзьму участь у цьому заходi.', () => this.next());
        yield;

        yield;

        // this.state.start('Cross');
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.setEnabled(true);
        this.game.phone.setTime('11:09');
        this.game.phone.setDate('02.09.18');
        this.game.phone.addTodo({
            id: 'LABORATORY',
            text: 'Здати лабораторну роботу'
        });
    }

    preload() {
        this.load.image('bg1', './assets/images/3-2(programmer)/bg-3-2.png');
        this.load.image('bg2', './assets/images/3-2(programmer)/bg-3-3b.png');
        this.load.image('pronina-works', './assets/images/3-2(programmer)/pronina-works.png');
        this.load.image('pronina-smile', './assets/images/3-2(programmer)/pronina-smile.png');
        this.load.image('pronina-sceptic', './assets/images/3-2(programmer)/pronina-sceptic.png');
        this.load.image('pronina-angry', './assets/images/3-2(programmer)/pronina-angry.png');
        this.load.image('d-stand', './assets/images/3-2(programmer)/d-backhand.png');
        this.load.image('d-pass', './assets/images/3-2(programmer)/d-pass.png');
        this.load.image('veres', './assets/images/3-2(programmer)/veres.png')
    }

    create() {
        this.bg1 = this.game.add.image(0, 0, 'bg1');
        this.bg1.height = this.game.width * this.bg1.height / this.bg1.width;
        this.bg1.width = this.game.width;

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    next() {
        this._gen.next();
    }

    randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    formatCode() {
        for (let i = 40; i < this.game.inputCode.length; i += this.randomInteger(35, 60)) {
            let tmpArr = this.game.inputCode.split('');
            tmpArr.splice(i, 0, '\n');
            this.game.inputCode = tmpArr.join('');
        }
        let tmpArr = this.game.inputCode.split('\n');
        console.log(tmpArr);
        for (let i = 0; i < tmpArr.length; i++) {
            if (i < 2) tmpArr[i] = '\n' + tmpArr[i];
            if (i <= 7) tmpArr[i] = '\n\t\t' + tmpArr[i];
            if (i > 7 && i <= 9) tmpArr[i] = '\n\t\t\t\t' + tmpArr[i];
            if (i > 9 && i <= 13) tmpArr[i] = '\n\t\t\t\t\t\t' + tmpArr[i];
            if (i > 13) tmpArr[i] = '\n' + tmpArr[i];
        }
        this.game.inputCode = tmpArr.join('');
    }
}