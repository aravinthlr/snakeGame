// Draw Cell
const drawCell = function(x, y,food) {
    context.fillStyle = 'rgb(170, 170, 170)';
    context.beginPath();
    context.arc((x * 10 + 6), (y * 10 + 6), 4, 0, 2*Math.PI, false);    
    context.fillStyle = food?"red":"green";
    context.fill();
  };

  const genrateRandomXY = () => {
    const x = Math.floor((Math.random() * canvasWidth/10));
    const y = Math.floor((Math.random() * canvasHeight/10));
    return {x,y}
}

const Keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
let pressKey = 'right';
  document.onkeydown = function(event) {
    pressKey = event.which;
    pressKey = Keymap[pressKey];
  };

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
console.log('context: ', context);
const canvasWidth = context.canvas.clientWidth;
const canvasHeight = context.canvas.clientHeight;
const createBoard = () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
createBoard();

// Check Collision with walls
const collision = function(nx, ny) {  
    console.log(nx)
    if(nx == canvasWidth/10 || ny == canvasHeight/10){
        createBoard();
        initSnake();
        generateFood();   
    }
}

const snake = {};
const snakeSize = 4;
let snakePos = [];
const initSnake = () => {
    snakePos = [];
    for(let i=0;i<snakeSize;i++) {
        snakePos.push({x:i,y:0})
        
    }
    snakePos.forEach(({x,y}) => drawCell(x,y));
}




  

  initSnake();

  //create food
  let foodX,foodY;
const generateFood = (fX,fY) => {
    console.log(fX,fY);
    if(!isNaN(fX) && !isNaN(fY)) {
        foodX = fX;
        foodY = fY;
        return drawCell(fX,fY,"food")
    }else {
        let {x:fX,y:fY} = genrateRandomXY();
        foodX = fX;
        foodY = fY;
        while(snakePos.find(({x,y}) => x==foodX && y==foodY)){
            const obj = genrateRandomXY();
            foodX = obj.x;
            foodY = obj.y;
        }
        drawCell(foodX,foodY,"food")
    }
   
}

generateFood();

  const drawSnake = (direction=pressKey) => {
    let {x:nx,y:ny} = snakePos[snakePos.length -1];
    console.log('snakePos: ', snakePos);
    switch(direction) {
        case "right":
        nx++;
        break;
        case 'left':
        nx--;
        break;
      case 'up':
        ny--;
        break;
      case 'down':
        ny++;
        break;
    }
    if (nx == foodX && ny == foodY) {
        var tail = {x: nx, y: ny};
        foodX = undefined;
        foodY = undefined;
        snakePos.push({x:nx,y:ny})
      }else {

        snakePos.shift();
        snakePos.push({x:nx,y:ny})
      }

     // Draw White Stage
		context.fillStyle = "white";
		context.fillRect(0, 0, canvasWidth, canvasHeight);
        snakePos.forEach(({x,y}) => drawCell(x,y));
        generateFood(foodX,foodY)
        collision(nx,ny)
        

  }
console.log("snakePos",snakePos);



console.log('foodXY: ', foodX,foodY);




setInterval(drawSnake, 100);