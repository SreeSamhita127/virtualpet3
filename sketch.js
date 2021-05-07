//Create variables here
var dog
var happydog
var database
var foods = 0;
var foodstock
var FoodMilk
var lastFed
var fedTime
var injection

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
  lazydog = loadImage("virtual pet images/lazy.png");
  vaccination = loadImage("virtual pet images/Vaccination.jpg");
  bedroom = loadImage("virtual pet images/Bed Room.png");
  foodstock = loadImage("virtual pet images/Food Stock.png");
  garden = loadImage("virtual pet images/Garden.png");
  livingroom = loadImage("virtual pet images/Living Room.png");
  washroom = loadImage("virtual pet images/Wash Room.png");
  running1 = loadImage("virtual pet images/runningLeft.png");
  running2 = loadImage("virtual pet images/running.png");
  injection1 = loadImage("virtual pet images/injection.png");
}

function setup() {
	createCanvas(800, 500);

  background1 = createSprite(400,250,800,500);
  background1.addImage(livingroom);
  background1.scale = 0.7
  
  dog = createSprite(720,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2

  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);

  button = createButton(' Add Food ');
  button.position(1050,75);

  button2 = createButton( 'Feed Food ');
  button2.position(1050,100);
  
  button3 = createButton('Sleep');
  button3.position(1050,125)

  button4 = createButton('Exercise');
  button4.position(1050,150);

  button5 = createButton('Bath');
  button5.position(1050,175);

  button6 = createButton('Vaccination');
  button6.position(1050,200)


  FoodMilk = new Food();

}

function draw() {

  background("white")

  drawSprites();
  
  textSize(15);
  fill("black");
  text("food left: " + foods, 20,50);
  text("Last fed at " + lastFed + " o' clock", 20, 70);

  FoodMilk.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
   lastFed = data.val();
  });

  button.mousePressed(addFood);
  button2.mousePressed(feedFood);
  button3.mousePressed(sleep);
  button4.mousePressed(exercise);
  button5.mousePressed(bath);
  button6.mousePressed(vaccinationday);
  
}

function readStock(data){
  foods = data.val();
  FoodMilk.updateStock(foods);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function addFood(){
  dog.addImage(dogImg);
  background1.addImage(livingroom);
  background1.scale = 0.7
  foods = foods + 1;
  database.ref('/').update({
    food: foods
  })
  injection.visible = false;
}

function feedFood(){
  dog.addImage(dogImg1);
  background1.addImage(livingroom);
  background1.scale = 0.7
  foods = foods - 1;
  database.ref('/').update({
    food: foods,
    feedTime: hour()
  })
  injection.visible = false;
}

function sleep(){
  dog.addImage(lazydog);
  background1.addImage(bedroom);
  injection.visible = false;
}

function exercise(){
  var rannum = Math.round(random(1,2));
  if(rannum === 1){
    dog.addImage(running1);
  }
  else{
    dog.addImage(running2);
  }
  background1.addImage(garden);
  background1.scale = 0.7;
  injection.visible = false;
}

function bath(){
  dog.addImage(dogImg1);
  background1.addImage(washroom);
  background1.scale = 0.7
  injection.visible = false;
}

function vaccinationday(){
  dog.addImage(dogImg);
  background1.addImage(vaccination);
  background1.scale = 0.5
  injection = createSprite(dog.x + 50,dog.y - 20,20,20);
  injection.addImage(injection1);
  injection.scale = 0.2;

}