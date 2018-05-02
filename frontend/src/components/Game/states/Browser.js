import Phaser from 'phaser';

export default class BrowserState extends Phaser.State {
    * gen() {
    console.log(0);
    console.log(this.camera);
    window.CAMERA = this.camera;
    this.camera.x = 1128;
    this.camera.y = 280;
    this.game.add.tween(this.camera.scale).to({
        x: 1,
        y: 1,
    }, 3000).start().onComplete.add(() => {
        this.next();
    });
    this.game.camera.flash(0x000000, 3000, true);
    yield;
}

init() {
    this._gen = this.gen();
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.parentIsWindow = true;
}

preload() {
    
}

create() {
    
}

create_sprite(name, pos_X, pos_Y, height, flag_alpha, flag_input) {
    let tmp = this.game.add.image(pos_X, pos_Y, name);
    tmp.aspectRatio = tmp.width / tmp.height;
    tmp.height = height;
    tmp.width = tmp.aspectRatio * tmp.height;
    if(flag_alpha === false) {
        tmp.alpha = 0;
    }
    else {
        tmp.alpha = 1;
    }
    if(flag_input === true) {
        tmp.inputEnabled = true;
    }
    return tmp;
}

render() {
    // if (__DEV__) {

    // }
}

next() {
    this._gen.next();
}
}