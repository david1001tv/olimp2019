/* globals __DEV__ */
import Phaser from 'phaser';
import {smartSetHeight} from '../../utils';

const OFFSET_HOR = 965;
const OFFSET_VER = 202.5;
const PADDING_HOR = 10;
const PADDING_VER = 11;

const TIME = 5 * 60 * 1000;
const GOAL = 100;
const MIN_POINTS = 10;
const MAX_POINTS = 100;

export default class ThreeInRowState extends Phaser.State {
    * gen() {
        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  

        this.game.displayDialogLine('Голос', 'До Вашого столу впевнено прямував начальник. Ви насторожились і вимушено посміхнулися', () => this.next());
        yield;

        this.game.displayDialogLine('Начальник', 'Доброго дня. Я хочу поговорити з Вами про кар\'єрний ріст, який, як Ви знаєте, будується в ІТ на проходженні позицій від Junior до Middle і Senior', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Junior Developer - це найперша ступінь, з якої зазвичай починають свій професійний шлях програмісти, часто ще перебуваючи на навчанні у ВНЗ. На вході в компанію Ви ще не могли розраховувати на великі проекти', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Спочатку Вам довелось виступити в якості виконавця, спробувати себе в різних ролях. Вам ще не вдалося реалізувати в повній мірі всі свої амбіції, але Ви розвивали і відпрацьовували необхідні професійні навички', () => this.next());
        yield;

        this.game.displayDialogLine('Начальник', 'Тож я пропоную Вам перейти до наступної ступені - Middle. Це основний працівник, який вміє самостійно виконувати поставлені перед ним завдання і приймати архітектурні рішення, справляється з нестандартними завданнями, а стандартні робить швидше і з меншою кількістю багів, ніж Junior. Предметною областю володіє достатньо, щоб обговорювати з колегами, сперечатися і знаходити рішення, тобто впевнено знає ключові технології', () => this.next());
        yield;

        //Повідомлення: “Вітаємо! Ви здобули підвищення!”

        this.game.displayDialogLine('Начальник', 'Сподіваюсь, вже скоро Ви станете Senior - працівником, який добре знає предметну область, проводить code review, мислить проектом на рівні архітектури і розуміє довгострокові наслідки технічних рішень, вміє запропонувати глобальні рішення і альтернативні стеки технологій', () => this.next());
        yield;
        
        this.game.displayDialogLine('Начальник', 'Поряд з переходом в керівники проектів є можливість і переходу в архітектори. Складно сказати часом, до якого ж типу зростання стосується ця роль, оскільки за рівнем компетенцій вона, безумовно, не менш відповідальна', () => this.next());
        yield;

        this.game.displayDialogLine('Начальник', 'Але при цьому тут скоріш йдеться про розвиток в частині експертизи, напрацювання знань в технологіях, більш глибокому зануренні в саму технологічну і стратегічну частину проекту', () => this.next());
        yield;

        this.game.displayDialogLine('Начальник', 'Існує варіант розвитку до посади директора по розробці, який відповідає за всю розробку, здійснювану в компанії', () => this.next());
        yield;

        this.game.displayDialogLine('Начальник', 'Є ще один шлях - розвивати і вдосконалювати себе до позиції IT-директора, що займається вже питаннями IT в цілому (зокрема, інфраструктури), але це вже сильно залежить від бажання самого фахівця продовжувати працювати в області знайомої йому розробки або вийти за її межі', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Ви, сповнені амбіційних надій, занурились у роботу над проектом, що Вам доручили', () => this.next());
        yield;

        this.startGame();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(true);
        this.time = TIME;
        this.goTimer = setTimeout(() => this.checkRate(), this.time);
        this.timer = setInterval(() => this.checkTime(), 1000);
        //1 - programmer; 2 - networks; 3 - designer
        this.spec = 3;
    }

    preload() {

        this.game.load.image('bg', 'assets/images/4-2 (ThreeInARow)/background.png');
        if (this.spec == 1){
            this.game.load.image('background', 'assets/images/4-2 (ThreeInARow)/programmer/bg_programmer.png');
            this.game.load.image('cSharp', './assets/images/4-2 (ThreeInARow)/programmer/CSharp.png');
            this.game.load.image('jS', './assets/images/4-2 (ThreeInARow)/programmer/JS.png');
            this.game.load.image('ruby', './assets/images/4-2 (ThreeInARow)/programmer/Ruby.png');
            this.game.load.image('coffee', 'assets/images/4-2 (ThreeInARow)/programmer/Coffee.png');
        }    
        else if (this.spec == 2){
            this.game.load.image('background', 'assets/images/4-2 (ThreeInARow)/devops/bg_devops.png');
            this.game.load.image('cSharp', './assets/images/4-2 (ThreeInARow)/devops/Bug.png');
            this.game.load.image('jS', './assets/images/4-2 (ThreeInARow)/devops/DB.png');
            this.game.load.image('ruby', './assets/images/4-2 (ThreeInARow)/devops/Internet.png');
            this.game.load.image('coffee', 'assets/images/4-2 (ThreeInARow)/devops/Shield.png');
        } 
        else {
            this.game.load.image('background', 'assets/images/4-2 (ThreeInARow)/designer/bg_designer.png');
            this.game.load.image('cSharp', './assets/images/4-2 (ThreeInARow)/designer/Corel.png');
            this.game.load.image('jS', './assets/images/4-2 (ThreeInARow)/designer/Illustrator.png');
            this.game.load.image('ruby', './assets/images/4-2 (ThreeInARow)/designer/Photoshop.png');
            this.game.load.image('coffee', 'assets/images/4-2 (ThreeInARow)/designer/Stylus.png');
        }
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;
        
        this.stage.disableVisibilityChange = true;
        this.next();
    }

    startGame() {
        var me = this;

        this.game.add.image(0, 0, 'background');
        me.game.stage.backgroundColor = "34495f";

        //Declare assets that will be used as tiles
        me.tileTypes = [
            'cSharp',
            'jS',
            'ruby',
            'coffee'
        ];

        me.currentScore = [
            {
                key: 'coffee',
                goal: GOAL
            },
            {
                key: 'ruby',
                goal: GOAL
            },
            {
                key: 'cSharp',
                goal: GOAL
            },
            {
                key: 'jS',
                goal: GOAL
            }
        ];

        this.cells = this.currentScore.map((member, i) => ({
            text: this.game.add.text(750, 250 + 77 * i, this.currentScore[i].goal, {
                font: "Pangolin",
                fontSize: 50,
                fill: 'white',
                stroke: 'black',
                strokeThickness: 8,
            }),
            index: i,
            value: this.currentScore[i].key
        }));

        this.timerText = this.game.add.text(700, 155, '', {
            font: "Pangolin",
            fontSize: 50,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });

        //Keep track of the tiles the user is trying to swap (if any)
        me.activeTile1 = null;
        me.activeTile2 = null;

        //Controls whether the player can make a move or not
        me.canMove = false;

        //Grab the weigh and height of the tiles (assumes same size for all tiles)
        me.tileWidth = me.game.cache.getImage('cSharp').width;
        me.tileHeight = me.game.cache.getImage('cSharp').height;

        //This will hold all of the tile sprites
        me.tiles = me.game.add.group();

        //Initialise tile grid, this array will hold the positions of the tiles
        //Create whatever shape you'd like
        me.tileGrid = [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
        ];

        //Create a random data generator to use later
        var seed = Date.now();
        me.random = new Phaser.RandomDataGenerator([seed]);

        me.initTiles();
    }

    checkRate() {
        this.rate = MIN_POINTS;
        this.game.camera.fade(0x000000, 1500, true);
        this.game.nextState(this.rate);
    }

    checkTime() {
        function leadingZero(number) {
            return number >= 10 ? number.toString() : '0' + number;
        }

        this.time -= 1000;
        let minutes = Math.floor(this.time / (60 * 1000));
        let seconds = this.time / 1000 - minutes * 60;
        this.timerText.setText(`${leadingZero(minutes)}:${leadingZero(seconds)}`);
    }

    shutdown() {
        clearTimeout(this.goTimer);
        clearTimeout(this.timer);
    }

    initTiles() {
    
        var me = this;
        
        //Loop through each column in the grid
        for(var i = 0; i < me.tileGrid.length; i++){
            
            //Loop through each position in a specific column, starting from the top
            for(var j = 0; j < me.tileGrid[i].length; j++){
                
                //Add the tile to the game at this grid position
                var tile = me.addTile(i, j);

                //Keep a track of the tiles position in our tileGrid
                me.tileGrid[i][j] = tile;

            }
        }

        //Once the tiles are ready, check for any matches on the grid
        me.game.time.events.add(600, function(){
            me.checkMatch();
        });
    }

    addTile(x, y) {

        var me = this;

        //Choose a random tile to add
        var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)]; 
    
        //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
        var tile = me.tiles.create(OFFSET_HOR + x * (me.tileWidth + PADDING_HOR), 0, tileToAdd);

        //Animate the tile into the correct vertical position
        me.game.add.tween(tile).to({y:OFFSET_VER + y * (me.tileHeight + PADDING_VER)}, 500, Phaser.Easing.Linear.In, true);

        //Set the tiles anchor point to the center
        tile.anchor.setTo(0.5, 0.5);

        //Enable input on the tile
        tile.inputEnabled = true;

        //Keep track of the type of tile that was added
        tile.tileType = tileToAdd;

        //Trigger the tileDown function whenever the user clicks or taps on this tile
        tile.events.onInputDown.add(me.tileDown, me);

        return tile;
    }

    tileDown(tile) {
        var me = this;

        //Keep track of where the user originally clicked
        if(me.canMove){
            me.activeTile1 = tile;

            me.startPosX = (tile.x - OFFSET_HOR) / (me.tileWidth + PADDING_HOR);
            me.startPosY = (tile.y - OFFSET_VER) / (me.tileHeight + PADDING_VER);
        }
    }

    update() {
        var me = this;

        //The user is currently dragging from a tile, so let's see if they have dragged
        //over the top of an adjacent tile
        if(me.activeTile1 && !me.activeTile2){

            //Get the location of where the pointer is currently
            var hoverX = me.game.input.x;
            var hoverY = me.game.input.y;

            //Figure out what position on the grid that translates to
            var hoverPosX = Math.floor((hoverX/me.tileWidth) - (OFFSET_HOR/me.tileWidth));
            var hoverPosY = Math.floor((hoverY/me.tileHeight) - (OFFSET_VER/me.tileHeight));

            //See if the user had dragged over to another position on the grid
            var difX = (hoverPosX - me.startPosX);
            var difY = (hoverPosY - me.startPosY);

            //Make sure we are within the bounds of the grid
            if(!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)){

                //If the user has dragged an entire tiles width or height in the x or y direction
                //trigger a tile swap
                if((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY ==0)){

                    //Prevent the player from making more moves whilst checking is in progress
                    me.canMove = false;

                    //Set the second active tile (the one where the user dragged to)
                    me.activeTile2 = me.tileGrid[hoverPosX][hoverPosY];

                    //Swap the two active tiles
                    me.swapTiles();

                    //After the swap has occurred, check the grid for any matches
                    me.game.time.events.add(500, function(){
                        me.checkMatch();
                    });
                }

            }

        }
    }

    swapTiles() {

        var me = this;

        //If there are two active tiles, swap their positions
        if(me.activeTile1 && me.activeTile2){

            var tile1Pos = {x:(me.activeTile1.x - OFFSET_HOR) / (me.tileWidth + PADDING_HOR), y:(me.activeTile1.y - OFFSET_VER) / (me.tileHeight + PADDING_VER)};
            var tile2Pos = {x:(me.activeTile2.x - OFFSET_HOR) / (me.tileWidth + PADDING_HOR), y:(me.activeTile2.y - OFFSET_VER) / (me.tileHeight + PADDING_VER)};

            //Swap them in our "theoretical" grid
            me.tileGrid[tile1Pos.x][tile1Pos.y] = me.activeTile2;
            me.tileGrid[tile2Pos.x][tile2Pos.y] = me.activeTile1;

            //Actually move them on the screen
            me.game.add.tween(me.activeTile1).to({x:OFFSET_HOR + tile2Pos.x * (me.tileWidth + PADDING_HOR), y:OFFSET_VER + tile2Pos.y * (me.tileHeight + PADDING_VER)}, 200, Phaser.Easing.Linear.In, true);
            me.game.add.tween(me.activeTile2).to({x:OFFSET_HOR + tile1Pos.x * (me.tileWidth + PADDING_HOR), y:OFFSET_VER + tile1Pos.y * (me.tileHeight + PADDING_VER)}, 200, Phaser.Easing.Linear.In, true);

            me.activeTile1 = me.tileGrid[tile1Pos.x][tile1Pos.y];
            me.activeTile2 = me.tileGrid[tile2Pos.x][tile2Pos.y];

        }
    }

    checkMatch() {
        
        var me = this;

        //Call the getMatches function to check for spots where there is
        //a run of three or more tiles in a row
        var matches = me.getMatches(me.tileGrid);

        //If there are matches, remove them
        if(matches.length > 0) {

            if(matches.length > 1) {
                for(var i = 0; i < matches.length; i++) {
                    if(i < (matches.length - 1)) {
                        for(var j = 0; j < matches[i].length; j++) {
                            var index = matches[i+1].indexOf(matches[i][j]);
                            if(index !== -1) {
                                matches[i].splice(index, 1);
                            } 
                        }
                    }
                }
            }

            //Remove the tiles
            me.removeTileGroup(matches);

            //Move the tiles currently on the board into their new positions
            me.resetTile();

            //Fill the board with new tiles wherever there is an empty spot
            me.fillTile();

            //Trigger the tileUp event to reset the active tiles
            me.game.time.events.add(500, function(){
                me.tileUp();
            });

                //Check again to see if the repositioning of tiles caused any new matches
            me.game.time.events.add(600, function(){
                me.checkMatch();
            });
        }
        else {
            
            if(me.currentScore.every(score => score.goal === 0)) {
                me.rate = MAX_POINTS;
                this.game.camera.fade(0x000000, 1500, true);
                setTimeout(() => me.game.nextState(me.rate), 2000);
            }

            //No match so just swap the tiles back to their original position and reset
            me.swapTiles();
            me.game.time.events.add(500, function(){
                me.tileUp();
                me.canMove = true;
            });
        }
    }

    tileUp() {
        var me = this;
        me.activeTile1 = null;
        me.activeTile2 = null;
    }

    getMatches(tileGrid) {
        var matches = [];
        var groups = [];

        //Check for vertical matches
        for (var i = 0; i < tileGrid.length; i++)
        {
            var tempArr = tileGrid[i];
            groups = [];
            for (var j = 0; j < tempArr.length; j++)
            {
                if(j < tempArr.length - 2)
                    if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2])
                    {
                        if (tileGrid[i][j].tileType == tileGrid[i][j+1].tileType && tileGrid[i][j+1].tileType == tileGrid[i][j+2].tileType)
                        {
                            if (groups.length > 0)
                            {
                                if (groups.indexOf(tileGrid[i][j]) == -1)
                                {
                                    matches.push(groups);
                                    groups = [];
                                }
                            }

                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                groups.push(tileGrid[i][j]);
                            }
                            if (groups.indexOf(tileGrid[i][j+1]) == -1)
                            {
                                groups.push(tileGrid[i][j+1]);
                            }
                            if (groups.indexOf(tileGrid[i][j+2]) == -1)
                            {
                                groups.push(tileGrid[i][j+2]);
                            }
                        }
                    }
            }
            if(groups.length > 0) matches.push(groups);
        }

        //Check for horizontal matches
        for (j = 0; j < tileGrid[0].length; j++)
        {
            groups = [];
            for (i = 0; i < tileGrid.length; i++)
            {
                if(i < tileGrid.length - 2)
                    if (tileGrid[i][j] && tileGrid[i+1][j] && tileGrid[i+2][j])
                    {
                        if (tileGrid[i][j].tileType == tileGrid[i+1][j].tileType && tileGrid[i+1][j].tileType == tileGrid[i+2][j].tileType)
                        {
                            if (groups.length > 0)
                            {
                                if (groups.indexOf(tileGrid[i][j]) == -1)
                                {
                                    matches.push(groups);
                                    groups = [];
                                }
                            }

                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                groups.push(tileGrid[i][j]);
                            }
                            if (groups.indexOf(tileGrid[i+1][j]) == -1)
                            {
                                groups.push(tileGrid[i+1][j]);
                            }
                            if (groups.indexOf(tileGrid[i+2][j]) == -1)
                            {
                                groups.push(tileGrid[i+2][j]);
                            }
                        }
                    }
            }
            if(groups.length > 0) matches.push(groups);
        }

        return matches;
    }

    removeTileGroup() {
        var me = this;

        //Loop through all the matches and remove the associated tiles
        for(var i = 0; i < matches.length; i++){
            var tempArr = matches[i];

            for(var j = 0; j < tempArr.length; j++){

                var tile = tempArr[j];
                //Find where this tile lives in the theoretical grid
                var tilePos = me.getTilePos(me.tileGrid, tile);

                //Remove the tile from the screen
                me.tiles.remove(tile);

                //Remove the tile from the theoretical grid
                if(tilePos.x != -1 && tilePos.y != -1){
                    me.tileGrid[tilePos.x][tilePos.y] = null;
                }

            }
        }
    }

    getTilePos(tileGrid, tile) {
        var pos = {x:-1, y:-1};

        //Find the position of a specific tile in the grid
        for(var i = 0; i < tileGrid.length ; i++)
        {
            for(var j = 0; j < tileGrid[i].length; j++)
            {
                //There is a match at this position so return the grid coords
                if(tile == tileGrid[i][j])
                {
                    pos.x = i;
                    pos.y = j;
                    break;
                }
            }
        }

        return pos;
    }

    resetTile() {
        var me = this;

        //Loop through each column starting from the left
        for (var i = 0; i < me.tileGrid.length; i++)
        {

            //Loop through each tile in column from bottom to top
            for (var j = me.tileGrid[i].length - 1; j > 0; j--)
            {

                //If this space is blank, but the one above it is not, move the one above down
                if(me.tileGrid[i][j] == null && me.tileGrid[i][j-1] != null)
                {
                    //Move the tile above down one
                    var tempTile = me.tileGrid[i][j-1];
                    me.tileGrid[i][j] = tempTile;
                    me.tileGrid[i][j-1] = null;

                    me.game.add.tween(tempTile).to({y:OFFSET_VER + j * (me.tileHeight + PADDING_VER)}, 200, Phaser.Easing.Linear.In, true);

                    //The positions have changed so start this process again from the bottom
                    //NOTE: This is not set to me.tileGrid[i].length - 1 because it will immediately be decremented as
                    //we are at the end of the loop.
                    j = me.tileGrid[i].length;
                }
            }
        }
    }

    fillTile() {
    
        var me = this;

        //Check for blank spaces in the grid and add new tiles at that position
        for(var i = 0; i < me.tileGrid.length; i++){

            for(var j = 0; j < me.tileGrid.length; j++){

                if (me.tileGrid[i][j] == null)
                {
                    //Found a blank spot so lets add animate a tile there
                    var tile = me.addTile(i, j);

                    //And also update our "theoretical" grid
                    me.tileGrid[i][j] = tile;
                }

            }
        }
    }

    removeTileGroup(matches) {
        var me = this;
        var currentCount = {};

        //Loop through all the matches and remove the associated tiles
        for(var i = 0; i < matches.length; i++){
            var tempArr = matches[i];

            for(var j = 0; j < tempArr.length; j++){

                var tile = tempArr[j];
                //Find where this tile lives in the theoretical grid
                var tilePos = me.getTilePos(me.tileGrid, tile);

                //Remove the tile from the screen
                me.tiles.remove(tile);
                if(me.tiles.children.find(x => x.key === tile.key)) {
                    currentCount = me.currentScore.find(x => x.key === tile.key);
                    if(currentCount.goal > 0) currentCount.goal--;
                }
                
                var currentCell = me.cells.find(x => x.value === currentCount.key)
                currentCell.text.setText(currentCount.goal);

                //Remove the tile from the theoretical grid
                if(tilePos.x != -1 && tilePos.y != -1){
                    me.tileGrid[tilePos.x][tilePos.y] = null;
                }

            }
        }
    }

    next() {
        this._gen.next();
    }
}