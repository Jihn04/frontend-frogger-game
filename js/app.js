"use strict";

var UNIT_X = 101;
var UNIT_Y = 83;
var MIN_X = 0;
var MAX_X = 404;
var MIN_Y = 0;
var MAX_Y = 415;
var OFFSET = 22;
var PLAYER_START_X = UNIT_X * 2;
var PLAYER_START_Y = UNIT_Y * 5 - OFFSET;
var COLLISION = 30;
var NUM_ENEMIES = 5;


var player;
var allEnemies;

class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = MIN_X - Math.floor((Math.random() * 5) + 1) * UNIT_X;
        this.y = Math.floor((Math.random() * 3) + 1) * UNIT_Y - OFFSET;
        this.speed = Math.floor((Math.random() * 100) + 100);
    }

    update(dt) {
        if (this.x < MAX_X + UNIT_X) {
            this.x = this.x + (this.speed * dt);
        } else {
            this.x = MIN_X - Math.floor((Math.random() * 5) + 1) * UNIT_X;
            this.y = Math.floor((Math.random() * 3) + 1) * UNIT_Y - OFFSET;
        }
        if (this.x > player.x - COLLISION && this.x < player.x + COLLISION && this.y === player.y) {
            player.reset();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
    }

    update(dt) {
        // To be updated..
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        switch(key) {
            case "left":
                if (this.x > MIN_X)
                    this.x = this.x - UNIT_X;
                break;
            case "up":
                if (this.y > MIN_Y)
                    this.y = this.y - UNIT_Y;
                break;
            case "right":
                if (this.x < MAX_X)
                    this.x = this.x + UNIT_X;
                break;
            case "down":
                if (this.y < MAX_Y - OFFSET)
                    this.y = this.y + UNIT_Y;
                break;
            default:
                console.log("Invalid key!");
        }
        //console.log(this.x, this.y);
        if (this.y <= 0) {
            this.reset();
        }
    }

    reset() {
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
    }
}

function spawnPlayer() {
    player = new Player();
}

function spawnEnemy() {
    allEnemies = [];
    for (var i=0; i < NUM_ENEMIES; i++) {
        allEnemies.push(new Enemy());
    }
};

spawnPlayer();
spawnEnemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});