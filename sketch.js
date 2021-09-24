var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bunny, fox, carrot ;

var bgImg, carrotImg, bunnyImg, foxImg; 

var platform

var CarrotsCollected =0;


function preload(){
  bgImg = loadImage("background.png")
  gameoverImg = loadImage("Game_Over.png")
  bunnyImg = loadImage("bunny.png")
  carrotImg = loadImage("carrot.png")
  foxImg = loadImage("fox.png")
}

function setup() {
  createCanvas(1000,500);

  bunny = createSprite(100,312,10,10)
  bunny.addImage(bunnyImg)
  bunny.scale = 0.25

  platform = createSprite(150,450,200,10)
  platform.visible = false

  gameOver = createSprite(500, 250, 10, 10)
  gameOver.addImage(gameoverImg)
  gameOver.scale = 0.3
  gameOver.visible = false

  carrotGroup = new Group()
  foxGroup = new Group()

}

function draw() {
  background(bgImg);

    if(gameState === PLAY){
  
    if (keyDown("space")){
    bunny.velocityY = -10
    }
    bunny.velocityY = bunny.velocityY + 0.8

    if (carrotGroup.isTouching(bunny)){
      CarrotsCollected += 1
      carrotGroup.destroyEach()
    }

    if (foxGroup.isTouching(bunny)){
       gameState = END
    }

    gameOver.visible= false

    spawnCarrots();
    spawnFox();

  }

  if(gameState === END){
    foxGroup.destroyEach();
    carrotGroup.destroyEach()
    gameOver.visible = true
 }
 
 bunny.collide(platform);
 
  drawSprites();

  textSize(30)
  fill("blue")
  text("CarrotsCollected: "+ CarrotsCollected, 120,60);
}

function spawnCarrots(){
  if (frameCount % 120 === 0){

    var carrots = createSprite(600,350,10,40);
    carrots.velocityX = -5;
    
    //generate random carrots
    carrots.y = Math.round(random(100,170));
    carrots.addImage(carrotImg)
    carrots.scale = 0.05
    carrotGroup.add(carrots)
  }
}

function spawnFox(){
  if (frameCount % Math.round(random(200,800)) === 0){

    var fox = createSprite(600,355,10,40);
    fox.velocityX = -2;
    
    //generate random fox
    fox.x = Math.round(random(700,750));
    fox.addImage(foxImg)
    fox.scale = 0.3
    foxGroup.add(fox)
  }
}