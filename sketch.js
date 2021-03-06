var PLAY 
var END
var gameState

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ObstaclesGroup,CloudsGroup,CloudImage,Obstacle1,Obstacle2,
  Obstacle3,Obstacle4,Obstacle5,Obstacle6;

var score

var gameOver,gameOverImage,restart,restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  CloudImage = loadImage("cloud.png");
  
  Obstacle1 = loadImage("obstacle1.png");
  
  Obstacle2 = loadImage("obstacle2.png");                
  Obstacle3 = loadImage("obstacle3.png");  
  
  Obstacle4 = loadImage("obstacle4.png");
  
  Obstacle5 = loadImage("obstacle5.png"); 
  
  Obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,70,50,20);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible = false;
  restart = createSprite(300,100,30,20);
  restart.addImage("restart",restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  score = 0;
}

function draw() {
  background(160);
  
 
   text("Score: "+ score, 450, 75);

  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    //if (count>0 && count%100 === 0){
      //playSound("checkPoint.mp3");
    //}
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 160){
      trex.velocityY = -12 ;
     // playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
     //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}


function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(Obstacle1);
        break;
         case 2:obstacle.addImage(Obstacle2);
        break;
         case 3:obstacle.addImage(Obstacle3);
        break;
         case 4:obstacle.addImage(Obstacle4);
        break;
         case 5:obstacle.addImage(Obstacle5);
        break;
         case 6:obstacle.addImage(Obstacle6);
        break;
        default:break;
      }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(CloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
}
