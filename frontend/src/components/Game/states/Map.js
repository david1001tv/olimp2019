import Phaser from 'phaser';
import {smartSetHeight} from '../utils';


export default class MapState extends Phaser.State {
    init() {
        this.game.phone.setMapIsShown(true);
        this.game.phone.setMapIsCloseable(false);
    }
    shutdown() {
        this.game.phone.setMapIsShown(false);
        this.game.phone.setMapIsCloseable(true);
    }
}
