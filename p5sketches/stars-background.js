function SingleStar(x, y, size){
  this.x = x;
  this.y = y;

  this.size = size;
  this.velocity = 0;

  this.dirX = 0;
  this.dirY = 0;

  this.show = function(){
    noStroke();
    //rectMode(CENTER);
    fill(255);
    //rect(this.x, this.y, this.size, this.size);
    ellipse(this.x, this.y, this.size, this.size);
  }

  this.update = function(){
    //position
    // x
    if(this.x > width){
      this.x = 0;
      var rnd = Math.random() * 2 - 1;
      this.y += rnd * 10;
    }
    else if(this.x < 0){
      this.x = width;
      var rnd = Math.random() * 2 - 1;
      this.y += rnd * 10;
    }
    else{
      this.x += this.dirX * this.velocity;
    }
    // y
    if(this.y > height){
      this.y = 0;
      var rnd = Math.random() * 2 - 1;
      this.x += rnd * 10;
    }
    else if(this.y < 0){
      this.y = height;
      var rnd = Math.random() * 2 - 1;
      this.x += rnd * 10;
    }
    else{
      this.y += this.dirY * this.velocity;
    }
  }

  this.move = function(dirX, dirY, velocity){
    this.dirX = dirX;
    this.dirY = dirY;
    this.velocity = this.size * velocity;
  }

}

function BackgroundManager(numberOfStars){
  this.numberOfStars = numberOfStars;
  this.starsInBackground = [];

  this.dirX = 0;
  this.dirY = 1;
  this.velocity = 0;

  var distance = width / (40);
  var offsetY = 0;
  var offsetX = 0;
  var everyFourty;
  for(i = 0; i < this.numberOfStars; i++){
    everyFourty = i % 40;

    var rnd = Math.random();
    var rnd2 = Math.random();
    if(everyFourty == 39){
      offsetY += 60;
      offsetX = 0;
    }
    else{
      offsetX = everyFourty * distance + (rnd - 0.4) * 40;
    }
    this.starsInBackground[i] = new SingleStar(15 + offsetX, 5 + 50 * rnd2 + offsetY, 1 + rnd);
  }

  this.show = function(){
    for(i = 0; i < this.numberOfStars; i++){
      this.starsInBackground[i].show();
    }
  }

  this.update = function(){
    for(i = 0; i < this.numberOfStars; i++){
      this.starsInBackground[i].move(this.dirX, this.dirY, this.velocity);
      this.starsInBackground[i].update();
    }
  }

  this.move = function(delta, velocity){
    this.velocity = velocity;

    var angle = delta * Math.PI / 180;

    var x2 = Math.cos(angle) * this.dirX - Math.sin(angle) * this.dirY;
    var y2 = Math.sin(angle) * this.dirX + Math.cos(angle) * this.dirY;
    this.dirX = x2;
    this.dirY = y2;

  }
}
