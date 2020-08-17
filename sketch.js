var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,reset,gameOverImg,restartImage;



var trex ,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var cloudsGroup, cloudImage;
var  obstaclesGroup,obstacle1,obstacle2;

var score;
function  preload () {
  
  bg=loadImage("Bg.png");
  Cloudimage=loadImage("Cloud1.png");
  
  Trex_collided=loadImage("Trex_collided.png");
  
  obstacle1 = loadImage("Obstacle1.png");
  obstacle2 = loadImage("Obstacle2.png");
  
   gameOverImg=loadImage("Gameover.png");
  restartImg=loadImage("Reset.png");
  
    trex_running=loadAnimation("Trex1.png","Trex2.png","Trex2.png","Trex1.png");
 

  groundImage=loadImage("ground2.png");
}

function setup() {
  createCanvas(400, 400);
  Bg=createSprite(200,200);
  Bg.addImage("Bg",bg); 
  
 
  
  
  trex=createSprite(50,365,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.2;  
  trex.setCollider("circle",5,5,130);
  
  //ground  
   ground=createSprite(200,380,400,20);
   ground.addImage("ground",groundImage);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(200,370,400,10);
  invisibleGround.visible=false;
  
  
  gameOver=createSprite(200,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart=createSprite(200,280);
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;
  
    CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  score=0;
}

function draw() {
  background(220);
  
  text("Score: "+ score, 500,50);
    if(gameState==PLAY) {
  
    score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y >= 330) {
    trex.velocityY = -14;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnClouds();
  spawnObstacles();
    if(trex.isTouching(ObstaclesGroup)) {
    
    gameState=END;
    
    }
  }
    if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
      
  
  CloudsGroup.setVisibleEach(false);
    
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
    reset();
   }
  }
  
  
  
  
  
  
 
  trex.collide(invisibleGround);
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 80 === 0) {
      var obstacle = createSprite(600,380,40,10);
    obstacle.y = Math.round(random(359,359  ));
    obstacle.addImage(obstacle2);
    obstacle.velocityX = -4;
    
    
    
     
  //scale and lifetime
    obstacle.scale=0.35 ;
    obstacle.lifetime=180;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var Cloud = createSprite(600,120,40,10);
    Cloud.y = Math.round(random(200,200));
    Cloud.addImage(Cloudimage);
    Cloud.scale = 1;
    Cloud.velocityX = -3;
    
     //assign lifetime to the variable
    Cloud.lifetime = 200;
    
    //adjust the depth
    Cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(Cloud);
  }
   
}


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
 CloudsGroup.setVisibleEach(true);
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

