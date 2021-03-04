var PLAY=0
var END=1

gameState=PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage

var obstacleGroup,bananaGroup;

var score=0

var background1,backgroundimg


var ground;

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundimg=loadImage("background.png")
}



function setup() {
 createCanvas(500,500);
  
background1=createSprite(500,350,500,500);
background1.addImage("background",backgroundimg) 
  
  monkey=createSprite(40,427,20,20) 
  monkey.addAnimation("monkey1",monkey_running)
  monkey.scale=0.13

 
  
  ground=createSprite(300 ,470,1100,15)
  ground.velocityX=-6
  ground.x = ground.width/2;
  
  bananaGroup=new Group()
  obstacleGroup=new Group()
}


function draw() {
background(220)
  console.log(gameState)
  monkey.collide(ground);
  
  drawSprites();
  spawnObstacles();
  spawnbananas();
  
 text("score:"+ score,50,50)
  ground.visible=false
  
  monkey.debug=true
  
if(gameState === PLAY){
    
if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -16;
}
  monkey.velocityY=monkey.velocityY+0.8
  
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  monkey.scale=monkey.scale+0.0025
    score=score+2
 }
  
if (ground.x < 0){
ground.x = ground.width/2;
    }
    

  
  if(obstacleGroup.isTouching(monkey)) {
    
    gameState= END
    
  }

}
  
else if (gameState === END) {
  text("GAME OVER",250,250)
obstacleGroup.setVelocityXEach(0)
bananaGroup.setVelocityXEach(0)  
  
 obstacleGroup.setLifetimeEach(-1) 
 bananaGroup.setLifetimeEach(-1)
  
  monkey.velocityY=0
ground.velocityX=0

camera.position.x=monkey.position.x;
camera.position.y=monkey.position.y;
}
}
function spawnObstacles(){
 if (frameCount % 80 === 0){
    obstacle = createSprite(500,433,10,40);
  obstacle.addImage("obs",obstacleImage)
   obstacle.scale=0.17;
   obstacle.velocityX=-6
 obstacle.lifetime=83.3
 obstacleGroup.add(obstacle);
 }
}
function spawnbananas(){
 if (frameCount % 80=== 0){
   banana = createSprite(500,200,10,40);
  banana.addImage("bananaa",bananaImage)
   banana.scale=0.1;
   banana.velocityX=-6
 banana.lifetime=83.3
   bananaGroup.add(banana)
 
 }
}




