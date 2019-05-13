import Phaser from 'phaser';
import {smartSetHeight} from '../utils';
import {subjectsArray} from "../DataForSchedule/subjects";

const style = {
    fontSize: 20,
    font: 'Leftonade',
};

export default class ScheduleState extends Phaser.State {
    * gen() {
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.phone.setEnabled(true);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
    }

    preload() {
        this.load.image('bg', './assets/images/schedule/schedule-bg.png');
        this.load.image('ok', './assets/images/schedule/ok.png');
        this.load.image('btn-white', './assets/images/schedule/btn-white.png');
        this.load.image('btn-grey', './assets/images/schedule/btn-grey.png');
    }

    create() {
        this.score = 0;
        this.count = 0;

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        style.fontSize = 25;
        let mainSubj = this.addTextOnSprite(580, 115, 'ОБОВ\'ЯЗКОВІ ДИСЦИПЛІНИ ПРОФЕСІЙНОГО І ПРАКТИЧНОГО СПРЯМУВАННЯ', style);
        mainSubj.addColor('#ffffff', 0);
        let optionalSubj = this.addTextOnSprite(830, 595, 'ДОДАТКОВІ ДИСЦИПЛІНИ', style);
        optionalSubj.addColor('#ffffff', 0);

        this.subjects = {};

        subjectsArray.forEach((subject) => {
            style.fontSize = 20;
            if (subject.color) {
                let numColumn = this.addTextOnSprite(subject.posX, subject.posY, subject.id, style);
                numColumn.addColor(subject.color, 0);

                let paddingLeft = 110;
                let firstColumnName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY, subject.firstColumnName, style);
                firstColumnName.addColor(subject.color, 0);

                paddingLeft = 350;
                let secondColumnName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY, subject.secondColumnName, style);
                secondColumnName.addColor(subject.color, 0);
                return;
            }

            this.addTextOnSprite(subject.posX, subject.posY, subject.optionalSubjectId || subject.mainSubjectId, style);

            let paddingLeft = subject.mainSubjectId ? (subject.mainSubjectId < 10 ? 35 : 40) : 35;
            let paddingTop = 10;

            let subjectName = this.addTextOnSprite(subject.posX + paddingLeft, subject.posY - paddingTop, subject.subjectName, style);

            subjectName.lineSpacing = -13;
            subjectName.inputEnabled = true;
            subjectName.input.useHandCursor = true;
            subjectName.events.onInputDown.add(() => {
                //TODO: add normal displaying of subjects info
                alert(subject.subjectName);
            });

            let minusButton = null;
            let plusButton  = null;
            let checkbox = null;
            let hoursText = null;
            if (subject.minusButton && subject.plusButton) {
                paddingLeft = 60;
                paddingTop = 7;
                hoursText = this.addTextOnSprite(subject.minusButton.posX + paddingLeft, subject.minusButton.posY + paddingTop, subject.hours, style);

                minusButton = this.game.add.image(subject.minusButton.posX, subject.minusButton.posY, subject.minusButton.name);
                minusButton.inputEnabled = true;
                minusButton.input.useHandCursor = true;
                minusButton.events.onInputDown.add(this.handleMinusClick, this);

                paddingLeft = 15;
                paddingTop = -2;
                style.fontSize = 30;
                this.addTextOnSprite(subject.minusButton.posX + paddingLeft, subject.minusButton.posY + paddingTop, subject.minusButton.symbol, style);

                plusButton = this.game.add.image(subject.plusButton.posX, subject.plusButton.posY, subject.plusButton.name);
                plusButton.inputEnabled = true;
                plusButton.input.useHandCursor = true;
                plusButton.events.onInputDown.add(this.handlePlusClick, this);

                paddingLeft = 13;
                this.addTextOnSprite(subject.plusButton.posX + paddingLeft, subject.plusButton.posY + paddingTop, subject.plusButton.symbol, style);
            }
            if (subject.checkbox) {
                checkbox = this.game.add.image(subject.checkbox.posX, subject.checkbox.posY, subject.checkbox.name);
                checkbox.inputEnabled = true;
                checkbox.input.useHandCursor = true;
                checkbox.events.onInputDown.add(this.handleCheckboxClick, this);
                checkbox.isChecked = false;
            }

            let key = subject.mainSubjectId ? 'main_subject_' + subject.mainSubjectId : 'optional_subject_' + subject.optionalSubjectId
            minusButton ? minusButton.key = key : null;
            plusButton ? plusButton.key = key : null;

            this.subjects[key] = {
                id: subject.mainSubjectId || subject.optionalSubjectId,
                subjectName: subjectName,
                minusButton: minusButton,
                plusButton: plusButton,
                checkbox: checkbox,
                hours: subject.hours,
                min: subject.min,
                max: subject.max,
                hoursText: hoursText,
                subjectObj: subject
            };
        });

        this.next();
    }

    handleCheckboxClick (checkbox) {
        if (!checkbox.isChecked) {
            if (this.count === 4) {
                alert('too much optional subjects');
                // TODO: add message about too much checked optional subjects
                return;
            }
            checkbox.ok = this.game.add.image(checkbox.world.x, checkbox.world.y - 5, 'ok');
            checkbox.isChecked = true;
            this.count++;
        } else {
            checkbox.ok.destroy();
            checkbox.isChecked = false;
            this.count--;
        }
    }

    handleMinusClick (button) {
        if (this.subjects[button.key].hours - 1 >= this.subjects[button.key].min) {
            this.reduceHours(button.key);

            let key = 'main_subject_' + (this.subjects[button.key].id + 1);
            if (this.subjects[key]) {
                if (this.subjects[key].hours + 1 <= this.subjects[key].max) {
                    this.produceHours(key);
                }
            } else {
                key = 'main_subject_1';
                if (this.subjects[key] && this.subjects[key].hours + 1 <= this.subjects[key].max) {
                    this.produceHours(key);
                }
            }
        }
    }

    handlePlusClick (button) {
        if (this.subjects[button.key].hours + 1 <= this.subjects[button.key].max) {
            this.produceHours(button.key);

            let key = 'main_subject_' + (this.subjects[button.key].id + 1);
            if (this.subjects[key]) {
                if (this.subjects[key].hours - 1 >= this.subjects[key].min) {
                    this.reduceHours(key);
                }
            } else {
                key = 'main_subject_1';
                if (this.subjects[key] && this.subjects[key].hours - 1 >= this.subjects[key].min) {
                    this.reduceHours(key);
                }
            }
        }
    }

    produceHours(key) {
        style.fontSize = 20;
        this.subjects[key].hours++;
        this.subjects[key].hoursText.destroy();
        this.subjects[key].hoursText = this.addTextOnSprite(this.subjects[key].subjectObj.minusButton.posX + 60, this.subjects[key].subjectObj.minusButton.posY + 7, this.subjects[key].hours, style);
    }

    reduceHours(key) {
        style.fontSize = 20;
        this.subjects[key].hours--;
        this.subjects[key].hoursText.destroy();
        this.subjects[key].hoursText = this.addTextOnSprite(this.subjects[key].subjectObj.minusButton.posX + 60, this.subjects[key].subjectObj.minusButton.posY + 7, this.subjects[key].hours, style);
    }

    addTextOnSprite(x, y, text, style) {
        return this.add.text(x, y, text, style);
    }

    next() {
        this._gen.next();
    }
}
