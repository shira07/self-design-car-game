var canvas;
var car, carImg;
var policeCar, policeCarImg;
var backgroundCar, backgroundCar,obstaclesGroup;
var coin, coinImg,coinsGroup;
var trackImg;
var gameState="serve";
var score=0;
var lives=3;



function preload(){
carImg = loadImage("assets/car.png");
policeCarImg = loadImage("assets/police car.png");
backgroundCarImg = loadImage("assets/background cars.png");
coinImg = loadImage("assets/coin.png");
trackImg = loadImage("assets/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  car = createSprite(width / 2 - 50, height - 100,20,20);
  car.addImage(carImg);
  car.scale = 0.7;
  //car.debug=true;

  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
}


function draw(){
  //set background color 
  background("brown");
  image(trackImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
  textSize(30);
stroke("black");
fill("black");
  text("Life: " + lives,car.x -300,car.y -500 );
  text("Score: "+score,car.x +300,car.y -500 );


  console.log("gameState: "+gameState);
  camera.position.x = displayWidth/2;
  camera.position.y = car.y;

if(gameState==="serve"){
textSize(50);
stroke("red");
fill("red");
text("Press the space key to start!",width / 2 - 350, height - 350 );

if(keyDown("space")){
  gameState="play";
  console.log("space key is pressed")
  }
}

else if(gameState==="play"){
  car.velocityY= -3-(3*frameCount/100);

  if(keyDown("left")){
    car.x = car.x - 0.03*frameCount;
    }
    
  if(keyDown("right")){
    car.x = car.x +0.03*frameCount;
    }
    spawnCoins();
    spawnobstacles();

if(obstaclesGroup.isTouching(car)){
gameState="end";
}

}

else if(gameState==="end"){
textSize(50);
stroke("red");
fill("red");
text("Game over!",car.x -100, car.y - 250 );

obstaclesGroup.destroyEach();
car.velocityY=0;
}

  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function spawnobstacles(){
if(frameCount%60==0){
  backgroundCar = createSprite(100, 0,20,20);
  backgroundCar.x=Math.round(random(displayWidth/2 -300,displayWidth/2 +300 ));
  backgroundCar.y=car.y-500;
  backgroundCar.velocityY=5+(3*frameCount/100);
  backgroundCar.addImage(backgroundCarImg);
  backgroundCar.scale = 0.2;
  //backgroundCar.debug=true;
  backgroundCar.setCollider("circle",0,0,150);

  obstaclesGroup.add(backgroundCar);
}
}

function spawnCoins(){
  if(frameCount%60==0){
    coin = createSprite(100, 0,20,20);
    coin.x=Math.round(random(displayWidth/2 -300,displayWidth/2 +300 ));
    coin.y=car.y-500;
    coin.addImage(coinImg);
    coin.scale = 0.2;
    //backgroundCar.debug=true;
    coin.setCollider("circle",0,0,150);
  
    coinsGroup.add(coin);
}
}


