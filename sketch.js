var emoji; 
var barriers = [];							//a list or arrangement that holds different items for later usage. These lists use numbers when they are called and start at 0 as they continue to count consecutive numbers as the items in the list increase. 
var score = 0;									//score start


function preload(){
  hit = loadSound("sfx_hit.wav");
  pt = loadSound("sfx_point.wav");
  wing = loadSound("sfx_wing.wav");
}


function setup() {
  createCanvas(600, 400);
  emoji = new Emoji(); 
  barriers.push(new Barrier());
  r = random(255); 			//will allow the emoji color to change. 
  g = random(255);
  b = random(255);
}


function draw() {
  background(0); 			//background = black
  
  for (var i = barriers.length-1; i >= 0; i --) { 
    barriers[i].display(); //lets the barriers appear on screen. 
    barriers[i].update();
    
    if(barriers[i].hits(emoji)) {
      print("HIT");						//prints "HIT" if the emoji hits the barrier or falls on the floor
      score = 0;							//score will reset to 0 --- user basically looses
      hit.play();
    }
    
    if (barriers[i].bmoveout()) { 
      barriers.splice(i, 1);				//deletes stored items from the barrier array continously
      score += 1;										//score increases by 1 -- user starts to gain points
    	if (score > 0) { 
      	pt.play();										//plays point sound
    	} 
    }
  }
  
  emoji.update(); 
  emoji.display(); //displays the emoji
  
  if (frameCount % 110 == 0) {				//shows barriers every 100 frames
    barriers.push(new Barrier());			//each barrier will be 100 frames apart
  }
  stroke(255);
  textSize(25);
  text(score, 20, 30); 
}


function keyPressed(){
  if (key == " "){
    emoji.up();			//brings the emoji up when the space key is pressed
    wing.play();
  }
}


function Emoji() {
  this.y = height/2;
  this.x = 45;
  this.gravity = 0.6;
  this.goup = -15;		//emoji go up rate
  this.velocity = 0;
  
  this.display = function() { 
    noStroke();
    fill(r, g, b);			//random colors
    ellipse(this.x, this.y, 30);															//face
    fill(0);	//black
  	ellipse(this.x - 5, this.y - 5, 5, 5);										//eye
    ellipse(this.x + 5, this.y - 8, 5, 5);										//eye
  	arc(this.x, this.y + 5, 15, 15, 0, radians(180), PIE); 		//frown
  }
  
  this.up = function () {
    this.velocity  += this.goup; 
  }
  
  
  this.update = function() { 
    //allows the emoji to drop to the ground
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;	//resets velocity
    }
    
    if ( this.y < 0) {
      this.y = 0;
      this.velocity = 0;	//resets velocity
    }
  }
}


function Barrier() { 									//a number of operations or statements that are either properties or methods that help define a object -- here, the barriers are created and defined in that their main purpose is stated through the next few lines of code. 
  this.upperl = random(height/2);			//length of the upper barrier
  this.lowerl = random(height/2);			//length of the lower barrier
  this.x = width; 
  this.w = 20;												//width of the barriers...same for all barriers
  this.speed = 2;
  this.distance = 70;
  
  
  this.display = function () {
    fill(255);
    if(this.changecol == true) {
      fill(255, 0, 0);								//changes the barrier color to red when the emoji hits the barrier 
    }
    rect(this.x, 0, this.w, this.upperl);
  	rect(this.x, height-this.lowerl, this.w, this.lowerl);
  }
  
  
  //returns true or false as a boolean and is almost used as a 'yes' or 'no' statement the program will use to determine wether or not to use or carry out a certain function through an if statement. 
  this.changecol = false;
  
  this.hits = function(emoji) { 		//the if statements below allow the program to determine if whether or not the emoji is hitting the barriers. 
    
    if (emoji.y < this.upperl || emoji.y > height - this.lowerl) { 
      if (((emoji.x > this.x) && (emoji.x < this.x + this.upperl))) { 
        emoji.y = height/2; 						//allows the emoji to move back to the middle when the emoji hit the barriers
        this.changecol = true;
        return true;
      }
      
      else if(emoji.y == height) {
        emoji.y = height/2;
        return true;
      }
    }
    
    
    this.changecol = false;
    return false;		//booleans help determine 
  }
  
  
  this.update = function() {			//we can create smaller functions within functions that have "this." in front of them. These are only applicable to the function that it is in and can only be called outside of this function if the "this." is replaced with the larger functions name (ei. barrier.update() even though we don't use this as barrier is placed into an array as there is a demand for multiple barriers throughout the course of the game.) 
    this.x -= this.speed;
  }
  
  
  this.bmoveout = function() {		//how the barriers move out of the screen
    
    if(this.x < -this.w) {
      return true;
    } 
    
    else {
      return false;
    }
  }
}



