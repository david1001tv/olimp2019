/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let mom = this.game.add.image(0, 0, 'mom');
        mom.position.setTo(0, 0);
        mom.aspectRatio = mom.width / mom.height;
        mom.height = 700;
        mom.width = mom.aspectRatio * mom.height;
        mom.inputEnabled = true;
        mom.input.enableDrag();
        mom.anchor.set(0.5);
        this.mom = mom;

        const bannerText = 'Phaser + ES6 + Webpack';
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
            font: '40px Bangers',
            fill: '#77BFA3',
            smoothed: false
        });

        banner.padding.set(10, 16);
        banner.anchor.setTo(0.5);


        window.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        window.game.scale.parentIsWindow = true;
        this.stage.disableVisibilityChange = true;
    }

    render() {
        // if (__DEV__) {
        this.game.debug.spriteInfo(this.mom, 32, 32);
        // }
    }
}
