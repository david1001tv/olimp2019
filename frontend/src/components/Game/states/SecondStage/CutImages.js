import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import testAPI from '../../testAPI';

export default class WWHState extends Phaser.State {
    * gen() {

}

preload() {
    this.load.image('bg', './assets/images/2-4 (cut_images)/background.png');

    for (let i = 1; i < 26; i++){
        let image = this.load.image('image'+i, './assets/images/2-4 (cut_images)/image_part_0'+ i +'.png');
    }

}

create() {

    let bg = this.game.add.image(0, 0, 'bg');
    bg.height = this.game.width * bg.height / bg.width;
    bg.width = this.game.width;

    this.mass = [];
    this.mass_angles = [0, 90, -180, -90];
    let x = 563;
    let y = 73;

    let count = 1;

    for (let i = 1; i < 26; i++){
        let image = this.game.add.image(x+86.5, y+86.5, 'image'+i);
        image.side = Math.floor(Math.random() * (4 - 0) + 0);
        image.anchor.setTo(0.5, 0.5);
        image.angle = this.mass_angles[image.side];


        image.inputEnabled = true;
        image.events.onInputDown.add(this.rotate_image, this);
        image.input.useHandCursor = true;


        smartSetHeight(image, 173);
        smartSetWidth(image, 173);
        this.mass.push(image);

        x += 173;
        if (count == 5){
            y += 173;
            x = 563;
            count = 0;
        }
        count++;
    }

    this.stage.disableVisibilityChange = true;

    this.testAPI = {...testAPI};
    for (let key in this.testAPI) {
        this.testAPI[key] = this.testAPI[key].bind(this);
    }
    this.next();
}

rotate_image (e) {
    let key = this.mass_angles.indexOf(e.angle); 
    (key < this.mass_angles.length - 1) ? key++ : key = 0;
    e.angle = this.mass_angles[key];
    
    console.log(this.testAPI.imageCheck(this.mass));
    if (this.testAPI.imageCheck(this.mass)){
        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        // yield;
        this.camera.scale.setTo(1, 1);
        this.game.nextState(this.grade);
    }


}

init() {
    this._gen = this.gen();
    this.game.phone.clearTodos();
    this.game.phone.addTodo({
        id: "TRANSLATE",
        text: "Допомогти з перекладом"
    });
    this.game.phone.setEnabled(false);
    this.game.phone.setTime('11:00');
    this.game.phone.setDate('21.07.18');
}

shutdown() {
    this.game.camera.scale.setTo(1, 1);
}

next() {
    this._gen.next();
}

}