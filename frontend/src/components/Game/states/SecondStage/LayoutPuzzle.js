import Phaser from 'phaser';
import {smartSetHeight, smartSetWidth} from '../../utils';
import SSF from '../../states/SecondStageFunctions';
import todos from '../../todos/Scanner';

const INACTIVE_Y = 940;


export default class Scanner extends Phaser.State {
    * gen() {
        this.game.input.enabled = false;
        this.game.camera.flash(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.displayDialogLine('Анастасія Марківна', 'Дизайн-макет сайту - це візуальний образ майбутнього сайту, розроблений з урахуванням технічних можливостей HTML верстки. Макет подається у вигляді картинки, яка буде відображатись в браузері, без активних кнопок та інших динамічних елементів', () => this.next());
        yield;
        this.game.displayDialogLine('Анастасія Марківна', 'Для розробки макету ми будемо використовувати Фотошоп - багатофункціональний графічний редактор. Слої в фотошопі - це найважливіша палітра програми. Слої можна уявити, як стопку прозорих плівок, з нанесеними на них фрагментами зображення. Якщо їх накласти один на одного, то вийде одна єдина картинка', () => this.next());
        yield;
        this.game.displayDialogLine('Анастасія Марківна', 'Структура сайту - ретельно розроблене розташування всіх елементів, з урахуванням принципів майбутньої верстки. Всі елементи контенту повинні бути правильно вирівняні по горизонталі і вертикалі. Цього можна досягти використовуючи сітку', () => this.next());
        yield;
        this.game.displayDialogLine('Анастасія Марківна', 'Шапка сайту - це верхня частина веб-ресурсу, розташована на всіх сторінках сайту. Зазвичай містить навігаційну панель, головне меню, логотип.', () => this.next());
        yield;

        //Уведомление "Перетягніть потрібний слой з правої панелі до основного макету, та правильного його розташуйте"
        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.warning).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start()
            }, 3000));

        this.game.add.tween(this.firstWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.firstWarning).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start()
            }, 3000));

        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.input.enabled = true;
        this.game.phone.setEnabled(true);
        yield;

        this.game.add.tween(this.teacher).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start(); 

        this.game.displayDialogLine('Анастасія Марківна', 'Я не помилилась у тобі. Дякую за допомогу!', () => {
            this.game.add.tween(this.teacher).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
            this.next()  
        });
        yield;

        this.game.displayDialogLine('Голос', '*Ви вирушаєте додому, задоволені собою, і плануєте продовжити освоювати Photoshop на професійному рівні*', () => this.next());
        yield;
        this.game.add.tween(this.teacher).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        //Уведомление "Вітаємо! Ви отримали навички веб-дизайну і поліпшили ставлення викладача!"
        this.mass.forEach((index) => {
            this.game.add.tween(index).to({
                alpha: 0
            }, 1500, Phaser.Easing.Cubic.InOut)
                .start();
        });

        this.game.add.tween(this.fullSite).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start();

        this.game.add.tween(this.warning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.warning).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start()
            }, 3000));

        this.game.add.tween(this.secondWarning).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => setTimeout(() => {
                this.game.add.tween(this.secondWarning).to({
                    alpha: 0
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start()
            }, 3000));

        this.game.displayDialogLine('Анастасія Марківна', 'Готово. Тепер потрібно зареєструватися на сайті університету', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;

        this.game.nextState(this.score);
    }

    init() {
        this.activePart = null;
        this.isRight = false;

        this._gen = this.gen();

        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('14:07');
        this.game.phone.setDate('02.07.18');
    }

    preload() {

        this.load.image('bg', './assets/images/2-2 (Layout puzzle)/background.png');
        this.load.image('teacher', './assets/images/2-2 (Layout puzzle)/teacher.png');
        this.load.image('warning_message', './assets/images/1-1 (PostIntro)/warning_message.png');
        this.load.image('checkmark', './assets/images/2-2 (Layout puzzle)/checkmark.png');

        this.load.image('header-big', './assets/images/2-2 (Layout puzzle)/header-big.png');
        this.load.image('header-small', './assets/images/2-2 (Layout puzzle)/header-small.png');
        
        this.load.image('banner-big', './assets/images/2-2 (Layout puzzle)/banner-big.png');
        this.load.image('banner-small', './assets/images/2-2 (Layout puzzle)/banner-small.png');

        this.load.image('content-big', './assets/images/2-2 (Layout puzzle)/content-big.png');
        this.load.image('content-small', './assets/images/2-2 (Layout puzzle)/content-small.png');

        this.load.image('leftmenu-big', './assets/images/2-2 (Layout puzzle)/leftmenu-big.png');
        this.load.image('leftmenu-small', './assets/images/2-2 (Layout puzzle)/leftmenu-small.png');

        this.load.image('footer-big', './assets/images/2-2 (Layout puzzle)/footer-big.png');   
        this.load.image('footer-small', './assets/images/2-2 (Layout puzzle)/footer-small.png');

        this.load.image('menu-big', './assets/images/2-2 (Layout puzzle)/menu-big.png');   
        this.load.image('menu-small', './assets/images/2-2 (Layout puzzle)/menu-small.png');

        this.load.image('logo-big', './assets/images/2-2 (Layout puzzle)/logo-big.png');   
        this.load.image('logo-small', './assets/images/2-2 (Layout puzzle)/logo-small.png');


        this.load.image('full', './assets/images/2-2 (Layout puzzle)/full.png');

    }

    create() {
        this.SSF = {...SSF};
        for (let key in this.SSF) {
            this.SSF[key] = this.SSF[key].bind(this);
        }

        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let minHeader = this.game.add.image(0, INACTIVE_Y, 'header-small');
        minHeader.first = 250;
        minHeader.second = 150;
        minHeader.third = 880;
        minHeader.fourth = 100;
        minHeader.type = 0;

        let minBanner = this.game.add.image(0, INACTIVE_Y, 'banner-small');
        minBanner.first = 250;
        minBanner.second = 240;
        minBanner.third = 880;
        minBanner.fourth = 240;
        minBanner.type = 1;

        
        let minLeftMenu = this.game.add.image(0, INACTIVE_Y, 'leftmenu-small');
        minLeftMenu.first = 250;
        minLeftMenu.second = 470;
        minLeftMenu.third = 190;
        minLeftMenu.fourth = 430;
        minLeftMenu.type = 2;


        let minContent = this.game.add.image(0, INACTIVE_Y, 'content-small');
        minContent.first = 425;
        minContent.second = 470;
        minContent.third = 695;
        minContent.fourth = 435;
        minContent.type = 3;

        let minFooter = this.game.add.image(0, INACTIVE_Y, 'footer-small');
        minFooter.first = 250;
        minFooter.second = 890;
        minFooter.third = 880;
        minFooter.fourth = 145;
        minFooter.type = 4;

        let minLogo = this.game.add.image(0, INACTIVE_Y, 'logo-small');
        minLogo.first = 250;
        minLogo.second = 150;
        minLogo.third = 175;
        minLogo.fourth = 100;
        minLogo.type = 5;

        let minMenu = this.game.add.image(0, INACTIVE_Y, 'menu-small');
        minMenu.first = 490;
        minMenu.second = 175;
        minMenu.third = 470;
        minMenu.fourth = 70;
        minMenu.type = 6;

        this.fullSite = this.SSF.makeImg(254, 150, 'full', 866, 1085);

        //Уведомления
        let warning = this.game.add.image(700, 0, 'warning_message');
        warning.alpha = 0;
        smartSetHeight(warning, 200);
        this.warning = warning;

        this.firstWarning = this.game.add.text(720, 40, 'Перетягніть потрібний слой з\nправої nпанелі до основного макету,\nта правильного його розташуйте', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstWarning.alpha = 0;

        this.secondWarning = this.game.add.text(720, 40, 'Вітаємо! Ви отримали навички\nвеб-дизайну і nполіпшили ставлення\nвикладача!', {
            font: "Pangolin",
            fontSize: 30,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.secondWarning.alpha = 0;   

        this.teacher = this.SSF.makeImg(1329, 100, 'teacher', 600, 900);

        let mass = [minHeader, minBanner, minLeftMenu, minContent, minFooter, minLogo, minMenu];

        let todoIds = ['header', 'banner', 'leftmenu', 'content', 'footer', 'logo', 'menu'];
        this.mass = mass;

        let x = 1386;
        let y = 265;
        mass.forEach((part, index) => {
            part.x = part.originalX = x;
            part.y = part.originalY = y;
            y += part.height;

            part.todoId = todoIds[index];

        });

        this.mass[0].inputEnabled = true;
        this.mass[0].input.useHandCursor = true;
        this.mass[0].input.pixelPerfectOver = true;
        this.mass[0].input.enableDrag(false, true, true, 1);
        this.mass[0].events.onDragStart.add(this.handleDragStart, this);
        this.mass[0].events.onDragStop.add(this.handleCheck, this, 0,  this.mass[0].first,  this.mass[0].second,  this.mass[0].third,  this.mass[0].fourth);

        this.stage.disableVisibilityChange = true;
        this.next();
    }

    activatePart(part) {
        this.activePart = part;
        part.loadTexture(`${part.key.split('-')[0]}-big`);
        part.bringToTop();
    }

    deactivatePart(part) {
        part.loadTexture(`${part.key.split('-')[0]}-small`);
        part.x = part.originalX;
        part.y = INACTIVE_Y;
    }

    handleDragStart(part) {
        if (this.activePart !== part) {
            if (this.activePart !== null) {
                this.deactivatePart(this.activePart); 
            }
            this.activatePart(part);
        }     
    }

    handleCheck(currImg, currPointer, first, second, third, fourth){

        console.log(first, second, third, fourth);

        if (!this.isRight){
            this.game.input.enabled = false;

            let scannerRectangle = new Phaser.Rectangle(first, second, third, fourth);

            const {activePart} = this;

            if (this.activePart !== null) {

                if (Phaser.Rectangle.containsRect(activePart.getBounds(), scannerRectangle)) {
                    activePart.isRight = true;

                    if (activePart.type + 1 < this.mass.length){
                        this.mass[activePart.type + 1].inputEnabled = true;
                        this.mass[activePart.type + 1].input.useHandCursor = true;
                        this.mass[activePart.type + 1].input.pixelPerfectOver = true;
                        this.mass[activePart.type + 1].input.enableDrag(false, true, true, 1);
                        this.mass[activePart.type + 1].events.onDragStart.add(this.handleDragStart, this);
                        this.mass[activePart.type + 1].events.onDragStop.add(this.handleCheck, this, 0, this.mass[activePart.type + 1].first, this.mass[activePart.type + 1].second, this.mass[activePart.type + 1].third, this.mass[activePart.type + 1].fourth);
                    }
                    let checkmark = this.game.add.image(activePart.originalX + 6, activePart.originalY + 3, 'checkmark');
                    smartSetHeight(checkmark, 45);

                    activePart.inputEnabled = false;

                    this.game.add.tween(this.teacher).to({
                        alpha: 1
                    }, 1500, Phaser.Easing.Cubic.InOut)
                        .start(); 

                    let str;
                    switch(activePart.type){
                    	case 0:
                    		str="Сайт складається з багатьох блоків. Останнім часом популярним є розташування великого зображенням з текстовою інформацією як частини шапки сторінки";
                    		break;
                    	case 1:
                    		str="Сайдбар на сайті - це бічна панель, де розташовуються елементи, візуально відокремлені від інших, які повідомляють додаткову інформацію.";
                    		break;
                    	case 2:
                    		str="Контент - це все, що є присутнім на сайті: текстовий зміст, зображення, аудіо, відео та інші файли будь-яких розширень";
                    		break;
                    	case 3:
                    		str="Футер, підвал - це блок в нижній частині сторінки, куди виносять корисну, але не першорядну інформацію, найчастіше контактні дані";
                    		break;
                    	case 4:
                    		str="Логотип для сайту - це емблема, унікальне зображення, за яким сайт відрізняють від інших";
                    		break;
                    	case 5:
                    		str="Меню сайту - це згрупований набір посилань з назвами розділів, що полегшує перехід на інші сторінки";
                    		break;
                    	default:
    						str+="";
                    }
                    this.game.displayDialogLine('Анастасія Марківна', 'Так, це ідеальне розташування',()=>{
                        this.game.displayDialogLine('Анастасія Марківна', str,()=>{
                            this.game.add.tween(this.teacher).to({
                                alpha: 0
                            }, 1500, Phaser.Easing.Cubic.InOut)
                                .start(); 
                        });
                     });

                    this.game.phone.completeTodo(activePart.todoId);

                    this.activePart = null;
                } else {
                    this.game.displayDialogLine('Ви', 'Щось не те, спробую розташувати трохи інакше');
                }
            }

            if (this.mass.every(e => e.isRight)) {
                // if (this.count === 5) {
                //     this.score = 100;
                // }
                // else if (this.count <= 9) {
                //     this.score = Math.round(40 / (this.count - 5)) + 50;
                // }
                // else {
                //     this.score = 50;
                // }
                this.next();
            }
        }
    }

    next() {
        this._gen.next();
    }
}
