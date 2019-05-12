import Phaser from 'phaser';

export default class Hand {
    constructor(verticalFrame, changingFrame, horizontalFrame, game) {
        this.activeFrame = verticalFrame;
        this.verticalFrame = verticalFrame;
        this.changingFrame = changingFrame;
        this.horizontalFrame = horizontalFrame;

        this.group = game.add.group();
        this.group.addMultiple([this.verticalFrame, this.changingFrame, this.horizontalFrame]);

        [...arguments].forEach(e => {
            e.visible = false;
        });

        this.activeFrame.visible = true;
    }

    moveToVertical() {
        if (this.activeFrame === this.horizontalFrame) {
            this.activeFrame = this.changingFrame;
            this.horizontalFrame.visible = false;
            this.changingFrame.visible = true;
            setTimeout(() => {
                this.activeFrame = this.verticalFrame;
                this.verticalFrame.visible = true;
                this.changingFrame.visible = false
            }, 50);
        }
    }

    moveToHorizontal() {
        if (this.activeFrame === this.verticalFrame) {
            this.activeFrame = this.changingFrame;
            this.verticalFrame.visible = false;
            this.changingFrame.visible = true;
            setTimeout(() => {
                this.activeFrame = this.horizontalFrame;
                this.horizontalFrame.visible = true;
                this.changingFrame.visible = false
            }, 50);
        }
    }
}