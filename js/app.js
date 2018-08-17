//variable(s)
let score = document.getElementById("score"),
    gameModal = document.getElementById("modal"),
    modalContent = document.getElementById("modal-content"),
    closeModalBtn = document.getElementById("close-modal");

//class construcor for character or player 
class Contender {
    constructor(){
        this.acrossX = 101; //player's incremental steps as they traverse across the game board
        this.levelY = 83; //player's incremental steps they traverse up and down the game board
        
        this.startPositionX = this.acrossX * 2; //202 - player's calculated starting position on x-axis
        this.startPositionY = (this.levelY * 4) + 60; //392 - player's calculated starting position on y-axis

        this.x = this.startPositionX; //player's starting position on the x-axis passed to the canvas
        this.y = this.startPositionY; //player's starting position on the y-axis passed to the canvas

        //player boundaries on game board 
        this.topBoundary = this.y - this.y;
        this.rightBoundary = this.x * 2;
        this.leftBoundary = this.x - this.x;
        this.bottomBoundary = this.y;

        //collision zone
        this.upperCollisionLimit = 50;
        this.lowerCollisionLimit = 20;
        this.width = 50;
        this.height = 75;

        //character or sprite image 
        this.sprite = "images/char-cat-girl.png";

        //player points/wins
        this.points = 0;
    }
    //display of player on the game board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
    //sets boundaries for the player to remain within on the game board
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
    //checks for a collision between contender & any one enemy 
   collisionDetection(){        
        for(let i = 0; i < allEnemies.length; i++){
            /*
                This if statement is checking to determine if there is a collision, in the following order:
                1. That the Y position of the player and enemy are the same
                2. That the enemy is within the player game board boundary on the X axis(defined above)
                3. That difference between the X position of the player and the X position of the enemy are within a specified boundary range 
            */
            //collision detection concept borrowed from here: (https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
            if(allEnemies[i].y === this.y || (allEnemies[i].y === 140 && this.y === 143) || (allEnemies[i].y === 230 && this.y === 226) && allEnemies[i].x < (this.x + this.width) && (allEnemies[i].x + allEnemies[i].width) > this.x && allEnemies[i].y < (this.y + this.height) && (allEnemies[i].y + allEnemies[i].height) > this.height){
                console.log("collision"); //for testing
                this.restartGame(); 
            }
            // console.log(this.x, this.y, Math.round(allEnemies[i].x), allEnemies[i].y);
        }
    }
    //resets player position in the event of a collision
    restartGame(){
        this.x = this.startPositionX;
        this.y = this.startPositionY; 
        this.points = 0;
        score.innerHTML = "Score Board"; 
    }
    winGame(){
        if(this.y <= this.topBoundary){
            this.points = 100;
            score.innerHTML = "Your Score is: " + this.points;
            modal();
        }           
    }
}

//creates a player
const player = new Contender();

function modal(){
    modalContent.innerHTML = "<p>Great Job!<br> You bypassed all enemies<br> Your Score is: " + player.points + "</p>";
    gameModal.style.display = "inline";
}

//Event listener for button on modal
closeModalBtn.addEventListener("click", function(){
    player.restartGame();
    gameModal.style.display = "none";                
});

//class constructor for the enemy bugs 
class Enemy{
    constructor(x, y, rate){
        this.x = x - 10;
        this.y = y;
        this.rate = rate; //enemy's speed 
        this.sprite = "images/enemy-bug.png"
        this.acrossX = 101;
        this.boundary = this.acrossX * 5;
        this.restartPosition = this.acrossX - (this.acrossX * 2);

        //collision zone
        this.width = 75;
        this.height = 50;
    }
    //update enemy locations
    update(dt){
        if(this.x < this.boundary){
            this.x += this.rate * dt; //places the enemy off the screen
        } else {
            this.x = this.restartPosition; //places the enemy back at the beginning of the x-axis after crossing the boundary
        }
    }
    //draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
 
//creates enemy bugs
const enemyBug1 = new Enemy(0, 60, 100);
const enemyBug2 = new Enemy(0, 140, 400);
const enemyBug3 = new Enemy(0, 230, 600);
// const enemyBug4 = new Enemy((-200*4), 249, 700);
// const enemyBug5 = new Enemy((-200), 249, 800);
// const enemyBug6 = new Enemy((-200), 265, 900);
// const enemyBug7 = new Enemy((-200), 90, 875);
// const enemyBug8 = new Enemy((-120), 10, 975);
// const enemyBug9 = new Enemy((-220), 90, 675);
// const enemyBug10 = new Enemy((-200), 100, 550);

//well, with the enemyBugs variable declared at the top of the code, it erros out as undefined hmmm....so here it is...
const allEnemies = []; 
allEnemies.push(enemyBug1, enemyBug2, enemyBug3);

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