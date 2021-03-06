// Superclass for our characteres
var Character = function () {
    this.width = 50;
    this.height = 50;
    this.sprite = '';
    this.x = 0;
    this.y = 0;
};

// Draw the characteres on the screen, required method for game
Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this);
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.speed = speed;
};

// Inherits from Character
Enemy.prototype = new Character();

// Fixes the constructor pointer
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    Character.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
    this.score = 0;
};

// Inherits from Character
Player.prototype = new Character();

// Fixes the constructor pointer
Player.prototype.constructor = Player;

// Updates the score
Player.prototype.update = function () {
    document.getElementById('score').innerHTML = 'Score: ' + this.score;
};

// Receives the command e move the player
Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'up':
            if (this.y > 50) {
                this.y -= 85;
            } else {
                this.score += 10;
                this.x = 200;
                this.y = 390;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'down':
            if (this.y < 390) {
                this.y += 85;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Spawns enemies from time to time.
function spawnEnemies() {
    var positions = [50, 135, 220];

    setInterval(function () {
        allEnemies.push(new Enemy(positions[Math.floor(Math.random() * 3)], Math.floor(Math.random() * 201) + 100));
    }, Math.floor(Math.random() * 501) + 500);
}

spawnEnemies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});