var PLAY,END,ground,monkey_img,survivalTime,gameState,
bananagroup,stonesgroup,monkey,ground_img,stone_img,banana_img, monkey_running;


function preload (){
  //monkey_img=loadImage("Monkey_01.png");
 ground_img=loadImage("ground.jpg");
  stone_img=loadImage("stone.png");
  banana_img=loadImage("Banana.png");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}
function setup () {
   PLAY=0;
 END=1;
 gameState=PLAY;
  
ground = createSprite(200, 350, 800, 15);
 monkey = createSprite(100, 285);
  //ground.addImage(ground_img);
  //monkey.addImage(monkey_img);
  monkey.addAnimation("running",monkey_running);
  
 survivalTime = 0;
ground.x=ground.width/2; 
monkey.scale=0.2;
ground.velocityX=-5;
  
  stonesgroup = createGroup();
 bananagroup = createGroup();

}




function draw() {
  background("white");
 
  if (gameState==PLAY) {
    if (ground.x<0) {
      ground.x=ground.width/2;
    }
    //jump when the space key is pressed
    if(keyDown("space")){
      monkey.velocityY = -12 ;
     
    }
     
  survivalTime=Math.ceil(World.frameCount/World.frameRate);
  
   monkey.velocityY=monkey.velocityY+0.5;
   monkey.collide(ground);
   if (monkey.isTouching(bananagroup)) {
    bananagroup.destroyEach(); 
     survivalTime=survivalTime+2;
   }

   
    if (stonesgroup.isTouching(monkey)) {
     gameState=END;
      monkey.scale=0;
   } 
 spawnStones();
  spawnBanana();  
  
   
  }
  if (gameState==END){
    stonesgroup.setVelocityXEach(0);
    stonesgroup.setLifetimeEach(-1);
    bananagroup.setVelocityEach(0);
    ground.velocityX=0;
    monkey.pause();
    
 }
  stroke("black");
  textSize(20);
  fill("black");
   text("survivalTime:"+survivalTime, 100, 50);
     
     monkey.collide(ground);
    
  switch(survivalTime){
    case 10: monkey.scale=0.12;
     break;
    case 20: monkey.scale=0.14;
     break;
    case 30: monkey.scale=0.16;
     break;
     case 40: monkey.scale=0.18;
     break;
   default: break;
  }
  
  
     
  drawSprites();
}
function spawnStones() {
  if(World.frameCount % 300 === 0) {
    var stone = createSprite(400,310,30,40);
    stone.velocityX = -5;
    
    //generate stones
    
    stone.addImage(stone_img);
    
    //assign scale and lifetime to stone.imgthe stone           
   stone.scale=0.2;
    stone.lifetime = 85;
    //add each obstacle to the group
    stonesgroup.add(stone);
  }
}



function spawnBanana() {
  //write code here to spawn the banana
  if (World.frameCount % 100 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.addImage(banana_img);
    banana.velocityX = -10;
    banana.scale=0.1; 
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    //banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananagroup.add(banana);
  }
  
}





