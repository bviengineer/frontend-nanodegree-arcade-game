//My Character
class Contender {
    constructor(){
        this.acrossX = 101; //player incremental position as they traverse along the x-axis
        this.levelY = 83; //player incremental position as they traverse along the y-axis
        
        this.startPositionX = this.acrossX * 2; //player's calculated starting position along x-axis
        this.startPositionY = this.levelY * 5; //player calculated starting position along y-axis

        this.x = this.startPositionX; //player start position on the x-axis passedd into the canvas
        this.y = this.startPositionY; //player start position on the y-axis passed into the canvas

        this.topBoundary = this.y - this.y;
        this.rightBoundary = this.x * 2;
        this.leftBoundary = this.x - this.x;
        this.bottomBoundary = this.y;
        
        this.sprite = "images/char-boy.png";
    }
    //display of sprite image on game board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
    //controls sprite movement along game board
    handleInput(input){
    if(input === "left" && this.x > this.leftBoundary){
            this.x -= this.acrossX;
        } else if(input === "up" && this.y > this.topBoundary){
            this.y -= this.levelY;  
        } else if(input === "right" && this.x < this.rightBoundary){ 
            this.x += this.acrossX;
        } else if(input === "down" && this.y < this.bottomBoundary){
            this.y += this.levelY;
        } 
    }
    //update of enemy positions in relation to sprite 
    upate(){
        for(let i = 0; i < allEnemies.length; i++){
            console.log(i);
            if(this.y === enemy.drawImage){
                console.log("same row")
            }
            console.log(this.y, enemy.y);
        }
    }
}

//Enemies player must avoid
class Enemy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = "images/enemy-bug.png"
        this.acrossX = 101;
        this.boundary = this.acrossX * 6;
        this.restartPosition = this.acrossX - (this.acrossX * 5)
    }
    //update enemy locations
    update(dt){
        if(this.x < this.boundary){
            this.x += 210 * dt; //places the enemy off the screen
        } else {
            this.x = this.restartPosition; //places the enemy back at the beginning of the x-axis after crossing the boundary
        }
    }
    //draw the enemy on the screen, required method for game
    render(){
        Enemy.prototype.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
    }
}

const player = new Contender();
const enemy1 = new Enemy(-101, 0);
const enemy2 = new Enemy(-300, 83);
const enemy3 = new Enemy((-200*2.5), 150);
const enemy4 = new Enemy((-200*4), 200);
const allEnemies = [];  
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

//=======================================================================

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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

// Properties that both the Player and Enemy share
