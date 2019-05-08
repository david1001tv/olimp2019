import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{lat: 47.095447, lng: 37.541188}}

    >
        <MarkerWithLabel
            position={{lat: 47.095447, lng: 37.541188}}
            labelAnchor={new google.maps.Point(60, 150)}
            labelStyle={{
                backgroundColor: 'white',
                fontFamily: 'Neucha',
                fontSize: '18px',
                padding: '16px',
                boxShadow: '3px 3px 3px #aaa',
                borderRadius: '2px'
            }}
        >
            <div>Приймальна комісія ПДТУ</div>
        </MarkerWithLabel>
    </GoogleMap>
));

export default class IntroState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  

        this.game.displayDialogLine('Голос', 'Промайнули шкільні тижні, і сьогодні Ви склали останній іспит. Що чекає попереду?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Хочеться досягти успіху, щоб ніколи не наздогнало почуття жалю за нездійсненним. Настав час планувати майбутнє. Настав час обрати майбутню професію.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Здається, що всі Ваші однолітки вже встигли визначитися і залишилися лише Ви. Але професій так багато, що Ви відчуваєте себе розгубленим. Лікар? Вчитель? Космонавт? Все не те.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Треба щоб і цікавою була, і сучасною, і з високою заробітною платою...', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', '*Зненацька щось яскраве промайнуло перед Вашими очима. Це була підхоплена вітром листівка*', () => this.next());
        yield;

        // this.camera.scale.setTo(1, 1);
        // this.camera.x = 1128 * 5;
        // this.camera.y = 350 * 5 - 300;
        // let firstStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        // let secondStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        // let thirdStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
    
        // firstStep.chain(secondStep, thirdStep);
        // this.game.add.tween(this.camera.scale).to({
        //     x: 1.2,
        //     y: 1.2,
        // }, 2000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
        // firstStep.start();
        // yield;

        this.buttonYes.alpha = 1;
        this.buttonNo.alpha = 1;
        yield;

        if (this.answer == 'No'){
            this.game.displayDialogLine('Ви', 'Ви збираєтеся пройти повз, але порив вітру кидає листівку прямо Вам в обличчя. “Напевно, це доля”, - гадаєте Ви, придивляючись до тексту', () => this.next());
        }
        else {
            this.game.displayDialogLine('Ви', 'Треба подивитися', () => this.next());
        }
        yield;

        this.game.add.tween(this.booklet).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                this.game.displayDialogLine('Ви', 'Комп’ютерні науки? Що ж спеціаліст з інформаційних технологій - звучить непогано. Ви уявляєте, як сидите у розкішному кріслі власного кабінету, що займає весь останній поверх хмарочосу', () => this.next());
        });
        yield;
        this.game.displayDialogLine('Ви', 'Ви робите ковток свіжозвареної бразильської кави, що залишив на Вашому столі послужливий особистий помічник, і не кваплячись, з почуттям власної гідності, декількома надрозумними командами програмуєте космічні машини', () => this.next());
        yield;
        this.game.displayDialogLine('Ви', 'О, це надзвичайно круто!  Давно забуте почуття наснаги захоплює Вас. З нетерпінням Ви шукаєте на листівці дату - вже завтра!  Треба якнайскоріше зареєструватися', () => this.next());
        yield;

        
        //регистрация

        this.game.displayDialogLine('Ви', 'Ви намагаєтесь згадати, де знаходиться університет. У центрі міста? Біля кінотеатру? Чи може Ви бачили його, коли зустрічалися із друзями в парку? Так і заблукати неважко! Але відчуття тривоги покидає Вас, щойно бачите на зворотному боці листівки карту', () => this.next());
        yield;


        this.game.add.tween(this.booklet).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                this.game.add.tween(this.booklet_back).to({
                    alpha: 1
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start().onComplete.add(() => this.next());
        });
        yield;

        this.game.displayDialogLine('Ви', 'Ви почуваєтесь значно впевненіше. Можливо наступний день стане вирішальним і надасть можливість остаточно визначитися з майбутньою професією.', () => this.next());
        yield;

        //карта

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('13:56');
        this.game.phone.setDate('02.07.18');
        this.answer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/1-0 (Intro)/background.png');
        this.load.image('booklet', './assets/images/1-0 (Intro)/booklet.png');
        this.load.image('booklet_back', './assets/images/1-0 (Intro)/booklet_back.png');

        this.load.image('button_yes', './assets/images/1-0 (Intro)/button_yes.png');
        this.load.image('button_no', './assets/images/1-0 (Intro)/button_no.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let buttonYes = this.game.add.button(this.game.world.centerX + 300, 300, 'button_yes', this.actionOnClick, this, 2, 1, 0);
        let buttonNo = this.game.add.button(this.game.world.centerX - 650, 300, 'button_no', this.actionOnClick, this, 2, 1, 0);
        buttonYes.alpha = 0;
        buttonNo.alpha = 0

        this.buttonYes = buttonYes;
        this.buttonNo = buttonNo;

        let booklet = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet');
        booklet.alpha = 0;
        this.booklet = booklet;

        let booklet_back = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet_back');
        booklet_back.alpha = 0;
        this.booklet_back = booklet_back;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    actionOnClick(obj) {
        console.log(obj.key);
        if (obj.key == 'button_yes'){
            this.answer = 'Yes';
        }
        else {
            this.answer = 'No';
        }
        this.buttonYes.destroy();
        this.buttonNo.destroy();
        this.next();
    }

    next() {
        this._gen.next();
    }

}
