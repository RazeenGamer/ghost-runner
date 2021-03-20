var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}
function setup()
{
  createCanvas(600,600)
  tower = createSprite (300,300);
  tower.addImage(towerImg);
  ghost= createSprite (200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  climbersGroup=new Group() 
  doorsGroup=new Group() 
  invisibleBlockGroup=new Group() 
}
function draw()
{
  background("white");
  
  if (gameState==="play"){
    score=score+Math.round(getFrameRate()/60)
  if (tower.y>600){
    tower.y=300;
  }
  
  tower.velocityY=3;
  if (keyDown("space")){
    ghost.velocityY=-8
  }
  if (keyDown("left")){
    ghost.x=ghost.x-3;
  }
  if (keyDown("right")){
    ghost.x=ghost.x+3;
  
  }
  
  ghost.velocityY=ghost.velocityY+0.3
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy() 
      gameState="end";
    }
  }
  spawn();
  drawSprites();
    stroke("red")
    textSize(25)
    text("score:"+score,270,100);
  }
  if (gameState==="end"){
    background("black")
    stroke("yellow")
    textSize(40)
    text("game over",200,200);
  }
}
function spawn(){
  if (frameCount%200===0){
    console.log (frameCount);
  
  door= createSprite (300,10,10,40)
  door.addImage(doorImg)
  door.velocityY=1;
    climber= createSprite (300,60,10,30)
    climber.addImage(climberImg)
    climber.velocityY=1;
    door.x=Math.round(random(150,240));
    climber.x=door.x;
    door.lifetime=300;
    climber.lifetime=300;
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    climbersGroup.add(climber)
    doorsGroup.add(door)
    invisibleBlock= createSprite (300,80)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2;
    invisibleBlock.x=door.x
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.velocityY=1
    invisibleBlock.visible=false
  
    
  }

}