var PLAY = 0;
var END = 1;
var gamestate = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var jungle,jungleImage;
var invisibleGround;
var survivalTime;
var restart,restartImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage = loadImage("jungle.png");
  
  restartImage = loadImage("restart.png");
 
}



function setup() {
  createCanvas(600,400);
  
  jungle = createSprite(600,200,10,10);
  jungle.addImage(jungleImage);
  jungle.x = jungle.width/2;
  
  monkey = createSprite(50,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.13;
  
  score = 0;
  survivalTime = 0;
  
  invisibleGround = createSprite(300,330,600,1);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  restart = createSprite(300,200,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  
}


function draw() {
  background("white");
  
  if(gamestate == PLAY){
    
    jungle.velocityX = -(10 + 2*frameCount/200);
   if(jungle.x < 0){
     jungle.x = jungle.width/2;
   }
  
  spawnObstacles();
  spawnBananas();
  
  if(keyDown("space")&&monkey.y>=280 ){
    monkey.velocityY = -18;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  invisibleGround.visible = false;
    
  restart.visible = false;
  
  
  if(monkey.isTouching(bananaGroup)){
    score = score + 1;
    bananaGroup.destroyEach();
  }
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  obstacleGroup.setVelocityXEach(jungle.velocityX);
  
    
  if(monkey.isTouching(obstacleGroup)){
    
    gamestate = END;
    
   }
  }
    else if(gamestate == END){
      
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      
      monkey.velocityX = 0;
      monkey.velocityY = 0;
      
      jungle.velocityX = 0;
      
      restart.visible = true;
      
      jungle.velocityX = 0;
      
      
      if(mousePressedOver(restart)){
        gamestate = PLAY;
        obstacleGroup.destroyEach();
        bananaGroup.destroyEach();
        score = 0;
        survivalTime = 0;
      }
      
    }
  
  //obstacleGroup.debug = true
  
  obstacleGroup.setColliderEach("circle",50,30)
  
  monkey.setCollider("circle",10,10);
  //monkey.debug = true
  monkey.collide(invisibleGround);
  
  
  drawSprites();
  
  fill("khaki");
  textFont("cambria");
  textSize(15);
  text("Score : " + score,320,20);
  fill("khaki");
  textFont("cambria");
  textSize(15);
  text("Survival Time : " + survivalTime,180,20);
  
}

function spawnObstacles(){
  if(frameCount%200 == 0){
    var obstacles = createSprite(600,290,10,10);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.3;
    obstacles.velocityX = -(10 + 2*frameCount/200);
    obstacles.lifetime = -1;  
    obstacleGroup.add(obstacles);
  }
  
}

function spawnBananas(){
  if(frameCount%80 == 0){
    var banana = createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage)
    banana.scale = 0.13;
    banana.velocityX = -(10 + 2*frameCount/200);
    banana.lifetime = -1;
    bananaGroup.add(banana)
  }
  
}



