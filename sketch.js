var size = 3;
var balls;
var speed = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
	angle = 0;
	balls = [size];
	var ystart = 140;
	for(var i = 0; i < size; i++){
		balls[i] = new Ball(random(width),random(height));

	}
  background(random(0,100));

}

function draw() {
  translate(width/2,height/2);
  scale(document.getElementById('zoom').value);
  translate(-width/2,-height/2);
//  translate(width/2,height/2);
  speed = document.getElementById("speed").value;
	for(var iter = 0; iter < speed; iter++){
    for(var i = 0; i < balls.length - 1; i++){

      balls[i].checkEdges();
      balls[i].update(balls[i+1].x / 30);


      if(i + 2 == balls.length){
        balls[i+1].update(balls[0].angle);
        balls[i+1].checkEdges();
      }
    }

    for(var j = 0; j < balls.length - 1; j++){

      balls[j].display(balls[j+1].x,balls[j+1].y);
      if(j + 2 == balls.length){
        balls[j+1].display(balls[0].x,balls[0].y);

      }

    }
  }


}

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.alpha = random(255);
	this.speed = random(0.5,random(10));

	this.angleChange = random(0.001,.02);
	this.amp = random(.1,10);
	this.yDir = 1;

  this.prevx = x;
  this.prevy = y;

  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

	this.update = function(prevAngle){
    if(document.getElementById("angle").value != this.prevAngle){
      this.amp = random(0.1,document.getElementById("angle").value);
    }
    this.prevAngle = document.getElementById("angle").value;
		this.angle += this.angleChange;
    this.prevx = this.x;
    this.prevy = this.y;
		this.y += cos(this.angle) * this.amp * this.yDir;
		this.x += this.speed;

	}

	this.display = function(nextx, nexty){

		stroke(this.r,this.g,this.b,255);
    strokeWeight(1);

		line(this.prevx,this.prevy,this.x,this.y);

		stroke(this.b,this.r,this.g,100);
		strokeWeight(2);

		line(this.x,this.y,nextx,nexty);

	}

	this.checkEdges = function(){
		if(this.x > width){
			this.speed *= -1;
		}
		if(this.x < 0){
			this.speed *= -1;
		}
		// if(this.y < 0){
		// 	this.yDir *= -1;
		// 	this.y = 2;
		// }
		// if(this.y > height){
		// 	this.yDir *= -1;
		// 	this.y = height - 2;
		// }
	}

}

function keyPressed(){
  if(keyCode == 38){
    size++;
    setup();
  }
  if(keyCode == 40){
    size--;
    setup();
  }
  if(keyCode == 32){
    setup();
  }
	console.log(keyCode);
}
